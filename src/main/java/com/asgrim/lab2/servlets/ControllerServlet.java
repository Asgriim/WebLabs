package com.asgrim.lab2.servlets;

import util.Model;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import javax.ws.rs.core.Application;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {

    ServletContext context;
    @Override
    public void init() throws ServletException {
        context = getServletContext();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter writer =  response.getWriter();
        String sessionId = request.getSession().getId();
        if(request.getParameter("giveTable") != null){
            saveUserInContextIfNotExist(sessionId);
            getServletContext().getRequestDispatcher("/tableControl").forward(request,response);
        }

        String x = request.getParameter("X");
        String y = request.getParameter("Y");
        String r = request.getParameter("R");
        if (x == null || y == null || r == null){
            getServletContext().getRequestDispatcher("/error").forward(request,response);
            return;
        }
        getServletContext().getRequestDispatcher("/checkHit").forward(request,response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter printWriter = response.getWriter();
       if (request.getParameter("clearTable") != null){
           context.setAttribute("User_" + request.getSession().getId(),new Model());
           printWriter.println("cleared table");
       }
    }

    void saveUserInContextIfNotExist(String sessionId){
        if(!isUserExistInContext(sessionId)){
            context.setAttribute("User_" + sessionId,new Model());
        }
    }
    boolean isUserExistInContext(String sessionId){
        return context.getAttribute("User_" + sessionId) != null;
    }
}

package com.asgrim.lab2.servlets;

import util.Model;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "tableServlet", value = "/tableControl")
public class TableServlet extends HttpServlet {
    String jsonTemplate = "{" +
            "\"sessionId\":\"%s\"," +
            "\"userTable\":%s" +
            "}";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter writer = response.getWriter();
        if(request.getParameter("giveTable") != null){

            Model table = (Model) getServletContext().getAttribute("User_" + request.getSession().getId());
            writer.println(
                    String.format(jsonTemplate, request.getSession().getId(),table.getDataJSON())
            );
        }
        else {
            getServletContext().getRequestDispatcher("/error").forward(request,response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}

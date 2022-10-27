package com.asgrim.lab2.servlets;

import util.Model;
import util.PointValidator;
import util.Row;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "AreaCheckServlet", value = "/checkHit")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PointValidator validator = new PointValidator();
        PrintWriter writer = response.getWriter();
        long now = System.nanoTime();
        if(!validator.validateData(request.getParameter("X"),
                request.getParameter("Y"),
                request.getParameter("R"))) {
            getServletContext().getRequestDispatcher("/error").forward(request,response);
            return;
        }
        double x = Double.parseDouble(request.getParameter("X"));
        double y = Double.parseDouble(request.getParameter("Y"));
        double r = Double.parseDouble(request.getParameter("R"));
        if (!validator.validatePoint(x,y,r)){
            getServletContext().getRequestDispatcher("/error").forward(request,response);
        }
        String hit;
        if (validator.checkHit(x,y,r))
            hit = "yes";
        else
            hit = "no";
        Row row = new Row(x,y,r,
                hit, (double)(System.nanoTime() - now) / 1000000);
        Model model = (Model) getServletContext().getAttribute("User_" + request.getSession().getId());
        model.add(row);
        writer.println(row.getJSON());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}

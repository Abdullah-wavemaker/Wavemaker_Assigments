package com.servlet.filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
public class RegistrationForm extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType ("text/html");
        PrintWriter out = response.getWriter ();
        out.println ("You are registered for badminton league good luck for the auctions");
    }
}

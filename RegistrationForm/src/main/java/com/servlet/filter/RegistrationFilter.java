package com.servlet.filter;
import java.io.*;
import javax.servlet.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;
public class RegistrationFilter implements Filter
{
    FilterConfig config;
    public void init (FilterConfig filterConfig)
    {
        config = filterConfig;
    }

    public void destroy ()
    {
    }
    public void doFilter (ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException
    {
        response.setContentType ("text/html");
        PrintWriter out = response.getWriter ();
        if (request.getParameter ("username").contains(config.getInitParameter ("username"))&&(!request.getParameter("practice").equals(config.getInitParameter("practice"))))
        {
            out.println ("Registration success! All The Best");
            out.println ("<br/>");
            out.println ("<br/>");
            out.println ("<br/>");
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            String proficiency = request.getParameter("proficiency");
            String url = "jdbc:mysql://localhost:3306/BadmintonRegistration";
            String user = "root";
            String password = "root";
            try {
                Connection connection = DriverManager.getConnection(url, user, password);
                String query2 = "insert into registered_candidates values(?,?,?)";
                PreparedStatement ps1 = connection.prepareStatement(query2);
                ps1.setString(1,username);
                ps1.setString(2,email);
                ps1.setString(3,proficiency);
                int res2 = ps1.executeUpdate();
            }
            catch(SQLException e){
                e.printStackTrace();
            }
            chain.doFilter (request, response);
        }
        else
        {
            out.println ("Registration failed! you cannot participate");
        }
        out.println ("<br/>");
        out.println ("<br/>");
        out.println ("<br/>");
        out.println ("<b><i>Message of the day - Never give up!</i></b>");
    }
}
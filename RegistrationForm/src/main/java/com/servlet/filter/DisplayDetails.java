package com.servlet.filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import java.io.PrintWriter;

public class DisplayDetails extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        if (request.getParameter("display") != null) {
            try {
                Class.forName("com.mysql.jdbc.Driver");
                Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/BadmintonRegistration", "root", "root");
                Statement stmt = con.createStatement();
                ResultSet rs = stmt.executeQuery("select * from registered_candidates");
                out.println("<table border=1 width=50% height=50%>");
                out.println("<tr><th>Username</th><th>Email</th><th>Proficiency</th><tr>");
                while (rs.next()) {
                    String name = rs.getString("username");
                    String email = rs.getString("email");
                    String proficiency = rs.getString("proficiency");
                    out.println("<tr><td>" + name + "</td><td>" + email + "</td><td>" + proficiency + "</td></tr>");
                }
                out.println("</table>");
                out.println("</html></body>");
                con.close();
            } catch (Exception e) {
                out.println(e);
            }
        }
    }
}

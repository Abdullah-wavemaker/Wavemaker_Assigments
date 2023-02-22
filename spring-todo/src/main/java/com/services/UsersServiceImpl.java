package com.services;

import com.model.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServiceImpl implements UsersService{
    @Autowired
    private SessionFactory sessionFactory;

    public List<Users> getUsers() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        List<Users> tasksList = session.createQuery("from Users",Users.class).list();
        transaction.commit();
        session.close();
        return tasksList;
    }

    public Users createUsers(Users users) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(users);
        transaction.commit();
        session.close();
        return users;
    }

    public Users getUserById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Users users = session.get(Users.class,id);
        transaction.commit();
        session.close();
        return users;
    }

    public Users updateUsers(Users users){
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(users);
        transaction.commit();
        session.close();
        return users;
    }

    public Users deleteUserById(int id){
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Users users = session.get(Users.class,id);
        session.delete(users);
        transaction.commit();
        session.close();
        return users;
    }
}

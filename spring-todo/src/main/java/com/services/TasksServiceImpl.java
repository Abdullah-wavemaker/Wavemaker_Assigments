package com.services;

import com.model.Tasks;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksServiceImpl implements TasksService{
    @Autowired
    private SessionFactory sessionFactory;

    public List<Tasks> getTasks() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        List<Tasks> tasksList = session.createQuery("from Tasks",Tasks.class).list();
        transaction.commit();
        session.close();
        return tasksList;
    }

    public Tasks createTasks(Tasks tasks) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(tasks);
        transaction.commit();
        session.close();
        return tasks;
    }

    public Tasks getTaskById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Tasks tasks = session.get(Tasks.class,id);
        transaction.commit();
        session.close();
        return tasks;
    }

    public Tasks updateTasks(Tasks tasks){
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(tasks);
        transaction.commit();
        session.close();
        return tasks;
    }

    public Tasks deleteTaskById(int id){
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Tasks tasks = session.get(Tasks.class,id);
        session.delete(id);
        transaction.commit();
        session.close();
        return tasks;
    }
}

package com.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tasks")
public class Tasks {
   @Id
   @Column(name = "task_id")
   private int task_id;

   @Column(name = "task")
   private String task;

   @Column(name  = "user_id")
    private int user_id;

   @Column(name = "category_id")
    private int category_id;

    @Column(name = "is_completed")
    private boolean is_completed;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getCategory_id() {
        return category_id;
    }

    public int getTask_id() {
        return task_id;
    }

    public boolean isIs_completed() {
        return is_completed;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public void setIs_completed(boolean is_completed) {
        this.is_completed = is_completed;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}

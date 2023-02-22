package com.services;

import com.model.Tasks;

import java.util.List;

public interface TasksService {
    List<Tasks> getTasks();

    Tasks createTasks(Tasks tasks);

    Tasks getTaskById(int id);

    Tasks updateTasks(Tasks tasks);

    Tasks deleteTaskById(int id);
}

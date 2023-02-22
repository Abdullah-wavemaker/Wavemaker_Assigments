package com.controller;
import com.model.Tasks;
import com.services.TasksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/tasks")

public class TasksController {

    @Autowired
    TasksService tasksService;


    private static final Logger logger = LoggerFactory.getLogger(TasksController.class);

    @GetMapping
    public List<Tasks> getTasks(){
        logger.info("Tasks list");
        return tasksService.getTasks();
    }
    @PostMapping("/create")
    public Tasks createTasks(@RequestBody Tasks tasks){
        logger.info("create Tasks is invoked {}",tasks);
        return tasksService.createTasks(tasks);
    }

    @GetMapping("/{id}")
    public Tasks getTaskById(@PathVariable("id") int id){
        logger.info("getTaskById is invoked with task Id :{}",id);
        return tasksService.getTaskById(id);
    }

    @PutMapping("/update")
    public Tasks updateTasks(@RequestBody Tasks tasks){
        return tasksService.updateTasks(tasks);
    }

    @DeleteMapping("/{id}")
    public Tasks deleteTaskById(@PathVariable("id") int id){
        return tasksService.deleteTaskById(id);
    }
}

package com.controller;


import com.model.Users;
import com.services.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/users")

public class UserController {

    @Autowired
    UsersService usersService;


    private static final Logger logger = LoggerFactory.getLogger(TasksController.class);

    @GetMapping
    public List<Users> getUsers(){
        logger.info("Users list");
        return usersService.getUsers();
    }
    @PostMapping("/create")
    public Users createUsers(@RequestBody Users users){
        logger.info("create user is invoked {}",users);
        return usersService.createUsers(users);
    }

    @GetMapping("/{id}")
    public Users getUserById(@PathVariable("id") int id){
        logger.info("getUserById is invoked with user Id :{}",id);
        return usersService.getUserById(id);
    }

    @PutMapping("/update")
    public Users updateUsers(@RequestBody Users users){
        return usersService.updateUsers(users);
    }

    @DeleteMapping("/{id}")
    public Users deleteUserById(@PathVariable("id") int id){
        return usersService.deleteUserById((id));
    }
}

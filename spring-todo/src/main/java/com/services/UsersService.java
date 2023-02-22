package com.services;

import com.model.Users;

import java.util.List;

public interface UsersService {
    List<Users> getUsers();

    Users createUsers(Users users);

    Users getUserById(int id);

    Users updateUsers(Users users);

    Users deleteUserById(int id);
}

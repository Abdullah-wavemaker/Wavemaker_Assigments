create database spring_todo;
use spring_todo;
create table category(category_id int primary key,category_type varchar(30));
insert into category values(1,"quick goal"),(2,"short term goal"),(3,"long term goal");

create table users(user_id int primary key,user_name varchar(30),email varchar(60),age int);

create table tasks(task_id int primary key,task varchar(50),user_id int,category_id int,is_completed boolean,foreign key(user_id) references users(user_id),foreign key(category_id) references category(category_id));
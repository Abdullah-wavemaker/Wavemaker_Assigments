create database digital_library;
use digital_library;
create table books(book_id int primary key auto_increment,book_name varchar(30) unique,author_name varchar(30));
insert into books values(1,"IN SEARCH OF LOST TIME","MARCEL PROUST"),(2,"ULYSSES","JAMES JOYCE");
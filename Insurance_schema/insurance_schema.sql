create database health_insurance;
use health_insurance

create table cycle_mngt(cycle_id int primary key,cycle_start year unique key not null,cycle_end year unique key not null,provider_name varchar(25) not null);
insert into cycle_mngt values(6701,2016,2017,'abc'),(6702,2017,2018,'def'),(6703,2018,2019,'ghi'),(6704,2019,2020,'jkl'),(6705,2020,2021,'mno');

create table top_up(top_up_id int primary key,amount bigint not null,cycle_id int,foreign key(cycle_id) references cycle_mngt(cycle_id));
insert into top_up values(8401,50000,6701),(8402,75000,6701);
insert into top_up values(8403,100000,6701),(8404,125000,6701),(8405,150000,6701);

create table relations(relation_id int primary key,relation varchar(20) not null);
insert into relations values(8201,'Mother'),(8202,'Father'),(8203,'Children'),(8204,'Spouse'),(8205,'Mother-in-Law'),(8206,'Father-in-Law');

create table blood_groups(blood_type varchar(5) not null, blood_group_id int primary key);
insert into blood_groups values('A+',1),('B+',2),('O+',3),('AB+',4),('A-',5),('B-',6),('AB-',7),('O-',8)

create table employee(emp_name varchar(20) not null,emp_id int primary key,phone_no bigint not null,blood_group_id int,foreign key(blood_group_id) references blood_groups(blood_group_id));

insert into employee values('aryan',6901,8678904521,1),('joey',6902,9865672021,4),('lary',6903,6786904271,2);

create table dependents(emp_id int not null,dependent_name varchar(25) not null,department_dob date not null,dependent_id int primary key,relation_id int,foreign key(relation_id) references relations(relation_id),foreign key(emp_id) references employee(emp_id));
insert into dependents values(6901,'sunehri','1991-12-12',6801,8201),(6901,'niha','2001-02-12',6802,8203),(6901,'ayan','1981-12-10',6803,8202);

create table group_health_insurance(opt_in boolean,amount bigint,emp_id int,dependent_id int,foreign key(emp_id) references employee(emp_id),foreign key(dependent_id) references dependents(dependent_id));

create table gpap(emp_id int not null,dependent_id int not null,foreign key(emp_id) references employee(emp_id),foreign key(dependent_id) references dependents(dependent_id));

insert into gpap values(6901,6801);





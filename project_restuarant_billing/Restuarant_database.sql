create database restuarant;
use restuarant;

create table food_type(
	food_type_id int primary key auto_increment,
	food_type_name varchar(50)
	);

insert into food_type values(1,"Soups and Salads"),
	(2,"Starters"),
	(3,"Main Course"),
	(4,"Rice and Noodles"),
	(5,"Biryanis"),
	(6,"Rotis"),
	(7,"Specials"),
	(8,"Desserts"),
	(9,"Mocktails"),
	(10,"Fresh juices");
    
create table menu(dish_id int primary key auto_increment,
	food_type_id int,
	dish_name varchar(50),
	is_veg boolean,
	price int,
    is_available boolean
	);
    
insert into menu values(1,1,"Veg manchow soup",True,115,True),
	(2,1,"Hot & Sour",True,110,True),
    (3,1,"Lemon Coriander",True,110,True),
    (4,1,"Veg Cantonese Soup",True,110,True),
    (5,1,"Veg Corn Soup",True,110,True),
    (6,1,"Mutton Bone Soup",False,140,True),
    (7,1,"Yakini Shobra",False,110,True),
    (8,1,"Green Salad",True,90,True),
    (9,1,"Waldort Salad",True,110,True),
    (10,1,"Russian Salad",True,135,True),
    (11,1,"Chicken Tikka Salad",False,180,True),
    (12,2,"Veg Hara Bhara Kebab",True,220,True),
    (13,2,"Paneer Tikka",True,240,True),
    (14,2,"Veg Sheek Kebab",True,220,True),
    (15,2,"Malai Tikka Kebab",True,240,True),
    (16,2,"Chicken Tikka Kebab",False,280,True),
    (17,2,"Murgh Malai Kebab",False,240,True),
    (18,2,"Pahadi Murgh Tikka",False,280,True),
    (19,2,"Tandoori Chicken Full",False,390,True),
    (20,2,"Tandoori Chicken Half",False,210,True),
    (21,2,"Fish Tikka",False,380,True),
    (22,2,"Tandoori Prawns",False,390,True),
    (23,2,"Veg Manchuria",True,220,True),
    (24,2,"Gobi Manchuria",True,200,True),
    (25,2,"Paneer Manchuria",True,235,True),
    (26,2,"Chicken 65",False,270,True),
    (27,2,"Chicken Manchuria",False,270,True),
    (28,3,"Paneer Butter Masala",True,240,True),
    (29,3,"Paneer Tikka Masala",True,240,True),
    (30,3,"Kadai Paneer",True,240,True),
    (31,3,"Malai Kofta",True,240,True),
    (32,3,"Kadai Veg",True,240,True),
    (33,3,"Dal Makhni",True,170,True),
    (34,3,"Butter Chicken",False,270,True),
    (35,3,"Kadhai Chicken",False,270,True),
    (36,3,"Dum Ka Murgh",False,270,True),
    (37,3,"Punjabi Chicken",False,270,True),
    (38,3,"Kadhai Mutton",False,270,True),
    (39,3,"Fish Tikka Masala",False,320,True),
    (40,4,"Veg Fried Rice",True,180,True),
    (41,4,"Egg Fried Rice",False,180,True),
    (42,4,"Chicken Fried Rice",False,230,True),
    (43,4,"Mix Veg Fried Rice",True,180,True),
    (44,4,"Mix Non Veg Fried Rice",False,270,True),
    (45,4,"Veg Noodles",True,180,True),
    (46,4,"Egg Noodles",False,180,True),
    (47,4,"Chicken Noodles",False,230,True),
    (48,4,"Mix Veg Noodles",True,180,True),
    (49,4,"Mix Non Veg Noodles",False,270,True),
    (50,4,"Zeera Rice",True,180,True),
    (51,5,"Veg Biryani",True,215,True),
    (52,5,"Egg Biryani",False,220,True),
    (53,5,"Chicken Biryani Regular",False,245,True),
    (54,5,"Chicken Biryani Special",False,320,True),
    (55,5,"Fish Biryani",False,270,True),
    (56,5,"Prawns Biryani",False,320,True),
    (57,6,"Roti",True,30,True),
    (58,6,"Rumali Roti",True,35,True),
    (59,6,"Plain Naan",True,35,True),
    (60,6,"Butter Naan",True,35,True),
    (61,6,"Garlic Naan",True,40,True),
    (62,6,"Lachha Paratha",True,45,True),
    (63,7,"Tangdi Kebab Biryani",False,310,True),
    (64,7,"Chicken Special Biryani",False,370,True),
    (65,8,"Apricot Delight",True,120,True),
    (66,8,"Qurbani Ka Meetha",True,120,True),
    (67,8,"Gulab Jamun",True,120,True),
    (68,8,"Kala Jamun",True,120,True),
    (69,8,"Rabdi Malai",True,140,True),
    (70,8,"Lychee Rabdi Malai",True,140,True),
    (71,9,"Sweet Lime Juice",True,90,True),
    (72,9,"Paan Mocktail",True,90,True),
    (73,9,"Green Apple",True,90,True),
    (74,9,"Strawberry",True,90,True),
    (75,9,"Fruit Punch",True,120,True),
    (76,10,"Apple",True,120,True),
    (77,10,"Pine Apple",True,90,True),
    (78,10,"Orange",True,90,True),
    (79,10,"Mango",True,90,True),
    (80,10,"Orange",True,90,True),
    (81,10,"Grape",True,90,True);
    
alter table menu
add foreign key(food_type_id) references food_type(food_type_id);

create table order_item(
	order_id int auto_increment primary key,
    dish_id int,
    dish_name varchar(50),
    quantity int,
    unit_price float);
    
create table final_order(
	final_order int auto_increment primary key,
    order_id int,
    total_items int,
    total_amount int,
    table_no int,
    order_time datetime,
    customer_id int
    );

create table customer(
	customer_id int auto_increment primary key,
    phone_no varchar(10)
    );

alter table final_order
add foreign key(customer_id) references customer(customer_id);

alter table final_order
add foreign key(order_id) references order_item(order_id);

alter table order_item
add foreign key(dish_id) references menu(dish_id);

create table payment_type(
	payment_type_id int auto_increment primary key,
	payment_option varchar(30)
	);
        
insert into payment_type values(1,"cash"),
	(2,"upi"),
	(3,"credit/debit card");
        
create table payment(
	payment_id int auto_increment primary key,
    final_order int,
    customer_id int,
    payment_date date,
    payment_type_id int,
    total_amount float);

create table time_slots(
	time_slot_id int auto_increment primary key,
    start_time time,
    end_time time
    );
    
create table admin_entry(
	admin_id int auto_increment primary key,
    admin_name varchar(30),
    time_slot_id int
    );

alter table final_order
add column admin_id int;

alter table final_order
add foreign key(admin_id) references admin_entry(admin_id);

create table feedback(
	feedback_id int auto_increment primary key,
    review varchar(50),
    final_order int
    );
    
alter table feedback
add foreign key(final_order) references final_order(final_order);

alter table customer
add column(user_name varchar(50),email varchar(50));

alter table payment
add foreign key(final_order) references final_order(final_order);

alter table payment
add foreign key(payment_type_id) references payment_type(payment_type_id);

alter table admin_entry
add foreign key(time_slot_id) references time_slots(time_slot_id);

create table taxes_and_charges(
	charges_id int auto_increment primary key,
    charges_type varchar(30),
    charge_percentage float
    );
    
insert into taxes_and_charges values(1,"CGST",2.5),
	(2,"SGST",2.5),
    (3,"CONVINIENCE FEE",0);
    
alter table final_order
add column charges_id int;

alter table final_order
add foreign key(charges_id) references taxes_and_charges(charges_id);


    
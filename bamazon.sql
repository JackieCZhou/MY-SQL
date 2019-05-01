DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL ,
  product_name VARCHAR(250) NULL,
  department_name VARCHAR(250) NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (1, "Socks", "Clothing", 12, 50),
(2, "Shoes", "Accessories", 50, 25),
(3, "Jeans", "Clothing", 100, 50),
(4, "T-Shirts", "Clothing", 30, 100),
(5, "Hat", "Accessories", 10, 20),
(6, "Earrings", "Accessories", 5, 100),
(7, "Painting", "Home", 50, 10),
(8, "Lamp", "Home", 45, 25),
(9, "Headphones", "Electronics", 60, 10),
(10, "IPhone", "Electronics", 1000, 50);

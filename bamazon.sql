DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20),
    department_name VARCHAR(30),
    price DECIMAL(15, 2) NOT NULL,
    stock_quantity INTEGER(10), 
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 700, 50)
, ("TV", "Electronics", 500, 100)
, ("Pan", "Kitchen & Dining", 50, 150)
, ("Shirt", "Fashion", 20, 500)
, ("Pants", "Fashion", 40, 200)
, ("Shoes", "Fashion", 100, 100)
, ("Cat Food", "Pet Supplies", 1.50, 100)
, ("Cell Phones", "Electronics", 1000, 250)
, ("Dog Food", "Pet Supplies", 2.25, 100)
, ("Knives", "Kitchen & Dining", 30, 100);


CREATE TABLE orders(
	order_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    item_id INTEGER NOT NULL,
    order_name VARCHAR(20) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    order_quantity INTEGER(10),
    total INTEGER(10) NOT NULL,
    PRIMARY KEY (order_id)
);


SELECT * FROM products;
SELECT * FROM orders;


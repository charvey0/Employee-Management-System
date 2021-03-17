DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE Department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE Role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary decimal,
  is_management VARCHAR(3),
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES Department(id)
) ENGINE=INNODB;

CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  is_manager VARCHAR(3),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES Role(id),
  FOREIGN KEY (manager_id) REFERENCES Employee(id)
) ENGINE=INNODB;
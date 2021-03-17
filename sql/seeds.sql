USE employee_db;

INSERT INTO Department (name) 
VALUES ("Production"), 
("Sales"), 
("Maintenence");

INSERT INTO Role (title, salary, is_management, department_id) 
VALUES ("Production Level 1", 40000, "NO", 1), 
("Production Level 2", 45000, "NO", 1), 
("Production Manager", 60000, "YES", 1), 
("Sales Associate Level 1", 30000, "NO", 2), 
("Sales Associate Level 2", 45000, "NO", 2), 
("Sales Lead Associate", 60000, "YES", 2), 
("Maintenence Level 1", 30000, "NO", 3), 
("Maintenence Level 2", 40000, "NO", 3), 
("Maintenence Supervisor", 50000, "YES", 3);

INSERT INTO Employee (first_name, last_name, is_manager, role_id)
 VALUES ("Alan", "Anderson", "NO", 1),
 ("Beatrix", "Bloomfeld", "NO", 2),
 ("Catherine", "Cox", "YES", 3),
 ("Daniel", "Dent", "NO", 4),
 ("Evelyn", "Eastman", "NO", 5),
 ("Frank", "Fast", "YES", 6),
 ("Gina", "Goodman", "NO", 7),
 ("Henry", "Hightower", "NO", 8),
 ("Irma", "Ipifiano", "YES", 9);

UPDATE Employee SET manager_id=3 WHERE id=1;
UPDATE Employee SET manager_id=3 WHERE id=2;
UPDATE Employee SET manager_id=6 WHERE id=4;
UPDATE Employee SET manager_id=6 WHERE id=5;
UPDATE Employee SET manager_id=9 WHERE id=7;
UPDATE Employee SET manager_id=9 WHERE id=8;

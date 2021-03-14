USE employee_db;

INSERT INTO Department (name) 
VALUES ("Department 1"), 
("Department 2"), 
("Department 3");

INSERT INTO Role (title, salary, is_management, department_id) 
VALUES ("Role 1 of D1", 10000, FALSE, 1), 
("Role 2 of D1", 20000, FALSE, 1), 
("Role 3 of D1", 30000, TRUE, 1), 
("Role 1 of D2", 10000, FALSE, 2), 
("Role 2 of D2", 20000, FALSE, 2), 
("Role 3 of D2", 30000, TRUE, 2), 
("Role 1 of D3", 10000, FALSE, 3), 
("Role 2 of D3", 20000, FALSE, 3), 
("Role 3 of D3", 30000, TRUE, 3);

INSERT INTO Employee (first_name, last_name, is_manager, role_id)
 VALUES ("A", "A", FALSE, 1),
 ("B", "B", FALSE, 2),
 ("C", "C", TRUE, 3),
 ("D", "D", FALSE, 4),
 ("E", "E", FALSE, 5),
 ("F", "F", TRUE, 6),
 ("G", "G", FALSE, 7),
 ("H", "H", FALSE, 8),
 ("I", "I", TRUE, 9);

UPDATE Employee SET manager_id=3 WHERE id=1;
UPDATE Employee SET manager_id=3 WHERE id=2;
UPDATE Employee SET manager_id=6 WHERE id=4;
UPDATE Employee SET manager_id=6 WHERE id=5;
UPDATE Employee SET manager_id=9 WHERE id=7;
UPDATE Employee SET manager_id=9 WHERE id=8;

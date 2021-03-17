const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  
});

const action = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['[CREATE]', '[UPDATE]', '[VIEW]','[DELETE]', '[EXIT]'],
    })
    .then((ans) => {
        switch (ans.action) {
            case '[CREATE]':
                create();
                break;
            case '[UPDATE]':
                update();
                break;
            case '[VIEW]':
                view();
                break;
            case '[DELETE]':
                del();
                break;
            default:
                connection.end();
        }
    });
};


////////////////////////////////  CREATE /////////////////////

const create = () => {
    inquirer
    .prompt({
      name: 'create',
      type: 'list',
      message: 'What would you like to create?',
      choices: ['[EMPLOYEE]', '[ROLE]', '[DEPARTMENT]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.create) {
            case '[EMPLOYEE]':
                createEmployee();
                break;
            case '[ROLE]':
                createRole();
                break;
            case '[DEPARTMENT]':
                createDepartment();
                break;
            default:
                action();
        }
    });
};

const createEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'is_manager',
        type: 'list',
        message: "Is this employee a manager?",
        choices: ["YES","NO"]
      },
      {
        name: 'role_id',
        type: 'input',
        message: "What is the employee's role id?",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the employee's manager's id?",
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO Employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          is_manager: answer.is_manager || null,
          role_id: answer.role_id || null,
          manager_id: answer.manager_id || null,
        },
        (err) => {
          if (err) throw err;
          console.log('Your employee was successfully added.');
          action();
        }
      );
    });
};


const createRole = () => {
    inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "What is the title of the new role?",
      },
      {
        name: 'salary',
        type: 'input',
        message: "What is the salary?",
      },
      {
        name: 'is_management',
        type: 'list',
        message: "Is this role a managing role?",
        choices: ["YES", "NO"],
      },
      {
        name: 'department_id',
        type: 'input',
        message: "What is the id of the department this role is under?",
      },

    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          is_management: answer.is_management,
          department_id: answer.department_id
        },
        (err) => {
          if (err) throw err;
          console.log('The new role was successfully added.');
          action();
        }
      );
    });
};


const createDepartment = () => {
    inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: "What is the name of the new department?",
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.name
        },
        (err) => {
          if (err) throw err;
          console.log('The new department was successfully added.');
          action();
        }
      );
    });
};



////////////////////////////////  DELETE /////////////////////

const del = () => {
    inquirer
    .prompt({
      name: 'create',
      type: 'list',
      message: 'What would you like to delete?',
      choices: ['[EMPLOYEE]', '[ROLE]', '[DEPARTMENT]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.create) {
            case '[EMPLOYEE]':
                deleteEmployee();
                break;
            case '[ROLE]':
                deleteRole();
                break;
            case '[DEPARTMENT]':
                deleteDepartment();
                break;
            default:
                action();
        }
    });
};

const deleteEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the employee's id?",
      }
    ])
    .then((answer) => {
      connection.query(
        'DELETE FROM Employee WHERE ?',
        {
          id: answer.id
        },
        (err) => {
          if (err) throw err;
          console.log('Your employee was successfully deleted.');
          action();
        }
      );
    });
};


const deleteRole = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the role's id?",
      }
    ])
    .then((answer) => {
      connection.query(
        'DELETE FROM Role WHERE ?',
        {
          id: answer.id
        },
        (err) => {
          if (err) throw err;
          console.log('Your role was successfully deleted.');
          action();
        }
      );
    });
};


const deleteDepartment = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the department's id?",
      }
    ])
    .then((answer) => {
      connection.query(
        'DELETE FROM Department WHERE ?',
        {
          id: answer.id
        },
        (err) => {
          if (err) throw err;
          console.log('Your department was successfully deleted.');
          action();
        }
      );
    });
};




////////////////////////////////  UPDATE  /////////////////////

const update = () => {
    inquirer
    .prompt({
      name: 'update',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['[EMPLOYEE]', '[ROLE]', '[DEPARTMENT]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.update) {
            case '[EMPLOYEE]':
                updateEmployee();
                break;
            case '[ROLE]':
                updateRole();
                break;
            case '[DEPARTMENT]':
                updateDepartment();
                break;
            default:
                action();
        }
    });
};


/////////////////////////////////////// UPDATE Employee  ////////////////
const updateEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the id of the employee to be edited?",
      }
    ])
    .then((answer) => {
        updateEmployeeMenu(answer.id);
    });
};

const updateEmployeeMenu = (id) => {
    inquirer
    .prompt({
      name: 'update',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['[FIRST NAME]', '[LAST NAME]', '[IS MANAGER]', '[ROLE ID]', '[MANAGER ID]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.update) {
            case '[FIRST NAME]':
                updateEmployeeFirstName(id);
                break;
            case '[LAST NAME]':
                updateEmployeeLastName(id);
                break;
            case '[IS MANAGER]':
                updateEmployeeIsManager(id);
                break;
            case '[ROLE ID]':
                updateEmployeeRole(id);
                break;
            case '[MANAGER ID]':
                updateEmployeeManager(id);
                break;
            default:
                action();
        }
    });
};

const updateEmployeeFirstName = (id) => {
    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "What is the employee's first name?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{  first_name: answer.first_name }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The employee's first name was successfully updated.");
          updateEmployeeMenu(id);
        }
      );
    });
};

const updateEmployeeLastName = (id) => {
    inquirer
    .prompt([
      {
        name: 'last_name',
        type: 'input',
        message: "What is the employee's last name?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{  last_name: answer.last_name }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The employee's last name was successfully updated.");
          updateEmployeeMenu(id);
        }
      );
    });
};


const updateEmployeeIsManager = (id) => {
  inquirer
  .prompt([
    {
      name: 'is_manager',
      type: 'list',
      message: "Is this employee a manager?",
      choices: ["YES","NO"]
    }
  ])
  .then((answer) => {
    connection.query(
      'UPDATE employee SET ? WHERE ?',
      [{  is_manager: answer.is_manager }, 
       { id: id }],
      (err) => {
        if (err) throw err;
        console.log("The employee's manager status was successfully updated.");
        updateEmployeeMenu(id);
      }
    );
  });
};


const updateEmployeeRole = (id) => {
    inquirer
    .prompt([
      {
        name: 'role_id',
        type: 'input',
        message: "What is the employee's role id?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{  role_id: answer.role_id }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The employee's role id was successfully updated.");
          updateEmployeeMenu(id);
        }
      );
    });
};

const updateEmployeeManager = (id) => {
    inquirer
    .prompt([
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the employee's manager id?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{  manager_id: answer.manager_id }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The employee's manager id was successfully updated.");
          updateEmployeeMenu(id);
        }
      );
    });
};



/////////////////////////////////////// UPDATE Role  ////////////////

const updateRole = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the id of the role to be edited?",
      }
    ])
    .then((answer) => {
        updateRoleMenu(answer.id);
    });
};


const updateRoleMenu = (id) => {
    inquirer
    .prompt({
      name: 'update',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['[TITLE]', '[SALARY]', '[IS_MANAGEMENT]', '[DEPARTMENT ID]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.update) {
            case '[TITLE]':
                updateRoleTitle(id);
                break;
            case '[SALARY]':
                updateRoleSalary(id);
                break;
            case '[IS_MANAGEMENT]':
                updateRoleIsManagement(id);
                break;
            case '[DEPARTMENT ID]':
                updateRoleDepartment(id);
                break;
            default:
                action();
        }
    });
};


const updateRoleTitle = (id) => {
    inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "What is the role's new title?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE role SET ? WHERE ?',
        [{  title: answer.title }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The role's title was successfully updated.");
          updateRoleMenu(id);
        }
      );
    });
};

const updateRoleSalary = (id) => {
    inquirer
    .prompt([
      {
        name: 'salary',
        type: 'input',
        message: "What is the role's new salary?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE role SET ? WHERE ?',
        [{  salary: answer.salary }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The role's salary was successfully updated.");
          updateRoleMenu(id);
        }
      );
    });
};

const updateRoleIsManagement = (id) => {
    inquirer
    .prompt([
      {
        name: 'is_management',
        type: 'list',
        message: "Is this role a management role?",
        choices: ["YES","NO"]
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE role SET ? WHERE ?',
        [{  is_management: answer.is_management }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The role's management flag was successfully updated.");
          updateRoleMenu(id);
        }
      );
    });
};


const updateRoleDepartment = (id) => {
    inquirer
    .prompt([
      {
        name: 'department_id',
        type: 'input',
        message: "What is the role's department id?"
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE role SET ? WHERE ?',
        [{  department_id: answer.department_id }, 
         { id: id }],
        (err) => {
          if (err) throw err;
          console.log("The role's department id was successfully updated.");
          updateRoleMenu(id);
        }
      );
    });
};




/////////////////////////////////////// UPDATE Department  ////////////////

const updateDepartment = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the id of the department?",
      },
      {
        name: 'new_name',
        type: 'input',
        message: "What is the new name of the department?",
      }
    ])
    .then((answer) => {
      connection.query(
        'UPDATE department SET ? WHERE ?',
        [{  name: answer.new_name }, 
         { id: answer.id }],
        (err) => {
          if (err) throw err;
          console.log('The department was successfully updated.');
          action();
        }
      );
    });
};




////////////////////////////////  VIEW  /////////////////////

const view = () => {
    inquirer
    .prompt({
      name: 'view',
      type: 'list',
      message: 'What would you like to view?',
      choices: ['[EMPLOYEES]', '[ALL ROLES]', '[ROLE BY ID]', '[ALL DEPARTMENTS]', '[DEPARTMENT BY ID]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.view) {
            case '[EMPLOYEES]':
                viewEmployees();
                break;
            case '[ALL ROLES]':
                viewRoles();
                break;
            case '[ROLE BY ID]':
                viewRole();
                break;
            case '[ALL DEPARTMENTS]':
                viewDepartments();
                break;
            case '[DEPARTMENT BY ID]':
                viewDepartment();
                break;
            default:
                action();
        }
    });
};


/////////////////////////////////////// VIEW Employee  ////////////////
const viewEmployees = () => {
    inquirer
    .prompt({
      name: 'mode',
      type: 'list',
      message: 'How would you like to view the employees?',
      choices: ['[BY DEPARTMENT]', '[BY MANAGER]', '[BY LAST NAME]', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.mode) {
            case '[BY DEPARTMENT]':
                viewEmployeeByDepartment();
                break;
            case '[BY MANAGER]':
                viewEmployeeByManager();
                break;
            case '[BY LAST NAME]':
                viewEmployeeByLastName();
                break;
            default:
                action();
        }
    });
};

const viewEmployeeByDepartment = () => {

    connection.query(
        'SELECT * FROM department',
            (err, departments) => {
                if (err) throw err;
                departments.forEach((department) => {
                    connection.query('SELECT id FROM role WHERE ?',
                        { department_id: department.id },
                        (err, roles) => {
                            if (err) throw err;
                            let q = 'SELECT id, first_name, last_name FROM employee WHERE ';
                            let count = 0;
                            roles.forEach((role) => {
                                if (count > 0) {
                                  q += " OR ";
                                }
                                count++;
                                q += " role_id = "+role.id;
                            });    
                            q += " ORDER BY last_name";
                            connection.query(q ,
                            (err, employees) => {
                                if (err) throw err;
                              console.log(`
__________________________________
DEPARTMENT: `+department.name);
                                employees.forEach(emp => {
                                  console.log(emp.id+" "+emp.first_name+" "+emp.last_name);
                                });
                            });
                        });
                    });
              view();
          });
}

const viewEmployeeByManager = () => {
    connection.query(
        'SELECT id, first_name, last_name FROM employee WHERE ? ORDER BY last_name',
          { is_manager: "YES" },
            (err, res) => {
              if (err) throw err;
              res.forEach(manager => {
              connection.query(
                    'SELECT id, first_name, last_name FROM employee WHERE ? ORDER BY last_name',
                    { manager_id: manager.id},
                    (err, resp) => {
                        if (err) throw err;
                        console.log(`

MANAGER: ${manager.first_name} ${manager.last_name}
-----------------------------------------------------`);
                        
                        resp.forEach(emp => {
                          console.log(emp.id+" "+emp.first_name+" "+emp.last_name);
                        });
                    }
              );    
            });
            view();
          });
        }


const viewEmployeeByLastName = () => {
    connection.query(
        'SELECT * FROM employee ORDER BY last_name',
            (err, res) => {
              if (err) throw err;
//TODO print results
// role title, salary, department, all employees in that role and the combined salary
console.table(`
`,res);
view();
            }
          );
};


/////////////////////////////////////// VIEW Role  ////////////////
const viewRole = () => {
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "What is the id of the role to be viewed?",
      }
    ])
    .then((answer) => {
        connection.query(
            'SELECT * FROM employee INNER JOIN role ON role.id=employee.role_id',
            {  id: answer.id }, 
            (err, res) => {
                if (err) throw err;
                connection.query(
                    'SELECT * FROM role WHERE ?',
                    {  id: answer.id }, 
                    (err, res) => {
                        if (err) throw err;
                        console.table(`

`,res);
            });
            view();
        });
    });
        
};

const viewRoles = () => {
  connection.query(
    'SELECT * FROM role',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      view();    
    }
  );
};



/////////////////////////////////////// VIEW Department  ////////////////
const viewDepartments = () => {
    connection.query(
      'SELECT * FROM department',
      (err, res) => {
        if (err) throw err;
        console.table(res);
        view();
      }
    );
};


const viewDepartment = () => {
  inquirer
  .prompt([
    {
      name: 'id',
      type: 'input',
      message: "What is the id of the department to be viewed?",
    }
  ])
  .then((answer) => {
      connection.query(
          'SELECT * FROM department WHERE ?',
          {  id: answer.id }, 
          (err, res) => {
              if (err) throw err;
              console.table(`

              `,res);
          });
          view();
      });
};

/////////////////////////////////////////////////////////////////////////
connection.connect((err) => {
  if (err) throw err;
  action();
});

const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '709Vergo!',
  database: 'employee_db',
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
                console.log("create called");
                create();
                break;
            case '[UPDATE]':
//                update();
                break;
            case '[VIEW]':
//                view();
                break;
            case '[DELETE]':
                del();
                break;
            default:
                connection.end();
        }
    });
};


const create = () => {
    inquirer
    .prompt({
      name: 'create',
      type: 'list',
      message: 'What would you like to create?',
      choices: ['Create a new employee', 'Create a new role', 'Create a new department', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.create) {
            case 'Create a new employee':
                createEmployee();
                break;
            case 'Create a new role':
                createRole();
                break;
            case 'Create a new department':
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
        message: "What is the employee's first name?",
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
        message: "Is this role a managing role? (1 for 'YES'; 0 for 'NO'",
        choices: [1, 0],
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






const del = () => {
    inquirer
    .prompt({
      name: 'create',
      type: 'list',
      message: 'What would you like to delete?',
      choices: ['Delete an employee', 'Delete a role', 'Delete a department', 'Go back to the main menu'],
    })
    .then((ans) => {
        switch (ans.create) {
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete a department':
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




connection.connect((err) => {
  if (err) throw err;
  action();
});

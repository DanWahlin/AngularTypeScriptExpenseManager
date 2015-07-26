"use strict";

var httpRequest = require('./httpRequest');

var employeeRepository = function() {

    var employees = null,
		expenses = null;
    
    var getEmployees = function(req, pagingInfo, callback) {        
        if (employees) {
			return callback(null, employees);
		} else {
			//Loading via HTTP in case we want to switch this out to alive service
			//such as the https://randomuser.me (where the employee data came from originally)
			var host = req.headers.host;
			httpRequest.get('http://' + host + '/employees.json', function(err, emps) {
				employees = emps;
				callback(null, emps);
			});
			//Preload expenses
			httpRequest.get('http://' + host + '/expenses.json', function(err, exps) {
				expenses = exps;
			});
		}
    },
	
	getEmployee = function(id, callback) {
		if (employees) {
			//Blocking but works for demo
			employees.forEach(function(emp) {
				if (emp.id === id) {
					return callback(null, emp);
				}
			});
		} else {
			callback(new Error('No employee found.'), null);
		}
	},
	
	insertEmployee = function(employee, callback) {
		if (employees) {
			//Quick and dirty way to auto-increment an id for demo
			employee.id = employees.length + 1;
			employees.push(employee);
			return callback(null, employee);
		} else {
			callback(new Error('No employees found. Cannot insert.'), null);
		}
	},
	
	updateEmployee = function(id, employee, callback) {
		if (employees) {
			employees.forEach(function(emp, index) {
				if (emp.id === id) {
					employees[index] = employee;
					return callback(null, employee);
				}
			});
		} else {
			callback(new Error('No employees found. Cannot insert.'), null);
		}
	},
	
	deleteEmployee = function(id, callback) {
		if (employees) {
			employees.forEach(function(emp, index) {
				if (emp.id === id) {
					employees.splice(index, 1);
					return callback(null, true);
				}
			});
		} else {
			callback(new Error('No employees found. Cannot insert.'), null);
		}
	},
	
	getEmployeesExpenses = function(pagingInfo, callback) {
		if (employees && expenses) {
			//Blocking but works for demo
			employees.forEach(function(emp) {
				emp.expenses = [];
				expenses.forEach(function(empExpenses) {
					if (empExpenses.employeeId === emp.id) {
						emp.expenses = empExpenses.expenses;
					}
				});
			});
			callback(null, employees);
		} else {
			callback(new Error('No employees or expenses found.'), null);
		}
	},
	
	getEmployeeExpenses = function(id, callback) {
		if (employees && expenses) {
			//Blocking but works for demo
			employees.forEach(function(emp) {
				if (emp.id === id) {
					expenses.forEach(function(empExpenses) {
						if (empExpenses.employeeId === emp.id) {
							emp.expenses = empExpenses.expenses;
							return callback(null, emp);
						}
					});
				}
			});
		} else {
			callback(new Error('No employee or expenses found.'), null);
		}
	},
	
	pageData = function(data, callback) {
		
	};
    
    return {
        getEmployees: getEmployees,
		getEmployee: getEmployee,
		insertEmployee: insertEmployee,
		updateEmployee: updateEmployee,
		deleteEmployee: deleteEmployee,
		getEmployeeExpenses: getEmployeeExpenses,
		getEmployeesExpenses: getEmployeesExpenses
    };
}();

module.exports = employeeRepository;

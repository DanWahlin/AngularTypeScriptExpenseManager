'use strict';

var employeeRepository = require('../../../lib/employeeRepository');

module.exports = function (router) {

    router.get('/', function (req, res, next) {

        var pagingInfo = {};
        employeeRepository.getEmployees(req, pagingInfo, function (err, employees) {

            if (err) return next(err);

            res.json(employees);
        });

    });
    
    router.get('/:id(\\d+)/', function (req, res, next) {

        var id = parseInt(req.params.id, 10);
        employeeRepository.getEmployee(id, function (err, employee) {

            if (err) return next(err);

            res.json(employee);
        });

    });
    
    router.post('/', function (req, res, next) {

        var employee = req.body.employee;
        employeeRepository.insertEmployee(employee, function (err, employee) {

            if (err) return next(err);

            res.json(employee);
        });

    });
    
    router.put('/:id', function (req, res, next) {
        var id = parseInt(req.params.id, 10);
        var employee = req.body.employee;
        console.log(employee.email);
        employeeRepository.updateEmployee(id, employee, function (err, employee) {
            if (err) return next(err);

            res.json(employee);
        });

    });
    
    router.delete('/:id', function (req, res, next) {

        var id = parseInt(req.params.id, 10);
        employeeRepository.deleteEmployee(id, function (err, status) {

            if (err) return next(err);

            res.json(status);
        });

    });
    
    router.get('/expenses', function (req, res, next) {

		var pagingInfo = {};
        employeeRepository.getEmployeesExpenses(pagingInfo, function (err, empsExps) {

            if (err) return next(err);

            res.json(empsExps);
        });

    });
    
    router.get('/expenses/:id', function (req, res, next) {

        var id = parseInt(req.params.id, 10);
        employeeRepository.getEmployeeExpenses(id, function (err, empExps) {

            if (err) return next(err);

            res.json(empExps);
        });

    });
    
};

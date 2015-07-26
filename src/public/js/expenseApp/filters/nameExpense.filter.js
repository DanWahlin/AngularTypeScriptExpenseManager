///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />
'use strict';
var expenseApp;
(function (expenseApp) {
    function nameExpenseFilter() {
        return function (employees, filterValue) {
            if (!filterValue || !employees) {
                return employees;
            }
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < employees.length; i++) {
                var emp = employees[i];
                if (emp.name.first.toLowerCase().indexOf(filterValue) > -1 ||
                    emp.name.last.toLowerCase().indexOf(filterValue) > -1 ||
                    matchesExpense(emp, filterValue)) {
                    matches.push(emp);
                }
            }
            return matches;
        };
        function matchesExpense(employee, filterValue) {
            if (employee.expenses) {
                for (var i = 0; i < employee.expenses.length; i++) {
                    if (employee.expenses[i].title.toLowerCase().indexOf(filterValue) > -1) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    expenseApp.nameExpenseFilter = nameExpenseFilter;
    angular.module('expenseApp').filter('nameExpenseFilter', nameExpenseFilter);
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/filters/nameExpense.filter.js.map
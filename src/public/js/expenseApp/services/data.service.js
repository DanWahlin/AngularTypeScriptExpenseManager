var expenseApp;
(function (expenseApp) {
    var services;
    (function (services) {
        var DataService = (function () {
            function DataService($http, $q, $window, $location, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$window = $window;
                this.$location = $location;
                this.$timeout = $timeout;
                this.baseEmployeesUrl = '/api/employees';
                this.baseStatesUrl = '/api/states';
            }
            DataService.prototype.getEmployeesAndExpenses = function () {
                var _this = this;
                return this.$http.get(this.baseEmployeesUrl + '/expenses').then(function (result) {
                    var employees = result.data;
                    _this.extendEmployees(employees);
                    return employees;
                }, function (error) {
                    _this.$window.alert(error.message);
                    return error;
                });
            };
            DataService.prototype.getEmployeesSummary = function (pageIndex, pageSize) {
                return this.getPagedResource(this.baseEmployeesUrl, pageIndex, pageSize);
            };
            DataService.prototype.getStates = function () {
                return this.$http.get(this.baseStatesUrl).then(function (result) {
                    return result.data;
                });
            };
            DataService.prototype.getEmployee = function (id) {
                var _this = this;
                return this.$http.get(this.baseEmployeesUrl + '/' + id).then(function (result) {
                    var cust = result.data;
                    return cust;
                }, function (error) {
                    _this.$window.alert(error.message);
                });
            };
            //        checkUniqueValue(id, property, value) {
            //            if (!id) { id = 0; }
            //            return this.$http.get(this.serviceBase + 'checkUnique/' + id + '?property=' + property +
            //                                  '&value=' + escape(value), this.getOptions)
            //                .then((results) => {
            //                    return results.data.status;
            //                }
            //            );
            //        }
            DataService.prototype.getEmployeeExpenses = function (id) {
                var _this = this;
                return this.$http.get(this.baseEmployeesUrl + '/expenses/' + id).then(function (result) {
                    var employee = result.data;
                    _this.calculateExpensesTotal(employee);
                    return employee;
                }, function (error) {
                    _this.$window.alert(error.message);
                    return error;
                });
            };
            DataService.prototype.insertEmployee = function (employee) {
                var _this = this;
                return this.$http.post(this.baseEmployeesUrl, { employee: employee }).then(function (result) {
                    return result.data;
                }, function (error) {
                    _this.$window.alert(error.message);
                    return error;
                });
            };
            DataService.prototype.newEmployee = function () {
                return this.$q.when({});
            };
            DataService.prototype.updateEmployee = function (employee) {
                return this.$http.put(this.baseEmployeesUrl + '/' + employee.id, { employee: employee });
            };
            DataService.prototype.deleteEmployee = function (employee) {
                return this.$http.delete(this.baseEmployeesUrl + '/' + employee.id);
            };
            DataService.prototype.getPagedResource = function (baseResource, pageIndex, pageSize) {
                var _this = this;
                var resource = baseResource;
                resource += (arguments.length === 3) ? this.buildPagingUri(pageIndex, pageSize) : '';
                return this.$http.get(resource).then(function (response) {
                    var employees = response.data;
                    _this.extendEmployees(employees);
                    return {
                        totalRecords: parseInt(response.headers('X-InlineCount'), 10),
                        results: employees
                    };
                });
            };
            DataService.prototype.buildPagingUri = function (pageIndex, pageSize) {
                var uri = '?pageSize=' + pageSize + '&skip=' + (pageIndex * pageSize);
                return uri;
            };
            DataService.prototype.mapEmployeeToExpenses = function (employees, expenses) {
                if (employees && expenses) {
                    for (var i = 0; i < employees.length; i++) {
                        var employee = employees[i];
                        var employeeExpenses = [];
                        for (var j = 0; j < expenses.length; j++) {
                            var expense = expenses[j];
                            if (expense.id === employee.id) {
                                employeeExpenses.push(expense);
                            }
                        }
                        employee.expenses = employeeExpenses;
                        this.calculateExpensesTotal(employee);
                    }
                }
            };
            DataService.prototype.extendEmployees = function (employees) {
                var employeesLen = employees.length;
                //Iterate through employees
                for (var i = 0; i < employeesLen; i++) {
                    var employee = employees[i];
                    if (employee.expenses) {
                        this.calculateExpensesTotal(employee);
                    }
                }
            };
            DataService.prototype.calculateExpensesTotal = function (employee) {
                var expensesLen = employee.expenses.length;
                employee.expensesTotal = 0;
                //Iterate through expenses
                for (var j = 0; j < expensesLen; j++) {
                    employee.expensesTotal += employee.expenses[j].amount;
                }
            };
            DataService.$inject = ['$http', '$q', '$window', '$location', '$timeout'];
            return DataService;
        })();
        services.DataService = DataService;
        angular.module('expenseApp').service('expenseApp.services.dataService', DataService);
    })(services = expenseApp.services || (expenseApp.services = {}));
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/services/data.service.js.map
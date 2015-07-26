///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

module expenseApp.services {
    'use strict';

    export class DataService {
        baseEmployeesUrl: string = '/api/employees';
        baseStatesUrl: string = '/api/states';

        static $inject = ['$http', '$q', '$window', '$location', '$timeout'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $window: ng.IWindowService,
                    private $location: ng.ILocationService, private $timeout: ng.ITimeoutService) {

        }

        getEmployeesAndExpenses() : ng.IPromise<shared.IEmployee[]> {
            return this.$http.get(this.baseEmployeesUrl + '/expenses').then(
            (result: ng.IHttpPromiseCallbackArg<shared.IEmployee[]>) => {
                   var employees = result.data;
                   this.extendEmployees(employees);
                   return employees;
            },
            (error: shared.IHttpPromiseCallbackErrorArg) => {
                this.$window.alert(error.message);
                return error;
            });
        }

        getEmployeesSummary(pageIndex, pageSize) : ng.IPromise<shared.IPagedResult> {
            return this.getPagedResource(this.baseEmployeesUrl, pageIndex, pageSize);
        }

        getStates() : ng.IPromise<shared.IState[]> {
            return this.$http.get(this.baseStatesUrl).then(
            (result: ng.IHttpPromiseCallbackArg<shared.IState[]>) => {
                return result.data;
            });
        }

        getEmployee(id): ng.IPromise<shared.IEmployee> {
            return this.$http.get(this.baseEmployeesUrl + '/' + id).then(
                (result: ng.IHttpPromiseCallbackArg<shared.IEmployee>) => {
                    var cust: shared.IEmployee = <shared.IEmployee>result.data;
                    return cust;
                },
                (error: shared.IHttpPromiseCallbackErrorArg) => {
                    this.$window.alert(error.message);
                }
            );
        }

//        checkUniqueValue(id, property, value) {
//            if (!id) { id = 0; }
//            return this.$http.get(this.serviceBase + 'checkUnique/' + id + '?property=' + property +
//                                  '&value=' + escape(value), this.getOptions)
//                .then((results) => {
//                    return results.data.status;
//                }
//            );
//        }

        getEmployeeExpenses(id) : ng.IPromise<shared.IEmployee> {
            return this.$http.get(this.baseEmployeesUrl + '/expenses/' + id).then(
            (result: ng.IHttpPromiseCallbackArg<shared.IEmployee>) => {
               var employee = result.data;
               this.calculateExpensesTotal(employee);
               return employee;
            }, 
            (error: shared.IHttpPromiseCallbackErrorArg) => {
                this.$window.alert(error.message);
                return error;
            });
        }

        insertEmployee(employee) : ng.IPromise<shared.IEmployee> {
            return this.$http.post(this.baseEmployeesUrl, {employee: employee}).then(
            (result: ng.IHttpPromiseCallbackArg<shared.IEmployee>) => {
                return result.data;
            },
            (error: shared.IHttpPromiseCallbackErrorArg) => {
                this.$window.alert(error.message);
                return error;
            });
        }

        newEmployee() : ng.IPromise<shared.IEmployee> {
            return this.$q.when(<shared.IEmployee>{});
        }

        updateEmployee(employee) : ng.IPromise<shared.IEmployee> {
            return this.$http.put(this.baseEmployeesUrl + '/' + employee.id, {employee: employee});
        }

        deleteEmployee(employee) : ng.IPromise<boolean> {
            return this.$http.delete(this.baseEmployeesUrl + '/' + employee.id);
        }
        
        getPagedResource(baseResource, pageIndex, pageSize) : ng.IPromise<shared.IPagedResult> {
            var resource = baseResource;
            resource += (arguments.length === 3) ? this.buildPagingUri(pageIndex, pageSize) : '';
            return this.$http.get(resource).then(
                (response: ng.IHttpPromiseCallbackArg<shared.IEmployee[]>) => {
                    var employees = response.data;
                    this.extendEmployees(employees);
                    return {
                        totalRecords: parseInt(response.headers('X-InlineCount'), 10),
                        results: employees
                    };
                });
        }

        buildPagingUri(pageIndex, pageSize) : string {
            var uri = '?pageSize=' + pageSize + '&skip=' + (pageIndex * pageSize);
            return uri;
        }

        mapEmployeeToExpenses(employees: shared.IEmployee[], expenses: shared.IExpense[]) : void {
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
        }

        extendEmployees(employees) : void {
            var employeesLen = employees.length;
            //Iterate through employees
            for (var i = 0; i < employeesLen; i++) {
                var employee = employees[i];
                if (employee.expenses) {
                    this.calculateExpensesTotal(employee);
                }
            }
        }

        calculateExpensesTotal(employee: shared.IEmployee) : void {
            var expensesLen = employee.expenses.length;
            employee.expensesTotal = 0;
            //Iterate through expenses
            for (var j = 0; j < expensesLen; j++) {
                employee.expensesTotal += employee.expenses[j].amount;
            }
        }

    }


    angular.module('expenseApp').service('expenseApp.services.dataService', DataService);

}

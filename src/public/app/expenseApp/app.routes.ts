///<reference path="../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../tools/typings/expenseApp.d.ts" />

module expenseApp {
    'use strict';

    export class Routes {
        static configure($routeProvider: ng.route.IRouteProvider) {
            var viewBase: string = 'app/expenseApp/views/';

            $routeProvider
                .when('/login/:redirect*?', {
                    controller: 'expenseApp.LoginController',
                    templateUrl: viewBase + 'login.html',
                    controllerAs: 'vm'
                })
                .when('/employees', {
                    controller: 'expenseApp.employees.EmployeesController',
                    templateUrl: viewBase + 'employees/employees.html',
                    controllerAs: 'vm'
                })
                .when('/employeeExpenses/:employeeId', {
                    controller: 'expenseApp.employees.EmployeeExpensesController',
                    templateUrl: viewBase + 'employees/employeeExpenses.html',
                    controllerAs: 'vm'
                })
                .when('/employeeEdit/:employeeId', {
                    controller: 'expenseApp.employees.EmployeeEditController',
                    templateUrl: viewBase + 'employees/employeeEdit.html',
                    controllerAs: 'vm',
                    secure: true
                })
                .when('/expenses', {
                    controller: 'expenseApp.expenses.ExpensesController',
                    templateUrl: viewBase + 'expenses/expenses.html',
                    controllerAs: 'vm'
                })
                .when('/about', {
                    controller: 'expenseApp.AboutController',
                    templateUrl: viewBase + 'about.html'
                })
                .otherwise({ redirectTo: '/employees' });
        }
    }

}

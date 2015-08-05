var expenseApp;
(function (expenseApp) {
    var expenses;
    (function (expenses) {
        var ExpenseChildController = (function () {
            function ExpenseChildController($scope, $window, $location, dataService, modalService) {
                var _this = this;
                this.$scope = $scope;
                this.$window = $window;
                this.$location = $location;
                this.dataService = dataService;
                this.modalService = modalService;
                this.orderby = 'product';
                this.reverse = false;
                this.expensesTotal = 0.00;
                //See if parent $scope has an employee that's inherited (ExpensesController)
                if (this.$scope.employee) {
                    this.employee = this.$scope.employee;
                    this.updateTotal(this.$scope.employee);
                }
                else {
                    this.$scope.$on('employee', function (event, employee) {
                        _this.employee = employee;
                        _this.updateTotal(employee);
                    });
                }
            }
            ExpenseChildController.prototype.setOrder = function (orderby) {
                if (orderby === this.orderby) {
                    this.reverse = !this.reverse;
                }
                this.orderby = orderby;
            };
            ExpenseChildController.prototype.updateTotal = function (employee) {
                if (employee && employee.expenses) {
                    var total = 0.00;
                    for (var i = 0; i < employee.expenses.length; i++) {
                        var order = employee.expenses[i];
                        total += order.orderTotal;
                    }
                    this.expensesTotal = total;
                }
            };
            ExpenseChildController.$inject = ['$scope', '$window', '$location', 'expenseApp.services.dataService', 'expenseApp.services.modalService'];
            return ExpenseChildController;
        })();
        angular.module('expenseApp').controller('ExpenseChildController', ExpenseChildController);
    })(expenses = expenseApp.expenses || (expenseApp.expenses = {}));
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../../expenseApp/controllers/expenses/expenseChild.controller.js.map
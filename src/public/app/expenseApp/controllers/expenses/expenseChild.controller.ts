namespace expenseApp.expenses {

    interface IEmployeeScope extends ng.IScope {
        employee;
    }

    class ExpenseChildController {

        orderby: string = 'product';
        reverse: boolean = false;
        expensesTotal: number = 0.00;
        employee;

        static $inject = ['$scope', '$window', '$location', 'expenseApp.services.dataService', 'expenseApp.services.modalService'];
        constructor(private $scope: IEmployeeScope, private $window:ng.IWindowService, private $location: ng.ILocationService,
                    private dataService: expenseApp.services.DataService,
                    private modalService: expenseApp.services.ModalService) {
            //See if parent $scope has an employee that's inherited (ExpensesController)
            if (this.$scope.employee) {
                this.employee = this.$scope.employee;
                this.updateTotal(this.$scope.employee);
            //Employee not available yet so listen for availability (EmployeeExpensesController)
            } else {
                this.$scope.$on('employee', (event, employee) => {
                    this.employee = employee;
                    this.updateTotal(employee);
                });
            }
        }

        setOrder(orderby) {
            if (orderby === this.orderby) {
                this.reverse = !this.reverse;
            }
            this.orderby = orderby;
        }

        updateTotal(employee) {
            if (employee && employee.expenses) {
                var total = 0.00;
                for (var i = 0; i < employee.expenses.length; i++) {
                    var order = employee.expenses[i];
                    total += order.orderTotal;
                }
                this.expensesTotal = total;
            }
        }
    }

    angular.module('expenseApp').controller('ExpenseChildController', ExpenseChildController);

}

///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

'use strict';

namespace expenseApp {

  export function nameExpenseFilter() {
    return (employees: shared.IEmployee[], filterValue:string) => {
      if (!filterValue || !employees) {
        return employees;
      }

      var matches: shared.IEmployee[] = [];
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

    function matchesExpense(employee: shared.IEmployee, filterValue:string):boolean {
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

  angular.module('expenseApp').filter('nameExpenseFilter', nameExpenseFilter);
}

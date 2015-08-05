var expenseApp;
(function (expenseApp) {
    function nameCityStateFilter() {
        return function (employees, filterValue) {
            if (!filterValue) {
                return employees;
            }
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < employees.length; i++) {
                var emp = employees[i];
                if (emp.name.first.toLowerCase().indexOf(filterValue) > -1 ||
                    emp.name.last.toLowerCase().indexOf(filterValue) > -1 ||
                    emp.location.city.toLowerCase().indexOf(filterValue) > -1 ||
                    emp.location.state.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(emp);
                }
            }
            return matches;
        };
    }
    expenseApp.nameCityStateFilter = nameCityStateFilter;
    angular.module('expenseApp').filter('nameCityStateFilter', nameCityStateFilter);
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/filters/nameCityState.filter.js.map
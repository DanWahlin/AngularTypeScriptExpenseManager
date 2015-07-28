///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />
var expenseApp;
(function (expenseApp) {
    'use strict';
    var AboutRoutes = (function () {
        function AboutRoutes() {
        }
        AboutRoutes.configure = function ($routeProvider) {
            var viewBase = 'app/expenseApp/about/';
            $routeProvider
                .when('/about', {
                controller: 'expenseApp.AboutController',
                templateUrl: viewBase + 'about.html'
            })
                .otherwise({ redirectTo: '/employees' });
        };
        return AboutRoutes;
    })();
    expenseApp.AboutRoutes = AboutRoutes;
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/about/about.routes.js.map
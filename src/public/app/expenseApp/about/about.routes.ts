///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

module expenseApp {
    'use strict';

    export class AboutRoutes {
        static configure($routeProvider: ng.route.IRouteProvider) {
            var viewBase: string = 'app/expenseApp/about/';

            $routeProvider
                .when('/about', {
                    controller: 'expenseApp.AboutController',
                    templateUrl: viewBase + 'about.html'
                })
                .otherwise({ redirectTo: '/employees' });
        }
    }

}
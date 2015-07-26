///<reference path="../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../tools/typings/expenseApp.d.ts" />

'use strict';

(() : void => {

    var app = angular.module('expenseApp',
        ['ngRoute', 'ngAnimate', 'wc.directives', 'ui.bootstrap']);

    app.config(['$routeProvider', '$httpProvider',
        ($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider) => {

            expenseApp.Routes.configure($routeProvider);

    }]);
    
    app.run(['$rootScope', '$location', 'expenseApp.services.authService',
        ($rootScope, $location, authService) => {
            
            //Client-side security. Server-side framework MUST add it's 
            //own security as well since client-based security is easily hacked
            $rootScope.$on('$routeChangeStart', (event, next, current) => {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {
                            authService.redirectToLogin();
                        });
                    }
                }
            });

    }]);

})();


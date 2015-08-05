namespace expenseApp {
    
    export class ConfigureApplication {
        static $inject = ['$routeProvider', '$httpProvider'];
        constructor ($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider) {
            expenseApp.Routes.configure($routeProvider);
        }
    }

}

angular.module('expenseApp',
    ['ngRoute', 'ngAnimate', 'wc.directives', 'ui.bootstrap'])
    .config(expenseApp.ConfigureApplication);

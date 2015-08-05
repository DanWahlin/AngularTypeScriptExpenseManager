var expenseApp;
(function (expenseApp) {
    var ConfigureApplication = (function () {
        function ConfigureApplication($routeProvider, $httpProvider) {
            expenseApp.Routes.configure($routeProvider);
        }
        ConfigureApplication.$inject = ['$routeProvider', '$httpProvider'];
        return ConfigureApplication;
    })();
    expenseApp.ConfigureApplication = ConfigureApplication;
})(expenseApp || (expenseApp = {}));
angular.module('expenseApp', ['ngRoute', 'ngAnimate', 'wc.directives', 'ui.bootstrap'])
    .config(expenseApp.ConfigureApplication);

//# sourceMappingURL=../expenseApp/app.module.js.map
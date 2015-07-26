///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />
var expenseApp;
(function (expenseApp) {
    var LoginController = (function () {
        function LoginController($routeParams, $location, authService) {
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.authService = authService;
            this.path = '/';
            this.email = null;
            this.password = null;
            this.errorMessage = null;
        }
        LoginController.prototype.login = function () {
            var _this = this;
            this.authService.login(this.email, this.password).then(function (status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    _this.errorMessage = 'Unable to login';
                    return;
                }
                if (status && _this.$routeParams && _this.$routeParams.redirect) {
                    _this.path = _this.path + _this.$routeParams.redirect;
                }
                _this.$location.path(_this.path);
            });
        };
        ;
        LoginController.$inject = ['$routeParams', '$location', 'expenseApp.services.authService'];
        return LoginController;
    })();
    angular.module('expenseApp').controller('expenseApp.LoginController', LoginController);
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/controllers/login.controller.js.map
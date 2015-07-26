///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />
var expenseApp;
(function (expenseApp) {
    var NavbarController = (function () {
        function NavbarController($scope, $location, $window, authService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$window = $window;
            this.authService = authService;
            this.isCollapsed = false;
            this.appTitle = 'Expense Management';
            this.loginLogoutText = 'Login';
            var self = this;
            this.$scope.$on('loginStatusChanged', function (loggedIn) {
                self.setLoginLogoutText();
            });
            this.$scope.$on('redirectToLogin', function () {
                self.redirectToLogin();
            });
            this.setLoginLogoutText();
        }
        NavbarController.prototype.loginOrOut = function () {
            var _this = this;
            this.setLoginLogoutText();
            var isAuthenticated = this.authService.user.isAuthenticated;
            if (isAuthenticated) {
                this.authService.logout().then(function () {
                    _this.$location.path('/');
                    return;
                });
            }
            this.redirectToLogin();
        };
        ;
        NavbarController.prototype.redirectToLogin = function () {
            var path = '/login' + this.$location.$$path;
            this.$location.replace();
            this.$location.path(path);
        };
        NavbarController.prototype.setLoginLogoutText = function () {
            this.loginLogoutText = (this.authService.user.isAuthenticated) ? 'Logout' : 'Login';
        };
        NavbarController.$inject = ['$scope', '$location', '$window', 'expenseApp.services.authService'];
        return NavbarController;
    })();
    angular.module('expenseApp').controller('expenseApp.NavbarController', NavbarController);
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/controllers/navbar.controller.js.map
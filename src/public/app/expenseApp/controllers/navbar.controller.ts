///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

namespace expenseApp {

    class NavbarController {
        isCollapsed: boolean = false;
        appTitle: string = 'Expense Management';
        loginLogoutText = 'Login';

        static $inject = ['$scope', '$location', '$window', 'expenseApp.services.authService'];
        constructor(private $scope: ng.IScope, private $location,
                    private $window: ng.IWindowService, private authService: services.IAuthService) {
            var self = this;
            this.$scope.$on('loginStatusChanged', (loggedIn) => {
                self.setLoginLogoutText();
            });
    
            this.$scope.$on('redirectToLogin', () => {
                self.redirectToLogin();
            });
                        
            this.setLoginLogoutText();
        }

        loginOrOut() {
            this.setLoginLogoutText();
            var isAuthenticated = this.authService.user.isAuthenticated;
            if (isAuthenticated) { //logout 
                this.authService.logout().then(() => {
                    this.$location.path('/');
                    return;
                });                
            }
            this.redirectToLogin();
        };

        redirectToLogin() {
            var path = '/login' + this.$location.$$path;
            this.$location.replace();
            this.$location.path(path);
        }

        setLoginLogoutText() {
            this.loginLogoutText = (this.authService.user.isAuthenticated) ? 'Logout' : 'Login';
        }

    }

    angular.module('expenseApp').controller('expenseApp.NavbarController', NavbarController);

}

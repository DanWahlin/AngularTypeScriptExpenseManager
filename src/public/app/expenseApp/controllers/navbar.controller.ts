namespace expenseApp {

    class NavbarController {
        isCollapsed: boolean = false;
        appTitle: string = 'Expense Management';
        loginLogoutText: string = 'Login';

        static $inject = ['$scope', '$location', '$window', 'expenseApp.services.authService'];
        constructor(private $scope: ng.IScope, private $location,
                    private $window: ng.IWindowService, 
                    private authService: services.AuthService) {
            var self = this;
            this.$scope.$on('loginStatusChanged', (loggedIn) => {
                self.setLoginLogoutText();
            });
    
            this.$scope.$on('redirectToLogin', () => {
                self.redirectToLogin();
            });
                        
            this.setLoginLogoutText();
        }

        loginOrOut() : void {
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

        redirectToLogin() : void {
            var path = '/login' + this.$location.$$path;
            this.$location.replace();
            this.$location.path(path);
        }

        setLoginLogoutText() : void {
            this.loginLogoutText = (this.authService.user.isAuthenticated) ? 'Logout' : 'Login';
        }

    }

    angular.module('expenseApp').controller('expenseApp.NavbarController', NavbarController);

}

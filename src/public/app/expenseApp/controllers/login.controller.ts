///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

namespace expenseApp {

    class LoginController {
        path = '/';
        email = null;
        password = null;
        errorMessage = null;
        
        static $inject = ['$routeParams', '$location', 'expenseApp.services.authService'];
        constructor(private $routeParams: shared.IRouteParamsServiceWithRedirect, 
                    private $location: ng.ILocationService,
                    private authService: services.AuthService) {
            
        }

        login() {
            this.authService.login(this.email, this.password).then(
            (status: boolean) => {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    this.errorMessage = 'Unable to login';
                    return;
                }

                if (status && this.$routeParams && this.$routeParams.redirect) {
                    this.path = this.path + this.$routeParams.redirect;
                }

                this.$location.path(this.path);
            });
        }
    }

    angular.module('expenseApp').controller('expenseApp.LoginController', LoginController);

}

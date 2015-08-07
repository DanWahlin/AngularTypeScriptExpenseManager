namespace expenseApp.services {

    export class AuthService  {
        serviceBase: string = '/api/auth/';
        user: shared.IUser = {
            loginPath: '/login',
            isAuthenticated: false,
            roles: null
        };
        
        constructor(private $rootScope: ng.IRootScopeService, private $http: ng.IHttpService) {
            
        }

        login(email: string, password: string) : ng.IPromise<boolean>  {
            return this.$http.post(this.serviceBase + 'login', { userLogin: { userName: email, password: password } }).then(
            (results: ng.IHttpPromiseCallbackArg<boolean>) => {
                var loggedIn = results.data;
                this.changeAuth(loggedIn);
                return loggedIn;
            });
        }

        logout() : ng.IPromise<boolean> {
            return this.$http.get(this.serviceBase + 'logout').then(
                (results: ng.IHttpPromiseCallbackArg<boolean>) => {
                    var loggedIn = !results.data;
                    this.changeAuth(loggedIn);
                    return loggedIn;
                });
        }

        redirectToLogin() {
            this.$rootScope.$broadcast('redirectToLogin', null);
        }

        changeAuth(loggedIn: boolean) {
            this.user.isAuthenticated = loggedIn;
            this.$rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

    }

    angular.module('expenseApp').service('expenseApp.services.authService', AuthService);

}
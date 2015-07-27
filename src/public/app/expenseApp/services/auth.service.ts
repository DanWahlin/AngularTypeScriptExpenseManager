///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

namespace expenseApp.services {
    'use strict';
    
    export interface IAuthService {
        login(email: string, password: string): ng.IPromise<boolean>;
        logout(): ng.IPromise<boolean>;
        user: IUser;
    }
    
    export interface IUser {
        loginPath: string;
        isAuthenticated: boolean;
        roles: string[];
    }

    export class AuthService implements IAuthService {
        serviceBase: string = '/api/auth/';
        user: IUser = {
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
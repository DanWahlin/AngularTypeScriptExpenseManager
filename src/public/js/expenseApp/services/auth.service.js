var expenseApp;
(function (expenseApp) {
    var services;
    (function (services) {
        var AuthService = (function () {
            function AuthService($rootScope, $http) {
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.serviceBase = '/api/auth/';
                this.user = {
                    loginPath: '/login',
                    isAuthenticated: false,
                    roles: null
                };
            }
            AuthService.prototype.login = function (email, password) {
                var _this = this;
                return this.$http.post(this.serviceBase + 'login', { userLogin: { userName: email, password: password } }).then(function (results) {
                    var loggedIn = results.data;
                    _this.changeAuth(loggedIn);
                    return loggedIn;
                });
            };
            AuthService.prototype.logout = function () {
                var _this = this;
                return this.$http.get(this.serviceBase + 'logout').then(function (results) {
                    var loggedIn = !results.data;
                    _this.changeAuth(loggedIn);
                    return loggedIn;
                });
            };
            AuthService.prototype.redirectToLogin = function () {
                this.$rootScope.$broadcast('redirectToLogin', null);
            };
            AuthService.prototype.changeAuth = function (loggedIn) {
                this.user.isAuthenticated = loggedIn;
                this.$rootScope.$broadcast('loginStatusChanged', loggedIn);
            };
            return AuthService;
        })();
        services.AuthService = AuthService;
        angular.module('expenseApp').service('expenseApp.services.authService', AuthService);
    })(services = expenseApp.services || (expenseApp.services = {}));
})(expenseApp || (expenseApp = {}));

//# sourceMappingURL=../../expenseApp/services/auth.service.js.map
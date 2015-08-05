namespace expenseApp {
    class AppRun {
        static $inject = ['$rootScope', 'expenseApp.services.authService'];
        constructor($rootScope, authService) {
            
            //Client-side security. Server-side framework MUST add it's 
            //own security as well since client-based security is easily hacked
            $rootScope.$on('$routeChangeStart', (event, next, current) => {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {
                            authService.redirectToLogin();
                        });
                    }
                }
            });
        }
    }
    
    angular.module('expenseApp').run(AppRun);
}
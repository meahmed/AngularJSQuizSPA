var app = angular.module('quizApp', ['ui.router', 'ngCookies']);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
    }).state('search', {
        url: '/search',
        templateUrl: 'search/search.html',
        controller: 'searchCtrl'
    }).state('quiz', {
        url: '/search/:id',
        templateUrl: 'search/qDetails.html',
        controller: 'searchCtrl'
    });
    $urlRouterProvider.otherwise('/login');
}]).run([
    '$transitions', '$rootScope', '$cookieStore', '$http',
    function ($transitions, $rootScope, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        // }

        $transitions.onStart({}, function (trans) {
            var auth = trans.injector().get('AuthenticationService');
            var statesrvc = trans.router.stateService;
            console.log(auth.isAuthenticated());
            console.log(trans.to());
            if (!auth.isAuthenticated()) {//!auth.isAuthenticated()
                // User isn't authenticated. Redirect to a new Target State
                $rootScope.returnToState = trans.to().url;
                $rootScope.returnToStateParams = trans.params('to').id;
                statesrvc.transitionTo('login');
                if ($rootScope.returnToState != "/login") alert('You must be logged in to view the page');
            }
        });
    }
]);
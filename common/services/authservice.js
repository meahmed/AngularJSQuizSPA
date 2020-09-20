'use strict';

angular.module('quizApp')

    .factory('AuthenticationService',
        ['$rootScope', '$timeout', '$state', '$http', '$cookieStore',
            function ($rootScope, $timeout, $state, $http, $cookieStore) {
                var service = {};

                service.Login = function (user, callback) {
                    $timeout(function () {
                        var userResult = usersList.find(function (obj) {
                            return obj.username == user.username && obj.password == user.password;
                        });
                        var response = { success: user && userResult };
                        if (!response.success) {
                            response.message = 'Username or password is incorrect';
                        }
                        callback(response);
                    }, 1000);

                    //$http.post('/api/authenticate', { username: username, password: password })
                    //    .success(function (response) {
                    //        callback(response);
                    //    });
                };

                service.logOut = function () {
                    service.ClearCredentials();
                    $state.transitionTo('login');
                }

                service.SetCredentials = function (user) {
                    var authdata = user.username + ':' + user.password;
                    $rootScope.globals = {
                        currentUser: {
                            username: user.username,
                            authdata: authdata
                        }
                    };

                    //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                    $cookieStore.put('globals', $rootScope.globals);
                };

                service.ClearCredentials = function () {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    //$http.defaults.headers.common.Authorization = 'Basic ';
                };

                service.isAuthenticated = function () {
                    return Boolean($rootScope.globals && $rootScope.globals.currentUser);
                };

                return service;
            }
        ]
    );
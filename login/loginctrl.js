(function () {
    angular.module('quizApp').controller('loginCtrl', function ($scope, AuthenticationService, $state, $rootScope) {

        $scope.login = function () {
            console.log($scope.user);
            AuthenticationService.Login($scope.user, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.user);

                    if ($rootScope.returnToState === '/search/:id') {
                        $state.go('quiz', { id: $rootScope.returnToStateParams });
                    }
                    else $state.transitionTo('search');

                } else {
                    $scope.error = response.message;
                    $scope.user = {};
                    
                }
            });
        };
        $scope.$watch("user", function (newValue, oldValue) {
            if (oldValue && Object.keys(newValue).length != 0)
                $scope.error = '';
        }, true);

    });
})();
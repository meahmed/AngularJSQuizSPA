(function () {
    angular.module('quizApp').controller('searchCtrl', function ($scope, AuthenticationService, $state, $stateParams) {

        $scope.submitDetails = function () {
            $scope.searchResult = questions.filter(function (obj) {
                return obj.question.includes($scope.keyWord);
            });
            $scope.questionResult = true;
            $scope.kWord = $scope.keyWord;

        }
        $scope.gotoQuestion = function (qId) {
            $state.go('quiz', { id: qId });
        }
        $scope.backToSearch = function () {
            $state.go('search');
        }
        $scope.logOut = function () {
            AuthenticationService.logOut();
        }
        function initialize() {
            if ($stateParams.id) {
                $scope.questionDetails = questions.find(function (obj) {
                    return obj.id == $stateParams.id;
                });
            }
        }
        initialize();
    });
})();
(function() {
    'use strict';

    angular.module('starter').controller('TeamsCtrl', ['$scope', 'challengeApi', TeamsCtrl]);

    function TeamsCtrl($scope, challengeApi) {
        var vm = this;

        vm.loadList = function(forceRefresh) {
            challengeApi.getLeagueData(forceRefresh).then(function(data) {
                vm.teams = data.teams;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        vm.loadList(false);
    };
})();
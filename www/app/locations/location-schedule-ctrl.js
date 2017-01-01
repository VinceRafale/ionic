(function () {
    'use strict';

    angular.module('starter').controller('LocationScheduleCtrl', ['$stateParams', 'challengeApi', LocationScheduleCtrl]);

    function LocationScheduleCtrl($stateParams, challengeApi) {
        var vm = this;
        
        vm.locationId = Number($stateParams.id);

        challengeApi.getLeagueData().then(function(data){
            vm.location = _.find(data.locations, { id: vm.locationId });
            vm.games = _.filter(data.games, function (item) { return item.location === vm.location.name; });
        });

        vm.setScoreCss = function(firstScore, secondScore){
            return (Number(firstScore) > Number(secondScore) ? "positive bold" : "");
        }
    };
})();
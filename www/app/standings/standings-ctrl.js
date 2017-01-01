(function () {
    'use strict';

    angular.module('starter').controller('StandingsCtrl', ['challengeApi', StandingsCtrl]);

    function StandingsCtrl(challengeApi) {
        var vm = this;
        
        challengeApi.getLeagueData().then(function(data){
            vm.standings = data.standings;
        });
    };
})();
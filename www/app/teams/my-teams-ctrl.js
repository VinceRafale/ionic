(function () {
    'use strict';

    angular.module('starter').controller('MyTeamsCtrl', ['$state', 'myTeamsService', 'challengeApi', myTeamsCtrl]);

    function myTeamsCtrl($state, myTeamsService, challengeApi) {
        var vm = this;

        vm.myTeams = myTeamsService.getFollowedTeams();

        vm.goToTeam = function(team){
            challengeApi.setLeagueId(team.leagueId);
            $state.go("app.team-detail", { id: team.id });
        };
    };
})();
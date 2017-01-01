
(function () {
    'use strict';

    angular.module('starter').controller('LeaguesCtrl', ['$state', 'challengeApi', LeaguesCtrl]);

    function LeaguesCtrl($state, challengeApi) {
        var vm = this;

        challengeApi.getLeagues().then(function(data){
            vm.leagues = data;
        });

        vm.selectLeague = function(id){
            challengeApi.setLeagueId(id);
            $state.go("app.teams");
        }

        var iconMap = {
            "1":"ion-ios-football-outline",
        "2" : "ion-ios-basketball-outline",
        "3" : "ion-ios-baseball-outline"
    };
        vm.getIconForLeagueId = function(leagueId) {
    var prefix = "icon ";
        var iconClass = iconMap[leagueId];
            return prefix+iconClass;
        }

    };
})();


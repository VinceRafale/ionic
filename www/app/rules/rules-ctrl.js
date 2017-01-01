(function () {
    'use strict';

    angular.module('starter').controller('RulesCtrl', ['challengeApi', RulesCtrl]);

    function RulesCtrl(challengeApi) {
        var vm = this;
        
        challengeApi.getLeagueData().then(function(data){
            console.log("***rulesctrl", data);
            vm.mainContent = data.league.rulesScreen;
            console.log("***rulesctrl", data, vm.mainContent);
        });

    };
})();
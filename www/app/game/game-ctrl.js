(function () {
    'use strict';

    angular.module('starter').controller('GameCtrl', ['$stateParams', 'challengeApi', GameCtrl]);

    function GameCtrl($stateParams, challengeApi) {
        var vm = this;

        var gameId = Number($stateParams.id);
        challengeApi.getLeagueData().then(function(data){
            vm.game = _.find(data.games, { "id": gameId });
        });
    };
})();
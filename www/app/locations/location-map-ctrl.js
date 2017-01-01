(function () {
    'use strict';

    angular.module('starter').controller('LocationMapCtrl', ['$stateParams', 'challengeApi', LocationMapCtrl]);

    function LocationMapCtrl($stateParams, challengeApi) {
        var vm = this;
        
        vm.locationId = Number($stateParams.id);

        vm.map = {
            center: {
                latitude: 38.897677,
                longitude: -77.036530,
            },
            zoom: 12
        };
        vm.marker = { }

        challengeApi.getLeagueData().then(function(data){

            vm.location = _.find(data.locations, { id: vm.locationId });
            vm.marker = {
                latitude: vm.location.latitude,
                longitude: vm.location.longitude,
                title: vm.location.name + "<br/>(Tap for directions)",
                showWindow: true
            };

            vm.map.center.latitude = vm.location.latitude;
            vm.map.center.longitude = vm.location.longitude;
        });

        vm.locationClicked = function(marker){
            window.location = "geo:" + marker.latitude + "," + marker.longitude + ";u=35";
        };

    };
})();
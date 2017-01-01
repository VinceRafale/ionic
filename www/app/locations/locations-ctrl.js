(function () {
    'use strict';

    angular.module('starter').controller('LocationsCtrl', ['challengeApi','externalAppsService', LocationsCtrl]);

    function LocationsCtrl(challengeApi,externalAppsService) {
        var vm = this;
        
        challengeApi.getLeagueData().then(function(data){
            vm.locations = data.locations;
        });


         vm.openMapLocation = function (locationId) {
         	var localLocationId = Number(locationId);
         	var location ={};
            challengeApi.getLeagueData().then(function(data){

            location = _.find(data.locations, { id: locationId });

            console.log(" the location", location.latitude);
            var localLocation = location.latitude + "," + location.longitude;
            console.log(localLocation);
            externalAppsService.openMapsApp(localLocation);
        });
           

        }
    };
})();
(function() {
	'use strict';

	angular
		.module('starter')
		.controller('BsfCtrl', BsfCtrl);

	BsfCtrl.$inject = ['$scope', '$ionicActionSheet','externalAppsService','challengeDataService'];

	function BsfCtrl($scope,$ionicActionSheet,externalAppsService,challengeDataService) {
     
    $scope.active = 'Before';

	$scope.setActive = function(type) {
        $scope.active = type;
    };

    $scope.isActive = function(type) {
        return type === $scope.active;
    };

    $scope.myAcSheet = function() {
 
   // Show the action sheetmainMenuItems
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-ios-location-outline"></i>location' },
       { text: '<i class="icon ion-social-facebook-outline"></i>Share on Facebook' } ,
       { text: '<i class="icon ion-social-twitter-outline"></i>Share on Twitter' },
       { text: '<i class="icon ion-social-whatsapp-outline"></i>Share on whatsapp' } 
     ],
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       if(index === 0){
	   externalAppsService.openMapsApp(challengeDataService.discoLocation);
	   }
	   if(index === 1){
	     window.plugins.socialsharing.shareViaFacebook('Message via Facebook')
	   }
	   if(index === 2){
	      window.plugins.socialsharing.shareViaTwitter('Message via Twitter')
	   }
	   if(index === 3){
	    window.plugins.socialsharing.shareViaWhatsApp('Message via Whatsapp')
	   }
     }
   })

   		var vm = angular.extend(this, {
			getVillageDirections: getVillageDirections,
			getGalaDirections: getGalaDirections,
			getDiscoDirections: getDiscoDirections

		});

		function getVillageDirections() {
			externalAppsService.openMapsApp(challengeDataService.villageLocation);
		}

		
		function getGalaDirections() {
			externalAppsService.openMapsApp(challengeDataService.galaLocation);
		}


		function getDiscoDirections() {
			externalAppsService.openMapsApp(challengeDataService.discoLocation);
		};
   
 }
		





}
}


)();
(function() {
	'use strict';

	angular
		.module('starter')
		.controller('ChallengeController', ChallengeController);

	ChallengeController.$inject = [ 'challengeDataService', 'externalAppsService','$scope','$ionicActionSheet'];

	/* @ngInject */
	function ChallengeController( challengeDataService, externalAppsService,$scope,$ionicActionSheet) {

		    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
    }

		      $scope.myAcSheet = function() {
 
   // Show the action sheetmainMenuItems
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-social-facebook facebook-color"></i>Share on Facebook' },
       { text: '<i class="icon ion-social-twitter-outline twitter-color"></i>Share on Twitter' } ,
       { text: '<i class="icon ion-social-whatsapp-outline whatsapp-color"></i>Share via WhatsApp' } 
       
     ],
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       if(index === 0){
	   window.plugins.socialsharing.shareViaFacebook('Message via Facebook');
	   }
	   if(index === 1){
	     window.plugins.socialsharing.shareViaTwitter('Message via Twitter');
	   }
	   if(index === 2){
	     window.plugins.socialsharing.shareViaWhatsApp('Message via Whatsapp');
	   }

	   return true;
     }
   });
   
 };

		

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
		}



		///////////////////////////////////////////////////


	}
})();

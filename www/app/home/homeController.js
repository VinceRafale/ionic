(function() {
	'use strict';

	angular
		.module('starter')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['mainMenuItems', 'homeDataService', 'externalAppsService','$ionicActionSheet','$scope','$state'];

	/* @ngInject */
	function HomeController(mainMenuItems, homeDataService, externalAppsService, $ionicActionSheet,$scope,$state, $cordovaAppRate) {

		
      $scope.myAcSheet = function() {
 
   // Show the action sheetmainMenuItems
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-ios-cart-outline custom-icon"></i>My Chart' },
       { text: '<i class="icon ion-ios-star-outline custom-icon"></i>My Teams' } ,
       { text: '<i class="icon ion-ios-pricetag-outline custom-icon"></i>My Tickets' },
     ],
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       if(index === 0){
	   $state.go('shopping-cart')
	   }
	   if(index === 1){
	     $state.go('app.myteams')
	   }
	   if(index === 2){
	      $state.go('my-tickets')
	   }
     }
   });
   
 };
		var vm = angular.extend(this, {
			entries: mainMenuItems,
			phoneNumber: homeDataService.phoneNumber,
			getDirections: getDirections,
			sendEmail: sendEmail,
			openFacebookPage: openFacebookPage,
			openTwitterPage: openTwitterPage,
			rateThisAppNow: rateThisAppNow
		});

		function getDirections() {
			externalAppsService.openMapsApp(homeDataService.officeLocation);
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: homeDataService.email,
					subject: 'Cordova Icons',
					body: 'How are you? Nice greetings from Leipzig'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openFacebookPage() {
			externalAppsService.openExternalUrl(homeDataService.facebookPage);
		}

		function openTwitterPage(){
			externalAppsService.openExternalUrl(homeDataService.twitterPage);
		}

		function rateThisAppNow(){
		   $cordovaAppRate.promptForRating(true);
		}

		///////////////////////////////////////////////////


	}
})();

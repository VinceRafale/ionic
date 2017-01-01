(function() {
	'use strict';

	angular
		.module('starter')
		.controller('SponsorController', SponsorController);

	SponsorController.$inject = ['sponsorDataService', 'externalAppsService'];

	/* @ngInject */
	function SponsorController(sponsorDataService, externalAppsService) {

	
		var vm = angular.extend(this, {
			opeMtnPage: opeMtnPage
		});


		function opeMtnPage() {
			externalAppsService.openExternalUrl(sponsorDataService.mtnPage);
		}



		///////////////////////////////////////////////////


	}
})();

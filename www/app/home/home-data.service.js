(function() {
	'use strict';

	angular
		.module("starter")
		.factory('homeDataService', homeDataService);

	homeDataService.$inject = [];

	/* @ngInject */
	function homeDataService() {
		return {
			phoneNumber: '+4917630577573',
			email: 'akoaowona.sergethiery@gmail.com',
			officeLocation: '37.7736854,-122.421034',
			facebookPage: 'https://www.facebook.com/ChallenceCam/',
			twitterPage: 'https://twitter.com/challenge_camer'
		};
	}
})();

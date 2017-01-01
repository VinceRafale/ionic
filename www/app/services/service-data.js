(function() {
	'use strict';

	angular
		.module('starter')
		.factory('DataService', DataService);

	DataService.$inject = [];

	/* @ngInject */
	function DataService() {
		return {
			phoneNumber: '+306973216110',
			email: 'akoaowona.sergethiery@gmail.com',
			officeLocation: '37.7736854,-122.421034',
			facebookPage: 'https://www.facebook.com/ionicframework'
		};
	}
})();

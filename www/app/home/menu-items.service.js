(function() {
	'use strict';

	angular
		.module('starter')
		.factory('mainMenuItems', mainMenuItems);

	mainMenuItems.$inject = [];

	/* @ngInject */
	function mainMenuItems() {
		var data = [{
			title: 'GET PREPARED',
			path: 'preparation',
			icon: 'ion-log-in'
		}, {
			title: '25TH EDITION',
			path: 'challenge',
			icon: 'ion-ios-people-outline'
		}, {
			title: 'STAY TUNED',
			path: 'newsletter',
			icon: 'ion-log-out'
		}, {
			title: 'OUR PARTNERS',
			path: 'sponsor',
			icon: 'ion-link'
		}];

		return data;
	}
})();
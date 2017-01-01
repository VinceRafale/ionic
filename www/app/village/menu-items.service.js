(function() {
	'use strict';

	angular
		.module('starter')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'BSF',
			path: 'bsf.calendar',
			icon: 'ion-speakerphone'
		}, {
			title: 'SPORT',
			path: 'sport',
			icon: 'ion-trophy'
		}, {
			title: 'KIDS',
			path: 'kids',
			icon: 'ion-ios-body-outline'
		}, {
			title: 'EXPOSITIONS',
			path: 'products',
			icon: 'ion-clipboard'
		}];

		return data;
	}
})();
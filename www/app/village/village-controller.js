(function() {
	'use strict';

	angular
		.module('starter')
		.controller('VillageController',VillageController);

	VillageController.$inject = ['menuItems'];

	/* @ngInject */
	function VillageController(menuItems) {
		var vm = angular.extend(this, {
			entries: menuItems
		});
	}
})();

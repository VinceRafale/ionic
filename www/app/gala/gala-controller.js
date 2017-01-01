(function() {
	'use strict';

	angular
		.module('starter')
		.controller('GalaController',GalaController);

	GalaController.$inject = ['menuItems'];

	/* @ngInject */
	function GalaController(menuItems) {
		var vm = angular.extend(this, {
			entries: menuItems
		});
	}
})();

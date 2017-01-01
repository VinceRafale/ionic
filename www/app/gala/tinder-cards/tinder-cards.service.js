(function() {
	'use strict';

	angular
		.module('starter')
		.factory('tinderCardsService', tinderCardsService);

	tinderCardsService.$inject = ['$q'];

	/* @ngInject */
	function tinderCardsService($q) {

		var items = [{
			title: 'Malia',
			image: 'img/misscmr201522.jpg'
		},  {
			title: 'Sara',
			image: 'images/cards/face-3.jpg'
		}, {
			title: 'Erica',
			image: 'images/cards/face-5.jpg'
		}, {
			title: 'Elsa',
			image: 'images/cards/face-6.jpg'
		}];

		var service = {
			getItems: getItems
		};
		return service;

		function getItems() {
			return $q.when(angular.copy(items));
		}
	}
})();

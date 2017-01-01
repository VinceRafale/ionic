(function() {
	'use strict';

	angular
		.module('starter')
		.factory('discoCatalogueService', discoCatalogueService);

	discoCatalogueService.$inject = ['$q', '$http'];

	/* @ngInject */
	function discoCatalogueService($q, $http) {
		var url = 'app/data/disco-tickets.json';
		var result = [];

		var service = {
			all: all,
			get: get
		};
		return service;

		// ******************************************************************

		function all() {
			return $http.get(url)
				.then(function(response) {
					result = response.data.result;
					return result;
				}, function(response) {
					console.log('ERROR (Catalogue): ' + response.status);
					return $q.reject(response);
				});
		}

		function get(itemId) {
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === itemId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();

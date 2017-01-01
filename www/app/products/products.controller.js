(function() {
	'use strict';

	angular
		.module('starter')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', 'productsService'];

	/* @ngInject */
	function ProductsController($scope, productsService) {
		var vm = angular.extend(this, {
			products: [],
			doRefresh: doRefresh
		});

		// ******************************************************

		productsService.all(function(data) {
			vm.products = data;
		});

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('starter')
		.controller('discoCatalogueItemController', discoCatalogueItemController);

	discoCatalogueItemController.$inject = [
		'$scope', '$stateParams', 'discoCatalogueService', 'discoCartService', 'shoppingCartService'];

	/* @ngInject */
	function discoCatalogueItemController($scope, $stateParams, discoCatalogueService, discoCartService, shoppingCartService) {
		var vm = angular.extend(this, {
			item: null,
			addToCart: addToCart,
			showMyCart: showMyCart,
			getCart : getCart
		});


		(function activate() {
			loadItem();
		})();

		// **********************************************


		function getCart(){

            return shoppingCartService.getAll().length;
		}

		function showMyCart() {
			discoCartService.showMyCart();
		}

		function loadItem() {
			var itemId = parseInt($stateParams.itemId);

			discoCatalogueService.get(itemId)
				.then(function(item) {
					vm.item = item;
				});
		}

		function addToCart() {
			shoppingCartService.addToCart({
				name: vm.item.title,
				price: vm.item.price,
				currency: vm.item.currency,
				picture: vm.item.pictures[0],
				description: vm.item.body
			});
		}
	}
})();
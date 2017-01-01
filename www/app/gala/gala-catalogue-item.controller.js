(function() {
	'use strict';

	angular
		.module('starter')
		.controller('galaCatalogueItemController', galaCatalogueItemController);

	galaCatalogueItemController.$inject = [
		'$scope', '$stateParams', 'galaCatalogueService', 'discoCartService','shoppingCartService'];

	/* @ngInject */
	function galaCatalogueItemController($scope, $stateParams, galaCatalogueService, discoCartService, shoppingCartService) {
		var vm = angular.extend(this, {
			item: null,
			addToCart: addToCart,
			showMyCart: showMyCart,
			getCart: getCart
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

			galaCatalogueService.get(itemId)
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
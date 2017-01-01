 (function() {
	'use strict';
	angular
		.module('starter')
		.controller('DiscoController', DiscoController);

	DiscoController.$inject = ['$state', 'discoCartService', 'discoCatalogueService','shoppingCartService'];

	/* @ngInject */
	function DiscoController($state, discoCartService, discoCatalogueService, shoppingCartService) {
		var vm = angular.extend(this, {
			items: [],
			showItemDetails: showItemDetails,
			showMyCart: showMyCart,
			getCart : getCart
		});

		(function activate() {
			loadCatalogue();
		})();

		// ******************************************************

		function loadCatalogue() {
			discoCatalogueService.all().then(function(data) {
				vm.items = data;
			});
		}

		function getCart(){

            return shoppingCartService.getAll().length;
		}

		function showMyCart() {
			discoCartService.showMyCart();
		}

		function showItemDetails(itemId) {
			$state.go('ticket-item', {
				itemId: itemId
			});
		}
	}
})();
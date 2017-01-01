 (function() {
	'use strict';
	angular
		.module('starter')
		.controller('GalaTicketsController', GalaTicketsController);

	GalaTicketsController.$inject = ['$scope', '$state', 'discoCartService', 'galaCatalogueService','shoppingCartService'];

	/* @ngInject */
	function GalaTicketsController($scope, $state, discoCartService, galaCatalogueService,shoppingCartService) {
		var vm = angular.extend(this, {
			items: [],
			showItemDetails: showItemDetails,
			showMyCart: showMyCart,
			getCart: getCart
		});

		(function activate() {
			loadCatalogue();
		})();

		// ******************************************************

		function getCart(){

            return shoppingCartService.getAll().length;
		}

		function loadCatalogue() {
			galaCatalogueService.all().then(function(data) {
				vm.items = data;
			});
		}

		function showMyCart() {
			discoCartService.showMyCart();
		}

		function showItemDetails(itemId) {
			$state.go('gala-ticket-item', {
				itemId: itemId
			});
		}
	}
})();
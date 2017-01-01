(function() {
	'use strict';

	angular
		.module('starter')
		.controller('DiscoCartController', DiscoCartController);

	DiscoCartController.$inject = ['$ionicListDelegate','discoCartService', '$state'];

	/* @ngInject */
	function DiscoCartController($ionicListDelegate,discoCartService, $state) {
		var vm = angular.extend(this, {
			items: [],
			proceedToPayment: proceedToPayment,
			changeQuantity: changeQuantity,
			deleteItem: deleteItem,
			total: 0,
			currency: null
		});

		(function activate() {
			loadItems();
		})();

		// ********************************************************************

		function loadItems() {
			vm.items = discoCartService.getAll();
			calculateTotalAmount();
		}

		function proceedToPayment() {
			$state.go('app.delivery-method-selector');
		}

		function flushCart() {
			discoCartService.flush();
			vm.items = [];
			calculateTotalAmount();
		}

		function calculateTotalAmount() {
			vm.currency = null;
			vm.total = 0;
			_.each(vm.items, function(item) {
				vm.total += item.price * item.quantity;
				vm.currency = item.currency;
			});
		}

		function changeQuantity(item) {
			discoCartService.changeQuantity(item)
				.then(loadItems);
			$ionicListDelegate.closeOptionButtons();
		}

		function deleteItem(item) {
			discoCartService.deleteItem(item);
			loadItems();
		}
	}
})();

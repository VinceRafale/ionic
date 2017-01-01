(function() {
	'use strict';

	angular
		.module('starter')
		.controller('MyTicketController', MyTicketController);

	MyTicketController.$inject = ['$ionicListDelegate', 'shoppingCartService', 'UserService', '$scope'];

	/* @ngInject */
	function MyTicketController($ionicListDelegate, shoppingCartService,UserService, $scope) {
        var vm = this;

		(function activate() {
			loadItems();
		})();

		// ********************************************************************

		function loadItems() {
			vm.items = shoppingCartService.getAllBoughtItems();
			vm.firstName = UserService.user.firstName;
			vm.lastName = UserService.user.lastName;
			calculateTotalAmount();
		}

		function flushCart() {
			shoppingCartService.flush();
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
	}
})();

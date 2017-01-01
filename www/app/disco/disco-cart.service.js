(function() {
	'use strict';

	angular
		.module('starter')
		.factory('discoCartService', discoCartService);

	discoCartService.$inject = ['$rootScope', '$ionicPopup', '$state', 'localStorageService'];

	/* @ngInject */
	function discoCartService($rootScope, $ionicPopup, $state,localStorageService) {
		var discoCartKey = 'shopping-cart';
		var cart = localStorageService.get(discoCartKey) || [];

		var service = {
			addToCart: addToCart,
			showMyCart: showMyCart,
			deleteItem: deleteItem,
			changeQuantity: changeQuantity,
			flush: flush,
			getAll: getAll
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});
			localStorageService.set(discoCartKey, cart);
		}

		function flush() {
			cart = [];
			localStorageService.set(discoCartKey, cart);
		}

		function showMyCart() {
			$state.go('shopping-cart');
		}

		function getAll() {
			return cart;
		}

		function addToCart(cartItem) {
		var popup = createAddToCartPopup(cartItem.name);

		$ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
		}

				cartItem.quantity = result.quantity;
				cart.push(cartItem);

				localStorageService.set(discoCartKey, cart);

				
			});
		}

		function changeQuantity(cartItem) {
			var popup = createAddToCartPopup(cartItem.name, cartItem.quantity);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				localStorageService.set(discoCartKey, cart);
			});
		}

		function createAddToCartPopup(title, quantity) {

			var scope = $rootScope.$new();
			scope.data = {
				quantity: quantity || 1
			};


			return {
				templateUrl: 'app/disco/add-to-cart.html',
				title: title,
				subTitle: 'Quantity:',
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Add to cart</b>',
					type: 'button-positive',
					onTap: function(e) {
						var quantity = parseInt(scope.data.quantity);
						if (quantity > 0) {
							scope.data.quantity = quantity;
							return scope.data;
						} else {
							alert('Quantity should be greather then zero');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();
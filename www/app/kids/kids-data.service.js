(function() {
	'use strict';

angular
.module('starter')
.factory('kidService', kidService);

kidService.$inject = ['localStorageService'];

function kidService(localStorageService) {

        var kidCartKey = 'kids-cart';
		var cart = localStorageService.get(kidCartKey) || [];

        var service = {
			addToCart: addToCart,
			deleteItem: deleteItem,
			flush: flush,
			getAll: getAll
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});
			localStorageService.set(kidCartKey, cart);
		}

		function flush() {
			cart = [];
			localStorageService.set(kidCartKey, cart);
		}

		function getAll() {
			return cart;
		}

		function addToCart(cartItem) {
		cart.push(cartItem);
		localStorageService.set(kidCartKey, cart);		
		}

	}
})();
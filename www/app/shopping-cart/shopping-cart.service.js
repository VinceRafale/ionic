(function() {
	'use strict';

	angular
		.module('starter')
		.factory('shoppingCartService', shoppingCartService);

	shoppingCartService.$inject = ['$rootScope', '$ionicPopup', '$state', 'localStorageService'];

	/* @ngInject */
	function shoppingCartService($rootScope, $ionicPopup, $state, localStorageService) {
		var cart = localStorageService.get('shopping-cart') || [];

		var boughtItems = [];

		var service = {
			addToCart: addToCart,
			showMyCart: showMyCart,
			deleteItem: deleteItem,
			changeQuantity: changeQuantity,
			flush: flush,
			addToCartWithoutPopup: addToCartWithoutPopup,
			getAll: getAll,
			addBoughtItems: addBoughtItems,
			getAllBoughtItems:getAllBoughtItems
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});
			localStorageService.set('shopping-cart', cart);
		}

		function flush() {
			cart = [];
			localStorageService.set('shopping-cart', cart);
		}

		function addBoughtItems() {

			var arrayLength = cart.length;
            for (var i = 0; i < arrayLength; i++) {
            	var d = new Date();
            	cart[i].date = d.toLocaleDateString();
            boughtItems.push(cart[i]);
             
             }
			localStorageService.set('shopping-past', boughtItems);
		}

		function showMyCart() {
			$state.go('app.shopping-cart');
		}

		function getAll() {
			return cart;
		}

		function getAllBoughtItems() {
			return boughtItems;
		}

		function addToCart(cartItem) {
			var popup = createAddToCartPopup(cartItem.name);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				cart.push(cartItem);

				localStorageService.set('shopping-cart', cart);
			});
		}


		function addToCartWithoutPopup(cartItem) {
				cartItem.quantity = 1;
				cart.push(cartItem);
				localStorageService.set('shopping-cart', cart);

			}
			

		function changeQuantity(cartItem) {
			var popup = createAddToCartPopup(cartItem.name, cartItem.quantity);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				localStorageService.set('shopping-cart', cart);
			});
		}

		function createAddToCartPopup(title, quantity) {
			var scope = $rootScope.$new();
			scope.data = {
				quantity: quantity || 1
			};

			return {
				templateUrl: 'app/shopping-cart/add-to-cart.html',
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
(function() {
	'use strict';

	angular
		.module('starter')
		.controller('kidsController', kidsController);

kidsController.$inject = ['kidService','shoppingCartService'];

 function kidsController(kidService,shoppingCartService) {


//****************************************************** public variables and funtions***************************************************** 

var vm = angular.extend(this, {
      items: [],
      addToCart: addToCart,
      getCart: getCart,
      deleteItem: deleteItem
    });


(function activate() {
      loadItems();
    })();



//****************************************************** functions ******************************************************


function loadItems() {
  vm.items = kidService.getAll();
}


function getCart(){

    return shoppingCartService.getAll().length;
    }

function addToCart() {
      shoppingCartService.addToCartWithoutPopup({
        name: "Challenge Kids",
        price: calculatePrice(),
        picture: "img/kids.jpg",
        currency: "€",
        description: "We'll take care of your kids while you are relaxing"
      });
      kidService.flush();
      vm.items = [];
    }

function deleteItem(item) {
      kidService.deleteItem(item);
      loadItems();
    }

function calculatePrice(){

  var items = kidService.getAll();

    if(items.length == 1){
      return 10;
    }
    else if(items.length == 2){

      return 18;
    }
    else{

      return 25;
    }
  }

}})();

(function() {
  'use strict';

  angular
    .module('starter')
    .factory('UserService', UserService);

  UserService.$inject = ['localStorageService'];

  /* @ngInject */
  function UserService(localStorageService) {

    var userKey = 'kids-cart';
    var userInfoCart = localStorageService.get(userKey) || [];
    
    var service = {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null
      },
      addUserInfo: addUserInfo
    };
    return service;
   


    // ********************************************************

    function deleteUserInfo(itemToRemove) {
      _.remove(userInfoCart, function(item) {
        return item === itemToRemove;
      });
      localStorageService.set(userKey, userInfoCart);
    }

    function flush() {
      userInfoCart = [];
      localStorageService.set(userKey, userInfoCart);
    }

    function getAll() {
      return userInfoCart;
    }

    function addUserInfo(userInfo) {
    service.user.firstName = userInfo.firstName;
    service.user.lastName = userInfo.lastName;
    service.user.email = userInfo.email;
    service.user.phone = userInfo.phone;
    userInfoCart.push(userInfo);
    localStorageService.set(userKey, userInfoCart);   
    }

  }
})();

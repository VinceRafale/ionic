(function(){
	'use strict';

	angular
			.module('starter')
			.controller('PasswordResetCtrl', PasswordResetCtrl);
  /**
   * Again, we inject our auth service
   */
	PasswordResetCtrl.$inject = ['$scope', 'oauthService','$state','$ionicLoading','$firebaseAuth'];

	function PasswordResetCtrl($scope, oauthService,$state,$ionicLoading,$firebaseAuth){

		$scope.errorMessage = null;
		var firebaseAuth = firebase.auth();
		var auth = $firebaseAuth(firebaseAuth);

		var vm = angular.extend(this, {
			resetPassword: resetPassword
		});

    /**
     * We grab our user's email from the form and send it to our service, piece of cake!
     */
	function resetPassword (email){	

	$scope.errorMessage = null;

      $ionicLoading.show({
        template: 'Please wait...'
      });
	  auth.$sendPasswordResetEmail(email).then(showConfirmation).catch(handleError);				
		
	}

    function showConfirmation() {
      $scope.emailSent = true;
      $ionicLoading.hide();
    }

    function handleError(error) {
      switch (error.code) {
        case 'INVALID_EMAIL':
        case 'INVALID_USER':
          $scope.errorMessage = 'Invalid email';
          break;
        default:
          $scope.errorMessage = 'Invalid email';
      }

      $ionicLoading.hide();
    }
	
}})();



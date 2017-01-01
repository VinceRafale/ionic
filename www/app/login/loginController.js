(function() {
	'use strict';

	angular
		.module('starter')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = [
		'$scope', '$ionicModal', '$state', '$ionicLoading', 'oauthService', '$rootScope','$ionicHistory','$ionicViewService','UserService'];

	/* @ngInject */
	function loginCtrl($scope, $ionicModal, $state, $ionicLoading, oauthService, $rootScope,$ionicHistory,$ionicViewService,UserService) {
		var vm = angular.extend(this, {
			user: {
				email: null,
				password: null
			},
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
			facebookLogin:facebookLogin,
			loggedUser: oauthService.user
		});

		 $scope.errorMessage = null;

		 $scope.registrationErrorMessage = null;

		$ionicModal.fromTemplateUrl('app/login/signup.html', {
		scope: $scope
		}).then(function(modal) {
			vm.modal = modal;
		});

		function signUp(user) {
				$ionicLoading.show({});
				oauthService.signUp(user).then(function() {
					$ionicLoading.hide();
					UserService.addUserInfo(user);
					vm.modal.hide();
				}).catch(function(error) {
					$ionicLoading.hide();
					alert('Error: ' + error);
				});

		}

		function signOut() {
			oauthService.signOut();
		}

		function signIn() {
			$scope.errorMessage = null;
				$ionicLoading.show({});
				oauthService.signIn(vm.user.email, vm.user.password).then(function(authData) {
				$ionicLoading.hide();
                $state.go($rootScope.toState, {}, {location: "replace", reload: true});
				}).catch(function(error) {
					$ionicLoading.hide();
					console.log(error);
					handleError(error);
				});
		}

    function handleError(error) {
      switch (error.code) {
        case 'INVALID_EMAIL':
        case 'INVALID_PASSWORD':
        case 'INVALID_USER':
          $scope.errorMessage = 'Email or password is incorrect';
          break;
        default:
          $scope.errorMessage = 'Email or password is incorrect';
      }

      $ionicLoading.hide();
    }

		function facebookLogin() {
			login('facebook');
		}
		
		function googleLogin() {
			login('google');
		}

		function twitterLogin() {
			login('twitter');
		}
		
		function login(source) {
			oauthService.login(source).then(function(result) {
				debugger;
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go($rootScope.returnToState || 'app.oauth-profile');
			});
		}

	}
})();
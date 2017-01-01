(function() {
	'use strict';

	angular
		.module('starter')
		.factory('oauthService', oauthService);

	oauthService.$inject = ['$injector', 'ENV', 'localStorageService', '$q','$firebaseAuth', 'firebaseDb', '$timeout'];

	/* @ngInject */
	function oauthService($injector, ENV, localStorageService, $q, $firebaseAuth, firebaseDb, $timeout) {
		var oauthTokenKey = 'oauthToken';
		var firebaseAuth = firebase.auth();
		var auth = $firebaseAuth(firebaseAuth);

		var service = {
			user: {
				isSignedIn: false
			},
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
			login: login,
			logout: logout,
			isAuthorized: isAuthorized,
			getProfile: getProfile,
			getOAuthProvider: getOAuthProvider,
			resetPassword:resetPassword
		};
		return service;


        firebaseAuth.onAuthStateChanged(function(data) {
			if (!data) {
				setUser();
			} else {
				getUser(data.uid).then(function(user) {
					setUser(user);
				});
			}
		});



       function signOut() {
			setUser();
			auth.$signOut();
		}

		 /**
       * This one explain itself, if the user doesn't remember his password he'll click in the "forgot you password?"
       * link and we need to send him a token so he can log in again
       *
       * NOTE: This doesn't send a reset password link, this sends a token he can use as a password to log in and
       * change his password to something he remembers.
       */
		function resetPassword(resetEmail){
		 auth.$sendPasswordResetEmail(resetEmail);
		}






       function signUp(user) {
			return auth.$createUserWithEmailAndPassword(user.email, user.password)
				.then(function(userData) {
				firebase.database().ref('users/' + userData.uid).set({
                        email: user.email,
		                firstName: user.firstName,
		                lastName: user.lastName,
		                phone: user.phone
                  });

					return userData;
				});

		}


	

		function signIn(email, password) {
			return auth.$signInWithEmailAndPassword(email, password).then(
				function(authData) {
					getUser(authData.uid).then(function(user) {
						setUser(user);
					});

        
					return authData;
				}
			);
		}

		function getUser(uid) {
			var deferred = $q.defer();

			firebaseDb.child('users').child(uid).once('value', function(snapshot) {
				var val = snapshot.val();
				deferred.resolve(val);
			});

			return deferred.promise;
		}


        function setUser(user) {
			$timeout(function() {
				if (!user) {
					service.user.email = null;
					service.user.displayName = null;
					service.user.isSignedIn = false;
				} else {
					service.user.email = user.email;
					service.user.displayName = user.displayName;
					service.user.isSignedIn = true;
				}
			}, 200);
		}



		function login(source) {
			return getOAuthService(source).login().then(function(accessToken) {
				if (!accessToken) {
					return $q.reject();
				}

				var oauthToken = {
					accessToken: accessToken,
					source: source
				};
				setOAuthToken(oauthToken);
				return oauthToken;
			});
		}

		function logout() {
			var oauthService = getOAuthService();
			if (oauthService.logout) {
				oauthService.logout();
			}
			setOAuthToken(null);
		}

		function getProfile() {
			if (!isAuthorized()) {
				alert('You are not authorized');
				return $q.reject();
			}

			var oauthService = getOAuthService();
			return oauthService.getProfile(getOAuthToken().accessToken);
		}

		function isAuthorized() {
			return !!getOAuthToken();
		}

		function getOAuthProvider() {
			return getOAuthToken().source;
		}

		function getOAuthService(source) {
			source = source || getOAuthToken().source;
			switch(source) {
				case 'facebook':
					return $injector.get('oauthFacebookService');
				case 'twitter':
					return $injector.get('oauthTwitterService');
				case 'google':
					return $injector.get('oauthGoogleService');
			}
			throw new Error('Source \'' + source + '\' is not valid');
		}

		function setOAuthToken(token) {
			localStorageService.set(oauthTokenKey, token);
		}

		function getOAuthToken() {
			return localStorageService.get(oauthTokenKey);
		}
	}
})();

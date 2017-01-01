(function() {
	'use strict';

	angular
		.module('starter')
		.factory('firebaseDb', firebaseDb);

	firebaseDb.$inject = ['ENV'];

	/* @ngInject */
	function firebaseDb(ENV) {
		var db = firebase.database().ref();
		return db;
	}
})();
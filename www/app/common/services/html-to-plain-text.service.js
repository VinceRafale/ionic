(function() {
	'use strict';

	angular
		.module('starter')
		.factory('htmlToPlainText', htmlToPlainText);

	htmlToPlainText.$inject = [];

	/* @ngInject */
	function htmlToPlainText() {
		return function(text) {
			return String(text).replace(/<[^>]+>/gm, '');
		};
	}
})();
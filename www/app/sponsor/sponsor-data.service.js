(function() {
	'use strict';

	angular
		.module("starter")
		.factory('sponsorDataService', sponsorDataService);

	sponsorDataService.$inject = [];

	/* @ngInject */
	function sponsorDataService() {
		return {
			mtnPage: 'http://www.mtncameroon.net/CorporatePage?LANGID=FER&PAGE_NAME=HOME&SESSID='
		};
	}
})();

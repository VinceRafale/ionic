(function() {
	'use strict';

	angular
		.module("starter")
		.factory('challengeDataService', challengeDataService);

	challengeDataService.$inject = [];

	/* @ngInject */
	function challengeDataService() {
		return {
			villageLocation: '37.7736854,-122.421034',
			galaLocation: '37.7736854,-122.421034',
			discoLocation: '37.7736854,-122.421034'
		};
	}
})();

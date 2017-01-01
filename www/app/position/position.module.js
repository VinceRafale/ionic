(function() {
	'use strict';

	angular
		.module('starter', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.position', {
					url: '/position',
					views: {
						'menuContent': {
							templateUrl: 'scripts/position/position.html',
							controller: 'PositionController as vm'
						}
					}
				});
		});
})();
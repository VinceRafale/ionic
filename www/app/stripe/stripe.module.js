(function() {
	'use strict';

	angular
		.module('starter', [
			'ionic',
			'credit-cards'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.stripe', {
					url: '/stripe',
					views: {
						'menuContent': {
							templateUrl: 'scripts/stripe/stripe.html',
							controller: 'StripeController as vm'
						}
					}
				});
		});
})();
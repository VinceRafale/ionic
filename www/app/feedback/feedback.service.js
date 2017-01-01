(function () {
	'use strict';

	angular
		.module('starter')
		.factory('feedbackService', feedbackService);

	feedbackService.$inject = [];

	/* @ngInject */
	function feedbackService($cordovaEmailComposer) {

		var recipent = "akoaowona.sergethiery@gmail.com";
		var subject  = "Digital Challenge App - Feedback"

		var service = {
			sendEmail: sendEmail
		};
		return service;

		// ************************************************

		function sendEmail(body, attachments, position) {
			body = body ? body + '<br><br>' : '';
			_.each(position, function(item) {
				if (item.key && item.value)
				body += '<b>' + item.key + '</b>: ' + item.value + '<br>';
			});

           try {
			return $cordovaEmailComposer.isAvailable().then(function () {
				var email = {
					to: 					recipent,
					subject: 			subject,
					body: 				body,
					attachments: 	attachments,
					isHtml: true
				};

				$cordovaEmailComposer.open(email);
			});

			} catch (e) {

				return new Promise(function(resolve, reject) {
				  // do a thing, possibly async, then…
  				reject('$cordovaEmailComposer is not available or failed. Are you running the app within a browser?');
				});

			} finally {}

		   }
		}
	})();

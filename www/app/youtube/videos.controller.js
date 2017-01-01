(function() {
	'use strict';

	angular
		.module('starter')
		.controller('VideosController', VideosController);

	VideosController.$inject = ['$scope', '$state', '$ionicPopup', 'youtubeService'];

	/* @ngInject */
	function VideosController($scope, $state, $ionicPopup, youtubeService) {
		var youtubeUsername = 'ESPN';

		var vm = angular.extend(this, {
			videos: [],
			doRefresh: doRefresh,
			navigate: navigate
		});

		(function activate() {
			getVideos();
		})();
		// ********************************************************************

		function getVideos() {
			return youtubeService.getVideos(youtubeUsername)
				.then(function(videos) {
					vm.videos =  [
{
  title: "My first video",
  date: "1-1-2015",
  thumbnails: "http://i.ytimg.com/vi/bJp1ptX4F3M/maxresdefault.jpg",
}, 
{
  title: "My second video",
  date: "5-7-2015",
  thumbnails: "http://i.ytimg.com/vi/NA2VerbOyt0/maxresdefault.jpg",
}
];
				}, function() {
					$ionicPopup.alert({
						title: 'No videos',
						template: 'Check your internet connectivity'
					});
				});
		}

		function doRefresh() {
			getVideos().then(function(items) {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		function navigate(video) {
			$state.go('youtube-item', {
				videoId: video.id
			});
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('starter')
		.controller('TabsCtrl', TabsCtrl);

	TabsCtrl.$inject = ['$scope', '$stateParams'];

	function TabsCtrl($scope) {
     
    $scope.active = 'Before';

	$scope.setActive = function(type) {
        $scope.active = type;
    };

    $scope.isActive = function(type) {
        return type === $scope.active;
    }
		}})();
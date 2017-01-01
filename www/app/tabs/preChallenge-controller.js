(function () {
    'use strict';

    angular.module('starter').controller('CardsCtrl', function($scope, $ionicSlideBoxDelegate) {
    $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    }})})();
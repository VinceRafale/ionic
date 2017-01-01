(function() {
  'use strict';
angular
		.module('starter')
		.controller('newsletterCtrl', newsletterCtrl);

newsletterCtrl.$inject = ['$scope','cameraService','$ionicActionSheet', '$q','oauthService','$state'];


 function newsletterCtrl($scope,cameraService,$ionicActionSheet,$q,oauthService,$state) {

 var vm = angular.extend(this, {
      addImage: addImage,
      logout: logout
    });

  
  $scope.image="img/camera.png";

  $scope.groups = [];

   $scope.groups[0] = {
      name: 'Keep me posted',
      items: ["Challenge's newsletter", "Partners offers", "Special offers"],
      show: false
    };
  


  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };

  function logout() {
    oauthService.signOut();
      $state.go('home', {}, {location: "replace"});
}


function addImage() {
    getImageSource().then(getPhoto);

function getPhoto(source) {
        cameraService.getPhoto({
          sourceType: source,
        }).then(function (fileUri) {
           $scope.image = fileUri;
        });
}

function getImageSource() {
    var deferred = $q.defer();

  $ionicActionSheet.show({
          buttons: [
            { text: '<i class="icon ion-ios-camera-outline custom-icon"></i>Take Photo' },
            { text: '<i class="icon ion-filing custom-icon"></i>Choose Photo' }
          ],
          cancelText: 'Cancel',
          cancel: function () {
            deferred.reject();
          },
          buttonClicked: function (index) {
            if (index === 0) {
              deferred.resolve(Camera.PictureSourceType.CAMERA);
            } else {
              deferred.resolve(Camera.PictureSourceType.PHOTOLIBRARY);
            }
            return true;
          }
        });

        return deferred.promise;
      }
}
  
}})();
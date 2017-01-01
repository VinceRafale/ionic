angular.module("starter.SessionCtrl",[])
.controller('SessionCtrl', function($scope, $ionicPopover) {

    // About version popover handling
    $ionicPopover.fromTemplateUrl('templates/about-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.showFilterPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    // Cleanup the popover upon destroy event
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
})

.controller('MyCtrl',function($scope, $ionicPopover) {
  $scope.button = {};
  $scope.button.first = {};
  $scope.button.second = {};
    
  $scope.click = function(button){
    $scope.button.first.clicked = false;
    $scope.button.second.clicked = false;
    
    button.clicked = true;


  };

   // About version popover handling
    $ionicPopover.fromTemplateUrl('templates/about-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.showFilterPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    // Cleanup the popover upon destroy event
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    

})

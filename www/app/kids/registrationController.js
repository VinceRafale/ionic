(function() {
	'use strict';

	angular
		.module('starter')
		.controller('registrationController', registrationController);

registrationController.$inject = ['$ionicPopup','$ionicLoading', '$state', '$stateParams','$scope','ionicTimePicker','kidService','kidsNotificationService'];

 function registrationController( $ionicPopup, $ionicLoading, $state,$stateParams,$scope, ionicTimePicker, kidService,kidsNotificationService) {

//****************************************************** private variables ******************************************************
 var firstDate;
 var secondDate;
 var cartItem ={};
 var firstReminder = 15;
 var secondReminder = 15;


//****************************************************** public variables and funtions***************************************************** 

var vm = angular.extend(this, {
      add: add,
      onchange: onchange
    });


 //****************************************************** scope variables and functions ******************************************************
 $scope.data ={};
 $scope.lastName;
 $scope.selectedTime;
 $scope.secondSelectedTime;
 $scope.reminders = [{
 "id": 0, "name": 15
 },
 {
 "id": 1, "name": 30
 },
 {
 "id": 2, "name": 60
 }
 ];
 $scope.reminderSelected = 0;
 $scope.isChecked = false;
 $scope.isSecondChecked = false;
 $scope.selected = [];



 $scope.checkedOrNot = function (asset, isChecked, index) {
        if (isChecked) {
           firstDate = new Date("June 03, 2017 11:13:00");
            $scope.selected.push(asset);
            console.log(firstDate);
            console.log($scope.firstName);
        } else {
            firstDate = undefined;
            $scope.selectedTime = undefined;
            var _index = $scope.selected.indexOf(asset);
            $scope.selected.splice(_index, 1);
            console.log(isChecked);
        }
  }; 

$scope.checkedOrNotSecond = function (asset, isSecondChecked, index) {
        if (isSecondChecked) {
            secondDate = new Date("June 04, 2017 11:13:00");
            $scope.selected.push(asset);
            console.log(isSecondChecked);
        } else {
            secondDate = undefined;
            $scope.secondSelectedTime = undefined;
            var _index = $scope.selected.indexOf(asset);
            $scope.selected.splice(_index, 1);
        }
}; 


 $scope.openTimePicker1 = function () {
  var date = "June 03, 2017 ";
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {

          } else {
            $scope.selectedTime = new Date(val * 1000);
            date = date + $scope.selectedTime.getUTCHours() + ':' + $scope.selectedTime.getUTCMinutes() + ':00';
            firstDate = new Date(date);
          }
        },
        inputTime: 50400,
        format: 12,
        setLabel: 'Set'
      };
      ionicTimePicker.openTimePicker(ipObj1);
};

$scope.openTimePicker2 = function () {
  var date = "June 04, 2017 ";
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {

          } else {
            $scope.secondSelectedTime = new Date(val * 1000);
            date = date +  $scope.secondSelectedTime.getUTCHours() + ':' + $scope.secondSelectedTime.getUTCMinutes() + ':00';
            console.log($scope.secondSelectedTime.getUTCMinutes());
            secondDate = new Date(date);
          }
        },
        inputTime: 50400,
        format: 12,
        setLabel: 'Set'
      };
      ionicTimePicker.openTimePicker(ipObj1);
};
  

//****************************************************** functions ******************************************************




function onchange(id){
   if(selectedTime != undefined){
      firstReminder = id;
   }
   else if(secondSelectedTime != undefined){
    secondReminder = id;  
   }
 }




function add() {

if($scope.data.firstName == undefined || $scope.data.lastName == undefined){
   
   $ionicPopup.alert({
              title: 'Names',
              content: 'Please enter first name and last name!!!'
            }).then(function(res) {
              console.log('selection of Names had a problem');
            });
}

else if(firstDate == undefined && secondDate == undefined){
       
        $ionicPopup.alert({
              title: 'Dates',
              content: 'Please select at least a date!!!'
            }).then(function(res) {
              console.log('selection of a date had a problem');
            });

  }

  else if (firstDate !== undefined && secondDate !== undefined && ($scope.selectedTime == undefined || $scope.secondSelectedTime == undefined)){
            
            $ionicPopup.alert({
              title: 'Picking time',
              content: 'Please choose a picking times by clicking on watch symbol !!!'
            }).then(function(res) {
              console.log('selection of a picking time had a problem');
            });
    }

else{
  cartItem.name ="Serge";
  cartItem.title =$scope.data.firstName + " " + $scope.data.lastName;
  cartItem.body = "will be picked on " ;
  cartItem.firstDay = firstDate;
  cartItem.secondDay = secondDate;
  kidService.addToCart(cartItem);

  var secondNotificationId = $scope.data.firstName + $scope.data.lastName + secondDate;
  var firstNotificationId  = $scope.data.firstName + $scope.data.lastName + firstDate;

 // if($scope.selectedTime != undefined ){
  // kidsNotificationService.registerLocalNotification(new Date(firstDate), firstNotificationId, firstReminder, $scope.data.firstName);
  //}

  //else if($scope.secondSelectedTime != undefined){
  //   kidsNotificationService.registerLocalNotification(new Date(secondDate), secondNotificationId, secondReminder, $scope.data.firstName);
  //}
  
  
  $state.go("kids",{reload:true});
    }
    
}


}})();

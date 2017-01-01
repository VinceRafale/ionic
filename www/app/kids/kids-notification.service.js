
(function() {
	'use strict';

angular
.module('starter')
.factory('kidsNotificationService', kidsNotificationService);

kidsNotificationService.$inject = ['$cordovaLocalNotification'];

function kidsNotificationService($cordovaLocalNotification) {


var service = {
			registerLocalNotification: registerLocalNotification
};
return service;

		// ********************************************************

function registerLocalNotification(alarmDate, id, alarmTime, name){

	alarmDate.setMinutes(alarmDate.getMinutes() + alarmTime);

	if(isScheduled(id)){
     
     $cordovaLocalNotification.update({
            id: id,
            date: alarmDate,
            message: "This is a message",
            title: "Picking Time",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });

	}
	else{

		
        $cordovaLocalNotification.add({
            id: id,
            date: alarmDate,
            message: "Dont forget to pick up " + name,
            title: "Picking Time",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });

	}     

}


function isScheduled (id) {
   return $cordovaLocalNotification.isScheduled(id);
}

	}
})();
// ----------------------------------Declaring an application module with the name starter; The modules ionic, SessionCtrl, DSCacheFactory and google maps are added----------------------------------------------------------------------
angular.module("starter", ["ionic","starter.SessionCtrl",'dbaq.ionCoverHeader','config',
  "angular-data.DSCacheFactory", "google-maps",'ngCordova','ngCordovaOauth','ionic-ratings','LocalStorageModule','ionic-datepicker','ionic-timepicker', 'ionic.contrib.ui.tinderCards','ionic.contrib.ui.cards','firebase'])

.run(function($ionicPlatform, DSCacheFactory, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


// ----------------------------------Definition of caches----------------------------------------------------------------------
    DSCacheFactory("leagueDataCache", { storageMode: "localStorage", maxAge: 720000, deleteOnExpire: "aggressive" });
    DSCacheFactory("leaguesCache", { storageMode: "localStorage", maxAge: 720000, deleteOnExpire: "aggressive" });
    DSCacheFactory("myTeamsCache", { storageMode: "localStorage" });
    DSCacheFactory("staticCache", { storageMode: "localStorage" });
  });


    //stateChange event
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    var user = firebase.auth().currentUser;
    if (toState.authRequired && !user){ //Assuming the AuthService holds authentication logic
      // User isn’t authenticated
      $rootScope.toState= toState;
      event.preventDefault();
      $state.transitionTo("login");
     
    }
  });

   var firebaseConfig = {
    apiKey: "AIzaSyAoRQhScqnvLlifzXgSBKEnwbnNQ8oFgus",
    authDomain: "digitalchallenge-af9f5.firebaseapp.com",
    databaseURL: "https://digitalchallenge-af9f5.firebaseio.com",
    storageBucket: "digitalchallenge-af9f5.appspot.com",
    messagingSenderId: "57842290965"
  }

  firebase.initializeApp(firebaseConfig);


})


// ----------------------------------Definition of states and routes using the state and routing services---------------------------------------------------------------------
.config(function($stateProvider, $urlRouterProvider,ionicDatePickerProvider) {


var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);


  $stateProvider



// ----------------------------------Main States----------------------------------------------------------------------
    .state('home', {
      url: "/home",
      templateUrl: "app/home/home.html",
      controller: "HomeController as vm"
    })

    .state('home.schedule', {
      url: "/schedule",
      views: {
        "tab-schedule": {
           templateUrl: "app/home/schedule.html"
        }
      }
    })

    .state('preChallenge', {
      url: "/pre",
       templateUrl: "app/tabs/pre-challenge.html"

    })

    .state('challenge', {
      url: "/challenge",
           templateUrl: "app/challenge/challenge.html",
           controller: "ChallengeController as vm"
    })

    .state('sponsor', {
      url: "/sponsor",
           templateUrl: "app/sponsor/sponsor.html",
           controller: 'SponsorController as vm'
    })

    .state('newsletter', {
      url: "/newsletter",
      templateUrl: "app/newsletter/newsletter.html",
      controller:"newsletterCtrl as vm",
      authRequired: true
    })

    .state('email', {
      url: "/email",
           templateUrl: "app/newsletter/profile/changeEmail.html"
    })

    .state('password', {
      url: "/password",
           templateUrl: "app/newsletter/profile/changePassword.html"
    })

    .state('phone', {
      url: "/phone",
           templateUrl: "app/newsletter/profile/changePhone.html"
    })


    .state('postChallenge', {
      url: "/post",
      templateUrl: "app/tabs/post-challenge.html"
    })

    .state('facebook', {
      url: "/facebook",
      templateUrl: "app/facebook/login/facebook-login.html",
      controller: "FacebookLoginController"
    })

    .state('me', {
      url: "/me",
      templateUrl: "app/home/me.html"
    })


    .state('kids', {
      url: "/kids",
      templateUrl: "app/kids/kids.html",
      controller: "kidsController as vm"
    })

    .state('products', {
          url: '/products',
              templateUrl: 'app/products/products.html',
              controller: 'ProductsController as vm'
        })

        .state('product', {
          url: '/product/:productId',
              templateUrl: 'app/products/product.html',
              controller: 'ProductController as vm'
        })

        .state('youtube', {
          url: '/videos',
              templateUrl: 'app/youtube/videos.html',
              controller: 'VideosController as vm'
        })

        .state('youtube-item', {
          url: '/videos/:videoId',
              templateUrl: 'app/youtube/video.html',
              controller: 'VideoController as vm'
        })



    .state('disco', {
      url: "/disco-catalogue",
           templateUrl: "app/disco/disco.html",
           controller: "DiscoController as vm"
    })

    .state('ticket-item', {
          url: '/disco-catalogue/:itemId',
          templateUrl: 'app/disco/disco-catalogue-item.html',
           controller: "discoCatalogueItemController as vm"
          }
        )

    .state('tickets', {
      url: "/tickets",
      templateUrl: "app/home/tickets.html"
    })

    .state('my-tickets', {
      url: "/my-tickets",
      templateUrl: "app/tickets/tickets.html",
      controller: "MyTicketController as vm",
      authRequired:true
    })

    .state('news', {
      url: "/news",
           templateUrl: "app/home/news.html"
    })

    .state('sport', {
      url: "/sport",
      templateUrl: "app/sport/sport.html"
    })

    .state('information', {
      url: "/information",
      templateUrl: "app/tabs/25th-edition.html"
    })

    .state('car', {
      url: "/car",
      templateUrl: "app/tabs/sixt.html"
    })
    
    .state('hotel', {
      url: "/hotel",
      templateUrl: "app/tabs/hotel.html"
    })

    .state('login', {
      url: "/login",
      templateUrl: "app/login/login.html",
      controller: "loginCtrl as vm"
    })

    .state('signup', {
      url: "/signup",
      templateUrl: "app/login/signup.html"
    })

    .state('password-reset', {
      url: "/reset",
      templateUrl: "app/login/passwordResetForm.html",
      controller: "PasswordResetCtrl as vm"
    })

   .state('services', {
      url: "/services",
      templateUrl: "app/home/services.html"
    })

 .state('payment', {
      url: "/payment",
      templateUrl: "app/stripe/stripe.html"
    })

 .state('feedback', {
      url: "/feedback",
      cache:false,
      templateUrl: "app/feedback/feedback.html",
      controller: 'FeedbackController as vm'
    })


 .state('shopping-cart', {
      url: "/shopping-cart",
      templateUrl: "app/shopping-cart/my-cart/my-cart.html",
      controller: 'MyCartController as vm'
    })


 .state('gala', {
      url: "/gala",
      templateUrl: "app/gala/gala.html"
    })

  .state('gala.schedule', {
      url: "/gala-schedule",
      templateUrl: "app/gala/schedule.html"
    })

   .state('gala.miss', {
      url: "/gala-miss",
      templateUrl: "app/gala/miss.html",
      controller: "TinderCardsController as vm"
    })

     .state('gala.mister', {
      url: "/gala-mister",
      templateUrl: "app/gala/mister.html",
      controller: "SwipeableCardsController as vm"
    })

    .state('gala.tickets', {
      url: "/gala-tickets",
      templateUrl: "app/gala/tickets.html",
      controller: "GalaTicketsController as vm"
    })

   .state('gala-ticket-item', {
          url: '/gala-tickets/:itemId',
          templateUrl: 'app/gala/gala-catalogue-item.html',
           controller: "galaCatalogueItemController as vm"
          }
        )
  .state('preparation', {
      url: "/preparation",
      templateUrl: "app/preparation/preparation.html"
    })


 .state('village', {
      url: "/village",
      templateUrl: "app/village/village.html",
      controller: 'VillageController as vm'
    })

     .state('registration', {
      url: '/registration',
      templateUrl: 'app/kids/registration.html',
      controller: "registrationController as vm"
    })
    .state('edit', {
      url: '/task/:id',
      templateUrl: 'app/kids/edit.html',
      controller: "taskController",
      controllerAs : "edit"
    })



// ----------------------------------Sport States----------------------------------------------------------------------
.state('app', {
      abstract: true,
      url: "/app",
      templateUrl: "app/layout/menu-layout.html"
    })
    .state('app.myteams', {
      url: "/myteams",
      views: {
        "mainContent": {
          templateUrl: "app/teams/myteams.html"
        }
      }
    })

    .state('app.teams', {
      url: "/teams",
      views: {
        'mainContent': {
          templateUrl: "app/teams/teams.html"
        }
      }
    })

    .state('app.team-detail', {
      url: "/teams/:id",
      views: {
        'mainContent': {
          templateUrl: "app/teams/team-detail.html"
        }
      }
    })

    .state('app.game', {
      url: "/game/:id",
      views: {
        'mainContent': {
          templateUrl: "app/game/game.html"
        }
      }
    })

    .state('app.standings', {
      url: "/standings",
      views: {
        'mainContent': {
          templateUrl: "app/standings/standings.html"
        }
      }
    })

    .state('app.locations', {
      url: "/locations",
      views: {
        'mainContent': {
          templateUrl: "app/locations/locations.html"
        }
      }
    })

    .state('app.location-map', {
      url: "/location-map/:id",
      views: {
        'mainContent': {
          templateUrl: "app/locations/location-map.html"
        }
      }
    })

    .state('app.location-schedule', {
      url: "/location-schedule/:id",
      views: {
        'mainContent': {
          templateUrl: "app/locations/location-schedule.html"
        }
      }
    })

    .state('app.rules', {
      url: "/rules",
      views: {
        'mainContent': {
          templateUrl: "app/rules/rules.html"
        }
      }
    })

// ----------------------------------Sport States----------------------------------------------------------------------

    .state('bsf', {
      url: "/bsf",
      abstract:true,
      templateUrl: "app/bsf/bsf.html",
      controller: "BsfCtrl"
    })


     .state('bsf.calendar', {
      url: "/calendar",
      views: {
        "insights-tab": {
           templateUrl: "app/bsf/calendar.html",
           controller: 'CalendarController'
        }
      }
    })

    .state('bsf.speakers', {
      url: "/speakers",
      views: {
        "insights-tab": {
          templateUrl: "app/bsf/speakers.html",
          controller: 'ListController'
        }
      }
    })


    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('home');
})

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('app/data/data.json').success(function(data) {
      $scope.calendar = data.calendar;

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }



    });

    $scope.ratingsObject = {
        iconOn : 'ion-ios-star',
        iconOff : 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor:  'rgb(200, 100, 100)',
        rating:  2,
        minRating:1,
        callback: function(rating) {
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };

}])

.controller('WelcomeCtrl', function($scope, $state, $q, UserService, $ionicLoading) {
  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('app.home');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('app.home');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})


.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('home.leagues');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }
})

.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.artists = data.artists;
      $scope.whichartist=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
    });
}])

.controller('AppCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('app/bsf/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.demo = 'ios';
  $scope.setPlatform = function(p) {
    document.body.classList.remove('platform-ios');
    document.body.classList.remove('platform-android');
    document.body.classList.add('platform-' + p);
    $scope.demo = p;
  }

});
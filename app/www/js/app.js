// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  console.log('first');
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Normal route without any tabs
  //  $routeProvider .when('/', { controller: LoginCtrl, templateUrl: 'templates/tab-login.html' });
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('dashboard', {
      url: '/',
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardCtrl'
    })
    // setup an abstract state for the tabs directive
    .state('event', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event.html"
    })
    .state('event.friends', {
      url: '/friends',
      views: {
        'event-friends': {
          templateUrl: 'templates/event-friends.html',
          controller: 'EventFriends'
        }
      }
    })
    .state('event.confirm', {
      url: '/confirm',
      views: {
        'event-confirm': {
          templateUrl: 'templates/event-confirm.html',
          controller: 'EventConfirm'
        }
      }
    })
    .state('event.restaurants', {
      url: '/restaurants',
      views: {
        'event-restaurants': {
          templateUrl: 'templates/event-restaurants.html',
          controller: 'EventRestaurants'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
}).run(function(DataStore){
    var dat = {
      "uid": 123123,
      "email": "alfonso@isla.io",
      "friends":[],
      "restaurants": [
        { "name": "Schwarzwaldstuben", "img": "Schwarzwaldstuben.jpg", "votes": 0 },
        { "name": "Aufsturz", "img": "aufsturz.jpg", "votes": 0 },
        { "name": "Bar Tausend", "img": "bar_tausend.jpg", "votes": 0 },
        { "name": "Chicago Williams Bbq", "img": "chicago_williams_bbq.jpg", "votes": 0 },
        { "name": "Dada Falafel", "img": "dada_falafel.jpg", "votes": 0 },
        { "name": "Dussmann das kulturkaufhaus", 	"img": "dussmann_das_kulturkaufhaus.jpg", "votes": 0 },
        { "name": "King size bar", "img": "king_size_bar.jpg", "votes": 0 },
        { "name": "Kunst werke", "img": "kunst_werke.jpg", "votes": 0 },
        { "name": "lokal", "img": "lokal.jpg", "votes": 0 },
        { "name": "Pure origins coffe", "img": "pure_origins_estate_coffe.jpg", "votes": 0 }
      ],
      "events": [
        {
          "title": "todays lunch",
          "time": "1402269075",
          "diners": [],
          "restaurants": []
        }
      ]
    };
    DataStore.setData(dat);
  });


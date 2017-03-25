/**
 * Copyright @ 2017 by Samuel T. C. Santos, All rights reserved.
 */

/**
 * Application for Manager the users data.
 */
var app = angular.module('NhocaWeb', ['ngRoute'])

app.config(function($routeProvider){

  $routeProvider.when('/',
    {
      controller : 'Home',
      templateUrl: 'app/views/home.html'
    })
    .when('/privacypolicy',
    {
      controller : 'PrivacyPolicy',
      templateUrl: 'app/views/privacypolicy.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

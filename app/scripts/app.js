'use strict';

/**
 * @ngdoc overview
 * @name tweenyApp
 * @description
 * # tweenyApp
 *
 * Main module of the application.
 */
angular
  .module('tweenyApp', [
    'wu.masonry',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (tweetService, cookieStorage) {
    tweetService.setStorageProvider(cookieStorage);
  });

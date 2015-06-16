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
  });

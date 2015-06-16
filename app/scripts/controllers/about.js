'use strict';

/**
 * @ngdoc function
 * @name tweenyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tweenyApp
 */
angular.module('tweenyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

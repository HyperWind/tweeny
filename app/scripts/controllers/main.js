'use strict';

angular
	.module('tweenyApp')
	.controller('MainCtrl', function ($scope, $http) {

    $scope.tweets = [];
    $scope.query = '#kitten';
    $scope.isSearching = false;
    $scope.search = search;

    function search(query) {
      $scope.isSearching = true;
      $http.get('http://127.0.0.1:8000/twitter/' + query).then(function (result) {
        $scope.tweets = result.data.statuses.map(function (tweet) {
          return {
            user: tweet.user.name,
            body: tweet.text,
            link: '',
            screen_name: tweet.user.screen_name
          };
        });
      }).finally(function () {
        $scope.isSearching = false;
      });
    }

  });

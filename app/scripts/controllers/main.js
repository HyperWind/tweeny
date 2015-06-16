'use strict';

angular
	.module('tweenyApp')
	.controller('MainCtrl', function ($scope, $http) {

    function search(query) {
      $scope.isSearching = true;
      $http.get('http://127.0.0.1:8000/twitter/' + query.replace(/[#\s]/g, '')).then(function (result) {
        $scope.tweets = result.data.statuses.map(function (tweet) {
          return {
            user: tweet.user.name,
            body: tweet.text,
            link: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
            screenName: '@' + tweet.user.screen_name
          };
        });
      }).finally(function () {
        $scope.isSearching = false;
      });
    }

    $scope.tweets = [];
    $scope.query = '#cats';
    $scope.isSearching = false;
    $scope.search = search;

  });

'use strict';

angular
  .module('tweenyApp')
  .service('localStorage', function () {

    var ls = window.localStorage;

    this.get = get;
    this.remove = remove;
    this.set = set;

    function clear(key) {
      ls.setItem(key, '');
    }

    function get(key) {
      var item = ls.getItem(key);
      return item ? JSON.parse(item) : null;
    }

    function remove(key) {
      ls.removeItem(key);
    }

    function set(key, value) {
      ls.setItem(key, JSON.stringify(value));
    }

  });

angular
  .module('tweenyApp')
  .service('tweetService', function (localStorage) {

    var storage = localStorage, KEY = 'tweetApp';

    this.setStorageProvider = function (provider) {
      storage = provider;
    };

    this.getHistory = function (amount) {
      var history = storage.get(KEY) || [];
      return history.length < amount ? history : history.slice(0, amount - 1);
    };

    this.addToHistory = function (tweet) {
      var existing = storage.get(KEY) || [];
      existing.push(tweet);
      storage.set(KEY, existing);
    };

    this.clearHistory = function () {
      storage.remove(KEY);
    };

  });

angular
	.module('tweenyApp')
	.controller('MainCtrl', function ($scope, $http, tweetService) {

    function search(query) {

      if($scope.searchForm.$invalid) {

        $scope.badclick = true;
        return;

      }

      tweetService.addToHistory(query);
      $scope.badclick = false;
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
      }, function () {
        console.log('Error from backend!');
      }).finally(function () {
        $scope.isSearching = false;
      });
    }

    $scope.tweets = [];
    $scope.query = '#cats';
    $scope.isSearching = false;
    $scope.search = search;
    $scope.searchForm = {};
    $scope.badclick = false;
    $scope.getHistory = tweetService.getHistory;

  });

'use strict';

angular
  .module('tweenyApp')
  .service('localStorage', function () {

    var ls = window.localStorage;

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

    this.get = get;
    this.remove = remove;
    this.set = set;

  });

angular
  .module('tweenyApp')
  .service('tweetService', function (localStorage) {

    var storage = localStorage, KEY = 'tweetApp';

    function setStorageProvider(provider) {
      storage = provider;
    }

    function getHistory(amount) {
      var history = storage.get(KEY) || [];
      return history.length < amount ? history : history.slice(history.length - amount, history.length);
    }

    function addToHistory(tweet) {
      var existing = storage.get(KEY) || [];
      existing.push(tweet);
      storage.set(KEY, existing);
    }

    function clearHistory() {
      storage.remove(KEY);
    }

    this.setStorageProvider = setStorageProvider;
    this.getHistory = getHistory;
    this.addToHistory = addToHistory;
    this.clearHistory = clearHistory;

  });

angular
	.module('tweenyApp')
	.controller('MainCtrl', function ($scope, $http, tweetService) {

    function searchQuery(query) {

      if($scope.searchForm.$invalid) {
        $scope.badclick = true;
        return;
      }

      tweetService.addToHistory(query);
      $scope.badclick = false;
      search(query);      
    }

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
    $scope.searchQuery = searchQuery;
    $scope.searchForm = {};
    $scope.badclick = false;
    $scope.getHistory = tweetService.getHistory;
    $scope.historyClicked = false;

  });

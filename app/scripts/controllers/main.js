'use strict';

angular
  .module('tweenyApp')
  .service('localStorage', function () {

    window.localStorage.setItem('tweenyApp', JSON.stringify({}));
    this.length = 0;

    this.get = function (key) {

      return JSON.parse(window.localStorage.getItem('tweenyApp'))[key];

    };
    this.remove = function (key) {

      var arr = JSON.parse(window.localStorage.getItem('tweenyApp'));
      delete arr[key];
      for (var i = key; i < this.length; i++) {
        arr[i] = arr[i + 1];
      }
      window.localStorage.setItem('tweenyApp', JSON.stringify(arr));
      this.length--;

    };
    this.set = function (value) {

      var arr = JSON.parse(window.localStorage.getItem('tweenyApp'))[this.length] = value;
      window.localStorage.setItem('tweenyApp', JSON.stringify(arr));
      this.length++;

    };
    this.clear = function () {

      window.localStorage.setItem('tweenyApp', JSON.stringify({}));

    };

  });

/*
angular
  .module('tweenyApp')
  .service('cookieStorage', function () {
    this.get = function (key) {};
    this.remove = function (key) {};
    this.set = function (key, value) {};
  });
*/

angular
  .module('tweenyApp')
  .service('tweetService', function (localStorage) {

    var storage = localStorage;

    this.setStorageProvider = function (provider) {
      storage = provider;
    };

    this.getHistory = function (amount) {
      
      var arr = [];

      for (var i = 1; i <= amount; i++) {
        arr.push(storage.get(storage.length() - i));
      }

      arr = arr.filter(function (value, index, self) {

        return self.indexOf(value) === index;

      });

      console.log(arr);
      return arr;

    };

    this.addToHistory = function (what) {
      storage.set(what);
    };

    this.clearHistory = function () {
      storage.clear();
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

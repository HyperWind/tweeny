'use strict';

function Storage() {

  this.container = window.localStorage;

}

Storage.prototype.push = function(query) {

  this.container.setItem(this.container.length.toString() + '_tweeny', query);

};

Storage.prototype.at = function(index) {

  if (index + 1 > this.size && index < 0) {

    return {err: 'exceeds container bounds', cont: null};

  } else {

    return {err: null, cont: this.container.getItem(index.toString() + '_tweeny')};

  }

};

function unique(arr) {

  var which = 0;
  var uniqueArr = arr.map(function (val) {

    for (var i = 0; i < arr.length; i++) {

      if (val === arr[i] && i !== which) delete arr[i];

    }

    which++;

  }).filter(function (val) {

    return val != undefined;

  });

  return uniqueArr;
}

angular
	.module('tweenyApp')
	.controller('MainCtrl', function ($scope, $http) {  

    function getHistory(iters, all) {

      var amount = all !== true ? iters : $scope.storage.container.length;
      var historyArr = [];
      var current;

        for (var i = $scope.storage.container.length - amount; i < $scope.storage.container.length; i++) {

          current = $scope.storage.at(i);

          if (current.err === null) {
              historyArr.push(current.cont);
          }

        }

      return unique(historyArr);

    }

    function search(query) {

      if($scope.searchForm.$invalid) {

        $scope.badclick = true;
        return;

      }

      $scope.storage.push(query);
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
    $scope.getHistory = getHistory;
    $scope.storage = new Storage();

  });
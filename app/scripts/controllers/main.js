'use strict';

<<<<<<< HEAD
/**
 * @ngdoc function
 * @name tweenyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tweenyApp
 */

function Tweet(user, screen_name, body, link) {

	this.user = user;
	this.body = body;
	this.link = link;
	this.screen_name = screen_name;

}


Tweet.prototype.serialize = function () {

	var link = document.createElement('A');
	link.href = this.link;
	link.appendChild(document.createTextNode('link'));

	var body = document.createElement('P');
	body.appendChild(document.createTextNode(this.body));

	var user = document.createElement('h2');
	user.appendChild(document.createTextNode(this.user));

	var username = document.createElement('h4');
	username.appendChild(document.createTextNode(this.screen_name));

	var tweet = document.createElement('div');
	tweet.classList.add('single-tweet');
	
	tweet.appendChild(user);

	tweet.appendChild(username);

	tweet.appendChild(body);

	tweet.appendChild(link);

	return tweet;

};

function getTweets(hashtags, callback) {

	var tweets = [];

	var req = new XMLHttpRequest();
	
	req.open('GET', 'http://127.0.0.1:8000/twitter/' + hashtags.join(','), false);
	req.send(null);
	req.onreadystatechange = function () {}
	
		var jsons = JSON.parse(req.responseText).statuses;
	
		jsons.forEach(function(json) {
	
		var url = json.entities.urls[0] || {url: ''};
	
		tweets.push(new Tweet(json.user.name, json.user.screen_name, json.text,url.url));

		callback(tweets);
	
		});
	
	};

}

=======
>>>>>>> 8e09941438bd2c804ede763c9fd0ba8b272d176f
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

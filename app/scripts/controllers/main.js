'use strict';

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

	$.getJSON('http://127.0.0.1:8000/twitter/' + hashtags.join(','), function (data) {

		typeof(data);

		var jsons = typeof(data) === "String" ? JSON.parse(data).statuses : data.statuses;

		jsons.forEach(function(json) {

		var url = json.entities.urls[0] || {url: ''};

		tweets.push(new Tweet(json.user.name, json.user.screen_name, json.text,url.url));

		});

		callback(tweets);

	});

}

angular
	.module('tweenyApp')
	.controller('MainCtrl', function ($scope) {
    
		$scope.displayTweets = function() {

			var hashtags = document
							.getElementById('query-text')
							.value
							.split(/[#\s]/g)
							.filter(String);

			var tweetContainer = document.getElementById('tweet-container');

			getTweets(hashtags, function(data) {
				
				data.map(function(value) {
			
					tweetContainer.appendChild(value.serialize());

				});
			
			});

		};

	});
 
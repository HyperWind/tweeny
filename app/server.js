'use strict';

var Twit = require('twit');

var T = new Twit({
	consumer_key: 'PN04EvXw9hqAYd25pdLrPakNd',
	consumer_secret: '5J8TLVfyC0N2RRI1YgCnd2UMdMoAdxzo46ZhunQy70ag7Pqc7n',
	access_token: '2889137301-XSOAd6sts1cgygu7SFreHPr7Kp14EZPTSjBBFDQ',
	access_token_secret: 'F6BqppuEq38A8yBv5CF6CfE8YitO2Z9K9fFb9BopqSYvJ'
});

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

	var url_parts = url.parse(req.url);

	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);


	if (url_parts.pathname.match(/\/twitter\/.+/g)) {

		var path_args = url_parts.pathname.split('/').filter(String)[1];
		var norm_args = path_args.split(',').map(function (current) {
			return '#' + current;
		});
		var write;

		res.writeHead(200, {'Content-Type': 'application/json'});
		T.get('search/tweets', { q: norm_args }, function (err, data, response) {				

			if (err != undefined) {

				write = data;

			} else {

				write = {err: err};

			}

			res.write(JSON.stringify(data));

			res.end();

		});

	} else {

		res.end();

	}

}).listen(8000);
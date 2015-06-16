var Twit = require('twit');

var app = new Twit({
	consumer_key: 'PN04EvXw9hqAYd25pdLrPakNd',
	consumer_secret: '5J8TLVfyC0N2RRI1YgCnd2UMdMoAdxzo46ZhunQy70ag7Pqc7n',
	access_token: '2889137301-XSOAd6sts1cgygu7SFreHPr7Kp14EZPTSjBBFDQ',
	access_token_secret: 'F6BqppuEq38A8yBv5CF6CfE8YitO2Z9K9fFb9BopqSYvJ'
});

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

	var url_parts = url.parse(req.url);

	res.write(url_parts.pathname);

	if (url_parts.pathname === /\/twitter\/.+/g) {

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('test');

	}

	res.end('end');

}).listen(8000);
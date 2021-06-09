var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Original/1%20-%20Computation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js"
}

var http = require("http");
var io = require(moduleDependencies.io);

function startServer(port, source) {

	http.createServer(

		function (request, response) {

			let result = processRequest(request.url);

			response.writeHead(
				200,
				{
					'Content-Type':
					(Array.isArray(result) ?
						(result.length >= 2 ?
							result[1] :
							'text/plain') :
						'text/plain'),
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				}
			);

			response.write("" + (Array.isArray(result) ? result[0] : result));

			response.end();
		}
	).listen(port);

	function processRequest(request) {

		try {

			return ((new Function(
				"module={exports:{}};" +
				io.open(source) +
				";return module.exports;"))())(request.substring(1));
		}

		catch(error) {
			return "SERVER ERROR: " + error.message;
		}
	}
}

module.exports = {
	startServer
};
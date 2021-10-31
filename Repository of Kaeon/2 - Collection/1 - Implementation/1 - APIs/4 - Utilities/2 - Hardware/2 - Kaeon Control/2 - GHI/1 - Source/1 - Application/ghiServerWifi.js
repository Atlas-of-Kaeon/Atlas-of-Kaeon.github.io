var childProcess = require("child_process");
var http = require("http");
var wifi = require("./wifi.js");

var network = null;
var queue = [];

function execCommand(data) {

	console.log("EXECUTED:", data);

	childProcess.exec(
		"node ./ghiCommandSocket.js \"" +
		data.data +
		"\"" +
		(
			data.credentials.host != null ?
				" \"" +
				data.credentials.host +
				"\"" +
				(
					data.credentials.port != null ?
						" \"" +
						data.credentials.port +
						"\"" :
					""
				) :
			""
		)
	);
}

http.createServer(function(req, res) {
	
	let url = req.url.substring(1);
	
	if(url == "favicon.ico") {
	
		res.end();
	
		return;
	}
	
	let body = "";
	
	req.on('data', (chunk) => {
		body += chunk.toString();
	}).on('end', () => {
	
		let data = { };
	
		try {
			data = JSON.parse(body);
		}
	
		catch(error) {
			data = { };
		}
		
		console.log("INTERCEPTED:", data);

		try {

			if(data.credentials == null) {

				res.end();

				return;
			}

			if(data.credentials.ssid == null) {

				res.end();
				
				return;
			}

			if(data.credentials.ssid != network) {

				network = data.credentials.ssid;

				if(network != null) {

					wifi.connect(data.credentials, () => {

						console.log("CONNECTED:", network);

						execCommand(data);
					});
				}
			}

			else
				execCommand(data);
		}

		catch(error) {
			console.log(error);
		}
	});

	console.log("RETURNED:", queue);
	
	res.write("" + queue);

	queue = [];

	res.end();
}).listen(process.argv[2]);

console.log("READY");
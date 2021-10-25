var fs = require("fs");
var http = require("http");

function getDevices() {

	let devices = [];

	// STUB
	devices = {
		"1": require("./ghiGPIO.js"),
		"2": require("./ghiWiFi.js"),
		"3": require("./ghiSerial.js")
	};

	// STUB

	return devices;
}

function processData(id, data) {

	try {
		devices[id].process(state, id, data);
	}

	catch(error) {
		console.log(error);
	}
}

function getReading(id) {

	try {
		return devices[id].read(state, id);
	}

	catch(error) {

		console.log(error);

		return null;
	}
}

function loop() {

	Object.keys(state).forEach((key) => {

		((reading) => {

			try {
				eval(state[key].script.code);
			}

			catch(error) {
				console.log(error);
			}
		})(getReading(key));
	});
};

function init() {

	devices = getDevices();

	Object.keys(devices).forEach((key) => {

		state[key] = {
			script: ""
		}

		devices[key].init(state, key, process.argv);
	});

	interval = setInterval(loop, 1000 / 60);
}

var devices = [];
var state = { };

var interval = null;

init();

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

		console.log("RECEIVED:", body);

		let data = { };

		try {
			data = JSON.parse(body);
		}

		catch(error) {

			console.log(error);

			data = { };
		}

		console.log("PROCESSED:", data);

		Object.keys(data).forEach((key) => {
			processData(key, data[key]);
		});

		let reading = { };

		Object.keys(state).forEach((key) => {

			reading[key] = {
				input: data[key],
				output: getReading(key),
				type: devices[key].type
			};
		});

		res.write(JSON.stringify(reading));

		res.end();
	});
}).listen(process.argv[2]);

if(!fs.existsSync("./ghiData.json"))
	fs.writeFileSync("./ghiData.json", "{}");

console.log("READY");
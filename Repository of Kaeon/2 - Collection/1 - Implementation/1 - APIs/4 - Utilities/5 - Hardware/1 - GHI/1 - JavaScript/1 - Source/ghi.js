var http = require("http");
var gpio = require("rpio");

function getPins() {

	let pins = [];

	for(let i = 0; i <= 40; i++) {

		try {

			gpio.open(i, gpio.INPUT);

			pins.push(i);
		}

		catch(error) {

		}
	}

	return pins;
}

function getDevices() {

	let devices = [];

	devices = ["1"]; // STUB

	// STUB

	return devices;
}

function processData(id, data) {

	try {

		if(data.on != null) {

			pins.forEach((i, index) => {

				if(!state[id].on.includes(index) && data.on.includes(index)) {

					gpio.mode(i, gpio.OUTPUT);

					gpio.write(i, gpio.HIGH);
				}

				else if(state[id].on.includes(index) && !data.on.includes(index)) {

					gpio.write(i, gpio.LOW);

					gpio.mode(i, gpio.INPUT);
				}
			});

			state[id].on = data.on;
		}
	}

	catch(error) {
		console.log(error);
	}
}

function getReading(id) {

	let reading = [];

	pins.forEach((i) => {

		if(state[id].on.includes[i])
			reading.push(null);

		else
			reading.push(gpio.read(i));
	});

	return reading;
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

	let devices = getDevices();

	devices.forEach((key) => {

		state[key] = {
			on: [],
			script: ""
		}
	});

	interval = setInterval(loop, 1000 / 60);

	pins = getPins();
}

var pins = [];
var state = { };

var interval = null;

init();

http.createServer(function(req, res) {

	let url = req.url.substring(1);

	if(url == "favicon.ico") {

		res.end();

		return;
	}

	let data = { };

	try {
		data = JSON.parse(decodeURIComponent(url));
	}

	catch(error) {
		data = { };
	}

	console.log("RECEIVED:", data);

	Object.keys(data).forEach((key) => {
		processData(key, data[key]);
	});

	let reading = { };

	Object.keys(state).forEach((key) => {
		reading[key] = getReading(key);
	});

	res.write(JSON.stringify(reading));

	res.end();
}).listen(process.argv[2]);
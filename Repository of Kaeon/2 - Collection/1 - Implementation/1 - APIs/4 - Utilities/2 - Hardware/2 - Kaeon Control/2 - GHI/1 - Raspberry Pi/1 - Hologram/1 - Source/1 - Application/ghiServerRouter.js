var http = require("http");

function getDevices() {

	return {
		"0": require("./ghiModuleReceptor.js"),
		"1": require("./ghiModuleGPIO.js"),
		"2": require("./ghiModuleSerial.js"),
		"3": require("./ghiModuleDisplay.js"),
		"4": require("./ghiModuleRecorder.js"),
		"5": require("./ghiModuleWiFi.js"),
		"6": require("./ghiModuleCellular.js")
	};
}

function init() {

	devices = getDevices();

	Object.keys(devices).forEach((key) => {
		state[key] = { output: { }, input: { }, type: devices[key].type };
	});

	Object.keys(devices).forEach((key) => {
		devices[key].init(state, key, processCall, process.argv);
	});
}

function processCall(call) {

	Object.keys(call).forEach((key) => {
		state[key].output = call[key];
	});

	Object.keys(call).forEach((key) => {

		try {
			devices[key].process(state, key);
		}
	
		catch(error) {
			console.log(error);
		}
	});

	Object.keys(state).forEach((key) => {

		try {
			state[key].input = devices[key].read(state, key);
		}
	
		catch(error) {
			console.log(error);
		}
	});
}

function validate(call) {

	let keys = Object.keys(devices);

	for(let i = 0; i < keys.length; i++) {

		if(devices[keys[i]].block(state, keys[i], call))
			return false;
	}

	return true;
}

var devices = [];
var state = { };

init();

http.createServer(function(request, response) {

	let url = request.url.substring(1);

	if(url == "favicon.ico") {

		response.end();

		return;
	}

	let body = "";

	request.on('data', (chunk) => {
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

		if(validate(data)) {

			console.log("VALIDATED");

			processCall(data);
			
			response.write(JSON.stringify(state));
		}

		else {

			console.log("INVALIDATED");
			
			response.write(JSON.stringify(state));
		}

		response.end();
	});
}).listen(process.argv[2]);

console.log("READY");
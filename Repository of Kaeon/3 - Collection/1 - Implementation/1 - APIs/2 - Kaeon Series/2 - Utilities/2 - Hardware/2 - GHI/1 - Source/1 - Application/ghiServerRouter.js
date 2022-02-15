var http = require("http");
var httpUtils = require(__dirname + "/httpUtils.js");

function getDevices() {

	return {
		"0": require(__dirname + "/ghiModuleReceptor.js"),
		"1": require(__dirname + "/ghiModuleGPIO.js"),
		"2": require(__dirname + "/ghiModuleSerial.js"),
		"3": require(__dirname + "/ghiModuleDisplay.js"),
		"4": require(__dirname + "/ghiModuleRecorder.js"),
		"5": require(__dirname + "/ghiModuleWiFi.js"),
		"6": require(__dirname + "/ghiModuleBluetooth.js"),
		"7": require(__dirname + "/ghiModuleCellular.js")
	};
}

function processRequest(data) {

	try {

		let validated = validate(data);

		console.log(validated ? "VALIDATED" : "INVALIDATED");

		if(validated) {

			processCall(data);

			return state;
		}

		else
			return null;
	}

	catch(error) {
		console.log(error);
	}

	return null;
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

		try {
			state[key].output = call[key];
		}
	
		catch(error) {
			console.log(error);
		}
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

		try {

			if(devices[keys[i]].block(state, keys[i], call))
				return false;
		}
	
		catch(error) {
			console.log(error);
		}
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

		if(Object.keys(data).includes("commands") ||
			Object.keys(data).includes("processes") ||
			Object.keys(data).includes("modules") ||
			Object.keys(data).includes("password") ||
			Object.keys(data).includes("newPassword")) {

			try {

				let jshResponse = JSON.parse(
					httpUtils.sendRequest(
						{
							request: {
								method: "POST",
								uri: "http://localhost:" + process.argv[4]
							},
							body: body
						}
					).body
				);

				if(data.modules != null) {

					let match = data.modules.filter((item) => {
						return item.module == "ghi";
					});

					if(match.length > 0) {

						try {
							
							jshResponse.modules.push({
								module: "ghi",
								response: processRequest(match[0].request)
							});
						}

						catch(error) {
							console.log(error);
						}
					}
				}

				response.write(JSON.stringify(jshResponse));
			}

			catch(error) {
				console.log(error);
			}
		}

		else
			response.write(JSON.stringify(processRequest(data)));

		response.end();
	});
}).listen(process.argv[2]);

console.log("READY");
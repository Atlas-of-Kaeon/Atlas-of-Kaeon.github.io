var fs = require("fs");
var wifi = require(__dirname + "/wifi.js");

function startInterval() {
	
	if(interval != null)
		clearInterval(interval);

	interval = setInterval(() => {

		try {

			let newState = (new Function("state", "delta", data.script))(
				stateReference,
				lastTime != null ?
					(new Date()).getTime() - lastTime :
					0
			);

			if(newState != null) {

				let data = JSON.parse("" + newState);
				let call = { };

				Object.keys(data).forEach((key) => {

					if(data[key].output != null)
						call[key] = data[key].output;
				});

				console.log("SCRIPT CALL", JSON.stringify(call));

				if(Object.keys(call).length > 0)
					callbackReference(call);
			}
		}

		catch(error) {
			console.log(error);
		}

		lastTime = (new Date()).getTime();
	}, data.scriptInterval * 1000);
}

var data = {
	access: {
		ssid: "GHI-" + wifi.getSerialNumber(),
		password: null,
		ip: "192.168.4.1",
		port: 1233
	},
	metadata: "",
	password: null,
	script: "",
	scriptLanguage: "",
	scriptInterval: 1 / 60,
	statePreservation: false
};

var callbackReference = () => { };
var stateReference = { };

var interval = null;
var lastTime = null;

module.exports = {
	block: (state, id, call) => {

		if(data.password == null)
			return false;

		return data.password != call.password;
	},
	init: (state, id, callback, args) => {

		if(!fs.existsSync(__dirname + "/dataGHI.json"))
			fs.writeFileSync(__dirname + "/dataGHI.json", "{}");

		let dataGHI = { };

		try {
			dataGHI = JSON.parse(fs.readFileSync(__dirname + "/dataGHI.json"));
		}

		catch(error) {
			dataGHI = { };
		}

		Object.assign(data, dataGHI);

		stateReference = state;
		callbackReference = callback;
		
		startInterval();
	},
	process: (state, id) => {

		let newInterval = state[id].output.scriptInterval != null ?
			state[id].output.scriptInterval != data.scriptInterval :
			false;

		let newAccess = state[id].output.access != null &&
			JSON.stringify(state[id].output.access) !=
				JSON.stringify(data.access);

		Object.assign(data, state[id].output);

		try {

			if(data.statePreservation) {

				let preservation = JSON.parse(JSON.stringify(data));

				if(preservation.access != null)
					preservation.access.password = null;

				fs.writeFileSync(__dirname + "/dataGHI.json", JSON.stringify(preservation));
			}

			else
				fs.writeFileSync(__dirname + "/dataGHI.json", "{}");
		}

		catch(error) {
			console.log(error);
		}

		if(newAccess)
			setTimeout(() => { wifi.setAccessPoint(data.access) });

		if(newInterval)
			startInterval();
	},
	read: (state, id) => {
		return null;
	},
	type: "receptor"
};
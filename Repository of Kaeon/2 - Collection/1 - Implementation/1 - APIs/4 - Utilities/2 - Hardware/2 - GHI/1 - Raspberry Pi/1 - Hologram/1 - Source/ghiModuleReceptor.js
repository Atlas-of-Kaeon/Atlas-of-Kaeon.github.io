var fs = require("fs");

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

				let newData = JSON.parse("" + newState);

				Object.keys(newData).forEach((key) => {

					if(newData[key].output != null)
						stateReference[key].output = newData[key].output;
				});

				let secondaryCall = { };

				Object.keys(stateReference).forEach((key) => {

					if(stateReference[key].output != null)
						secondaryCall[key] = stateReference[key].output;
				});

				if(Object.keys(secondaryCall).length > 0)
					callbackReference(secondaryCall);
			}
		}

		catch(error) {
			console.log(error);
		}

		lastTime = (new Date()).getTime();
	}, data.stateInterval);
}

var data = {
	metadata: "",
	password: null,
	script: "",
	scriptLanguage: "",
	scriptInterval: 1 / 60,
	statePreservation: false
};

var callbackReference = () => { };
var stateReference = { };
var idReference = 0;

var interval = null;
var lastTime = null;

module.exports = {
	block: (state, id, call) => {

		if(data.password == null)
			return false;

		return data.password != call.password;
	},
	init: (state, id, callback, args) => {

		if(!fs.existsSync("./dataGHI.json"))
			fs.writeFileSync("./dataGHI.json", "{}");

		Object.assign(data, JSON.parse(fs.readFileSync("./dataGHI.json")));

		stateReference = state;
		callbackReference = callback;
		idReference = id;
		
		startInterval();

		setInterval(() => {

			try {

				if(data.statePreservation)
					fs.writeFileSync("./dataGHI.json", JSON.stringify(data));

				else
					fs.writeFileSync("./dataGHI.json", "{}");
			}

			catch(error) {
				console.log(error);
			}
		}, 1000);
	},
	process: (state, id) => {

		let newInterval = state[id].output.scriptInterval != null ?
			state[id].output.scriptInterval != data.scriptInterval :
			false;

		Object.assign(data, state[id].output);

		if(newInterval)
			startInterval();
	},
	read: (state, id) => {
		return null;
	},
	type: "receptor"
};
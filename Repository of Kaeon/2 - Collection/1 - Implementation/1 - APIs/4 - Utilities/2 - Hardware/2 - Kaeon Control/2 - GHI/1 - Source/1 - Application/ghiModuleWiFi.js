var httpUtils = require("./httpUtils.js");

var wifiServerPort = 0;
var queue = [];

module.exports = {
	block: (state, id, call) => {
		return false;
	},
	init: (state, id, callback, args) => {
		wifiServerPort = args[3];
	},
	process: (state, id) => {

		httpUtils.sendRequest(
			{
				request: {
					method: "POST",
					uri: "http://localhost:" + wifiServerPort
				},
				body: JSON.stringify(state[id].output)
			},
			(data) => {

				try {
					queue = queue.concat(JSON.parse("" + data));
				}

				catch(error) {

				}
			}
		);
	},
	read: (state, id) => {
	
		let reading = queue;
		queue = [];
	
		return reading;
	},
	type: "wifi"
};
var httpUtils = require("./httpUtils.js");

var wifiServerPort = 0;
var queue = [];

module.exports = {
	init: (state, id, args) => {
		wifiServerPort = args[3];
	},
	process: (state, id, data) => {

		httpUtils.sendRequest(
			{
				request: {
					method: "POST",
					uri: "http://localhost:" + wifiServerPort
				},
				body: JSON.stringify(data)
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
	}
};
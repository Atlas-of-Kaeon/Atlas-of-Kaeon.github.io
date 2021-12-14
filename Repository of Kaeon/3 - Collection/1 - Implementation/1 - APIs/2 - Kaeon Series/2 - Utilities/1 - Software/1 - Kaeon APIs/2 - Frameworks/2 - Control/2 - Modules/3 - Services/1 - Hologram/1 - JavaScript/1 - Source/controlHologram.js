var moduleDependencies = {
	httpUtils: ""
};

var httpUtils = require(moduleDependencies.httpUtils);

module.exports = (credentials, message, callback) => {

	return httpUtils.sendRequest({
		request: {
			method: "POST",
			uri: "https://dashboard.hologram.io/api/1/devices/messages/" +
				credentials.deviceID +
				"/" +
				credentials.webhookGUID
		},
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"data": JSON.stringify(message)
		})
	});
};
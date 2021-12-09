var moduleDependencies = {
	httpUtils: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/1%20-%20Data/3%20-%20API/1%20-%20HTTP%20Utilities/1%20-%20JavaScript/1%20-%20Source/httpUtils.js"
};

var httpUtils = require(moduleDependencies.httpUtils);

module.exports = (credentials, message, callback) => {

	httpUtils.sendRequest({
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
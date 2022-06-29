var moduleDependencies = {
	httpUtils: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/1%20-%20HTTP%20Utilities/1%20-%20JavaScript/1%20-%20Source/httpUtils.js"
};

var httpUtils = require(moduleDependencies.httpUtils);

function getCalls(credentials, cutoff, callback) {

	return JSON.parse(
		httpUtils.sendRequest({
			request: {
				method: "GET",
				uri: "https://dashboard.hologram.io/api/1/csr/rdm/?apikey=" +
					credentials.apiKey +
					"&orgid=" +
					credentials.orgID
			}
		}).body
	).data.filter((item) => {

		if(cutoff == null)
			return true;

		let itemCutoff = (new Date(item.logged)).getTime();

		if(typeof cutoff == "number")
			return itemCutoff >= cutoff * 1000;

		let cutoffTime = new Date("" + cutoff);

		if(!(cutoffTime instanceof Date && !isNaN(cutoffTime)))
			return false;

		return itemCutoff >= cutoffTime.getTime();
	}).map((item) => {

		return {
			data: (new Buffer(JSON.parse(item.data).data, 'base64')).
				toString('ascii'),
			time: (new Date(item.logged)).getTime() / 1000
		};
	});
};

function sendCall(credentials, message, callback) {

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

module.exports = {
	getCalls,
	sendCall
};
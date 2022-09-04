var io = require("kaeon-united")("io");
var httpUtils = require("kaeon-united")("httpUtils");

function getFromNEARPaste(id) {
	return io.open("https://nearpaste.vercel.app/" + id + "/raw");
}

function pasteToNEARPaste(text, title, callback) {

	let response = httpUtils.sendRequest({
		request: {
			method: "POST",
			uri: "https://nearpaste.vercel.app/api/paste"
		},
		headers: {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"content-type": "application/json"
		},
		body: JSON.stringify({
			content: "" + (text != null ? text : ""),
			title: "" + (title != null ? title : "Untitled"),
			isEncrypted: false
		})
	}, callback == null ? null : (response) => {
		callback(JSON.parse(response.body).data.id);
	});

	if(callback == null)
		return JSON.parse(response.body).data.id;
}

module.exports = {
	methods: {
		getFromNEARPaste,
		pasteToNEARPaste
	},
	interfaces: {
		paste: {
			name: "nearpaste",
			methods: {
				get: getFromNEARPaste,
				paste: pasteToNEARPaste
			}
		}
	}
};
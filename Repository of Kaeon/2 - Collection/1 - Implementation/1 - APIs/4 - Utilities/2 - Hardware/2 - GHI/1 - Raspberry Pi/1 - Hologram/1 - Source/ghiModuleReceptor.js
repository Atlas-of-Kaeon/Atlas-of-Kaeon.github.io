var fs = require("fs");

var data = { };

module.exports = {
	block: (state, id, call) => {

		// STUB

		return false;
	},
	init: (state, id, callback, args) => {

		if(!fs.existsSync("./dataGHI.json"))
			fs.writeFileSync("./dataGHI.json", "{}");

		data = JSON.parse(fs.readFileSync("./dataGHI.json"));

		// STUB
	},
	process: (state, id) => {
		// STUB
	},
	read: (state, id) => {
		// STUB
	},
	type: "receptor"
};
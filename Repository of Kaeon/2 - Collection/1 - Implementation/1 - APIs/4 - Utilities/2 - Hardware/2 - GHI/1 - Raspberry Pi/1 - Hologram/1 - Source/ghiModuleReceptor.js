var fs = require("fs");

var data = { };

module.exports = {
	init: (callback, state, id, args) => {

		if(!fs.existsSync("./dataGHI.json"))
			fs.writeFileSync("./dataGHI.json", "{}");

		data = JSON.parse(fs.readFileSync("./dataGHI.json"));

		// STUB
	},
	process: (state, id, data) => {
		// STUB
	},
	read: (state, id) => {
		// STUB
	},
	type: "receptor"
};
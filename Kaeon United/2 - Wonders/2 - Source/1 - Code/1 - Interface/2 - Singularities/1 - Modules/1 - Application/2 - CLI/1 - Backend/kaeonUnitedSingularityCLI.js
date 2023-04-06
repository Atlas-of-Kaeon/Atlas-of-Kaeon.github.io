#!/usr/bin/env node

function executeCommand(args) {

	require.startIntervals();

	let components = require("kaeon-united")().components.filter((item) => {
		
		return item.environment.toLowerCase() == "javascript" ||
			item.environment.toLowerCase() == "js";
	});

	let open = components.length;

	let callback = () => {

		open--;

		if(open == 0)
			require.clearIntervals();
	};

	components.forEach((item) => {

		try {
			require(item.reference)(args, callback);
		}

		catch(error) {
			callback();
		}
	});
}

require("kaeon-united")();

executeCommand(process.argv.slice(2));
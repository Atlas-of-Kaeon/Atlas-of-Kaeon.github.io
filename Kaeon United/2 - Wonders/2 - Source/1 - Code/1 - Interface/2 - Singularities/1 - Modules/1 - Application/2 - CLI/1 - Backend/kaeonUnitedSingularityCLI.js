#!/usr/bin/env node

function executeCommand(args) {

	let kaeonUnited = require("kaeon-united")();

	require.startIntervals();

	let components = kaeonUnited.components.filter((item) => {
		
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

executeCommand(process.argv.slice(2));
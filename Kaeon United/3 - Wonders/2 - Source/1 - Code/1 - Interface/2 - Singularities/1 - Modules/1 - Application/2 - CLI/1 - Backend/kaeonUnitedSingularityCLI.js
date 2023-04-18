#!/usr/bin/env node

function executeCommand(args) {

	require = require(
		__dirname + "/kaeonUnitedSingularityNode.js"
	).executeSingularity();

	let components = require("kaeon-united")().components.filter((item) => {
		
		return item.environment.toLowerCase() == "javascript" ||
			item.environment.toLowerCase() == "js";
	});

	let open = components.length;

	if(open == 0)
		return;

	let callback = () => {

		open--;

		if(open == 0)
			require.clearIntervals();
	};

	require.startIntervals();

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
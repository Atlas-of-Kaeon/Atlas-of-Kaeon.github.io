#!/usr/bin/env node

function executeCommand(args) {

	require("./kaeonUnitedSingularityNode.js");

	let utils = require(true);

	let components = utils.getUtilities(
		require("kaeon-united")(),
		{
			type: "component",
			environment: "javascript"
		}
	);

	let open = components.length;

	if(open == 0)
		return;

	let callback = () => {

		open--;

		if(open == 0)
			utils.clearIntervals();
	};

	utils.startIntervals();

	components.forEach((item) => {

		try {
			item(args, callback);
		}

		catch(error) {
			callback();
		}
	});
}

executeCommand(process.argv.slice(2));
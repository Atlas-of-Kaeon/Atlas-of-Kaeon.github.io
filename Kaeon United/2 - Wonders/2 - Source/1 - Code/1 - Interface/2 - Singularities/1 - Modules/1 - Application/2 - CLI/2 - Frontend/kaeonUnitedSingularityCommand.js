#!/usr/bin/env node

function executeCommand(args) {

	require().components.filter((item) => {
		
		return item.environment.toLowerCase() == "javascript" ||
			item.environment.toLowerCase() == "js";
	}).forEach((item) => {

		try {
			require(item.reference)(args, () => { });
		}

		catch(error) {
			
		}
	});
}

executeCommand(arguments);
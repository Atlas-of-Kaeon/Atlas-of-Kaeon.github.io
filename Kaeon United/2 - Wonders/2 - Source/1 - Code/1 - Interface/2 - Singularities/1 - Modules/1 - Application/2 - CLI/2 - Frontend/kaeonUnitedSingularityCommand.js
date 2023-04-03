#!/usr/bin/env node

function executeCommand(interface, args) {

	interface.components.filter((item) => {
		
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

executeCommand(require.getInterface(), arguments);
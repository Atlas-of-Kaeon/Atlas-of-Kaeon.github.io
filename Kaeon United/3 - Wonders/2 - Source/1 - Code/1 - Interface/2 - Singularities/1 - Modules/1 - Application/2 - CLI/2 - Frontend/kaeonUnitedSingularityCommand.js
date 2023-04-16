function executeCommand(args) {

	require("kaeon-united")().components.filter((item) => {
		
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

executeCommand(Array.from(arguments));
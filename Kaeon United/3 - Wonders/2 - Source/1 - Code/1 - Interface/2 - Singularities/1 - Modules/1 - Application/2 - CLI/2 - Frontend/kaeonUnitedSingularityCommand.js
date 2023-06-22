function executeCommand(args) {

	getUtilities(
		require("kaeon-united")(),
		{
			type: "component",
			environment: "javascript"
		}
	).forEach((item) => {

		try {
			item(args, () => { });
		}

		catch(error) {
			
		}
	});
}

executeCommand(Array.from(arguments));
module.exports = (args, callback) => {

	if(Array.isArray(args)) {

		callback();

		return;
	}

	let arg = args["app"]

	if(arg == null) {

		callback();

		return;
	}

	/*

	let redirect = "" +
		require(moduleDependencies.kaeonUtilities)(args["app"]);

	if(redirect.includes("?") && args.length > 1)
		redirect += "?";

	let rawArgs = getURLArguments(true);

	Object.keys(rawArgs).forEach((key) => {

		if(key.toLowerCase() == "app")
			return;

		if(!redirect.endsWith("?"))
			redirect += "?";

		redirect += rawArgs[key];
	});

	window.location.href = redirect;

	*/
};
module.exports = (args) => {

	if(Array.isArray(args))
		return;

	let arg = args["app"]

	if(arg == null)
		return;

	/*

	let redirect = "" + require(moduleDependencies.kaeonUtilities)(args["app"]);

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
function executeJS(code) {
	
	eval(
		"(async () => {" +
		require.ONESuite.preprocess(code) +
		"})()"
	);
}

module.exports = (args) => {

	if(Array.isArray(args))
		return;

	let arg = args["unitedjs"]

	if(arg == null)
		return;

	executeSingularity();

	executeJS(openResource(args["unitedjs"], true));
};
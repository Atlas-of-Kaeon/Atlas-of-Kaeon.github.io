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

	executeScript();

	executeJS(makeOnlineRequest(args["unitedjs"], true));
};
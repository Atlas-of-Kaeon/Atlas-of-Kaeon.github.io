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

	let arg = args["unitedjsraw"]

	if(arg == null)
		return;

	executeSingularity();

	executeJS(args["unitedjsraw"]);
};
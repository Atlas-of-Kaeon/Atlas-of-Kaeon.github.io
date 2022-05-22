function executeOP(code) {
	require.ONESuite.process(code);
}

module.exports = (args) => {

	if(Array.isArray(args))
		return;

	let arg = args["unitedop"]

	if(arg == null)
		return;

	executeScript();

	executeOP(fetchOnlineResource(args["unitedop"], true));
};
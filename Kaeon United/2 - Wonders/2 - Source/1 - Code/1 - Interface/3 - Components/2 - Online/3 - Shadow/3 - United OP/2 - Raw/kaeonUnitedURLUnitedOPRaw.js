function executeOP(code) {
	require.ONESuite.process(code);
}

module.exports = (args) => {

	if(Array.isArray(args))
		return;

	let arg = args["unitedopraw"]

	if(arg == null)
		return;

	executeSingularity();
	
	executeOP(args["unitedopraw"]);
};
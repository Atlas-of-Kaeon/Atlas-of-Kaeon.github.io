var moduleDependencies = {
	origin: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/2%20-%20System/2%20-%20Interface/2%20-%20Kaeon%20Origin/kaeonOrigin.js",
};

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

	if(Object.keys(args).length > 0)
		return;

	executeScript();
	
	executeJS(fetchOnlineResource(moduleDependencies.origin, true));
};
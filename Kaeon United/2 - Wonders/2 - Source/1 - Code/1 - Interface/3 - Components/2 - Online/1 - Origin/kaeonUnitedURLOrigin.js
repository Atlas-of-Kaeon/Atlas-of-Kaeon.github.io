var moduleDependencies = {
	origin: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/1%20-%20Code/3%20-%20Applications/2%20-%20Kaeon%20Origin/kaeonOrigin.js",
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
var moduleDependencies = {
	origin: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/3%20-%20Applications/1%20-%20Kaeon%20Origin/2%20-%20Kaeon%20Origin/KaeonOrigin.js",
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
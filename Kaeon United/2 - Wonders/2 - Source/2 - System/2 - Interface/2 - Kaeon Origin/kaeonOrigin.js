var moduleDependencies = {
	defaultConfig: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/2%20-%20System/2%20-%20Interface/2%20-%20Kaeon%20Origin/1%20-%20Resources/1%20-%20Default%20Config/kaeonOriginDefaultConfig.json"
};

var httpUtils = require("kaeon-united")("httpUtils");
var virtualSystem = require("kaeon-united")("virtualSystem");

document.title = "Kaeon Origin";

let args = httpUtils.getURLArguments(window.location.href);

virtualSystem.initiateVirtualSystemDefault();

virtualSystem.load(
	args.override != "true" ?
		moduleDependencies.defaultConfig :
		null
);

virtualSystem.load(args.config);
var moduleDependencies = {
	defaultConfig: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/2%20-%20Applications/2%20-%20Kaeon%20Origin/1%20-%20Resources/1%20-%20Default%20Config/kaeonOriginDefaultConfig.json",
	httpUtils: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/1%20-%20HTTP%20Utilities/1%20-%20JavaScript/1%20-%20Source/httpUtils.js",
	virtualSystem: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/3%20-%20Operations/1%20-%20Virtual%20System/1%20-%20JavaScript/1%20-%20Source/virtualSystem.js"
};

var httpUtils = require(moduleDependencies.httpUtils);
var virtualSystem = require(moduleDependencies.virtualSystem);

document.title = "Kaeon Origin";

let args = httpUtils.getURLArguments(window.location.href);

virtualSystem.initiateVirtualSystemDefault();

virtualSystem.load(
	args.override != "true" ?
		moduleDependencies.defaultConfig :
		null
);

virtualSystem.load(args.config);
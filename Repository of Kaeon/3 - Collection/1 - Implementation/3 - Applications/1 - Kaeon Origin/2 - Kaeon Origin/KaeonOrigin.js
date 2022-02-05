var moduleDependencies = {
	httpUtils: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/1%20-%20HTTP%20Utilities/1%20-%20JavaScript/1%20-%20Source/httpUtils.js",
	virtualSystem: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/2%20-%20Operations/1%20-%20Virtual%20System/1%20-%20JavaScript/1%20-%20Source/virtualSystem.js"
};

var httpUtils = require(moduleDependencies.httpUtils);
var virtualSystem = require(moduleDependencies.virtualSystem);

let args = httpUtils.getURLArguments(window.location.href);

if(args.startup != null)
	virtualSystem.initiateVirtualSystemDefault(args.startup);
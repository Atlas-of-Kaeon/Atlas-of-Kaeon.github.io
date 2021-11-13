var moduleDependencies = {
	httpUtils: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/1%20-%20Data/3%20-%20API/1%20-%20HTTP%20Utilities/1%20-%20JavaScript/1%20-%20Source/httpUtils.js",
	virtualSystem: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/2%20-%20Application/2%20-%20Virtual%20System/1%20-%20JavaScript/1%20-%20Source/virtualSystem.js"
};

var httpUtils = require(moduleDependencies.httpUtils);
var virtualSystem = require(moduleDependencies.virtualSystem);

virtualSystem.initiateVirtualSystemDefault(httpUtils.getURLArguments(window.location.href).startup);
var moduleDependencies = {
	tello: {
		launch: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/2%20-%20Control/2%20-%20Modules/1%20-%20Commands/3%20-%20Drone/1%20-%20Launch/1%20-%20JavaScript/1-Source/controlDroneLaunch.js"
	}
};

function generateUtilities(utilities) {

	var result = JSON.parse(JSON.stringify(utilities));
	
	Object.keys(result).forEach((key) => {
		result[key] = require(result[key]);
	});

	return result;
}

module.exports = (drone) => {

	if(drone.startsWith("TELLO-")) {

		return {
			type: "tello",
			utilities: generateUtilities(moduleDependencies.tello)
		};
	}

	return null;
};
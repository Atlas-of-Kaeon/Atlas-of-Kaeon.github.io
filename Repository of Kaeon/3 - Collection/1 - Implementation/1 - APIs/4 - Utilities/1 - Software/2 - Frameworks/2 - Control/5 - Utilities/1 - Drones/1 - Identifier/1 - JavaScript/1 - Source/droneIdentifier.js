var moduleDependencies = {
	tello: {
		launch: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/5%20-%20Utilities/1%20-%20Drones/2%20-%20Commands/1%20-%20Launch/1%20-%20Tello/1%20-%20JavaScript/1%20-%20Source/telloLaunch.js"
	}
};

function generateUtilities(utilities) {

	var result = JSON.parse(JSON.stringify(utilities));
	
	Object.keys(result).forEach((key) => {
		result[key] = require(path);
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
var moduleDependencies = {
	tello: {
		launch: ""
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
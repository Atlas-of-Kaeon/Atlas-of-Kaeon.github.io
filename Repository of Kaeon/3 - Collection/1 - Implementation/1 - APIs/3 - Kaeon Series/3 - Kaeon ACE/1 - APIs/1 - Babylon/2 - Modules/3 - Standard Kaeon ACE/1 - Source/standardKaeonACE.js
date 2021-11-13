/*

	on call: take core and data string, return string
	on default: take core
	on deserialize: take core, ace, and entity, modify entity
	on entity: take core, entity, and delta
	on serialize: take core and entity, return a ONE list form element or null
	on update: take core and delta

 */

var moduleDependencies = {
	modules: {
		cameraModules: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/3%20-%20Kaeon%20Series/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/2%20-%20Camera/1%20-%20Source/cameraModules.js",
		geometryModules: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/3%20-%20Kaeon%20Series/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/3%20-%20Geometry/1%20-%20Source/geometryModules.js",
		standardModules: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/3%20-%20Kaeon%20Series/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/1%20-%20Standard/1%20-%20Source/standardModules.js"
	},
	philosophersStone: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Philosopher's%20Stone/1%20-%20Philosopher's%20Stone/1%20-%20JavaScript/1%20-%20Source/PhilosophersStone.js",
};

var philosophersStone = require(moduleDependencies.philosophersStone);

module.exports = function(core) {

	let modules = [];
	
	Object.values(moduleDependencies.modules).forEach((unit) => {
		modules = modules.concat(require(unit));
	});

	for(let i = 0; i < modules.length; i++) {

		modules[i].tags = modules[i].tags ?
			modules[i].tags.concat(["Kaeon ACE"]) :
			["Kaeon ACE"];

		philosophersStone.connect(core, modules[i], [], true);
	}
};
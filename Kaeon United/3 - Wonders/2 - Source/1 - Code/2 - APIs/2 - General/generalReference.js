var moduleDependencies = {
	generalInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/1%20-%20Interface/1%20-%20Interfaces/2%20-%20General%20Interface/kaeonUnitedGeneralInterface.json"
};

var io = require("kaeon-united")("io");

function getUtilities(utilities, path) {

	path = path != null ? path : "";

	let result = { };

	if(utilities.utilities != null) {

		Object.keys(utilities.utilities).forEach((key) => {

			let item = utilities.utilities[key];

			if(item.versions == null)
				return;

			if(item.versions.length == 0)
				return;

			let version = item.versions[0];

			if(version.locations == null)
				return;

			if(version.locations.length == 0)
				return;

			result[path + "." + key] = require(version.locations[0]);
		});
	}

	if(utilities.packages != null) {

		Object.keys(utilities.packages).forEach((key) => {

			Object.assign(
				result,
				getUtilities(
					utilities.packages[key],
					path + "." + key
				)
			);
		});
	}

	return result;
}

let data = getUtilities(
	JSON.parse(
		io.open(moduleDependencies.generalInterface)
	).utilities
);

module.exports = (path) => {

	path = path.toLowerCase();

	let keys = Object.keys(data);

	for(let i = 0; i < keys.length; i++) {
		
		if(keys[i].endsWith(path)) {

			let newModule = { };
			
			Object.assign(newModule, data[keys[i]]);

			if(data[keys[i]].methods != null)
				Object.assign(newModule, data[keys[i]].methods);

			return data[keys[i]];
		}
	}

	let newModule = { interfaces: { } };

	Object.values(data).forEach((item) => {

		if(item.interfaces == null)
			return;

		if(item.interfaces[path] == null)
			return;

		newModule.interfaces[item.interfaces[path].name] =
			item.interfaces[path].methods;
	});

	if(Object.values(newModule.interfaces).length != 0)
		Object.assign(newModule, Object.values(newModule.interfaces)[0]);

	return newModule;
};
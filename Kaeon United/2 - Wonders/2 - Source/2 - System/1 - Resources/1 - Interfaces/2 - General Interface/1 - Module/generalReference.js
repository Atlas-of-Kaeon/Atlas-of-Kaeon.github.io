var moduleDependencies = {
	generalInterface: ""
};

var io = require("kaeon-united")("io");

let data = { };

JSON.parse(
	io.open(moduleDependencies.generalInterface)
).modules.forEach((item) => {

	data[item.path.join(".").toLowerCase()] =
		require(item.implementations[0].reference);
});

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

	Object.values.forEach((item) => {

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
}
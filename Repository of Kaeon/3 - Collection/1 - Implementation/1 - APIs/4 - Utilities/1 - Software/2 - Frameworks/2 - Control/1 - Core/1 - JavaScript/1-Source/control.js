var moduleDependencies = {
	io: "",
	scripts: {
		main: "" // STUB
	},
	modules: [
		"" // STUB - controlRaspberryPi.js
	]
};

var io = require(moduleDependencies.io);

function call(contact, packet, callback) {

	let service = getModules("service", "service", contact.service);

	if(service.length == 0)
		return;

	let devices = getDevices(contact.device);
	let receptor = getReceptor(devices);
	
	let message = { };

	if(receptor != null)
		message[receptor] = { script: moduleDependencies.scripts.main };

	packet.forEach((item) => {

		let command = getModules("command", "command", packet.command);

		if(command != null)
			command.process(devices, item.operation, message);
	});

	service.process(contact.contact.credentials, message, callback);
}

function getDevices(device) {

	device = device != null ? device : "";

	let modules = getModules("device", "device", device);

	return modules.length > 0 ?
		modules[0] : 
		{
			receptor: ["0"],
			gpio: ["1"],
			serial: ["2"],
			display: ["3"],
			recorder: ["4"],
			wifi: ["5"],
			bluetooth: ["6"],
			cellular: ["7"]
		};
}

function getModules(type, field, key) {

	return moduleDependencies.modules.filter((item) => {

		if(item.type != type)
			return false;

		if(field == null)
			return true;

		return item[field].split(" ").join("").toLowerCase() ==
			key.split(" ").join("").toLowerCase();
	});
}

function getReceptor(devices) {

	if(devices["receptor"] == null)
		return null;

	return devices["receptor"].length > 0 ? devices["receptor"][0] : null;
}

Object.keys(moduleDependencies.scripts).forEach((item) => {

	moduleDependencies.scripts[item] =
		io.open(moduleDependencies.scripts[item]);
});

moduleDependencies.modules = moduleDependencies.modules.map((item) => {
	return require(item);
});

module.exports = {
	call,
	scripts: moduleDependencies.scripts
};
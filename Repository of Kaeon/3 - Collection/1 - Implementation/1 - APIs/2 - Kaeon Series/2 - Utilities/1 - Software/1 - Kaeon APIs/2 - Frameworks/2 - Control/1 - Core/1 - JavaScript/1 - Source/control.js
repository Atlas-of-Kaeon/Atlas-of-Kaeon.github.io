var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	modules: {
		device: {
			raspberryPi: ""
		},
		service: {
			hologram: ""
		},
		command: {
			receptorReset: "",
			receptorSet: "",
			gpioSet: "",
			gpioFlip: "",
			gpioFlicker: "",
			droneLaunch: ""
		}
	},
	scripts: {
		main: ""
	}
};

var io = require(moduleDependencies.io);

var modules = moduleDependencies.modules;
var scripts = moduleDependencies.scripts;

function call(contact, packet, callback) {

	return sendCall(
		contact.contact,
		getMessage(packet, contact.device, contact.state),
		callback
	);
}

function formatKey(key) {
	return key.split(" ").join("").toLowerCase();
}

function getMessage(packet, device, state) {

	device = device != null ? device : "";

	let devices = modules.device[formatKey(device)] != null ?
		modules.device[formatKey(device)] : 
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
	
	let receptor = null;

	if(devices["receptor"] != null) {

		receptor = devices["receptor"].length > 0 ?
			devices["receptor"][0] :
			null;
	}
	
	let message = { };

	if(receptor != null)
		message[receptor] = { script: scripts.main };

	packet.forEach((item) => {

		let command = modules.command[formatKey(item.command)];

		if(command != null) {

			let temp = JSON.stringify(message);

			try {
				command(devices, item.operation, message, state);
			}

			catch(error) {

				console.log(error.stack);

				message = JSON.parse(temp);
			}
		}
	});

	return message;
}

function sendCall(contact, message, callback) {

	let service = modules.service[formatKey(contact.service)];

	if(service == null)
		return;

	try {
		return service(contact.credentials, message, callback);
	}

	catch(error) {
		console.log(error.stack);
	}
}

Object.keys(scripts).forEach((item) => {
	scripts[item] = io.open(scripts[item]);
});

["command", "device", "service"].forEach((list) => {

	Object.keys(modules[list]).forEach((key) => {

		let path = modules[list][key];

		delete modules[list][key];

		modules[list][formatKey(key)] = require(path);
	});
});

module.exports = {
	call,
	getMessage,
	scripts,
	sendCall
};
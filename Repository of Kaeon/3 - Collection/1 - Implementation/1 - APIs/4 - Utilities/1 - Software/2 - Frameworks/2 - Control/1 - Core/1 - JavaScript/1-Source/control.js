var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	modules: {
		device: {
			raspberryPi: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/2%20-%20Devices/1%20-%20Raspberry%20Pi/1%20-%20JavaScript/1%20-%20Source/controlRaspberryPi.js"
		},
		service: {
			hologram: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/3%20-%20Services/1%20-%20Hologram/1%20-%20JavaScript/1%20-%20Source/controlHologram.js"
		},
		command: {
			gpioFlip: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/1%20-%20GPIO/1%20-%20Flip/1%20-%20JavaScript/1%20-%20Source/controlGPIOFlip.js"
		}
	},
	scripts: {
		main: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/5%20-%20Scripts/1%20-%20Main/controlMainScript.js"
	}
};

var io = require(moduleDependencies.io);

var modules = moduleDependencies.modules;
var scripts = moduleDependencies.scripts;

function call(contact, packet, callback) {
	sendCall(contact.contact, getMessage(packet, contact.device), callback);
}

function formatKey(key) {
	return key.split(" ").join("").toLowerCase();
}

function getMessage(packet, device) {

	let devices = modules.device[formatKey(device)] == null ?
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
				command(devices, item.operation, message);
			}

			catch(error) {
				
				console.log(error);

				message = JSON.parse(temp);
			}
		}
	});

	return message;
}

function sendCall(contact, message, callback) {

	let service = modules.service[formatKey(contact.service)];

	if(service.length == 0)
		return;

	try {
		service(contact.credentials, message, callback);
	}

	catch(error) {
		console.log(error);
	}
}

Object.keys(scripts).forEach((item) => {
	scripts[item] = io.open(scripts[item]);
});

["command", "device", "service"].forEach((list) => {

	Object.keys(modules[list]).forEach((key) => {

		modules[list][key] = require(modules[list][key]);

		delete modules[list][key];
	});
});

module.exports = {
	call,
	getMessage,
	scripts,
	sendCall
};
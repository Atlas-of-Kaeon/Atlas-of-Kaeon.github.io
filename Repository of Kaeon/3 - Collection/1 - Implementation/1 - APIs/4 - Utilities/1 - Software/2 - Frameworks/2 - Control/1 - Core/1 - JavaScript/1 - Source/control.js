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
			receptorReset: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/1%20-%20Receptor/1%20-%20Reset/1%20-%20JavaScript/1%20%20-Source/controlReceptorReset.js",
			receptorSet: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/1%20-%20Receptor/2%20-%20Set/1%20-%20JavaScript/1%20%20-Source/controlReceptorSet.js",
			gpioSet: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/2%20-%20GPIO/1%20-%20Set/1%20-%20JavaScript/1%20-%20Source/controlGPIOSet.js",
			gpioFlip: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/1%20-%20GPIO/1%20-%20Flip/1%20-%20JavaScript/1%20-%20Source/controlGPIOFlip.js",
			gpioFlicker: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/2%20-%20GPIO/3%20-%20Flicker/1%20-%20JavaScript/1%20-%20Source/controlGPIOFlicker.js",
			droneLaunch: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/4%20-%20Commands/3%20-%20Drone/1%20-%20Launch/1%20-%20JavaScript/1-Source/controlDroneLaunch.js"
		}
	},
	scripts: {
		main: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/6%20-%20Scripts/1%20-%20Main/1%20-%20JavaScript/1%20-%20Source/controlMainScript.js"
	}
};

var io = require(moduleDependencies.io);

var modules = moduleDependencies.modules;
var scripts = moduleDependencies.scripts;

function call(contact, packet, callback) {

	sendCall(
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
		service(contact.credentials, message, callback);
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
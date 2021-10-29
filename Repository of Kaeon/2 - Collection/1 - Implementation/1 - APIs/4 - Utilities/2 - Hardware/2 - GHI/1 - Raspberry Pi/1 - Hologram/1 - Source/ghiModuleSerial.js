var serial = require("./serial.js");

var deviceState = null;
var devices = null;

function getDevice(ports, item) {

	if(ports == null)
		return null;

	let match = ports.filter((device) => {
		return device.pnpId == item.device || device.path == item.device;
	});

	if(match.length == 0)
		return null;
	
	return match[0];
}

function createLink(device) {
			
	try {

		device.link = serial.connect(
			device.path,
			(data, rawData) => {
				device.response = data;
			}
		);
	}

	catch(error) {

		console.log(error);

		link = { write: () => { } };
	}
}

function sendData(ports, data) {

	data.forEach((item) => {

		let device = getDevice(ports, item);

		if(device == null)
			return;

		if(device.link == null)
			createLink(device);

		else
			device.link.write(serial.getMessage(item.data));
	});
}

function setPorts(init, callback) {
		
	serial.getPorts((ports) => {

		if(deviceState != JSON.stringify(ports)) {

			deviceState = JSON.stringify(ports);

			if(devices != null) {

				devices.forEach((device) => {
					
					if(device.link != null && device.link.isOpen)
						device.link.close();
				});
			}

			devices = ports;

			if(init) {

				devices.forEach((device) => {
					createLink(device);
				});
			}
		}

		if(callback != null)
			callback();
	});
}

module.exports = {
	block: (state, call) => {
		return false;
	},
	init: (callback, state, id, args) => {
		setPorts(true);
	},
	process: (state, id) => {

		let init = deviceState == null;

		if(!init)
			sendData(devices.slice(0), state[id].output);

		setPorts(false, () => {

			if(init)
				sendData(devices, state[id].output);
		});
	},
	read: (state, id) => {

		if(devices == null)
			return [];
	
		return devices.map((device) => {

			return {
				id: {
					pnp: device.pnpId,
					path: device.path
				},
				data: device.response
			};
		});
	},
	type: "serial"
};
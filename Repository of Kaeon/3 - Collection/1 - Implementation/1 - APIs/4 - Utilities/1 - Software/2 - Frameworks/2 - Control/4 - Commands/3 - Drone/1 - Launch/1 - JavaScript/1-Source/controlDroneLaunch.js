moduleDependencies = {
	droneIdentifier: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/2%20-%20Control/5%20-%20Utilities/1%20-%20Drones/1%20-%20Identifier/1%20-%20JavaScript/1%20-%20Source/droneIdentifier.js"
};

var droneIdentifier = require(moduleDependencies.droneIdentifier);

module.exports = (devices, operation, message, state) => {

	if(devices.receptor == null || devices.wifi == null)
		return;

	if(devices.receptor.length == 0 || devices.wifi.length == 0)
		return;

	let receptor = devices.receptor[0];
	let wifi = devices.wifi[0];

	let drone = operation.drone;

	let data = droneIdentifier(drone).utilities.launch(
		receptor,
		wifi,
		drone
	);

	if(message[receptor].metadata == null)
		message[receptor].metadata = { };

	if(message[receptor].metadata.schedule == null)
		message[receptor].metadata.schedule = { };

	if(message[receptor].metadata.schedule.sequences == null)
		message[receptor].metadata.schedule.sequences = [];

	if(message[receptor].metadata.schedule.intervals == null)
		message[receptor].metadata.schedule.intervals = [];

	if(data.sequences != null) {

		message[receptor].metadata.schedule.sequences =
			message[receptor].metadata.schedule.sequences.concat(
				data.sequences
			);
	}

	if(data.intervals != null) {

		message[receptor].metadata.schedule.intervals =
			message[receptor].metadata.schedule.intervals.concat(
				data.intervals
			);
	}
};
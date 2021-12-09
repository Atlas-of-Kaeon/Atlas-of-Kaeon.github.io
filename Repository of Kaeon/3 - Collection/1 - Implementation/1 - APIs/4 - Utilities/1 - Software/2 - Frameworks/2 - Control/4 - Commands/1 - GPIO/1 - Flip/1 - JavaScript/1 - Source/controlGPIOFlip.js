module.exports = (devices, operation, message) => {

	if(devices.gpio == null)
		return;

	if(devices.gpio.length == 0)
		return;

	let gpio = devices.gpio[0];
	let pin = operation.pin;

	message[gpio] = message[gpio] != null ? message[gpio] : [];

	while(array.length < pin + 1)
		message[gpio].push(0);

	message[gpio][pin] = message[gpio][pin] == 0 ? 1 : 0;
};
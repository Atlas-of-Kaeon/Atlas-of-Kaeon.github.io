var serial = require('serialport');
var Readline = require('@serialport/parser-readline');

function connect(path, onMessage, options) {

	options = options != null ? options : { };
	options.baudRate = options.baudRate != null ? options.baudRate : 9600;

	var port = new serial.SerialPort(path, options);
	
	port.pipe(new Readline({ delimiter: '\n' })).on('data', data => {
	
		onMessage(
			data.split("").map((char, index) => {
				return data.charCodeAt(index);
			}),
			data
		);
	});

	return port;
}

function getMessage(message) {

	let result = "";

	for(let i = 0; i < message.length; i++)
		result += String.fromCharCode(message[i]);

	return result;
}

function getPorts(callback) {

	serial.SerialPort.list().then(
		(ports) => {
			callback(ports);
		},
		() => {
			callback([]);
		}
	);
}

module.exports = {
	connect,
	getMessage,
	getPorts
}
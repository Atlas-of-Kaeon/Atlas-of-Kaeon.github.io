var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');

function connect(port, onMessage) {

	var port = new SerialPort(port, { baudRate: 9600 });
	
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

module.exports = {
	connect,
	getMessage
}
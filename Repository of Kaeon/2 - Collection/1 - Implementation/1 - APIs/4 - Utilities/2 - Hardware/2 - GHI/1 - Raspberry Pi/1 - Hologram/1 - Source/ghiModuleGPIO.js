var gpio = {
	mode: () => { },
	open: () => { },
	read: () => { return 0; },
	write: () => { },
}

try {
	gpio = require("rpio");
}

catch(error) {

}

var pins = [];
var on = [];

module.exports = {
	block: (state, call) => {
		return false;
	},
	init: (callback, state, id, args) => {
	 
		for(let i = 0; i <= 40; i++) {
	 
			try {
	 
				gpio.open(i, gpio.INPUT);
	 
				pins.push(i);
			}
	 
			catch(error) {
	 
			}
		}
	},
	process: (state, id) => {
	
		if(state[id].output.on != null) {

			pins.forEach((i, index) => {

				if(!on.includes(index) &&
					state[id].output.on.includes(index)) {

					gpio.mode(i, gpio.OUTPUT);

					gpio.write(i, gpio.HIGH);
				}

				else if(on.includes(index) &&
					!state[id].output.on.includes(index)) {

					gpio.write(i, gpio.LOW);

					gpio.mode(i, gpio.INPUT);
				}
			});

			on = state[id].output.on;
		}
	},
	read: (state, id) => {
	
		let reading = [];
	
		pins.forEach((i) => {
	
			if(state[id].output.on.includes[i])
				reading.push(null);
	
			else
				reading.push(gpio.read(i));
		});
	
		return reading;
	},
	type: "gpio"
};
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

module.exports = {
	init: (state, id, args) => {
	 
		for(let i = 0; i <= 40; i++) {
	 
			try {
	 
				gpio.open(i, gpio.INPUT);
	 
				pins.push(i);
			}
	 
			catch(error) {
	 
			}
		}
		
		state[id].on = [];
	},
	process: (state, id, data) => {
	
		if(data.on != null) {

			pins.forEach((i, index) => {

				if(!state[id].on.includes(index) &&
					data.on.includes(index)) {

					gpio.mode(i, gpio.OUTPUT);

					gpio.write(i, gpio.HIGH);
				}

				else if(state[id].on.includes(index) &&
					!data.on.includes(index)) {

					gpio.write(i, gpio.LOW);

					gpio.mode(i, gpio.INPUT);
				}
			});

			state[id].on = data.on;
		}
	},
	read: (state, id) => {
	
		let reading = [];
	
		pins.forEach((i) => {
	
			if(state[id].on.includes[i])
				reading.push(null);
	
			else
				reading.push(gpio.read(i));
		});
	
		return reading;
	}
};
function getInstruction(wifi, drone, instruction) {

	let instruction = {
		delta: 2,
		operation: { }
	}

	instruction.operation[wifi] = {
		"output": {
			"credentials": {
				"ssid": drone,
				"host": "192.168.10.1",
				"port": 8889
			},
			"data": instruction
		}
	};

	return instruction;
}

module.exports = (receptor, wifi, drone) => {
	
	return {
		sequences: [
			[
				getInstruction(wifi, drone, "command"),
				getInstruction(wifi, drone, "battery?"),
				getInstruction(wifi, drone, "takeoff")
			]
		]
	};
};
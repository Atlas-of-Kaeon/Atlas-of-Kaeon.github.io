if(state["0"].output.metadata == null)
	state["0"].output.metadata = { };

let metadata = state["0"].output.metadata;

if(metadata.sequence == null)
	metadata.sequence = [];

if(metadata.delta == null)
	metadata.delta = 0;

metadata.delta -= delta;

if(metadata.sequence.length == 0 || metadata.delta > 0)
	return null;

let operation = metadata.sequence[0].operation;

if(metadata.sequence[0].delta != null)
	metadata.delta = metadata.sequence[0].delta;

metadata.sequence = metadata.sequence.slice(0);

let newState = JSON.parse(JSON.stringify(state));

Object.keys(operation).forEach((key) => {
	Object.assign(newState[key], operation[key]);
});

return JSON.stringify(newState);
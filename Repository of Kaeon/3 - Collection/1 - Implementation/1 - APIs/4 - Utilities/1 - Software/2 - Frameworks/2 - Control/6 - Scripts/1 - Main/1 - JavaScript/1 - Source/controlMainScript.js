if(state["0"].output.metadata == null)
	state["0"].output.metadata = { };

let metadata = state["0"].output.metadata;

if(metadata.schedule == null)
	metadata.schedule = { };

if(metadata.schedule.sequences == null)
	metadata.schedule.sequences = [];

if(metadata.schedule.intervals == null)
	metadata.schedule.intervals = [];

let newState = JSON.parse(JSON.stringify(state));

metadata.schedule.sequences.forEach((sequence) => {

	if(sequence.delta == null)
		sequence.delta = 0;
	
	sequence.delta -= delta / 1000;
	
	if(sequence.sequence.length == 0 || sequence.delta > 0)
		return;
	
	let operation = sequence.sequence[0].operation;
	
	if(sequence.sequence[0].delta != null)
		sequence.delta = sequence.sequence[0].delta;
	
	sequence.sequence = sequence.sequence.slice(1);
	
	Object.keys(operation).forEach((key) => {
		Object.assign(newState[key], operation[key]);
	});
});

metadata.schedule.intervals.forEach((interval) => {

	if(interval.delta == null)
		interval.delta = 0;

	if(interval.deltaCount == null)
		interval.deltaCount = 0;
	
	interval.deltaCount -= delta / 1000;
	
	if(interval.deltaCount > 0)
		return null;

	interval.deltaCount = interval.delta;

	if(interval.operation == null)
		interval.operation = "";
	
	Object.assign((new Function(interval.operation))(state), newState);
});

return JSON.stringify(newState);
var fs = require("fs");

function processClean() {

	if(fs.existsSync(__dirname + "/dataGHI.json"))
		fs.rmSync(__dirname + "/dataGHI.json");

	if(fs.existsSync(__dirname + "/dataJSH.json"))
		fs.rmSync(__dirname + "/dataJSH.json");

	if(fs.existsSync(__dirname + "/dataLog.json"))
		fs.rmSync(__dirname + "/dataLog.json");
}

function isEnabled() {
	// STUB
}

function processClear(port, args) {
	// STUB
}

function processDisable(port, args) {
	// STUB
}

function processEnable(port, args) {
	// STUB
}

function processLog(port, args) {
	// STUB
}

function processPing(port, args) {
	// STUB
}

function processReset(port, args) {
	// STUB
}

function processStatus(port, args) {
	// STUB
}

function processCommand(port, args) {

	if(process.argv[2] == "clear")
		processClear(port, args);

	if(process.argv[2] == "disable")
		processDisable(port, args);

	if(process.argv[2] == "enable")
		processEnable(port, args);

	if(process.argv[2] == "log")
		processLog(port, args);

	if(process.argv[2] == "ping")
		processPing(port, args);

	if(process.argv[2] == "reset")
		processReset(port, args);

	if(process.argv[2] == "status")
		processStatus(port, args);
}

module.exports = {
	processCommand
}
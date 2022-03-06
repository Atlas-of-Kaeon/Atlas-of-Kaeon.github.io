var child_process = require("child_process");
var fs = require("fs");

function isEnabled() {
	// STUB
}

function processClear(port, args) {

	if(fs.existsSync(__dirname + "/dataLog.json"))
		fs.rmSync(__dirname + "/dataLog.json");
}

function processDisable(port, args) {
	
	if(process.platform != "win32")
		processDisableLinux();
}

function processDisableLinux() {

	fs.writeFileSync(
		"/var/spool/cron/crontabs/root",
		""
	);

	child_process.execSync("sudo reboot"); // STUB
}

function processEnable(port, args) {
	
	if(process.platform != "win32")
		processEnableLinux();
}

function processEnableLinux() {

	fs.writeFileSync(
		"/var/spool/cron/crontabs/root",
		"@reboot sudo /usr/local/bin/node " + __dirname + "/ghi.js 80"
	);

	child_process.execSync("sudo reboot"); // STUB
}

function processLog(port, args) {
	// STUB
}

function processPing(port, args) {
	// STUB
}

function processReset(port, args) {

	if(fs.existsSync(__dirname + "/dataGHI.json"))
		fs.rmSync(__dirname + "/dataGHI.json");

	if(fs.existsSync(__dirname + "/dataJSH.json"))
		fs.rmSync(__dirname + "/dataJSH.json");
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
};
var child_process = require("child_process");
var fs = require("fs");
var httpUtils = require(__dirname + "/httpUtils.js");

function isEnabled(port) {

	try {

		JSON.parse(
			httpUtils.sendRequest({
				request: {
					method: "POST",
					uri: "http://localhost:" + port
				},
				headers: {
					"Content-Type": "application/json"
				},
				body: ""
			}).body
		);

		return true;
	}

	catch(error) {
		return false;
	}
}

function processClear(port, args) {

	if(fs.existsSync(__dirname + "/dataLog.json"))
		fs.rmSync(__dirname + "/dataLog.json");
}

function processDisable(port, args) {

	let status = isEnabled(port);

	if(status) {
		
		[port, port + 1, port + 2].forEach((item) => {

			try {

				httpUtils.sendRequest({
					request: {
						method: "POST",
						uri: "http://localhost:" + item
					},
					headers: {
						"Content-Type": "application/json"
					},
					body: "TERMINATE"
				});
			}

			catch(error) {
				console.log(error);
			}
		});
	}
	
	if(process.platform != "win32")
		processDisableLinux();
}

function processDisableLinux() {

	fs.writeFileSync(
		"/var/spool/cron/crontabs/root",
		""
	);
}

function processEnable(port, args) {

	let status = isEnabled(port);

	if(!status) {

		child_process.exec(
			(process.platform != "win32" ?
				"sudo /usr/local/bin/" :
				"") +
			"node \"" + __dirname + "/ghi.js\" " + port
		);
	}
	
	if(process.platform != "win32")
		processEnableLinux(port, status);
}

function processEnableLinux(port, status) {

	fs.writeFileSync(
		"/var/spool/cron/crontabs/root",
		"@reboot sudo /usr/local/bin/node " +
			__dirname +
			"/autoVersioner.js sudo /usr/local/bin/node " +
			__dirname +
			"/ghi.js " +
			port
	);
}

function processLog(port, args) {

	let log = "";
	
	if(fs.existsSync(__dirname + "/dataLog.json"))
		log = fs.readFileSync(__dirname + "/dataLog.json", 'utf-8');

	if(args.length == 0)
		console.log(log);

	else
		fs.writeFileSync(log, args[0]);
}

function processPing(port, args) {

	console.log(
		httpUtils.sendRequest({
			request: {
				method: "POST",
				uri: "http://localhost:" + port
			},
			headers: {
				"Content-Type": "application/json"
			},
			body: args[0]
		})
	);
}

function processReset(port, args) {

	if(fs.existsSync(__dirname + "/dataGHI.json"))
		fs.rmSync(__dirname + "/dataGHI.json");

	if(fs.existsSync(__dirname + "/dataJSH.json"))
		fs.rmSync(__dirname + "/dataJSH.json");
}

function processStatus(port, args) {
	console.log(isEnabled(port) ? "On" : "Off");
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
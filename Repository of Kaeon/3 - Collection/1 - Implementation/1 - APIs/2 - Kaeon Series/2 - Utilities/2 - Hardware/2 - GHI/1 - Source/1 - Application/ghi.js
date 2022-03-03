#!/usr/bin/env node

var child = require("child_process");
var fs = require("fs");

let defaultPort = 80;

let dataGHI = { };

try {
	dataGHI = JSON.parse(fs.readFileSync(__dirname + "/dataGHI.json"));
}

catch(error) {
	dataGHI = { };
}

if(dataGHI.access == null)
	dataGHI.access = { };

let port = dataGHI.access.port != null ?
	dataGHI.access.port :
	(process.argv.length > 2 ?
		process.argv[2] :
		"" + defaultPort
	);

port = Number(port) != NaN ? Number(port) : defaultPort;

if(process.argv.length > 3 ? isNaN(Number(process.argv[2])) : false) {

	let wifiPort = process.argv.length > 3 ?
		process.argv[3] : port + 1;

	let jshPort = process.argv.length > 4 ?
		process.argv[4] : wifiPort + 1;

	child.exec(
		(process.platform == "win32" ? "" : "sudo /usr/local/bin/") +
		"node " +
		__dirname +
		"/ghiServerWifi.js " +
		wifiPort
	);

	child.exec(
		(process.platform == "win32" ? "" : "sudo /usr/local/bin/") +
		"node " +
		__dirname +
		"/ghiServerJSH.js " +
		jshPort +
		" " +
		port
	);

	child.exec(
		(process.platform == "win32" ? "" : "sudo /usr/local/bin/") +
		"node " +
		__dirname +
		"/ghiServerRouter.js " +
		port +
		" " +
		wifiPort +
		" " +
		jshPort
	);

	if(process.platform != "win32") {

		child.exec(
			"sudo /bin/python3 " +
			__dirname +
			"/uhapi.py " +
			port
		);
	}
}

else {

	require(__dirname + "/ghiUtilities.js").processCommand(
		port,
		process.argv.slice(2)
	);
}
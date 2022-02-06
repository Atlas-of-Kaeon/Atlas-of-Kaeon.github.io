var child = require("child_process");
var fs = require("fs");

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
		1233
	);

let wifiPort = process.argv.length > 3 ?
	process.argv[3] : port + 1;

let jshPort = process.argv.length > 4 ?
	process.argv[4] : wifiPort + 1

child.exec(
	"sudo /usr/local/bin/node " +
	__dirname +
	"/ghiServerWifi.js " +
	wifiPort
);

child.exec(
	"sudo /usr/local/bin/node " +
	__dirname +
	"/ghiServerJSH.js " +
	port +
	" " +
	jshPort
);

child.exec(
	"sudo /usr/local/bin/node " +
	__dirname +
	"/ghiServerRouter.js " +
	port +
	" " +
	wifiPort +
	" " +
	jshPort
);

child.exec(
	"sudo /bin/python3 " +
	__dirname +
	"/uhapi.py " +
	port
);
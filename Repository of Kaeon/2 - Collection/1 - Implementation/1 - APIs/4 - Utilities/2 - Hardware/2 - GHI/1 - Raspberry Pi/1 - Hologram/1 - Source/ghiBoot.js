var child = require("child_process");

let port = process.argv.length > 2 ?
	process.argv[2] : 1233;

let wifiPort = process.argv.length > 3 ?
	process.argv[3] : (port != 1234 ? 1234 : 1233);

child.exec(
	"node wifiServer.js " + wifiPort
);

child.exec("node ghi.js " + port + " " + wifiPort);

child.exec("sudo python3 hologram.py " + port);
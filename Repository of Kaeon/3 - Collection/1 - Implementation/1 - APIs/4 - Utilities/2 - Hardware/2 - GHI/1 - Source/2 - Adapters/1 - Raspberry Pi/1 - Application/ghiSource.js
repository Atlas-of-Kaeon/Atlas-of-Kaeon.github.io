var child = require("child_process");

let port = process.argv.length > 2 ?
	process.argv[2] : 1233;

let wifiPort = process.argv.length > 3 ?
	process.argv[3] : (port != 1234 ? 1234 : 1233);

child.exec("sudo /usr/local/bin/node " + __dirname + "/ghiServerWifi.js " + wifiPort);
child.exec("sudo /usr/local/bin/node " + __dirname + "/ghiServerRouter.js " + port + " " + wifiPort);
child.exec("sudo /bin/python3 " + __dirname + "/uhapi.py " + port);
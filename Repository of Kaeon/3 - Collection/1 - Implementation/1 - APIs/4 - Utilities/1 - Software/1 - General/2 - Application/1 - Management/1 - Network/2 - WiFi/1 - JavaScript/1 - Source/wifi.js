var childProcess = require("child_process");
var fs = require("fs");
var wifi = process.platform == "win32" ? require("node-wifi") : { };

var open = false;

function initWindows() {

	wifi.init({
		face: null
	});
}

function init() {

	if(process.platform == "win32")
		initWindows();
}

function getNetworks(callback) {
	wifi.scan(callback);
}

function connectWindows(credentials, callback) {

	open = true;
	
	wifi.scan((error, networks) => {
	
		if(error) {
	
			callback(error);
	
			return;
		}
	
		if(networks.filter((item) => {
			return item.ssid == credentials.ssid;
		}).length > 0) {
	
			wifi.connect(
				{
					ssid: credentials.ssid,
					password: credentials.password
				},
				error => {
		
					if(error)
						console.log(error);

					open = false;

					callback();
				}
			);
		}

		else if(open) {

			setTimeout(() => {
				connect(credentials, callback);
			});
		}
	});
}

function connectLinux(credentials, callback) {
	
	let data = fs.readFileSync("/etc/wpa_supplicant/wpa_supplicant.conf", 'utf8');

	data = data.substring(0, data.indexOf("\n\n")) +
		"\n\nnetwork={\n\tssid=\"" +
		credentials.ssid +
		"\"\n\t" +
		(credentials.password != null ?
			"psk=\"" +
				credentials.password +
				"\"\n\tkey_mgmt=WPA-PSK" :
			"key_mgmt=NONE"
		) +
		"\n}\n";

	fs.writeFileSync("/etc/wpa_supplicant/wpa_supplicant.conf", data);

	childProcess.execSync("sudo /usr/sbin/wpa_cli -i wlan0 reconfigure");

	callback();
}

function connect(credentials, callback) {

	if(process.platform == "win32")
		connectWindows(credentials, callback);

	else
		connectLinux(credentials, callback);
}

function close() {
	open = false;
}

init();

module.exports = {
	open,
	getNetworks,
	connect,
	close
};
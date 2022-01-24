var childProcess = require("child_process");
var fs = require("fs");
var wifi = process.platform == "win32" ? require("node-wifi") : { };

var open = false;

function close() {
	open = false;
}

function connect(credentials, callback) {

	if(process.platform == "win32")
		connectWindows(credentials, callback);

	else
		connectLinux(credentials, callback);
}

function connectLinux(credentials, callback) {

	try {
	
		let data = fs.readFileSync(
			"/etc/wpa_supplicant/wpa_supplicant.conf",
			'utf8'
		);
	
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

	catch(error) {
		console.log(error);
	}
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

function getNetworks(callback) {
	wifi.scan(callback);
}

function getSerialNumberLinux() {

	let raw = child_process.execSync(
		'/usr/bin/cat /proc/cpuinfo | grep Serial'
	).toString();

	raw = raw.substring(raw.lastIndexOf(" ") + 1);

	return "" + parseInt(raw, 16);
}

function getSerialNumber() {

	if(process.platform != "win32")
		return getSerialNumberLinux();
}

function init() {

	if(process.platform == "win32")
		initWindows();
}

function initWindows() {

	wifi.init({
		face: null
	});
}

function setAccessPoint(credentials) {

	if(process.platform != "win32")
		setAccessPointLinux(credentials, callback);
}

function setAccessPointLinux(credentials) {
	
	let data = null;

	try {
	
		data = fs.readFileSync("/etc/dhcpcd.conf", 'utf8').split("\n");
	
		let dataBegin = data.indexOf("# BEGIN GHI DATA");
		let dataEnd = data.indexOf("# END GHI DATA");
	
		let dataSettings = "# BEGIN GHI DATA\n" +
			"interface wlan0\n" +
			"    static ip_address=" +
			(credentials != null ?
				(credentials.ip != null ?
					credentials.ip :
					"192.168.4.1"
				) :
				"192.168.4.1"
			) +
			"/24\n" +
			"    nohook wpa_supplicant\n" +
			"# END GHI DATA";
	
		if(dataBegin != -1) {
	
			if(dataEnd != -1) {

				data = data.slice(0, dataBegin).concat(
					data.slice(dataEnd + 1)
				);
			}
	
			else
				data = data.slice(0, dataBegin);
		}
	
		if(credentials == null) {

			childProcess.execSync(
				"sudo /usr/bin/systemctl disable hostapd dnsmasq"
			);
		}
	
		else {
	
			childProcess.execSync(
				"sudo /usr/bin/systemctl enable hostapd dnsmasq"
			);
	
			if(dataBegin != -1)
				data.splice(dataBegin, 0, dataSettings);
	
			else
				data.push(dataSettings);
		}
	
		fs.writeFileSync("/etc/dhcpcd.conf", data.join("\n"));
	}

	catch(error) {
		console.log(error);
	}

	try {

		if(credentials != null) {

			data = fs.readFileSync(
				"/etc/hostapd/hostapd.conf",
				'utf8'
			).split("\n");

			data = data.filter((item) => {

				return !item.startsWith("ssid") &&
					!item.startsWith("wpa_passphrase");
			});

			data.push(
				"ssid=" +
				(credentials.ssid != null ?
					credentials.ssid :
					"GHI-" + getSerialNumber()
				)
			);
	
			fs.writeFileSync("/etc/hostapd/hostapd.conf", data.join("\n"));
		}
	}

	catch(error) {
		console.log(error);
	}

	try {
		childProcess.execSync("sudo /usr/sbin/reboot");
	}

	catch(error) {
		console.log(error);
	}
}

init();

module.exports = {
	open,
	close,
	connect,
	getNetworks,
	getSerialNumber,
	setAccessPoint
};
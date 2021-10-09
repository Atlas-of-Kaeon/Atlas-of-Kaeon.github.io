var wifi = require('node-wifi');

wifi.init({
	face: null
});

var open = false;

function getNetworks(callback) {
	wifi.scan(callback);
}

function connect(credentials, callback) {

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
				connect(ssid, password, callback);
			});
		}
	});
}

function close() {
	open = false;
}

module.exports = {
	open,
	getNetworks,
	connect,
	close
};
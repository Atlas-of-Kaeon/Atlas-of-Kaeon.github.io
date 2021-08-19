var cryptr = require("cryptr");

let encryption = new cryptr(require('readline-sync').question("Enter the password: "));
let data = require('fs').readFileSync(process.argv[2], 'utf8');

try {
	console.log(encryption.decrypt(data));
}

catch(error) {

	if(error.message != "Unsupported state or unable to authenticate data") {

		console.log(data);

		require('fs').writeFileSync(process.argv[2], encryption.encrypt(data));
	}

	else
		console.log("ERROR: WRONG PASSWORD.");
}
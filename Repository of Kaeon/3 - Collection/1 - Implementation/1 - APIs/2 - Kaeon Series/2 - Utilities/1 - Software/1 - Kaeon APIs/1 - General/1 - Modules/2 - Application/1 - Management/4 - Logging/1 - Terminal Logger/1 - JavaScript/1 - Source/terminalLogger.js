var childProcess = require("child_process");
var fs = require("fs");

function log(map, path, command) {

	let file = [];

	try {

		if(file.existsSync(path))
			file = JSON.parse(fs.readFileSync(path, 'utf-8'));
	}

	catch(error) {
		file = [];
	}

	childProcess.exec(command, (error, stdout, stderr) => {

		let line = "" +
			(error != null ? "" + error.stack : "") +
			(stdout != null ? "" + stdout : "") +
			(stderr != null ? "" + stderr : "");

		file.push(
			map != null ?
				map(line, { error, stdout, stderr }) :
				line
		);

		try {
			fs.writeFile(path, JSON.stringify(file));
		}

		catch(error) {

		}
	})
}

module.exports = {
	log
};

if(module.parent == null) {

	let map = null;

	try {
		map = require(process.argv[3]);
	}

	catch(error) {
		map = null;
	}

	log(
		map,
		process.argv[2],
		process.argv.slice(4).join(" ")
	);
}
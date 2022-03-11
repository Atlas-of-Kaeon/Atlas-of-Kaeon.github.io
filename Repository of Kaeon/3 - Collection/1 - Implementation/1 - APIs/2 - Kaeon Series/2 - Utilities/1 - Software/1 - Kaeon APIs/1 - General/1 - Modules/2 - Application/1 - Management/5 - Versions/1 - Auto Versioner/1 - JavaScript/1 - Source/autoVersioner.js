var child_process = require("child_process");

function execute(version, command) {
	
	setVersion(version != null ? version : getLatestVersion());

	child_process.execSync(command);
}

function getCurrentVersion() {
	// STUB
}

function getLatestVersion() {
	// STUB
}

function setVersion(version) {

	if(version == getCurrentVersion())
		return;

	// STUB
}

module.exports = {
	execute,
	getCurrentVersion,
	getLatestVersion,
	setVersion
};

if(module.parent == null) {

	if(process.argv[2] == "-l")
		console.log(getLatestVersion());

	else if(process.argv[2] == "-s")
		setVersion(process.argv[3]);

	else if(process.argv[2] == "-u")
		setVersion(getLatestVersion());
	
	else if(process.argv[2] == "-v")
		console.log(getCurrentVersion());

	else {

		execute(
			null,
			process.argv.slice(2).map((item) => {
				return item.includes(" ") ? "\"" + item + "\"" : item;
			}).join(" ")
		);
	}
}
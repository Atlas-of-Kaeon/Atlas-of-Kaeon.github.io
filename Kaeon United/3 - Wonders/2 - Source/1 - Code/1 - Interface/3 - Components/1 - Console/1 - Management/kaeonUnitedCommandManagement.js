var fs = require("fs");

function getPlugins() {

	try {

		return JSON.parse(
			fs.readFileSync(process.cwd() + "/plugins.json", "utf-8")
		);
	}

	catch(error) {
		return [];
	}
}

function managePlugin(operation, path) {

	let execSync = require('child_process').execSync;

	let plugin = null;

	if(path.startsWith("http://") ||
		path.startsWith("https://") ||
		path.endsWith(".json")) {
		
		plugin = require("kaeon-united")("io").open(path);
	}

	else
		plugin = require(path);

	if(plugin.protocols != null) {

		if(plugin.protocols[operation] != null) {

			plugin.protocols[operation].forEach((item) => {
				execSync(item);
			});
		}
	}
}

module.exports = (args, callback) => {

	if(!Array.isArray(args)) {

		callback();

		return;
	}

	if(args.length == 0) {

		callback();

		return;
	}

	if(args[0].toLowerCase() != "install" &&
		args[0].toLowerCase() != "uninstall" &&
		args[0].toLowerCase() != "list") {

		callback();

		return;
	}
	
	let plugins = getPlugins();

	let operation = args[0].toLowerCase();
	let arguments = args.slice(1);

	(async () => {
	
		if(operation == "install") {

			arguments.forEach((item) => {

				if(plugins.includes(item))
					return;

				try {

					managePlugin("install", item);

					plugins.push(item);
				}

				catch(error) {
					console.log(error.stack);
				}
			});
		}
	
		else if(operation == "uninstall") {

			arguments.forEach((item) => {

				if(!plugins.includes(item))
					return;

				try {

					managePlugin("uninstall", item);

					plugins.splice(plugins.indexOf(item), 1);
				}

				catch(error) {
					console.log(error.stack);
				}
			});
		}
	
		else if(operation == "list")
			console.log(plugins.join("\n"));

		if(operation == "install" || operation == "uninstall") {
			
			fs.writeFileSync(
				process.cwd() + "/plugins.json",
				JSON.stringify(plugins)
			);
		}

		callback();
	})();
};
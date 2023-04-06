function getInterfaces() {

	try {

		return Object.keys(
			JSON.parse(
				fs.readFileSync(__dirname + "/interface.json", "utf-8")
			).management
		);
	}

	catch(error) {
		return [];
	}
}

function onDependency(item, command) {

	let resource = require(item);

	if(resource.management == null)
		return;

	let operations = item.management[command];

	if(operations == null)
		return;

	operations.forEach((item) => {

		if(!(item.environment.toLowerCase() == "js" ||
			item.environment.toLowerCase() == "javascript")) {

			return;
		}

		try {
			require(item.reference)();
		}

		catch(error) {

		}
	});
}

module.exports = (args, callback) => {

	if(!Array.isArray(args))
		return;

	if(args.length == 0)
		return;

	if(args[0].toLowerCase() != "install")
		return;

	let execSync = require('child_process').execSync;
	
	let interfaces = getInterfaces();

	let operation = args[0].toLowerCase();
	let arguments = args.slice(1);

	(async () => {
	
		if(operation == "install") {

			arguments.forEach((item) => {

				if(interfaces.includes(item))
					return;

				try {

					if(!item.startsWith("http://") &&
						!item.startsWith("https://")) {
						
						execSync("npm install \"" + item + "\"");
					}
						
					onDependency(item, "install");

					interfaces.push(item);
				}

				catch(error) {

				}
			});
		}
	
		else if(operation == "uninstall") {

			arguments.forEach((item) => {

				if(!interfaces.includes(item))
					return;

				try {

					onDependency(item, "uninstall");
					
					if(!item.startsWith("http://") &&
						!item.startsWith("https://")) {
						
						execSync("npm uninstall \"" + item + "\"");
					}

					interfaces.splice(interfaces.indexOf(item), 1);
				}

				catch(error) {

				}
			});
		}
	
		else if(operation == "list")
			console.log(Object.keys(interface.management).join("\n"));

		if(operation == "install" || operation == "uninstall") {

			let interface = require(moduleDependencies.defaultInterface);

			interfaces.forEach((item) => {
				require.appendInterface(interface, require(item));
			});
			
			fs.writeFileSync(
				__dirname + "/interface.json",
				JSON.stringify(interface)
			);
		}

		callback();
	})();
};
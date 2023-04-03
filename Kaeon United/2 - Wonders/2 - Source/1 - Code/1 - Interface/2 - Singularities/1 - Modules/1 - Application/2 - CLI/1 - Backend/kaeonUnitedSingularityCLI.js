#!/usr/bin/env node

function executeCommand(args) {
	
	let execSync = require('child_process').execSync;
	let interfaces = getInterfaces();

	let intervals = [
		setInterval(() => {
					
			require("dns").resolve('www.google.com', function(error) {
		
				if(error)
					require.connected = -1;
					
				else
					require.connected = (new Date()).getTime();
			});
		}, 1000 / 60),
		setInterval(() => {
			
			if(require.connected == -1)
				return;
		
			if((new Date()).getTime() - require.connected > 1000)
				require.connected = -1;
		}, 1000 / 60)
	];

	if(args.length > 0) {

		let operation = args[0].toLowerCase();
		let arguments = args.slice(1);
	
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

		if(operation == "install" ||
			operation == "list" ||
			operation == "uninstall") {

			intervals.forEach((item) => {
				clearInterval(item);
			});

			return;
		}
	}

	executeCommandOperation(require.getInterface(), args, intervals);
}

function executeCommandOperation(interface, args, intervals) {

	let components = interface.components.filter((item) => {
		
		return item.environment.toLowerCase() == "javascript" ||
			item.environment.toLowerCase() == "js";
	});

	let open = components.length;

	let callback = () => {

		open--;

		if(open == 0) {

			intervals.forEach((interval) => {
				clearInterval(interval);
			});
		}
	};

	components.forEach((item) => {

		try {
			require(item.reference)(args, callback);
		}

		catch(error) {
			callback();
		}
	});
}

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

require("kaeon-united")();

executeCommand(process.argv.slice(2));
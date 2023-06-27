var moduleDependencies = {
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/2%20-%20APIs/1%20-%20United/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/ONESuite.js",
	unitedInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/Kaeon%20United.one",
	utilities: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/1%20-%20Interface/2%20-%20Singularities/2%20-%20Utilities/kaeonUnitedSingularityUtilities.js"
};

var utils = {
	connected: 0,
	intervals: []
};

function clearIntervals() {

	utils.intervals.forEach((interval) => {
		clearInterval(interval);
	});
}

function executeSingularity() {

	try {

		require(true);
		
		return;
	}

	catch(error) {
		
	}

	var requireDefault = require;

	var installedModules = [
		"assert",
		"buffer",
		"child_process",
		"cluster",
		"crypto",
		"dgram",
		"dns",
		"domain",
		"events",
		"fs",
		"http",
		"https",
		"net",
		"os",
		"path",
		"punycode",
		"querystring",
		"readline",
		"stream",
		"string_decoder",
		"timers",
		"tls",
		"tty",
		"url",
		"util",
		"v8",
		"vm",
		"zlib"
	];

	var path = require('path');

	module.paths.push(process.cwd() + path.sep + "node_modules");

	try {

		installedModules = installedModules.concat(
			Object.keys(
				JSON.parse(
					require("child_process").
						execSync('npm ls --json').
						toString()
				).dependencies
			)
		);
	}
	
	catch(error) {
		
	}

	require = function(path, options) {

		if(path == true)
			return utils;

		if(typeof options != "object")
			options = { };

		if(options.async == true || typeof options.async == "function") {

			let promise = new Promise(function(resolve, reject) {

				try {

					resolve(
						require(
							path,
							{
								dynamic: options.dynamic,
								global: options.global,
								reload: options.reload
							}
						)
					);
				}

				catch(error) {
					reject(error);
				}
			});

			if(options.async != true)
				promise.then(options.async);

			return options.async == true ? promise : undefined;
		}

		let lowerPath = path.toLowerCase().
			split("-").join("").split(" ").join("");

		if(!options.dynamic) {

			if(lowerPath.endsWith("kaeonunited") ||
				lowerPath.endsWith("kaeonunited.js")) {

				return executeModule;
			}

			if(options.reload) {

				if(utils.cache[path] != null)
					delete utils.cache[path];
			}

			else if(utils.cache[path] != null)
				return utils.cache[path];

			if(!path.startsWith("http://") &&
				!path.startsWith("https://") &&
				!options.global) {

				if(!moduleExists(path) && !installedModules.includes(path)) {
			
					try {

						let prefix =
							!__dirname.includes(process.cwd()) ?
								"--prefix " + __dirname + " " : "";

						utils.execSync(
							"npm install " + prefix + "\"" + path + "\""
						);

						installedModules.push(path);
					}
		
					catch(error) {
						
					}
				}

				try {
		
					let item = null;
					
					if(installedModules.includes(path))
						item = requireDefault(path);

					else {

						let text = openResource(path);

						try {
							item = JSON.parse(text);
						}

						catch(error) {

							item = (new Function(
								"require = arguments[0];" +
									"var module={exports:{}};" +
									text +
									";return module.exports;"
							))(require);
						}
					}

					utils.cache[path] = item;
		
					return item;
				}

				catch(error) {
					return { };
				}
			}
		}

		let data = options.dynamic ? path : openResource(path);

		if(utils.oneSuite != null)
			data = utils.oneSuite.preprocess(data);
		
		let result = null;

		try {
			result = JSON.parse(data);
		}

		catch(error) {
			
			if(!options.global) {
	
				data =
					"require = arguments[0];var module={exports:{}};" +
					data +
					";return module.exports;";
	
				result = (new Function(data))(require);
			}
	
			else {
	
				var module = { exports: { } };
	
				(1, eval)(data);
	
				result = module.exports;
			}
		}
		
		if(!options.dynamic)
			utils.cache[path] = result;

		return result;
	}
	
	utils.cache = { };

	utils.appendInterface = appendInterface;
	utils.getUtilities = getUtilities;

	utils.clearIntervals = clearIntervals;
	utils.startIntervals = startIntervals;

	utils.execSync = require("child_process").execSync;
	utils.fs = require("fs");

	try {
		utils.oneSuite = require(moduleDependencies.ONESuite);
	}

	catch(error) {
		
	}

	requireDefault('module').prototype.require = require;
}

function fileExists(file) {

	try {
		return require(true).utils.fs.existsSync(file);
	}
	
	catch(error) {
		return false;
	}
}

function getInterface() {
	
	let interface = {
		utilities: { }
	};

	let fs = require("fs");

	try {

		if(!fs.existsSync(process.cwd() + "/plugins.json"))
			fs.writeFileSync(process.cwd() + "/plugins.json", "[]");

		let interfaces = [
			parseInterface(openResource(moduleDependencies.unitedInterface))
		];

		JSON.parse(
			fs.readFileSync(process.cwd() + "/plugins.json", "utf-8")
		).forEach((item) => {

			if(item.endsWith(".json")) {

				let plugin = JSON.parse(openResource(item));

				if(plugin.module != null)
					interfaces.push(plugin.module);

				else if(plugin.locations != null) {

					if(plugin.locations.length > 0) {

						interfaces.push(
							parseInterface(openResource(plugin.locations[0]))
						);
					}
				}

				else if(plugin.utilities != null || plugin.connections != null)
					interfaces.push(plugin);
			}

			else
				interfaces.push(require(item));
		});

		interfaces.forEach((item) => {
			appendInterface(interface, item, []);
		});

		return interface;
	}

	catch(error) {
		
	}

	return interface;
}

function moduleExists(file) {

	if(fileExists(file))
		return true;

	if(fileExists(file + ".js"))
		return true;

	return false;
}

function openResource(path) {

	try {

		if(path.startsWith("http://") || path.startsWith("https://")) {

			if(openResource.cache == null) {

				if(!require("fs").existsSync("localCache.json")) {

					require("fs").writeFileSync(
						process.cwd() + "/localCache.json", "{}"
					);
				}

				try {
					
					openResource.cache = JSON.parse(require("fs").readFileSync(
						process.cwd() + "/localCache.json", 'utf-8'
					));
				}

				catch(error) {
					openResource.cache = { };
				}
			}

			if(utils.connected != -1) {

				try {
					require("xmlhttprequest");
				}
			
				catch(error) {

					let prefix =
						!__dirname.includes(process.cwd()) ?
							"--prefix " + __dirname + " " : "";

					require("child_process").execSync(
						"npm install " + prefix + "xmlhttprequest"
					);
				}

				let xhr = require('xmlhttprequest').XMLHttpRequest;
				
				let request = new xhr();
				request.open("GET", path, false);

				let text = "";

				request.onreadystatechange = function() {

					if(request.readyState === 4) {

						if(request.status === 200 || request.status == 0)
							text = request.responseText;
					}
				}

				request.send(null);

				if(text == null) {

					text = openResource.cache[path];

					return text != null ? text : "";
				}

				openResource.cache[path] = text;
				
				try {

					require("fs").writeFileSync(
						process.cwd() + "/localCache.json",
						JSON.stringify(openResource.cache)
					);
				}

				catch(error) {
					
				}

				return text;
			}

			else {

				let text = openResource.cache[path];

				return text != null ? text : "";
			}
		}

		else
			return require("fs").readFileSync(path, 'utf-8');
	}

	catch(error) {
		
	}

	return "";
}

function startIntervals() {

	utils.intervals = [
		setInterval(() => {
					
			require("dns").resolve('www.google.com', function(error) {
		
				if(error)
					utils.connected = -1;
					
				else
					utils.connected = (new Date()).getTime();
			});
		}, 1000 / 60),
		setInterval(() => {
			
			if(utils.connected == -1 || utils.connected == 0)
				return;
		
			if((new Date()).getTime() - utils.connected > 1000)
				utils.connected = -1;
		}, 1000 / 60)
	];
}

eval(openResource(moduleDependencies.utilities));

executeSingularity();

module.exports = executeModule;
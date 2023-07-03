var moduleDependencies = {
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/2%20-%20APIs/1%20-%20United/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/ONESuite.js",
	unitedInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/Kaeon%20United.one",
	utilities: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/1%20-%20Interface/2%20-%20Singularities/2%20-%20Utilities/kaeonUnitedSingularityUtilities.js"
};

function clearIntervals() {

	let utils = require(true);

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

	var child_process = require("child_process");
	var fs = require("fs");
	var moduleUtils = require("module");
	var path = require('path');

	child_process.execSync("npm init -y");

	if(!fs.existsSync(process.cwd() + "/plugins.json"))
		fs.writeFileSync(process.cwd() + "/plugins.json", "[]");

	if(!fs.existsSync(process.cwd() + "/localCache.json"))
		fs.writeFileSync(process.cwd() + "/localCache.json", "{}");
		
	var installedModules = [].concat(moduleUtils.builtinModules);
	var requireDefault = require;

	installedModules.push("xmlhttprequest");
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
			return require;

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

				if(require.cache[path] != null)
					delete require.cache[path];
			}

			else if(require.cache[path] != null)
				return require.cache[path];

			require.cache[path] = { };

			if(!path.startsWith("http://") &&
				!path.startsWith("https://") &&
				!options.global) {

				if(!moduleExists(path) && !installedModules.includes(path)) {
			
					try {

						require.execSync("npm install \"" + path + "\"");

						installedModules.push(path);
					}
		
					catch(error) {
						
					}
				}

				try {
		
					let item = null;
					
					if(installedModules.includes(path)) {

						try {
							item = require.requireDefault(path);
						}

						catch(error) {

							try {

								item = require.requireDefault(
									process.cwd() + "/node_modules/" + path
								);
							}
	
							catch(error) {
								item = requireDefault(path);
							}
						}
					}

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

					require.cache[path] = item;
		
					return item;
				}

				catch(error) {

					delete require.cache[path];

					return { };
				}
			}
		}

		let data = options.dynamic ? path : openResource(path);

		if(require.oneSuite != null)
			data = require.oneSuite.preprocess(data);
		
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
			require.cache[path] = result;

		return result;
	}

	require.requireDefault = moduleUtils.prototype.require;

	require.connected = 0;
	
	require.cache = { };
	require.intervals = [];

	require.appendInterface = appendInterface;
	require.getUtilities = getUtilities;

	require.clearIntervals = clearIntervals;
	require.startIntervals = startIntervals;

	require.execSync = child_process.execSync;
	require.fs = fs;

	try {
		require.oneSuite = require(moduleDependencies.ONESuite);
	}

	catch(error) {
		
	}

	moduleUtils.prototype.require = require;
}

function fileExists(file) {

	try {
		return require(true).fs.existsSync(file);
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

		let interfaces = [
			parseInterface(openResource(moduleDependencies.unitedInterface))
		];

		JSON.parse(
			fs.readFileSync(process.cwd() + "/plugins.json", "utf-8")
		).forEach((item) => {

			let plugin = null;

			if(item.startsWith("http://") ||
				item.startsWith("https://") ||
				item.endsWith(".json")) {

				plugin = JSON.parse(openResource(item));
			}

			else
				plugin = require(item);

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

function init() {

	var child_process = require("child_process");
	var fs = require("fs");
	
	if(!fs.existsSync(process.cwd() + "/package.json"))
		child_process.execSync("npm init -y");

	try {
		require("xmlhttprequest");
	}
	
	catch(error) {
	
		child_process.execSync(
			"npm install xmlhttprequest"
		);
	}

	if(!fs.existsSync(process.cwd() + "/plugins.json"))
		fs.writeFileSync(process.cwd() + "/plugins.json", "[]");

	if(!fs.existsSync(process.cwd() + "/localCache.json"))
		fs.writeFileSync(process.cwd() + "/localCache.json", "{}");
}

function moduleExists(file) {

	if(fileExists(file))
		return true;

	if(fileExists(file + ".js"))
		return true;

	return false;
}

function openResource(path) {

	let utils = {
		connected: 0
	};

	try {
		utils = require(true);
	}

	catch(error) {

	}

	try {

		if(path.startsWith("http://") || path.startsWith("https://")) {

			if(openResource.cache == null) {

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

	let utils = require(true);

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

init();
eval(openResource(moduleDependencies.utilities));
executeSingularity();

module.exports = executeModule;
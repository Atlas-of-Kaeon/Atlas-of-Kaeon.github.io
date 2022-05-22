#!/usr/bin/env node

// <script> document.documentElement.innerHTML = "";

var moduleDependencies = {
	cors: "https://ghost-cors.herokuapp.com/",
	defaultInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/3%20-%20United/1%20-%20Resources/1%20-%20Default%20Interface/KaeonUnitedDefaultInterface.json",
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
};

function appendInterface(main, resource) {

	["components", "modules", "extensions"].forEach((field) => {

		if(resource[field] != null) {

			main[field] = main[field].concat(resource[field]).map((item) => {
				return JSON.stringify(item);
			}).filter((item, pos, self) => {
				return self.indexOf(item) == pos;
			}).map((item) => {
				return JSON.parse(item);
			});
		}
	});

	if(resource.management != null)
		Object.assign(main.management, resource.management);
}

function executeCDN() {
	executeScript();
	executeCommandOperation(getInterface(getEnvironment()), getURLArguments());
}

function executeCommand(args) {
	
	let execSync = require('child_process').execSync;
	let interfaces = getInterfaces();

	if(args.length > 0) {

		let operation = args[0].toLowerCase();
		let arguments = args.slice(1);
	
		if(operation == "install") {

			arguments.forEach((item) => {

				if(interfaces.includes(item))
					return;

				try {

					execSync("npm install " + item);
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
					execSync("npm uninstall " + item);

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
				appendInterface(interface, require(item));
			});
			
			fs.writeFileSync(__dirname + "/interface.json", data);
		}
	}

	executeCommandOperation(interface, args);
}

function executeCommandOperation(interface, args) {

	interface.components.forEach((item) => {
		
		if(item.environment.toLowerCase() == "javascript" ||
			item.environment.toLowerCase() == "js") {

			require(item.reference)(args);
		}
	});
}

function executeModule(utility) {
	
	let interface = getInterface(getEnvironment());

	if(utility == null)
		return interface;

	if(typeof utility == "string") {

		for(let i = 0; i < interface.modules.length; i++) {

			if(interface.modules[i].path.join(".").
				toLowerCase().endsWith(utility)) {
				
				let match = interface.
					modules[i].
					implementations.
					filter((item) => {

					return item.environment.toLowerCase() == "javascript" ||
						item.environment.toLowerCase() == "js";
				});

				return match.length > 0 ? require(match[0].reference) : null;
			}
		}

		return null;
	}

	else {

		interface.modules.forEach((item) => {

			item.implementations.forEach((implementation) => {

				let environment = implementation.environment.toLowerCase();

				if(environment == "kaeon fusion" || environment == "kf") {

					try {
						require(implementation.reference)(utility);
					}

					catch(error) {

					}
				}
			});
		});
	}
}

function executeScript() {

	if(typeof require != typeof undefined) {

		if(require.kaeonUnited)
			return;
	}

	module = {
		id: '.',
		exports: { },
		parent: null,
		filename: "",
		loaded: false,
		children: [],
		paths: []
	};
	
	function unitedRequire(path, options) {

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

		if(lowerPath.endsWith("kaeonunited") ||
			lowerPath.endsWith("kaeonunited.js")) {

			return executeModule;
		}
	
		require.cache = require.cache ? require.cache : { };
	
		if(module.parent != null) {
	
			if(path.startsWith(".")) {
	
				path =
					module.filename.substring(
						0,
						module.filename.lastIndexOf('/') + 1
					) +
					path;
			}
		}
	
		while(lowerPath.startsWith("././"))
			lowerPath = lowerPath.substring(2);
	
		let cacheItem = require.cache[lowerPath];
	
		let newModule = {
			id: path,
			exports: { },
			parent: module,
			filename: path,
			loaded: false,
			children: [],
			paths: []
		};
	
		if(cacheItem == null || options.reload || options.dynamic) {

			let allText = path;
			
			if(!options.dynamic) {
				
				allText = fetchOnlineResource(path);

				require.cache[lowerPath] = newModule;
			}
	
			if(require.ONESuite != null)
				allText = require.ONESuite.preprocess(allText);

			let isJSON = false;

			try {

				JSON.parse(allText);

				isJSON = true;
			}

			catch(error) {

			}

			if(isJSON)
				allText = "module.exports=" + allText;

			if(!options.global) {
		
				let moduleFunction = new Function(
					"var module = arguments[0];" +
					require.toString() +
					"require.cache = arguments[1];" +
					allText +
					";return module;"
				);
				
				let newModuleContents = moduleFunction(
					newModule,
					require.cache
				);
		
				for(key in newModuleContents.exports)
					newModule.exports[key] = newModuleContents.exports[key];
		
				module.children.push(newModule);
		
				newModule.loaded = true;
		
				return newModule.exports;
			}

			else {
				
				let module = newModule;

				(1, eval)(allText);

				return module.exports;
			}
		}
	
		else
			return cacheItem.exports;
	}

	require = unitedRequire;

	require.kaeonUnited = true;
	
	try {
		require.ONESuite = require(moduleDependencies.ONESuite);
	}
	
	catch(error) {
		
	}
}

function fetchOnlineResource(path, cors) {

	try {

		if(cors)
			path = moduleDependencies.cors + path;
		
		let rawFile = new XMLHttpRequest();

		rawFile.open("GET", path, false);

		let allText = "";

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0)
					allText = rawFile.responseText;
			}
		}

		rawFile.send(null);

		return allText;
	}

	catch(error) {
		return "";
	}
}

function fileExists(file) {

	try {
		return fs.existsSync(file);
	}
	
	catch(error) {
		return false;
	}
}

function getEnvironment() {

	let environment = "browser";
	
	if(typeof process === 'object') {
	
		if(typeof process.versions === 'object') {
	
			if(typeof process.versions.node !== 'undefined')
				environment = "node";
		}
	}

	return environment;
}

function getInterface(environment) {

	if(environment == "browser") {

		let args = getURLArguments();

		let interface = Object.assign(
			{
				components: [],
				modules: [],
				extensions: [],
				management: { }
			},
			JSON.parse(
				fetchOnlineResource(
					moduleDependencies.defaultInterface
				)
			)
		);

		if(args.use == null)
			return interface;
		
		try {
			
			JSON.parse(args.use).forEach((item) => {

				try {

					appendInterface(
						interface,
						JSON.parse(
							fetchOnlineResource(item)
						)
					);
				}

				catch(error) {

				}
			});
		}

		catch(error) {

		}
	}

	else {

		let fs = require("fs");

		try {

			return JSON.parse(
				fs.readFileSync(__dirname + "/interface.json", "utf-8")
			);
		}
	
		catch(error) {

			let data = require(moduleDependencies.defaultInterface);
			
			fs.writeFileSync(__dirname + "/interface.json", data);

			return JSON.parse(data);
		}
	}

	return interface;
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

function getPlatform(environment) {

	if(environment == "browser") {

		if(typeof require == "function" && typeof module == "object") {

			if(module.parent != null)
				return "module";
		}

		return document.documentElement.innerHTML ==
			"<head></head><body></body>" ?
				"cdn" :
				"script";
	}

	else {

		if(module.parent != null)
			return "module";

		return "command";
	}
}

function getURLArguments(raw) {

	let vars = {};

	window.location.href.replace(
		/[?&]+([^=&]+)=([^&]*)/gi,
		function(m, key, value) {
		
			vars[
				raw ?
					decodeURIComponent(key) :
					decodeURIComponent(key).toLowerCase()
			] = decodeURIComponent(value);
		}
	);

	return vars;
}

function moduleExists(file) {

	if(fileExists(file))
		return true;

	if(fileExists(file + ".js"))
		return true;

	return false;
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

var environment = getEnvironment();
var platform = getPlatform(environment);

var requireDefault = null;

var united = false;

if(typeof require != typeof undefined) {

	requireDefault = require;

	united = require.kaeonUnited;
}

if(environment == "node" && !united) {

	var execSync = require('child_process').execSync;
	var fs = require('fs');
	var path = require('path');

	module.paths.push(process.cwd() + path.sep + "node_modules");

	var connected = -1;
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

	try {

		installedModules = installedModules.concat(
			Object.keys(
				JSON.parse(execSync('npm ls --json').toString()).dependencies
			)
		);
	}
	
	catch(error) {
		
	}

	if(!installedModules.includes("xmlhttprequest"))
		execSync('npm install xmlhttprequest');

	var xhr = require('xmlhttprequest');

	require = function(path, options) {

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

			if(lowerPath == "xmlhttprequest")
				return xhr;

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

			if(!path.startsWith("http://") &&
				!path.startsWith("https://") &&
				!options.global) {

				if(!moduleExists(path) && !installedModules.includes(path)) {
			
					try {

						execSync('npm install ' + path);

						installedModules.push(path);
					}
		
					catch(error) {

					}
				}

				try {
		
					let item = null;
					
					if(installedModules.includes(path))
						item = requireDefault(path);

					else
						item = requireDefault("module").prototype.require(path);

					require.cache[path] = item;
		
					return item;
				}

				catch(error) {
					return { };
				}
			}
		}

		let data = options.dynamic ? path : require.open(path);

		if(require.oneSuite != null)
			data = require.oneSuite.preprocess(data);
		
		let result = null;
		
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
		
		if(!options.dynamic)
			require.cache[path] = result;

		return result;
	}

	require.open = function(path) {

		if(require.open.cache == null) {

			if(fs.existsSync("kaeonUnited.json"))
				fs.writeFileSync("kaeonUnited.json", "{}");

			require.open.cache = JSON.parse(
				fs.readFileSync("kaeonUnited.json", 'utf-8')
			);
		}

		try {

			if(!(path.toLowerCase().startsWith("http://") ||
				path.toLowerCase().startsWith("https://"))) {
				
				return fs.readFileSync(path, 'utf-8');
			}

			else {

				if(connected != -1) {

					try {

						let data = "";
						let rawFile = new xhr.XMLHttpRequest();
						
						rawFile.open("GET", path, false);
		
						rawFile.onreadystatechange = function() {
		
							if(rawFile.readyState === 4) {
		
								if(rawFile.status === 200 ||
									rawFile.status == 0) {

									data = rawFile.responseText;

									require.open.cache[path] = data;
								}
							}
						}
		
						rawFile.send(null);

						try {

							fs.writeFile(
								"kaeonUnited.json",
								JSON.stringify(require.open.cache)
							);
						}

						catch(error) {

						}
		
						return data;
					}

					catch(error) {

						let data = require.open.cache[path]

						return data != null ? data : "";
					}
				}

				else {

					let data = require.open.cache[path]

					return data != null ? data : "";
				}
			}
		}

		catch(error) {
			return "";
		}
	}

	try {
		require.oneSuite = require(moduleDependencies.ONESuite);
	}

	catch(error) {

	}
	
	require.cache = { };

	require.kaeonUnited = true;

	setInterval(() => {
				
		require('dns').resolve('www.google.com', function(error) {
	
			if(error)
				connected = -1;
				
			else
				connected = (new Date()).getTime();
		});
	}, 1000 / 60);
	
	setInterval(() => {
		
		if(connected == -1)
			return;
	
		if((new Date()).getTime() - connected > 1000)
			connected = -1;
	}, 1000 / 60);
}

if(platform == "command")
	executeCommand(process.argv.slice(2));

if(platform == "script")
	executeScript();

if(platform == "cdn")
	executeCDN();

if(platform == "module")
	module.exports = executeModule;

// </script>
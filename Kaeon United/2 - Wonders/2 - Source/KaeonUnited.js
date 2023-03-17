#!/usr/bin/env node

// <script> document.documentElement.innerHTML = "";

var moduleDependencies = {
	cors: "https://corsproxy.io/?",
	defaultInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/2%20-%20System/1%20-%20Resources/1%20-%20Interfaces/1%20-%20Default%20Interface/KaeonUnitedDefaultInterface.json",
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/ONESuite.js",
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

function executeCommand(args, intervals) {

	intervals.push(
		setInterval(() => {
					
			dns.resolve('www.google.com', function(error) {
		
				if(error)
					connected = -1;
					
				else
					connected = (new Date()).getTime();
			});
		}, 1000 / 60)
	);
	
	intervals.push(
		setInterval(() => {
			
			if(connected == -1)
				return;
		
			if((new Date()).getTime() - connected > 1000)
				connected = -1;
		}, 1000 / 60)
	);
	
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
				appendInterface(interface, require(item));
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

	executeCommandOperation(getInterface(), args, intervals);
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

function executeModule(utility) {
	
	let interface = getInterface(getEnvironment());

	if(utility == null)
		return interface;

	if(typeof utility == "string") {

		for(let i = 0; i < interface.modules.length; i++) {

			if(interface.modules[i].path.join(".").
				toLowerCase().endsWith(utility.toLowerCase())) {
				
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
				
				allText = openResource(path);

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
	
	let interface = {
		components: [],
		modules: [],
		extensions: [],
		management: { }
	};

	if(environment == "browser") {

		let args = getURLArguments();

		interface = Object.assign(
			interface,
			JSON.parse(
				openResource(
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
							openResource(item)
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

			try {

				interface = Object.assign(
					interface,
					require(moduleDependencies.defaultInterface)
				);
				
				fs.writeFileSync(
					__dirname + "/interface.json",
					JSON.stringify(interface)
				);
	
				return interface;
			}
		
			catch(error) {

			}
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

function getPlatform(environment, args) {

	if(environment == "browser") {

		if(args != null)
			return "command";

		if(typeof require == "function" && typeof module == "object") {

			if(module.parent != null)
				return "module";
		}

		return document.documentElement.innerHTML == "<head></head><body></body>" ? "cdn" : "script";
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

function openResource(path) {

	try {

		let environment = getEnvironment();

		if(path.startsWith("http://") || path.startsWith("https://")) {

			if(environment == "node" && openResource.cache == null) {

				if(!require("fs").existsSync("kaeonUnited.json")) {

					require("fs").writeFileSync(
						__dirname + "/kaeonUnited.json", "{}"
					);
				}

				try {
					
					openResource.cache = JSON.parse(require("fs").readFileSync(
						__dirname + "/kaeonUnited.json", 'utf-8'
					));
				}

				catch(error) {
					openResource.cache = { };
				}
			}

			let requestClass = environment == "browser" ?
				XMLHttpRequest :
				require('xmlhttprequest').XMLHttpRequest;

			if(environment == "browser" &&
				(path.startsWith("http://") || path.startsWith("https://"))) {

				path = moduleDependencies.cors +
					encodeURIComponent(path).split("%20").join("%2520");
			}

			if(connected != -1) {
				
				let request = new requestClass();
				request.open("GET", path, false);

				let text = "";

				request.onreadystatechange = function() {

					if(request.readyState === 4) {

						if(request.status === 200 || request.status == 0)
							text = request.responseText;
					}
				}

				request.send(null);

				if(environment == "node") {

					openResource.cache[path] = text;
					
					try {

						require("fs").writeFile(
							__dirname + "/kaeonUnited.json",
							JSON.stringify(openResource.cache),
							() => {

							}
						);
					}

					catch(error) {
						
					}
				}

				return text;
			}

			else if(environment == "node") {

				let text = openResource.cache[path];

				return text != null ? text : "";
			}
		}

		else if(environment == "node")
			return require("fs").readFileSync(path, 'utf-8');
	}

	catch(error) {
		
	}

	return "";
}

var connected = 1;
var environment = getEnvironment();
var intervals = [];
var platform = null;
var requireDefault = null;
var united = false;

if(typeof arguments != "undefined")
	platform = getPlatform(environment, arguments);

else
	platform = getPlatform(environment);

if(typeof require != typeof undefined) {

	requireDefault = require;

	united = require.kaeonUnited;
}

if(environment == "node" && !united) {

	var dns = require("dns");
	var execSync = require('child_process').execSync;
	var fs = require('fs');

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
				JSON.parse(execSync('npm ls --json').toString()).dependencies
			)
		);
	}
	
	catch(error) {
		
	}

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

						execSync("npm install \"" + path + "\"");

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

					require.cache[path] = item;
		
					return item;
				}

				catch(error) {
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

	try {
		require.oneSuite = require(moduleDependencies.ONESuite);
	}

	catch(error) {

	}
	
	require.cache = { };

	require.kaeonUnited = true;
}

if(platform == "command") {
	
	if(environment == "node")
		executeCommand(process.argv.slice(2), intervals);
	
	else
		executeCommand(arguments, intervals);
}

if(platform == "script")
	executeScript();

if(platform == "cdn")
	executeCDN();

if(platform == "module")
	module.exports = executeModule;

// </script>
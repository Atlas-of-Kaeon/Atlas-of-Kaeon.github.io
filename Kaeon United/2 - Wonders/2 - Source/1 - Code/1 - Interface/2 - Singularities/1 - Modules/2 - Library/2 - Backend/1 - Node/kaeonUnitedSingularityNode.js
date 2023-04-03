var moduleDependencies = {
	defaultInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/2%20-%20System/1%20-%20Resources/1%20-%20Interfaces/1%20-%20Default%20Interface/KaeonUnitedDefaultInterface.json",
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/ONESuite.js",
};

function appendInterface(main, resource, references) {

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

	if(resource.references != null) {

		references = references != null ? references : [];

		Object.keys(resource.references).forEach((item) => {

			if(references.includes(item) || !resource.references[item])
				return;

			try {

				appendInterface(
					main,
					JSON.parse(openResource(item)),
					JSON.parse(JSON.stringify(references)).concat([item])
				);
			}

			catch(error) {

			}
		});
	}
}

function executeModule(utility) {

	executeSingularity();
	
	let interface = getInterface();

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

function fileExists(file) {

	try {
		return require.fs.existsSync(file);
	}
	
	catch(error) {
		return false;
	}
}

function getInterface() {
	
	let interface = {
		components: [],
		modules: [],
		extensions: [],
		management: { }
	};

	let fs = require("fs");

	try {

		return JSON.parse(
			fs.readFileSync(__dirname + "/interface.json", "utf-8")
		);
	}

	catch(error) {

		try {

			appendInterface(
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

			if(require.connected != -1) {
				
				let request = new require('xmlhttprequest').XMLHttpRequest();
				request.open("GET", path, false);

				let text = "";

				request.onreadystatechange = function() {

					if(request.readyState === 4) {

						if(request.status === 200 || request.status == 0)
							text = request.responseText;
					}
				}

				request.send(null);

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

function executeSingularity() {

	var requireDefault = null;
	var united = false;

	if(typeof require != typeof undefined) {
	
		requireDefault = require;
	
		united = require.kaeonUnited;
	}

	if(united)
		return;

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

	require.connected = 1;

	require.appendInterface = appendInterface;
	require.getInterface = getInterface;

	require.execSync = require("child_process").execSync;
	require.fs = require("fs");

	try {
		require.oneSuite = require(moduleDependencies.ONESuite);
	}

	catch(error) {

	}
	
	require.cache = { };

	require.kaeonUnited = true;
}

executeModule.executeSingularity = executeSingularity;

module.exports = executeModule;
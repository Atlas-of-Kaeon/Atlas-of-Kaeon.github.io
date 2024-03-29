var moduleDependencies = {
	cors: {
		proxies: {
			"https://corsproxy.io/": (request) => {

				request = JSON.parse(JSON.stringify(request));
				
				request.request.uri =
					"https://corsproxy.io/?" +
						encodeURIComponent(
							request.request.uri
						).split("%20").join("%2520");

				return request;
			},
			"https://nextjs-cors-anywhere.vercel.app/": (request) => {

				request = JSON.parse(JSON.stringify(request));
				
				request.request.uri =
					"https://nextjs-cors-anywhere.vercel.app/api?endpoint=" +
						request.request.uri;

				return request;
			}
		},
		proxy: "https://corsproxy.io/"
	},
	unitedInterface: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/Kaeon%20United.one",
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/2%20-%20APIs/1%20-%20United/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/ONESuite.js",
	utilities: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/1%20-%20Interface/2%20-%20Singularities/2%20-%20Utilities/kaeonUnitedSingularityUtilities.js"
};

function executeSingularity() {

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

function getInterface() {
	
	let interface = {
		utilities: { }
	};

	let args = getURLArguments();
	let sources = [moduleDependencies.unitedInterface];

	if(args.use != null) {

		try {
			sources = sources.concat(JSON.parse(args.use));
		}

		catch(error) {

		}
	}
		
	sources.forEach((item) => {

		try {
			appendInterface(interface, parseInterface(openResource(item)), []);
		}
	
		catch(error) {
	
		}
	});

	return interface;
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

function openResource(path) {

	try {

		path = moduleDependencies.cors.proxies[
			moduleDependencies.cors.proxy
		]({ request: { uri: path  } }).request.uri;
		
		let request = new XMLHttpRequest();
		request.open("GET", path, false);

		let text = "";

		request.onreadystatechange = function() {

			if(request.readyState === 4) {

				if(request.status === 200 || request.status == 0)
					text = request.responseText;
			}
		}

		request.send(null);

		return text;
	}

	catch(error) {
		
	}

	return "";
}

eval(openResource(moduleDependencies.utilities));

executeSingularity();
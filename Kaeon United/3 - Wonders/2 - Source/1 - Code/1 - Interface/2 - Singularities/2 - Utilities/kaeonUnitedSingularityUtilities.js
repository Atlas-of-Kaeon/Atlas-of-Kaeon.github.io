Object.assign(
	moduleDependencies,
	{
		aliases: {
			"kaeon-united-interface": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/1%20-%20Philosophy/1%20-%20Kaeon%20United%20Interface/Kaeon%20United%20Interface.one"
		},
		one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/2%20-%20APIs/1%20-%20United/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/ONE.js",
		onePlus: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/2%20-%20APIs/1%20-%20United/1%20-%20Core/1%20-%20ONE/4%20-%20ONE%2B/ONEPlus.js",
		tokenizer: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/2%20-%20APIs/1%20-%20United/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/2%20-%20Parsing/1%20-%20Tokenizer/tokenizer.js"
	}
);

function appendInterface(main, resource, extensions) {

	appendPackage(main.utilities, resource.utilities);

	if(resource.connections == null)
		return;
		
	if(resource.connections.extensions == null)
		return;

	resource.connections.extensions.forEach((item) => {

		if(extensions.includes(item))
			return;

		try {

			appendInterface(
				main,
				parseInterface(openResource(item)),
				JSON.parse(JSON.stringify(extensions)).concat([item])
			);
		}

		catch(error) {

		}
	});
}

function appendPackage(main, package) {

	if(package == null)
		return;

	main.packages = main.packages != null ? main.packages : { };
	main.utilities = main.utilities != null ? main.utilities : { };

	Object.assign(main.utilities, package.utilities);

	if(package.packages != null) {

		Object.keys(package.packages).forEach((key) => {

			main.packages[key] =
				main.packages[key] != null ? main.packages[key] : { };

			appendPackage(main.packages[key], package.packages[key]);
		});
	}
}

var executeModule = (utility) => {
	
	let interface = getInterface();

	if(utility == null)
		return interface;

	let utilities = getUtilities(
		interface,
		{
			type: "library",
			environment: typeof utility == "string" ?
				"javascript" : "kaeon fusion",
			path: typeof utility == "string" ? utility : null
		}
	);
	
	if(typeof utility != "string") {

		utilities.forEach((item) => {

			try {
				item(utility);
			}

			catch(error) {
				
			}
		});
	}

	return utilities[0];
}

var filterONE = (element, child) => {

	return element.children.filter((item) => {
		return item.content.toLowerCase() == child.toLowerCase();
	})[0];
}

var findONE = (element, child) => {

	return element.content.toLowerCase() == child.toLowerCase() ?
		[element] :
		element.children.map((item) => {
			return findONE(item, child);
		}).flat();
}

function getUtilities(utilities, options, path) {

	options = options != null ? options : { };
	path = path != null ? path : "";

	let result = [];

	Object.keys(utilities.utilities).forEach((key) => {

		let item = utilities.utilities[key];

		if(options.path != null) {

			if(!(path + "." + key).endsWith("" + options.path))
				return;
		}

		if(options.type != null) {

			if(item.properties == null)
				return;

			if(("" + item.properties.type).toLowerCase() !=
				("" + options.type).toLowerCase()) {

				return;
			}
		}

		if(item.versions != null) {

			item.versions.forEach((item) => {

				if(options.environment != null) {

					if(item.properties == null)
						return;

					if(("" + item.properties.environment).toLowerCase() !=
						("" + options.environment).toLowerCase()) {

						return;
					}
				}

				if(item.locations != null) {

					if(item.locations.length == 0)
						return;

					result.push(require("" + item.locations[0]));
				}

				else if(item.source != null)
					result.push(require("" + item.source, { dynamic: true }));
			});
		}
	});

	Object.keys(utilities.packages).forEach((key) => {

		result = result.concat(
			utilities.packages[key],
			options,
			path + "." + key
		);
	});

	return result;
}

var getNewInterface = () => {
	
	return {
		utilities: { },
		connections: { }
	};
}

var getONEUtilities = (utilities, element) => {

	let packages = filterONE(document, "Packages");
	let utilityItems = filterONE(document, "Utilities");

	if(packages != null) {

		packages.children.forEach((item) => {

			if(utilities.packages[item.content] == null)
				utilities.packages[item.content] = { };

			getONEUtilities(utilities.packages[item.content], item);
		});
	}

	if(utilityItems != null) {

		utilityItems.forEach((item) => {

			let utility = {
				versions: [],
				properties: { }
			};

			let versions = filterONE(item, "Versions");
			let properties = filterONE(item, "Properties");

			if(versions != null) {

				versions.children.forEach((item) => {

					let version = {
						properties: { }
					};

					let properties = filterONE(item, "Properties");

					if(properties != null) {
						
						properties.children.forEach((item) => {

							if(item.children.length > 0) {

								version.properties[item.content] =
									item.children[0].content;
							}
						});
					}

					let locations = filterONE(item, "Locations");
					let source = filterONE(item, "Source");

					if(locations != null) {

						version.locations =
							locations.children.map((item) => {
								return item.content;
							});
					}

					else if(source != null) {

						if(source.children.length > 0)
							version.source = source.children[0].content;
					}

					utility.versions.push(version);
				});
			}

			if(properties != null) {
				
				properties.children.forEach((item) => {

					if(item.children.length > 0) {

						utility.properties[item.content] =
							item.children[0].content;
					}
				});
			}

			utilities[item.content] = utility;
		});
	}
}

var parseInterface = (interface) => {

	try {
		return JSON.parse(interface);
	}

	catch(error) {

	}

	if(parseInterface.onePlus == null) {
	
		eval(
			["one", "tokenizer", "onePlus"].map((item) => {
	
				return openResource(moduleDependencies[item]).
						split("\n").
						filter((line) => {
							return !line.includes("kaeon-united");
						}).
						join("\n").
						split("module.exports").
						join("var " + item);
				}
			).join("\n")
		);

		parseInterface.onePlus = onePlus;
	}

	let result = getNewInterface();

	try {

		findONE(parseInterface.onePlus.read(interface), "Use").map((item) => {

			return item.children.map((element) => {

				try {
					return parseInterfaceElement(element);
				}

				catch(error) {
					return getNewInterface();
				}
			});
		}).flat().forEach((item) => {

			result.components = result.components.concat(item.components);

			appendPackage(result.utilities, item.utilities);
		});

		return result;
	}

	catch(error) {
		
	}

	return result;
}

var parseInterfaceElement = (element) => {

	let connections = filterONE(element, "Connections");
	let utilities = filterONE(element, "Utilities");

	let interface = getNewInterface();

	if(connections == null && utilities == null) {

		let reference = moduleDependencies.aliases[
			element.content.split(" ").join("-").toLowerCase()
		];

		if(reference != null)
			interface.references[reference] = true;

		return interface;
	}

	if(connections != null) {

		[
			filterONE(connections, "Extensions"),
			filterONE(connections, "References")
		].forEach((section) => {

			if(section == null)
				return;

			interface.references[item.children[0].content] =
				section.children.map((item) => {
					return item.content;
				});
		});
	}

	if(utilities != null)
		getONEUtilities(interface.utilities, utilities);

	return interface;
}
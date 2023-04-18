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

var getNewInterface = () => {
	
	return {
		components: [],
		modules: [],
		extensions: { },
		management: { },
		references: { }
	};
}

var getONEModules = (interface, element, path) => {

	let packages = filterONE(document, "Packages");
	let modules = filterONE(document, "Modules");

	packages.children.forEach((item) => {
		getONEModules(interface, item, path.concat([item.content]));
	});

	modules.forEach((item) => {

		let modulePath = path.concat([item.content]);

		// STUB
	});
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
			result.modules = result.components.concat(item.modules);

			Object.assign(result.extensions, item.extensions);
			Object.assign(result.management, item.management);
			Object.assign(result.references, item.references);
		});

		return result;
	}

	catch(error) {
		
	}

	return result;
}

var parseInterfaceElement = (element) => {

	let connections = filterONE(element, "Connections");
	let modules = filterONE(element, "Modules");

	let interface = getNewInterface();

	if(connections == null && modules == null) {

		let reference = moduleDependencies.aliases[element.content.split(" ").join("-").toLowerCase()];

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

			section.children.forEach((item) => {

				if(item.children.length == 0)
					return;

				interface.references[item.children[0].content] =
					section.content.toLowerCase() == "extensions";
			});
		});
	}

	if(modules != null)
		getONEModules(interface, modules, []);

	return interface;
}
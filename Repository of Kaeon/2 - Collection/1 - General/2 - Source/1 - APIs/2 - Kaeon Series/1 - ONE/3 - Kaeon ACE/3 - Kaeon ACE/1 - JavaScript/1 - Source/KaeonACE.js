var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	kaeonACECore: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/1%20-%20Core/1%20-%20Source/KaeonACECore.js",
	oneSuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
	standardKaeonACE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/3%20-%20Standard%20Kaeon%20ACE/1%20-%20Source/standardKaeonACE.js",
	widgets: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/1%20-%20General/1%20-%20JavaScript/1%20-%20Source/widgets.js"
};

var io = require(moduleDependencies.io);
var kaeonACE = require(moduleDependencies.kaeonACECore);
var oneSuite = require(moduleDependencies.oneSuite);
var standardKaeonACE = require(moduleDependencies.standardKaeonACE);
var widgets = require(moduleDependencies.widgets);

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

function getPlatform(environment) {

	if(environment == "browser") {

		if(typeof require == "function" && typeof module == "object") {

			if(module.parent != null)
				return "module";
		}

		return "cdn";
	}

	else
		return module.parent != null ? "module" : "cdn";
}

function run(ace, element) {

	element = element != null ? element : document.documentElement;

	var core = { };

	widgets.createStartScreen(element, "Start", () => {

		standardKaeonACE(core);
		
		kaeonACE.run(
			core,
			oneSuite.read(ace),
			element
		);
	});

	return core;
}

if(getPlatform(getEnvironment()) == "cdn") {

	var urlArgs = {};
	
	window.location.href.replace(
		/[?&]+([^=&]+)=([^&]*)/gi,
		function(match, key, value) {
			urlArgs[key.toLowerCase()] = decodeURIComponent(value);
		}
	);

	run(io.open(urlArgs["kaeonace"]));
}

else {

	module.exports = {
		run
	};
}
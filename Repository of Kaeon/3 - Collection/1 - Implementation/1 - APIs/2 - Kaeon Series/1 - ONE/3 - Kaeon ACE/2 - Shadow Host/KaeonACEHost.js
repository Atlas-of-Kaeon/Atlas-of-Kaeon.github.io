var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	kaeonACE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/1%20-%20Core/1%20-%20Source/KaeonACE.js",
	onePlus: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/4%20-%20ONE%2B/1%20-%20JavaScript/1%20-%20Source/ONEPlus.js",
	standardKaeonACE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/3%20-%20Standard%20Kaeon%20ACE/1%20-%20Source/standardKaeonACE.js",
	universalPreprocessor: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/5%20-%20Universal%20Preprocessor/1%20-%20JavaScript/1%20-%20Source/UniversalPreprocessor.js",
	widgets: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/1%20-%20General/1%20-%20JavaScript/1%20-%20Source/widgets.js"
};

var io = require(moduleDependencies.io);
var kaeonACE = require(moduleDependencies.kaeonACE);
var onePlus = require(moduleDependencies.onePlus);
var standardKaeonACE = require(moduleDependencies.standardKaeonACE);
var universalPreprocessor = require(moduleDependencies.universalPreprocessor);
var widgets = require(moduleDependencies.widgets);

var urlArgs = {};

window.location.href.replace(
	/[?&]+([^=&]+)=([^&]*)/gi,
	function(match, key, value) {
		urlArgs[key.toLowerCase()] = decodeURIComponent(value);
	}
);

function startGame(element) {

	var core = { };

	standardKaeonACE(core);
	
	kaeonACE.run(
		core,
		onePlus.readONEPlus(universalPreprocessor.preprocess(io.open(urlArgs["kaeonace"]))),
		element
	);
}

widgets.createStartScreen(document.documentElement, "Start", startGame);
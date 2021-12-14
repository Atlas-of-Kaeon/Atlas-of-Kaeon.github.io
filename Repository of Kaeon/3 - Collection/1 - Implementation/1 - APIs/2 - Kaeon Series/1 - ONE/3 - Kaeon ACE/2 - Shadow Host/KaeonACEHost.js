var moduleDependencies = {
	io: "",
	kaeonACE: "",
	onePlus: "",
	standardKaeonACE: "",
	universalPreprocessor: "",
	widgets: ""
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
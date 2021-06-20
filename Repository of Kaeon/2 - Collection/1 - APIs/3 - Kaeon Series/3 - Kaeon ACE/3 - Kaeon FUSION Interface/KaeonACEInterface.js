var moduleDependencies = {
	fusion: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/1%20-%20ONE/2%20-%20FUSION/1%20-%20JavaScript/1%20-%20Source/FUSION.js",
	kaeonACE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/3%20-%20Kaeon%20Series/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/1%20-%20Core/1%20-%20Source/KaeonACE.js",
	philosophersStone: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/2%20-%20Philosopher's%20Stone/1%20-%20Philosopher's%20Stone/1%20-%20JavaScript/1%20-%20Source/PhilosophersStone.js",
	widgets: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/4%20-%20Utilities/3%20-%20UI/1%20-%20Visual/3%20-%20Widgets/1%20-%20General/1%20-%20JavaScript/1%20-%20Source/widgets.js"
};

var fusion = require(moduleDependencies.fusion);
var kaeonACE = require(moduleDependencies.kaeonACE);
var philosophersStone = require(moduleDependencies.philosophersStone);
var widgets = require(moduleDependencies.widgets);

function getACECallback(fusion, ace) {

	return function(element) {
		kaeonACE.run(fusion, ace, element);
	};
}

let ACEModule = function() {

	philosophersStone.abide(this, new fusion.FUSIONUnit());

	this.verify = function(element) {
		return element.parent == null;
	}

	this.process = function(element, processed) {

		widgets.createStartScreen(
			document.documentElement,
			"Start",
			getACECallback(this.fusion, element)
		);
	}
}

module.exports = function(fusion) {

	let aceModule = new ACEModule();
	aceModule.fusion = fusion;

	philosophersStone.connect(fusion, aceModule, [], true);
};
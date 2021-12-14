var moduleDependencies = {
	fusion: "",
	kaeonACE: "",
	philosophersStone: "",
	widgets: ""
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
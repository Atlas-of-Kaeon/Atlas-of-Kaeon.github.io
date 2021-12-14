var moduleDependencies = {
	one: ""
};

var one = require(moduleDependencies.one);

function getItem(element, item, defaultOption) {

	if(one.getChild(element, item) != null)
		return one.getChild(element, item).children[0].content;

	return defaultOption;
}

module.exports = {
	getItem
};
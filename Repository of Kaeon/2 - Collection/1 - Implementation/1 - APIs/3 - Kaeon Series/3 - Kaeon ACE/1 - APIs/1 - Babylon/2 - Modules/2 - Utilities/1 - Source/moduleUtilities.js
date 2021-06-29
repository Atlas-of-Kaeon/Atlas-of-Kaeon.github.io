var moduleDependencies = {
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
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
var moduleDependencies = {
	repoExplorer: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/2%20-%20External/1%20-%20Repo%20Explorer/1%20-%20JavaScript/1%20-%20Source/repoExplorer.js",
	wrapONE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/1%20-%20Wrap%20ONE/1%20-%20Javascript/1%20-%20Source/wrapONE.js"
};

var repoExplorer = require(moduleDependencies.repoExplorer);
var wrapONE = require(moduleDependencies.wrapONE);

function render(protocol, path, title, originalPath, child) {

	originalPath = originalPath != null ? originalPath : path.join(": ");

	let items = repoExplorer.getItems(protocol, path);
	let result = "";

	if(items.files.length == 1) {

		let titleLine = path.join(": ");

		if(title != null)
			titleLine = title + titleLine.substring(originalPath.length);

		result =
			"#[ " + titleLine + " ]#\n\n" +
			repoExplorer.getItem(protocol, path.concat([items.files[0]])) +
			"\n\n";
	}

	items.folders.forEach((item) => {

		if(!child && !(item == "1 - Core" ||
			item == "1 - Connections" ||
			item == "2 - Connections")) {
			
			return;
		}

		result += render(
			protocol, path.concat([item]),
			title, originalPath, true
		) + "\n\n";
	});

	return !child ? wrapONE.wrap(result.trim(), 99) : result.trim();
}

module.exports = {
	render
};
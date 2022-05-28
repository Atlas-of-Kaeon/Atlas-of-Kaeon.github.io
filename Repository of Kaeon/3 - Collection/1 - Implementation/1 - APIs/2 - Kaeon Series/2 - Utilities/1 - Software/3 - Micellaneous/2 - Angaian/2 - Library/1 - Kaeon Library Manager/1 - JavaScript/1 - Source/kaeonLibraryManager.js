var moduleDependencies = {
	repoExplorer: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/2%20-%20Repo%20Explorer/1%20-%20JavaScript/1%20-%20Source/repoExplorer.js",
	wrapONE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/1%20-%20Wrap%20ONE/1%20-%20Javascript/1%20-%20Source/wrapONE.js"
};

var repoExplorer = require(moduleDependencies.repoExplorer);
var wrapONE = require(moduleDependencies.wrapONE);

function renderFolder(protocol, path) {

	let items = repoExplorer.getItems(protocol, path);
	let render = "";

	if(items.files.length == 1) {

		render =
			"#[ " + path.join(": ") + " ]#\n\n" +
			repoExplorer.getItem(protocol, path.concat([items.files[0]])) +
			"\n\n";
	}

	items.folders.forEach((item) => {
		render += renderFolder(protocol, path.concat([item])) + "\n\n";
	});

	return render.trim();
}

function renderLibrary(protocol, path) {

	let items = repoExplorer.getItems(protocol, path);
	let render = "";

	if(items.files.length == 1) {

		render =
			"#[ " + path.join(": ") + " ]#\n\n" +
			repoExplorer.getItem(protocol, path.concat([items.files[0]])) +
			"\n\n";
	}

	items.folders.forEach((item) => {

		if(!(item == "1 - Core" ||
			item == "1 - Connections" ||
			item == "2 - Connections")) {
			
			return;
		}

		render += renderFolder(protocol, path.concat([item])) + "\n\n";
	});

	return wrapONE.wrap(render.trim(), 99);
}

module.exports = {
	renderFolder,
	renderLibrary
};
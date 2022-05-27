var moduleDependencies = {
	repoExplorer: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/2%20-%20Repo%20Explorer/1%20-%20JavaScript/1%20-%20Source/repoExplorer.js"
};

var repoExplorer = require(moduleDependencies.repoExplorer);

function renderFolder(protocol, path) {

	let items = repoExplorer.getItems(protocol, path);
	let render = "";

	if(items.files.length == 1) {

		render =
			"#[ " + path.join(": ") + "]#\n\n" +
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
			"#[ " + path.join(": ") + "]#\n\n" +
			repoExplorer.getItem(protocol, path.concat([items.files[0]])) +
			"\n\n";
	}

	items.folders.forEach((item) => {

		if(!(item == "1 - Core" || item == "1 - Connections" || item == "2 - Connections"))
			return;

		render += renderFolder(protocol, path.concat([item])) + "\n\n";
	});

	return render.trim();
}

module.exports = {
	renderFolder,
	renderLibrary
};
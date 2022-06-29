var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js"
};

var io = require(moduleDependencies.io);

function deleteItem(protocol, path, credentials) {

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getItemGithub(path, credentials);

	return null;
}

function deleteItemGithub(path, credentials) {
	// STUB
}

function getAddress(protocol, path, credentials) {

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getAddressGithub(path, credentials);

	return null;
}

function getAddressGithub(path, credentials) {

	if(path.length < 3)
		return null;
	
	return "https://raw.githubusercontent.com/" +
		path[0].split(" ").join("-") +
		"/" +
		path[1].split(" ").join("-") +
		"/master/" +
		path.slice(2).map((item) => {
			return item.split(" ").join("%20");
		}).join("/");
}

function getBranches(protocol, path, credentials) {

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getAddressGithub(path, credentials);

	return null;
}

function getBranchesGithub(path, credentials) {

	let address = getAddressGithub(path, credentials);

	if(address == null)
		return null;

	return io.open(address);
}

function getItem(protocol, path, credentials) {

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getItemGithub(path, credentials);

	return null;
}

function getItemGithub(path, credentials) {
	
	let address = getAddressGithub(path, credentials);

	if(address == null)
		return null;

	return io.open(address);
}

function getItems(protocol, path, credentials) {

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getItemsGithub(path, credentials);

	return null;
}

function getItemsGithub(path, credentials) {

	if(path.length == 0)
		return [];

	if(path.length == 1) {
		// STUB
	}

	else {

		let data = JSON.parse(io.open(
			"https://api.github.com/repos/" +
			path[0].split(" ").join("-") +
			"/" +
			path[1].split(" ").join("-") +
			"/git/trees/" +
			"master" + // STUB
			"?recursive=1"
		)).tree;

		let location = path.slice(2).join("/").toLowerCase();

		let items = data.filter((item) => {

			if(item.path.length < location.length + 1)
				return false;

			if(item.path.substring(location.length + 1).indexOf("/") != -1)
				return false;

			return item.path.toLowerCase().startsWith(location);
		});

		return {
			folders: items.filter((item) => {
				return item.type == "tree";
			}).map((item) => {
				
				if(item.path.indexOf("/") == -1)
					return item.path;

				return item.path.substring(item.path.lastIndexOf("/") + 1);
			}).sort(),
			files: items.filter((item) => {
				return item.type == "blob";
			}).map((item) => {
				
				if(item.path.indexOf("/") == -1)
					return item.path;

				return item.path.substring(item.path.lastIndexOf("/") + 1);
			}).sort()
		};
	}
}

function getVersions(protocol, path, credentials) {

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getAddressGithub(path, credentials);

	return null;
}

function getVersionsGithub(path, credentials) {
	// STUB
}

function setItem(protocol, path, credentials, content) {

	// Add, Rename, Overwrite / Modify

	/*

		content: {
			name: "...",
			type: "file" | "folder",
			content:
				(file: "...") |
				("folder": {
					folders: [{
						name: "...",
						folders: [{ ... }, ...] },
						files: [{..., }, ...]
					}],
					files: [{ name: "...", content: "..." }]}
				)
		}

	*/

	protocol = protocol.toLowerCase().trim();

	if(protocol == "github")
		return getItemGithub(path, credentials, content);

	return null;
}

function setItemGithub(path, credentials, content) {
	// STUB
}

module.exports = {
	deleteItem,
	getAddress,
	getBranches,
	getItem,
	getItems,
	getVersions,
	setItem
};
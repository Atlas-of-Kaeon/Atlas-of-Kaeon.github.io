/*

	disk = { alias, setResource(path, content), getResource(path) }
	fileSystem = [disk 1, disk 2, ..., disk n]

	command =

		(path/)alias arg1 "arg 2" "\"arg \\2\""

		Notes

			default path includes "Origin://"
			default command = execute(.js) "code"

	startup = path in fileSystem to JSON file: [command 1, ...]

 */

var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	tokenizer: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/1%20-%20Data/2%20-%20Parsing/1%20-%20Tokenizer/1%20-%20JavaScript/1%20-%20Source/tokenizer.js"
};

var io = require(moduleDependencies.io);
var tokenizer = require(moduleDependencies.tokenizer);

function cookieDisk(cookie) {

	Object.assign(this, {
		"alias": cookie,
		setResource: function(path, content) {

			let data = window.localStorage.getItem(this.alias);

			if(data == null)
				data = "{}";

			if(path.trim() == "" && content == null) {

				window.localStorage.setItem(this.alias, "{}");

				return;
			}

			data = JSON.parse(data);

			path = path.split("/");

			let current = data;

			for(let i = 0; i < path.length - 1; i++) {
			
				if(current[path[i]] == null)
					current[path[i]] = { };

				current = current[path[i]];
			}

			if(content != null)
				current[path[path.length - 1]] = content;

			else
				delete current[path[path.length - 1]];

			window.localStorage.setItem(this.alias, JSON.stringify(data));
		},
		getResource: function(path) {

			let data = window.localStorage.getItem(this.alias);

			if(data == null) {

				if(path.trim() == "")
					return [[], []];

				return null;
			}

			data = JSON.parse(data);

			if(path.trim() == "")
				return getFolder(data);

			path = path.split("/");

			let current = data;

			for(let i = 0; i < path.length - 1; i++) {
			
				if(current[path[i]] == null)
					return null;

				current = current[path[i]];
			}

			let result = current[path[path.length - 1]];

			if(typeof result == "object")
				return getFolder(result);
			
			return result;
		}
	});
}

function executeCommand(command) {

	let args = getCommandArguments(command);

	let folder = args[0].substring(0, args[0].lastIndexOf("/") + 1);
	let item = args[0].substring(args[0].lastIndexOf("/") + 1);

	if(item.indexOf(".") != -1)
		item = item.substring(0, item.lastIndexOf("."));
	
	let data = window.fileSystem.getResource(folder);

	for(let i = 0; i < data[1].length; i++) {

		let resource = data[1][i];

		if(resource.indexOf(".") != -1)
			resource = resource.substring(0, resource.lastIndexOf("."));

		if(resource.toLowerCase() == item.toLowerCase()) {

			if(!folder.endsWith("/"))
				folder += "/";
			
			let file = window.fileSystem.getResource(folder + data[1][i]);

			if(file == null || typeof file == "object")
				return;

			arguments = args.slice(1);
		
			eval(file);
			
			return;
		}
	}
}

function getCommandArguments(command) {

	let args = [""];
	
	let tokens = tokenizer.tokenize([" ", "\"", "\\"], command);
	let inQuote = false;

	for(let i = 0; i < tokens.length; i++) {

		if(tokens[i] == "\"")
			inQuote = !inQuote;

		else if(tokens[i] == "\\") {

			args[args.length - 1] += tokens[i + 1];

			i++;
		}

		else if(tokens[i] == " " && !inQuote)
			args.push("");

		else
			args[args.length - 1] += tokens[i];
	}

	return args;
}

function getFolder(data) {

	let folder = [[], []];
	let keys = Object.keys(data);

	for(let i = 0; i < keys.length; i++) {
		
		if(typeof data[keys[i]] == "object")
			folder[0].push(keys[i]);
	
		else
			folder[1].push(keys[i]);
	}

	return folder;
}

function httpDisk() {

	Object.assign(this, {
		"alias": "http",
		setResource: function(path, content) {

		},
		getResource: function(path) {

			try {
				return io.open("http://" + path);
			}

			catch(error) {
				return null;
			}
		}
	});
}

function httpsDisk() {

	Object.assign(this, {
		"alias": "https",
		setResource: function(path, content) {

		},
		getResource: function(path) {

			try {
				return io.open("https://" + path);
			}

			catch(error) {
				return null;
			}
		}
	});
}

function initiateVirtualSystem(fileSystem, startup) {

	window.fileSystem = fileSystem;

	try {

		startup = JSON.parse(fileSystem.getResource(startup));

		for(let i = 0; i < startup.length; i++)
			executeCommand(startup[i]);
	}

	catch(error) {

	}
}

function initiateVirtualSystemDefault(startup) {

	let fileSystem = new virtualFileSystem(
		[
			new virtualSystem.cookieDisk("Origin"),
			new virtualSystem.httpDisk(),
			new virtualSystem.httpsDisk()
		]
	);

	fileSystem.setResource("Origin://execute.js", "eval(arguments[0]);");
	
	initiateVirtualSystem(fileSystem, startup);
}

function virtualFileSystem(disks) {

	Object.assign(this, {
		"disks": disks,
		setResource: function(path, content) {

			if(path.trim() == "" && content == null) {

				for(let i = 0; i < this.disks.length; i++)
					disks[i].setResource(path, content);
			}

			let alias = path.substring(0, path.indexOf(":"));
			path = path.substring(path.indexOf(":") + 3);

			for(let i = 0; i < this.disks.length; i++) {

				if(disks[i].alias.toLowerCase() == alias.toLowerCase()) {

					disks[i].setResource(path, content);

					break;
				}
			}
		},
		getResource: function(path) {

			if(path.trim() == "") {
				
				let aliases = [];

				for(let i = 0; i < this.disks.length; i++)
					aliases.push(this.disks[i].alias);

				return aliases;
			}

			let alias = "";

			if(path.indexOf(":") != -1) {
				alias = path.substring(0, path.indexOf(":"));
				path = path.substring(path.indexOf(":") + 3);
			}

			else {
				alias = path;
				path = "";
			}

			for(let i = 0; i < this.disks.length; i++) {

				if(disks[i].alias.toLowerCase() == alias.toLowerCase())
					return disks[i].getResource(path);
			}
		}
	});
}

module.exports = {
	cookieDisk,
	executeCommand,
	getCommandArguments,
	getFolder,
	httpDisk,
	httpsDisk,
	initiateVirtualSystem,
	initiateVirtualSystemDefault,
	virtualFileSystem
};
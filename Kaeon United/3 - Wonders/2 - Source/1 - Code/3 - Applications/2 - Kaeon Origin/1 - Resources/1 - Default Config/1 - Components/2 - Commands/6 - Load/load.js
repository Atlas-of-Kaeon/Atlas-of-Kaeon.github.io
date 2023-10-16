var io = require("kaeon-united")("io");
var virtualSystem = require("kaeon-united")("virtualSystem");

function load(content, path, all) {

	JSON.parse(content);

	if(all) {

		window.localStorage.setItem("Storage", content);

		window.terminals[0].setMark("");
	}

	else {

		let mark = window.terminals[0].getMark();
		mark = mark.substring(0, mark.length - 1).trim();

		path = virtualSystem.getAbsolutePath(path, mark);

		virtualSystem.setResource(path, content);
	}
}

let args = Array.from(arguments);

let options = args.filter(arg => arg.startsWith("-"));
let path = args.filter(arg => !arg.startsWith("-"))[0];

if(path != null)
	load(io.open(path), path, options.includes("-a"));

else
	io.open((text) => { load(text, path, options.includes("-a")); });
var moduleDependencies = {
	virtualRun: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/3%20-%20Wonders/2%20-%20Source/1%20-%20Code/3%20-%20Applications/1%20-%20Applications/2%20-%20Utilities/4%20-%20Virtual%20Run/virtualRun.js"
};

var virtualSystem = require("kaeon-united")("virtualSystem");

let opCodes = {
	"-c": "&console=true",
	"-js": "&type=js",
	"-op": "&type=op",
	"-one": "&type=one",
	"-html": "&type=html",
};

let mark = window.terminals[0].getMark();
mark = mark.substring(0, mark.length - 1).trim();

let args = Array.from(arguments);

let options = args.filter(arg => Object.keys(opCodes).includes(arg));
let path = args.filter(arg => !Object.keys(opCodes).includes(arg))[0];

args = args.filter(arg => !Object.keys(opCodes).includes(arg)).slice(1);

window.open(
	moduleDependencies.virtualRun +
		"&path=" +
		encodeURIComponent(virtualSystem.getAbsolutePath(path, mark)) +
		options.map(option => opCodes[option]).join("") +
		"&args=" +
		encodeURIComponent(JSON.stringify(args)),
	"_blank"
);
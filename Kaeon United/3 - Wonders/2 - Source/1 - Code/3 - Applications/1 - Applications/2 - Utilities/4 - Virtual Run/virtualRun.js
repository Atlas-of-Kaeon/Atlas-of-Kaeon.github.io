var consoleWidget = require("kaeon-united")("consoleWidget");
var http = require("kaeon-united")("httpUtils");
var oneSuite = require("kaeon-united")("ONESuite");
var virtualSystem = require("kaeon-united")("virtualSystem");

virtualSystem.initiateVirtualSystemDefault();

let urlArgs = http.getURLArguments();

let path = urlArgs["path"] != null ? urlArgs["path"] : "";
let content = virtualSystem.getResource(path);

let type = urlArgs["type"];

if(type == null && path.includes("."))
	type = path.substring(path.lastIndexOf(".") + 1);

if(urlArgs["console"] == "true") {
	consoleWidget.createConsole();
}

if(type == "op" || type == "one")
	oneSuite.process(content);

else if(type == "html") {

	document.documentElement.innerHTML = "";

	document.write(content);
}

else
	eval(content);
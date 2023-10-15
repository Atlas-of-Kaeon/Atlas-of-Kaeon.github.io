var consoleWidget = require("kaeon-united")("consoleWidget");
var http = require("kaeon-united")("httpUtils");
var oneSuite = require("kaeon-united")("ONESuite");
var virtualSystem = require("kaeon-united")("virtualSystem");

virtualSystem.initiateVirtualSystemDefault();

let urlArgs = http.getURLArguments();

let content = virtualSystem.getResource(
	urlArgs["path"] != null ? urlArgs["path"] : "");

let type = (urlArgs["type"] != null ? urlArgs["type"] : "js").toLowerCase();

if(type == "js")
	eval(content);

if(type == "kf")
	oneSuite.process(content);

if(type == "html") {

	document.documentElement.innerHTML = "";

	document.write(content);
}

if(urlArgs["consoleOn"] == "true") {
	consoleWidget.createConsole();
}
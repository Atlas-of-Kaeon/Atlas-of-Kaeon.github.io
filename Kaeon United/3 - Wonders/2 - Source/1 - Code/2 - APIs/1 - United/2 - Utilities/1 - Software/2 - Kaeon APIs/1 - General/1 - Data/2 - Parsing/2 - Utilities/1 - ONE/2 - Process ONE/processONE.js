var onePlus = require("kaeon-united")("onePlus");
var wrapONE = require("kaeon-united")("wrapONE");

function extractLibrary(source) {

	return source.split("\r").join("").split(/\n#\[(.*)\]#/).filter((line) => {
		return line.trim().length > 0;
	}).map((line) => {
		
		return line.startsWith(" ") && line.endsWith(" ") ?
			line.trim() : onePlus.read(line.trim());
	});
}

function getType(element) {

	if(element.parent == null)
		return "root";

	let siblings = element.parent.children;

	if(element.parent.parent == null && siblings.length == 0)
		return "title";

	return siblings.filter((item) => {
		return item.children.length > 0
	}).length > 0 ? "section" : "content";
}

function isLibrary(source) {

	return (
		source.trim().startsWith("#[") ||
		source.includes("\n#[")
	) && source.includes("]#\n");
}

function labelONE(element, path) {

	if(Array.isArray(element)) {

		element.forEach((item) => {

			if(typeof item == "object")
				labelONE(item);
		});

		return element;
	}

	path = path != null ? path : "";

	let type = getType(element);

	if(path.length > 0 && (type == "title" || type == "section")) {

		element.content = (path + " - " + element.content).
			split(":  ").join(" ");
	}

	element.children.forEach((item, index) => {
		
		labelONE(
			item,
			(path +
				(path.length > 0 ? "." : "") +
				(type != "root" ? index + 1 : "")
			).split(" .").join(" ")
		);
	});

	return element;
}

function process(source, html, indent) {

	let markONE = toMarkONE(labelONE(
		isLibrary(source) ?
			extractLibrary(source) :
			onePlus.read(source)
	));

	return html ? styleMarkONE(markONE, indent) : markONE;
}

function styleMarkONE(markONE, indent) {

	return `<style>

	body {
		font-family: Georgia, serif;
		width: 100%;
	}

	h1 {
		font-size: 24pt;
		text-align: center;
	}

	h2 {
		font-size: 22pt;
	}

	h3 {
		font-size: 20pt;
	}

	h4 {
		font-size: 18pt;
	}

	h5 {
		font-size: 16pt;
	}

	h6 {
		font-size: 14pt;
	}` + (indent ? `

	p {
		font-size: 12pt;
		margin-left: 36pt;
	}

` : "\n\n") + `</style>
` + toHTML(markONE);
}

function toHTML(markdown) {

	return markdown.
		split("<").join("&lt;").
		split(">").join("&gt;").
		replace(/^###### (.*$)/gim, '<h6>$1</h6>').
		replace(/^##### (.*$)/gim, '<h5>$1</h5>').
		replace(/^#### (.*$)/gim, '<h4>$1</h4>').
		replace(/^### (.*$)/gim, '<h3>$1</h3>').
		replace(/^## (.*$)/gim, '<h2>$1</h2>').
		replace(/^# (.*$)/gim, '<h1>$1</h1>').
		replace(/\*\*(.*)\*\*/gim, '<b>$1</b>').
		replace(/\*(.*)\*/gim, '<i>$1</i>').
		replace(/\_\_(.*)\_\_/gim, '<b>$1</b>').
		replace(/\_(.*)\_/gim, '<i>$1</i>').
		trim().split("\n").filter((line) => {
			return line.trim().length > 0;
		}).map((line) => {
			return line.startsWith("<") ? line : "<p>" + line + "</p>";
		}).join("\n").split("</i>\n<i>").join("</i>\n<br/>\n<i>");
}

function toMarkONE(element, nest) {

	if(Array.isArray(element)) {

		return element.map((item) => {

			return typeof item == "string" ?
				"_" + item + "_" :
				toMarkONE(item);
		}).join("\n\n");
	}

	if(nest == null)
		wrapONE.unwrapONE(element);

	nest = nest != null ? nest : 0;
	nest = nest <= 6 ? nest : 6;

	let result = "";
	let type = getType(element);

	if(type == "title" || type == "section") {

		let heading = "";

		for(let i = 0; i < nest; i++)
			heading += "#";

		result += heading + " ";
	}

	result += element.content;

	element.children.forEach((item, index) => {
		
		let child = toMarkONE(item, nest + 1);

		if(child != "")
			result += "\n" + child;
	});

	return result;
}

module.exports = {
	extractLibrary,
	getType,
	isLibrary,
	labelONE,
	process,
	styleMarkONE,
	toHTML,
	toMarkONE
};
var moduleDependencies = {
	drawdown: "https://raw.githubusercontent.com/adamvleggett/drawdown/master/drawdown.js"
};

var io = require("kaeon-united")("io");
var onePlus = require("kaeon-united")("onePlus");
var wrapONE = require("kaeon-united")("wrapONE");

function extractLibrary(source) {

	return source.split("\r").join("").split(/#\[(.*)\]#/).filter((line) => {
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

	if(element.parent.parent == null && siblings.length - 1 == 0)
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

function labelONE(element, options, path) {

	options = options != null ? options : { };

	if(Array.isArray(element)) {

		element.forEach((item) => {

			if(typeof item == "object")
				labelONE(item, options);
		});

		return element;
	}

	path = path != null ? path : "";

	let type = getType(element);

	if(path.length > 0 && (type == "title" || type == "section")) {

		element.content = (
			(options.flat ?
				path.substring(path.indexOf(".") + 1) :
				path) +
			" - " +
			element.content
		).split(":  ").join(" ");
	}

	element.children.forEach((item, index) => {
		
		labelONE(
			item,
			options,
			(path +
				(path.length > 0 ? "." : "") +
				(type != "root" ? index + 1 : "")
			).split(" .").join(" ")
		);
	});

	return element;
}

function process(source, options) {

	options = options != null ? options : { };

	let markONE = toMarkONE(
		labelONE(
			isLibrary(source) ?
				extractLibrary(source) :
				onePlus.read(source),
			options
		),
		options
	);

	return options.html ? styleMarkONE(markONE, options) : markONE;
}

function styleMarkONE(markONE, options) {

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
	}` + (options.indent ? `

	p {
		font-size: 12pt;
		margin-left: 36pt;
	}

` : "\n\n") + `</style>
` + toHTML(markONE);
}

function toHTML(source) {

	if(this.markdown == null) {

		eval(io.open(moduleDependencies.drawdown));

		this.markdown = markdown;
	}

	return this.markdown(source);
}

function toMarkONE(element, options, nest) {

	options = options != null ? options : { };

	if(Array.isArray(element)) {

		return element.map((item) => {

			return typeof item == "string" ?
				"_" + item + "_" :
				toMarkONE(item, options);
		}).join("\n\n");
	}

	if(nest == null)
		wrapONE.unwrapONE(element);

	nest = nest != null ? nest : 0;
	nest = nest <= 6 ? nest : 6;

	let result = "";
	let type = getType(element);

	if(type == "title" || (!options.flat && type == "section")) {

		let heading = "";

		for(let i = 0; i < nest; i++)
			heading += "#";

		result += heading + " ";
	}

	if(!(options.flat && nest == 2)) {

		if(options.flat && type == "section")
			result += "**[";
	
		result += options.flat ? (element.content.split("\n\n").join(" **|** ")) : element.content;
	
		if(options.flat && type == "section")
			result += "]**";
	}

	let temp = "\n\n#[ STUB ]#\n\n";

	element.children.forEach((item, index) => {
		
		let child = toMarkONE(item, options, nest + 1);

		if(child != "")
			result += (
				options.flat && type != "title" ?
					(index > 0 && options.flat ?
						temp + "**|**" +  temp :
						temp
					) :
					(nest == 1 && index > 0 && options.flat ?
						"\n\n---\n\n" :
						"\n\n"
					)
			) + child;
	});

	while(result.includes(temp + temp))
		result = result.split(temp + temp).join(temp);

	result = result.split(temp).join(" ");

	while(result.includes("**|** **["))
		result = result.split("**|** **[").join(" **[");

	return result.trim();
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
let one = require("kaeon-united")("one");
let oneSuite = require("kaeon-united")("oneSuite");
let wrapONE = require("kaeon-united")("wrapONE");

let style = `<style>

	p {
		font-family: Georgia, serif;
		font-size: 12px;
	}

	hr {
		margin-left: 40px;
	}

	.paper-one-reference {
		font-style: italic;
	}

	.paper-one-title {
		font-weight: bold;
		font-size: 24px;
		text-align: center;
	}

	.paper-one-nest-1 {
		font-size: 24px;
	}

	.paper-one-nest-2 {
		font-size: 22px;
	}

	.paper-one-nest-3 {
		font-size: 20px;
	}

	.paper-one-nest-4 {
		font-size: 18px;
	}

	.paper-one-nest-5 {
		font-size: 16px;
	}

	.paper-one-nest-6 {
		font-size: 14px;
	}

	.paper-one-subtitle {
		font-weight: bold;
	}

	.paper-one-text {
		margin-left: 40px;
	}

</style>
`;

function toPaperONEElement(element, markup, indices) {

	let content = element.content;

	if(indices.length > 1 && element.children.length > 0)
		content = indices.slice(1).join(".") + " - " + content;

	if(markup)
		content = content.split("\n\n").join("<br/>");

	let paperClass = indices.length == 1 ?
		"paper-one-title" :
		(element.children.length > 0 ?
			"paper-one-subtitle paper-one-nest-" + (indices.length + 1) :
			"paper-one-text");

	let text = markup ?
		"<p class=\"paper-one " +
			paperClass +
			"\">" +
			content +
			(paperClass == "paper-one-text" && one.getIndex(element) + 1 < element.parent.children.length ?
				"<hr/>" :
				""
			) +
			"</p>" :
		content;

	element.children.forEach((child, index) => {

		let newIndices = indices.slice(0);
		newIndices.push(index + 1);

		text += "\n" + toPaperONEElement(child, markup, newIndices);
	});

	return text;
}

function toPaperONEDocument(document, markup) {

	try {

		let element = oneSuite.read(document);
		wrapONE.unwrapONE(element);
	
		return toPaperONEElement(element, markup, []);
	}

	catch(error) {
		return "";
	}
}

function toPaperONE(document, markup) {

	document = document.split("\r").join("");

	let tokens = document.split(/#\[(.*)\]#/);

	tokens = tokens.map(token => token.trim()).
		filter(token => token.length > 0);

	tokens = tokens.map((token, index) => {
		
		if(index == 0 || index % 2 == 1)
			return markup ? "<p class=\"paper-one paper-one-reference\">" + token + "</p>" : token;

		return toPaperONEDocument(token, markup);
	})

	return (markup ? style : "") + tokens.join("\n");
}

module.exports = {
	toPaperONE
};
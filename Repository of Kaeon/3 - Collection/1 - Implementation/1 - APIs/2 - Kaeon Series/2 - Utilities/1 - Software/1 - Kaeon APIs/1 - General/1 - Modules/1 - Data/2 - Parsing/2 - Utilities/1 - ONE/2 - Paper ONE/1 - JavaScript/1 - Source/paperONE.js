var moduleDependencies = {
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
	onePlus: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/4%20-%20ONE%2B/1%20-%20JavaScript/1%20-%20Source/ONEPlus.js",
	wrapONE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/1%20-%20Wrap%20ONE/1%20-%20Javascript/1%20-%20Source/wrapONE.js"
}

let one = require(moduleDependencies.one);
let onePlus = require(moduleDependencies.onePlus);
let wrapONE = require(moduleDependencies.wrapONE);

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

	let element = null;

	try {
		element = onePlus.readONEPlus(document);
	}

	catch(error) {

		try {
			element = one.readONE(document);
		}

		catch(error) {
			return "";
		}
	}

	wrapONE.unwrapONE(element);

	return toPaperONEElement(element, markup, []);
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
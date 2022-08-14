var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js",
	wrapONE: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/1%20-%20Wrap%20ONE/1%20-%20Javascript/1%20-%20Source/wrapONE.js"
};

var io = require(moduleDependencies.io);
var one = require(moduleDependencies.one);
var vision = require(moduleDependencies.vision);
var wrapONE = require(moduleDependencies.wrapONE);

function getDocument(query) {

	let data = JSON.parse(io.open(
		"https://en.wikipedia.org/w/api.php?" +
			"action=query&format=json&prop=extracts&titles=" +
			query.split(" ").join("%20")
	)).query.pages;

	data = data[Object.keys(data)[0]].extract;

	let div = vision.create({
		style: { display: "none" },
		fields: { innerHTML: data }
	});

	let element = one.create(query);

	one.add(element, one.create("Philosophy"));
	one.add(element, one.create("Principles"));

	one.add(
		element.children[0],
		one.create(div.children[1].textContent.trim())
	);

	let current = element.children[1];
	let content = "";

	Array.from(div.children).slice(2).forEach((item) => {

		if(item.tagName == "P") {

			let paragraph = one.create(
				content + "Item " + (current.children.length + 1)
			);

			one.add(current, paragraph);
			one.add(paragraph, one.create(item.textContent.trim()));
			
		}

		if(item.tagName.startsWith("H")) {

			let root = current;

			let level = Number(item.tagName.substring(1)) - 1;
			let nest = 0;

			while(root.parent != null) {
				nest++;
				root = root.parent;
			}

			root = current;
			
			if(level < nest) {

				for(let i = 0; i < nest - level; i++)
					root = root.parent;
			}

			content = root.content != "Principles" ? root.content + ": " : "";

			let section = one.create(
				content +
					"Item " +
					(root.children.length + 1) +
					" - " +
					item.textContent);

			one.add(root, section);

			current = section;
			content = current.content + ": ";
		}
	});

	wrapONE.wrapONE(100, 4, element);

	return one.write(element);
}

function getSummary(query) {

	return wrapONE.unwrap(
		one.read(getDocument(query)).
			children[0].children[0].children[0].content
	);
}

function search(query) {

	let results = [];

	let data = io.open(
		"https://en.wikipedia.org/w/index.php?" +
			"title=Special:Search&profile=advanced&fulltext=1&ns0=1&search=" +
			query.split(" ").join("+")
	);

	let div = vision.create({
		style: { display: "none" },
		fields: { innerHTML: data }
	});

	let correction = div.querySelector(".searchdidyoumean > a");

	if(correction != null) {

		data = io.open(
			"https://en.wikipedia.org/w" +
			correction.href.substring(correction.href.lastIndexOf("/"))
		);

		div = vision.create({
			style: { display: "none" },
			fields: { innerHTML: data }
		});
	}

	Array.from(
		div.querySelectorAll(".mw-search-result-heading")
	).forEach((item) => {

		results.push(
			item.children[0].href.substring(
				item.children[0].href.lastIndexOf("/") + 1
			)
		);
	});

	return results;
}

module.exports = {
	getDocument,
	getSummary,
	search
};
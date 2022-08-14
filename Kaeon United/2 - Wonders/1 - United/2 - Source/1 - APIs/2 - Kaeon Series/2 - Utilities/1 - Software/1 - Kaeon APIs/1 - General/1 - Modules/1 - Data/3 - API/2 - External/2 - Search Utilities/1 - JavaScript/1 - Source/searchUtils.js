var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js"
};

var io = require(moduleDependencies.io);
var vision = require(moduleDependencies.vision);

function search(engine, query, limit) {

	if(engine.toLowerCase() == "google")
		return searchGoogle(query, limit);

	return [];
}

function searchGoogle(query, limit) {

	limit = Math.ceil((limit != null ? limit : 10) / 10);

	let results = [];

	for(let i = 0; i < limit; i++) {

		let data = io.open(
			"https://www.google.com/search?q=" +
			query.split(" ").join("+") +
			"&start=" +
			(i * 10)
		);
	
		let div = vision.create({
			fields: {
				innerHTML: data
			},
			style: {
				display: "none"
			}
		});
	
		vision.extend(div);
	
		results = results.concat(
			Array.from(div.querySelectorAll("a")).map((item) => {
				return item.href;
			}).filter((item) => {

				return !(
					item.startsWith(window.location.origin) ||
					item.startsWith("https://support.google.com/") ||
					item.startsWith("https://policies.google.com/") ||
					item.startsWith("https://www.google.com/webhp?hl=")
				) && item.length > 0;
			})
		);

		vision.remove(div);
	}

	return results.filter(function(item, pos) {
		return results.indexOf(item) == pos;
	});
}

module.exports = {
	search
};
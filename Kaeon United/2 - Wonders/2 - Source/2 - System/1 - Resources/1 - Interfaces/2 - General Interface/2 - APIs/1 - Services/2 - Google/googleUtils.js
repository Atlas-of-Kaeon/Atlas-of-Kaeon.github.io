var moduleDependencies = {
	cors: "https://ghost-cors.herokuapp.com/"
};

var vision = require("kaeon-united")("vision");

function flatten(array, type) {

	let result = [];

	for(let i = 0; i < array.length; i++) {

		if(Array.isArray(array[i]))
			result = result.concat(flatten(array[i], type));

		else
			result.push(array[i]);
	}

	return result;
}

function getLanguageGoogle(query) {

	try {

		let data = open(
			"https://www.google.com/search?q=translate+" +
			query.split(" ").join("+") +
			"+language"
		);
	
		let div = vision.create({
			fields: {
				innerHTML: data
			},
			style: {
				display: "none"
			}
		});
	
		let result = div.querySelector(
			"#tw-sl > span.source-language"
		).innerHTML;
	
		return result.substring(0, result.indexOf(" "));
	}

	catch(error) {
		return "";
	}
}

function open(path) {

	try {

		path = moduleDependencies.cors + path;
		
		let rawFile = new XMLHttpRequest();

		rawFile.open("GET", path, false);

		let allText = "";

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0)
					allText = rawFile.responseText;
			}
		}

		rawFile.send(null);

		return allText;
	}

	catch(error) {
		return "";
	}
}

function searchGoogle(query, limit) {

	limit = Math.ceil((limit != null ? limit : 10) / 10);

	let results = [];

	for(let i = 0; i < limit; i++) {

		let data = open(
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
	}

	return results.filter(function(item, pos) {
		return results.indexOf(item) == pos;
	});
}

function searchImagesGoogle(query) {

	let data = open(
		"https://www.google.com/search?tbm=isch&q=" +
			query.split(" ").join("+")
	);
	
	data = data.substring(data.indexOf("data:[") + 6);

	data = JSON.parse(data.substring(
		data.indexOf("data:[") + 5,
		data.lastIndexOf(", sideChannel: {}});</script>")
	));

	return flatten(data).filter((item) => {

		if(typeof item != "string")
			return false;

		if(!(item.startsWith("http") &&
			!item.startsWith("https://encrypted-tbn0.gstatic.com"))) {

			return false;
		}

		return item.substring(item.lastIndexOf("/")).includes(".");
	});
}

function translateGoogle(query, targetLanguage, sourceLanguage) {

	try {

		let data = open(
			"https://www.google.com/search?q=translate+" +
			query.split(" ").join("+") +
			(sourceLanguage != null ?
				"+from+" + sourceLanguage :
				"") +
			"+to+" +
			targetLanguage
		);
	
		let div = vision.create({
			fields: {
				innerHTML: data
			},
			style: {
				display: "none"
			}
		});
	
		return div.querySelector("#tw-target-text > span").innerHTML;
	}

	catch(error) {
		return "";
	}
}

module.exports = {
	methods: {
		flatten,
		getLanguageGoogle,
		searchGoogle,
		searchImagesGoogle,
		translateGoogle
	},
	interfaces: {
		search: {
			name: "google",
			methods: {
				getLanguage: getLanguageGoogle,
				search: searchGoogle,
				searchImages: searchImagesGoogle,
				translate: translateGoogle
			}
		}
	}
};
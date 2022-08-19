var io = require("kaeon-united")("io");
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

function searchImagesGoogle(query) {

	let data = io.open(
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

module.exports = {
	methods: {
		flatten,
		searchGoogle,
		searchImagesGoogle
	},
	interfaces: {
		search: {
			name: "google",
			methods: {
				search: searchGoogle,
				searchImages: searchImagesGoogle
			}
		}
	}
};
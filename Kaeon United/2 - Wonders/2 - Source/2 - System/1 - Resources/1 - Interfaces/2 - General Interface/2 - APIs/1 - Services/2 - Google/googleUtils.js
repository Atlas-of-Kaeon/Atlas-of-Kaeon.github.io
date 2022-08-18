var io = require("kaeon-united")("io");
var vision = require("kaeon-united")("vision");

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
	methods: {
		searchGoogle
	},
	interfaces: {
		search: {
			name: "google",
			methods: {
				search: searchGoogle
			}
		}
	}
};
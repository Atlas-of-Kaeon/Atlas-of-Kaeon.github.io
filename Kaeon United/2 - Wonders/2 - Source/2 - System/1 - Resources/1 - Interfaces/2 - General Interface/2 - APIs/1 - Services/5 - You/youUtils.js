function chat(query) {
	
	if(typeof query == "string")
		query = { text: query, chat: [] };

	query.text = query.text != null ? "" + query.text : "";

	if(query.chat == null)
		query.chat = [];

	else if(!Array.isArray(query.chat))
		query.chat = [];

	if(query.chat.length % 2 == 1)
		query.chat.push("");

	let chat = [];

	for(let i = 0; i < query.chat.length; i += 2) {

		chat.push({
			question: query.chat[i],
			answer: query.chat[i + 1]
		});
	}

	let text = parseResponse(
		open(
			"https://you.com/api/youchatStreaming?question=" +
				encodeURIComponent(query.text) +
				"&chat=" +
				encodeURIComponent(JSON.stringify(chat))
		)
	);
	
	return {
		text: text,
		chat: query.chat.concat([query.text, text])
	};
}

function open(path) {

	try {
		
		let xhr = new XMLHttpRequest();
		xhr.open("GET", path, false);

		let text = "";

		xhr.onreadystatechange = function() {

			if(xhr.readyState === 4) {

				if(xhr.status === 200 || xhr.status == 0)
					text = xhr.responseText;
			}
		}

		xhr.send(null);

		return text;
	}

	catch(error) {
		return "";
	}
}

function parseResponse(data) {

	return data.trim().split("\n\n").map(item => {

		let lines = item.split("\n");

		if(lines[0].trim() != "event: token")
			return "";

		return JSON.parse(lines[1].trim().substring(6).trim()).token;
	}).join("");
}

function search(query, limit) {

	return searchExecute(
		query, limit, 10, "search", "search", "bing_search_results"
	);
}

function searchExecute(query, limit, increment, domain, object, list) {

	let pages = Math.ceil((limit != null ? limit : increment) / increment);

	let results = [];

	for(let i = 0; i < pages; i++) {

		results = results.concat(
			open(
				"https://you.com/api/streamingSearch?q=" +
					encodeURIComponent(query) +
					"&page=" +
					i +
					"&count=" +
					(pages * increment) +
					"&domain=" +
					domain
			).trim().split("\n\n").map(item => {
				
				item = item.split("\n");
				
				if(item[0] != "event: thirdPartySearchResults")
					return [];
	
				return JSON.parse(
					item[1].trim().substring(5).trim()
				)[object][list].map(item => item.url);
			}).flat()
		);
	}

	return results.slice(0, limit);

}

function searchImages(query, limit) {

	return searchExecute(
		query, limit, 30, "image", "image", "results"
	);
}

module.exports = {
	methods: {
		chat,
		open,
		parseResponse,
		search,
		searchImages
	},
	interfaces: {
		chat: {
			name: "you",
			methods: {
				chat
			}
		},
		search: {
			name: "you",
			methods: {
				search: search,
				searchImages: searchImages
			}
		}
	}
};
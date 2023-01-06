var io = require("kaeon-united")("io");
var vision = require("kaeon-united")("vision");

function getData(array, item) {

	let newData = [];

	let newArray = item.data.body != null ?
		array.concat(item.data.body) :
		array;

	let replies = item.data.replies;

	if(typeof replies != "object")
		return [newArray];

	replies = replies.data.children;

	if(replies.length == 0)
		return [newArray];

	replies.forEach(reply => {
		newData = newData.concat(getData(newArray, reply));
	});

	return newData;
}

function getForums() {

	return [... new Set(Array.from(vision.create({
		fields: { innerHTML:
			io.open(
				"https://www.reddit.com/r/ListOfSubreddits/wiki/listofsubreddits/"
			)
		}
	}).querySelectorAll("a")).map(
		item => item.href
	).filter(
		item => item.includes("/r/")
	).map(
		item => item.substring(item.lastIndexOf("/") + 1)
	).filter(
		item => item.length > 0 && !item.includes("#")
	).sort())];
}

function getPrompt(item) {

	item = item.data.children[0];

	return item.kind == "t3" ? item.data.title : item.data.body;
}

function getSite() {

	let data = [];

	getForums().forEach(forum => {
	
		getThreads(forum).forEach(thread => {
			data = data.concat(getThread(thread + ".json"));
		});
	});

	return data;
}

function getThread(url) {

	try {
	
		let data = [];
	
		let source = JSON.parse(io.open(url));
		let array = [getPrompt(source[0])];
		
		source[1].data.children.forEach(item => {
			data = data.concat(getData(array, item));
		});
	
		return data;
	}

	catch(error) {
		return [];
	}
}

function getThreads(forum) {

	try {

		return JSON.parse(io.open(
			"https://www.reddit.com/r/" +
				forum +
				"/new/.json"
		)).data.children.map(
			item => item.data.url
		).filter(
			item => item.startsWith("https://www.reddit.com/r/")
		);
	}

	catch(error) {
		return [];
	}
}

module.exports = {
	methods: {
		getForums,
		getSite,
		getThread,
		getThreads
	},
	interfaces: {
		forum: {
			name: "reddit",
			methods: {
				getForums,
				getSite,
				getThread,
				getThreads
			}
		}
	}
};
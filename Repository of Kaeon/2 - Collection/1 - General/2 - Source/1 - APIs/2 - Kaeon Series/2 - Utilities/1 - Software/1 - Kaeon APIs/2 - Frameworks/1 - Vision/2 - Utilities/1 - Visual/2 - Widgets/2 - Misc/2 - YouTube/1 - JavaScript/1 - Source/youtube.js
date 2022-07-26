var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js"
};

var io = require(moduleDependencies.io);
var vision = require(moduleDependencies.vision);

function play(id, options, element) {

	options = options != null ? options : { };

	play.index =
		play.index != null ?
			play.index : -1;

	play.state =
		play.state != null ?
			play.state : { };

	play.index++;

	let player = vision.create({
		tag: "iframe",
		style: options.style,
		attributes: {
			src: "https://www.youtube.com/embed/" +
				id +
				"?autoplay=1" +
				(options.loop ?
					"&playlist=" +
						(options.list != null ? options.list : id) +
						"&loop=1" :
					""
				),
			allow: "autoplay"
		}
	});

	play.state["" + play.index] = player;

	vision.extend(
		element != null ?
			element :
			document.documentElement,
		player
	);

	return "" + play.index;
}

function playAudio(id, options, element) {

	options = options != null ? options : { };
	options.style = options.style != null ? options.style : { };

	options.style.display = "none";

	return play(id, options, element);
}

function search(query) {

	return [
		...new Set(
			io.open(
				"https://www.youtube.com/results?search_query=" +
					query.toLowerCase().split(" ").join("+")
			).split("\"videoId\":\"").map((item, index) => {
		
				return index > 0 && index % 2 == 0 ?
					item.substring(0, item.indexOf("\"")) :
					null;
			}).filter((item) => {
				return item != null;
			})
		)
	];
}

function stop(index) {

	try {
		vision.remove(play.state[index]);
	}

	catch(error) {
		
	}

	try {
		delete play.state[index];
	}

	catch(error) {
		
	}
}

module.exports = {
	play,
	playAudio,
	search,
	stop
}
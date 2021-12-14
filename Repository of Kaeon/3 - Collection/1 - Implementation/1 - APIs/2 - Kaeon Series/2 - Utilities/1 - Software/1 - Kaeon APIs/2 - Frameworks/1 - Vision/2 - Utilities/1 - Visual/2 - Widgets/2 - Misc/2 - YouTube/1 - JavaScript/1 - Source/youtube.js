var moduleDependencies = {
	vision: ""
};

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

function stop(index) {

	vision.remove(play.state[index]);

	delete play.state[index];
}

module.exports = {
	play,
	playAudio,
	stop
}
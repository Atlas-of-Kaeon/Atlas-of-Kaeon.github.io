var moduleDependencies = {
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js"
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
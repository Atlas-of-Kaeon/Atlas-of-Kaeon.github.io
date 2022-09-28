var moduleDependencies = {
	cache: "https://ghost-cache.vercel.app/"
};

var dimensions = require("kaeon-united")("dimensions");
var http = require("kaeon-united")("httpUtils");
var io = require("kaeon-united")("io");
var media = require("kaeon-united")("generalReference")("media");
var widgets = require("kaeon-united")("widgets");

document.title = "Kaeon Cast";
 
widgets.createStartScreen(document.documentElement, "Start", () => {
 
	dimensions.fullscreen(document.documentElement);
 
	io.open(moduleDependencies.cache +
		"?key=" +
		http.getURLArguments(window.location.href)["key"] +
		"&value=");
 
	let time = -1;
	let playing = -1;
 
	document.documentElement.style.overflow = "hidden";
 
	setInterval(() => {
 
		try {
 
			let ping = io.open(moduleDependencies.cache +
				"?key=" +
				http.getURLArguments(window.location.href)["key"]);
 
			if(ping != "") {
 
				ping = JSON.parse(ping);
 
				if(ping.time != time) {
 
					time = ping.time;
 
					media.stop(playing);
 
					if(ping.value != "") {
 
						playing = media.play(ping.value);

						dimensions.fullscreen(document.documentElement);
					}
				}
			}
		}
 
		catch(error) {
 
		}
	}, 1000);
});
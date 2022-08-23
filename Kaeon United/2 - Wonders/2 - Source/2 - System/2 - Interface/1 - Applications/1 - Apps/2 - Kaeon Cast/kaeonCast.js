var moduleDependencies = {
	cache: "https://ghost-cache.herokuapp.com/"
};

var http = require("kaeon-united")("httpUtils");
var io = require("kaeon-united")("io");
var media = require("kaeon-united")("generalReference")("media");
var widgets = require("kaeon-united")("widgets");
 
function openFullscreen(element) {
 
	if(element.requestFullscreen)
		element.requestFullscreen();
 
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
 
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
 
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

document.title = "Kaeon Cast";
 
widgets.createStartScreen(document.documentElement, "Start", () => {
 
	openFullscreen(document.documentElement);
 
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
 
						playing = media.play(
							ping.value,
							{
								style: {
									position: "absolute",
									left: "0%",
									top: "0%",
									width: "100%",
									height: "100%",
									border: "none"
								}
							}
						);

						openFullscreen(document.documentElement);
					}
				}
			}
		}
 
		catch(error) {
 
		}
	}, 1000);
});
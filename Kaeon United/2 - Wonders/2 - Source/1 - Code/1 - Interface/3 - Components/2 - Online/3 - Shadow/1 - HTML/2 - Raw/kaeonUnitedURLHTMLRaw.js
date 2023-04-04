function executeHTML(code) {

	document.documentElement.innerHTML = code;

	let scripts = document.querySelectorAll("script");

	for(let i = 0; i < scripts.length; i++) {

		if(scripts[i].getAttribute("src") != null)
			(1, eval)(openResource(scripts[i].getAttribute("src")));

		(1, eval)(scripts[i].text);
	}
}

module.exports = (args) => {

	if(Array.isArray(args))
		return;

	let arg = args["htmlraw"]

	if(arg == null)
		return;

	executeHTML(args["htmlraw"]);
};
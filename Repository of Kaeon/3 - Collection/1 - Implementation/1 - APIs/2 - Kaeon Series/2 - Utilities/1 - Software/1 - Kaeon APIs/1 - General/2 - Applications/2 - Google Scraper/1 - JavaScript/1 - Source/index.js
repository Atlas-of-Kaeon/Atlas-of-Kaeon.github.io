var moduleDependencies = {
	io: ""
};

var puppeteer = require("puppeteer");
var getUrls = require('get-urls');

var io = require(moduleDependencies.io);

(async () => {

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto('https://www.google.com/search?q=' + encodeURIComponent(process.argv[2]));

	let content = await page.evaluate(() => document.body.innerHTML);
	let urls = Array.from(getUrls(content));

	for(let i = 0; i < urls.length; i++) {

		if(urls[i].includes("gstatic.com") ||
			urls[i].includes("google.com") ||
			urls[i] == "http://w3.org/2000/svg") {

			urls.splice(i, 1);

			i--;
		}
	}

	io.save(urls.join("\n"), "results.txt");

	await browser.close();
})();
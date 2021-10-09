var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/1%20-%20General/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js"
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
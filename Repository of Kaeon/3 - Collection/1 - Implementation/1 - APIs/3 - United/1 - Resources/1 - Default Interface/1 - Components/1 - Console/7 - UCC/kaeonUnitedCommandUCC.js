var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
	ucc: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/2%20-%20UCC/1%20-%20JavaScript/1%20-%20Source/UCC.js"
};

module.exports = (args) => {

	if(!Array.isArray(args))
		return;

	if(args.length == 0)
		return;

	if(args[0].toLowerCase() != "ucc")
		return;

	let io = require(moduleDependencies.io);
	let ONESuite = require(moduleDependencies.ONESuite);

	(async () => {

		let data = null;

		if(args[1] != null) {
			
			let flag = args[1].toLowerCase();

			data = ONESuite.preprocess(flag == "open" ? io.open(args[2]) : args[2]);
		}

		if(data.startsWith("http://") || data.startsWith("https://")) {

			let download = data;

			if(data.includes("?"))
				data = data.substring(0, data.indexOf("?"));

			data = data.substring(data.lastIndexOf("/") + 1);

			io.save(io.open(download), data);
		}

		execSync(
			"npx kaeon-united js open \"" +
			moduleDependencies.ucc +
			"\" " +
			data
		);
	})();
};
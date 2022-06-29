var moduleDependencies = {
	csb: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/3%20-%20CSB/1%20-%20JavaScript/1%20-%20Source/CSB.js",
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	ONESuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
};

module.exports = (args, intervals) => {

	if(!Array.isArray(args))
		return;

	if(args.length == 0)
		return;

	if(args[0].toLowerCase() != "assemble")
		return;

	let io = require(moduleDependencies.io);
	let ONESuite = require(moduleDependencies.ONESuite);

	(async () => {

		let data = null;

		if(args[1] != null) {
			
			let flag = args[1].toLowerCase();

			data = ONESuite.preprocess(flag == "open" ? io.open(args[2]) : args[2]);
		}

		if(!Array.isArray(data))
			data = require(moduleDependencies.csb)(data);
		
		fs.writeFileSync(args[3], new Uint8Array(Buffer.from(data)));

		intervals.forEach((item) => { clearInterval(item); });
	})();
};
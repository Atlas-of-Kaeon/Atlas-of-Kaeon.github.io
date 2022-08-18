var moduleDependencies = {
	ucc: ""
};

module.exports = (args, intervals) => {

	if(!Array.isArray(args))
		return;

	if(args.length == 0)
		return;

	if(args[0].toLowerCase() != "ucc")
		return;

	let io = require("kaeon-united")("io");
	let ONESuite = require("kaeon-united")("ONESuite");

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

		intervals.forEach((item) => { clearInterval(item); });
	})();
};
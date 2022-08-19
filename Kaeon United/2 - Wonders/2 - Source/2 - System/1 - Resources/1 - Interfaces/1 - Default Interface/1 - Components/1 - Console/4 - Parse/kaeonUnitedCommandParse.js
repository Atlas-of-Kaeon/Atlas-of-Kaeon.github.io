module.exports = (args, intervals) => {

	if(!Array.isArray(args))
		return;

	if(args.length == 0)
		return;

	if(args[0].toLowerCase() != "parse")
		return;

	let io = require("kaeon-united")("io");
	let ONESuite = require("kaeon-united")("ONESuite");

	(async () => {

		let data = null;

		if(args[1] != null) {
			
			let flag = args[1].toLowerCase();

			data = ONESuite.preprocess(flag == "open" ? io.open(args[2]) : args[2]);
		}

		let result = ONESuite.write(ONESuite.parse(data));

		if(result == null)
			result = "";

		result = ("" + result).trim();

		if(result != "") {

			console.log(result);

			if(args[3] != null)
				io.save(result, args[3]);
		}

		intervals.forEach((item) => { clearInterval(item); });
	})();
};
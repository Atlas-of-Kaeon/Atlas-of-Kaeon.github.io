module.exports = (args, callback) => {

	if(!Array.isArray(args)) {

		callback();

		return;
	}

	if(args.length == 0) {

		callback();

		return;
	}

	if(args[0].toLowerCase() != "js") {

		callback();

		return;
	}

	let io = require("kaeon-united")("io");
	let ONESuite = require("kaeon-united")("ONESuite");

	(async () => {

		let data = null;

		if(args[1] != null) {
			
			let flag = args[1].toLowerCase();

			data = ONESuite.preprocess(
				flag == "open" ? io.open(args[2]) : args[2]
			);
		}

		let result = "";

		if(data != null) {

			result = await eval(
				"(async () => {\n" +
				ONESuite.preprocess(data) +
				"\n})();"
			);
		}

		else {

			while(true) {

				let input = io.getInput("Enter code (Enter 'q' to quit): ");

				if(input.toLowerCase() == "q")
					return;

				console.log(
					await eval(
						"(async () => {\n" +
						ONESuite.preprocess(input) +
						"\n})();"
					)
				);
			}
		}

		if(result == null)
			result = "";

		result = ("" + result).trim();

		if(result != "") {

			console.log(result);

			if(args[3] != null)
				io.save(result, args[3]);
		}

		callback();
	})();
};
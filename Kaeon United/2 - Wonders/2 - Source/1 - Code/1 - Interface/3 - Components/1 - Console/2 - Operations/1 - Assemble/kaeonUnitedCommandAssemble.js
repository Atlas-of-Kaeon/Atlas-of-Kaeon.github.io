module.exports = (args, callback) => {

	if(!Array.isArray(args))
		return;

	if(args.length == 0)
		return;

	if(args[0].toLowerCase() != "assemble")
		return;

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

		if(!Array.isArray(data))
			data = require("kaeon-united")("csb")(data);
		
		fs.writeFileSync(args[3], new Uint8Array(Buffer.from(data)));

		callback();
	})();
};
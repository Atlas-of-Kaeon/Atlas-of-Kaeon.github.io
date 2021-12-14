var moduleDependencies = {
	one: "",
	onePlus: "",
	kaeonFUSION: "",
	universalPreprocessor: ""
};

var one = require(moduleDependencies.one);
var onePlus = require(moduleDependencies.onePlus);

var kaeonFUSION = require(moduleDependencies.kaeonFUSION);

var universalPreprocessor = require(moduleDependencies.universalPreprocessor);

function parse(string) {

	return one.toList(
		onePlus.readONEPlus(
			preprocess(
				string.split("\r").join("")
			)
		)
	);
}

function preprocess(string) {
	return universalPreprocessor.preprocess(string);
}

function process(code, fusion) {

	code =
		Array.isArray(code) ?
			one.toElement(code) :
			one.toElement(parse("" + code));

	if(fusion == null) {

		start = true;

		fusion = { fusion: new kaeonFUSION.KaeonFUSION() };
	}

	else if(fusion.fusion == null) {

		start = true;

		fusion.fusion = new kaeonFUSION.KaeonFUSION();
	}

	fusion.fusion.internalProcess(code);

	return fusion.fusion.returnValue;
}

function write(element) {
	return one.writeONE(one.toElement(element));
}

module.exports = {
	parse,
	preprocess,
	process,
	write
}
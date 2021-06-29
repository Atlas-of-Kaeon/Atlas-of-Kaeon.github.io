var moduleDependencies = {
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
	onePlus: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/1%20-%20ONE/4%20-%20ONE%2B/1%20-%20JavaScript/1%20-%20Source/ONEPlus.js",
	kaeonFUSION: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/1%20-%20ONE/3%20-%20Kaeon%20FUSION/1%20-%20JavaScript/1%20-%20Source/KaeonFUSION.js",
	universalPreprocessor: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Repository-of-Kaeon/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20APIs/1%20-%20ONE/5%20-%20Universal%20Preprocessor/1%20-%20JavaScript/1%20-%20Source/UniversalPreprocessor.js"
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
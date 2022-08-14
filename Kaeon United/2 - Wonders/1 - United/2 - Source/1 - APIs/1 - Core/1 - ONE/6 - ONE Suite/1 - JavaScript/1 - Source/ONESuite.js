var moduleDependencies = {
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
	onePlus: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/4%20-%20ONE%2B/1%20-%20JavaScript/1%20-%20Source/ONEPlus.js",
	kaeonFUSION: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/3%20-%20Kaeon%20FUSION/1%20-%20JavaScript/1%20-%20Source/KaeonFUSION.js",
	universalPreprocessor: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/5%20-%20Universal%20Preprocessor/1%20-%20JavaScript/1%20-%20Source/UniversalPreprocessor.js"
};

var one = require(moduleDependencies.one);
var onePlus = require(moduleDependencies.onePlus);

var kaeonFUSION = require(moduleDependencies.kaeonFUSION);

var universalPreprocessor = require(moduleDependencies.universalPreprocessor);

function preprocess(string) {
	return universalPreprocessor.preprocess(string);
}

function process(code, fusion) {

	code =
		Array.isArray(code) ?
			one.toObject(code) :
			read("" + code);

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

function read(string) {

	return onePlus.read(
		preprocess(
			string.split("\r").join("")
		)
	);
}

function write(element) {

	return Array.isArray(element) ?
		one.write(one.toObject(element)) :
		one.write(element);
}

module.exports = {
	preprocess,
	process,
	read,
	write
}
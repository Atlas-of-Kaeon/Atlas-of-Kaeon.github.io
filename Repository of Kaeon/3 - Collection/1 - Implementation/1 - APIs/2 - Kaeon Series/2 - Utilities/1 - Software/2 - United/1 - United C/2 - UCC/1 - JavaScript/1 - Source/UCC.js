var moduleDependencies = {
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
	oneSuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
	uc: ""
};

let makefile =
`CC		= gcc
CFLAGS	= -g
RM		= rm -f

default: all

all: [APP_NAME]

[APP_NAME]: [APP_NAME].c
	$(CC) $(CFLAGS) -o [APP_NAME] [APP_NAME].c

clean veryclean:
	$(RM) [APP_NAME]`;

try {

	var cmd = require("node-cmd");
	var io = require(moduleDependencies.io);
	var oneSuite = require(moduleDependencies.oneSuite);
	var uc = require(moduleDependencies.uc);

	let path = process.argv[5];

	if(path.indexOf(".") == -1)
		path += ".uc";

	let appName =
		path.substring(0, path.lastIndexOf(".")).split(" ").join("_");

	let code = uc(oneSuite.preprocess(io.open(path)));

	io.save(code, appName + ".c");
	io.save(makefile.split("[APP_NAME]").join(appName), "Makefile");

	cmd.run("make");
}

catch(error) {
	console.log(error);
}
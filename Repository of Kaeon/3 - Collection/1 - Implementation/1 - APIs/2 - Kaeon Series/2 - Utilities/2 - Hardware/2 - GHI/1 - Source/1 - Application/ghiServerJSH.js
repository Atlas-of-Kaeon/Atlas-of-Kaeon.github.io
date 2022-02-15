var jsh = require(__dirname + "/jsh.js");

jsh.startJSHServer(process.argv[2], __dirname + "/jshPassword.json");
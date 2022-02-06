var httpUtils = require(__dirname + "/httpUtils.js");
var jsh = require(__dirname + "/jsh.js");

jsh.startJSHServer(
	process.argv[2],
	__dirname + "/jshPassword.json",
	[
		{
			name: "ghi",
			process: (data) => {

				data = data != null ? data : { };

				if(!(Object.keys(data).includes("commands") ||
					Object.keys(data).includes("processes") ||
					Object.keys(data).includes("modules") ||
					Object.keys(data).includes("password") ||
					Object.keys(data).includes("newPassword"))) {

					try {

						return httpUtils.sendRequest(
							{
								request: {
									method: "POST",
									uri: "http://localhost:" + process.argv[3]
								},
								body: body
							}
						).body
					}

					catch(error) {

					}
				}

				return null;
			}
		}
	]
);
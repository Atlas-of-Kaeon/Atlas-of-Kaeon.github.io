var httpUtils = require(__dirname + "/httpUtils.js");
var jsh = require(__dirname + "/jsh.js");

jsh.startJSHServer(
	process.argv[2],
	__dirname + "/jshPassword.json",
	[
		{
			name: "ghi",
			process: (data) => {

				if(data == null)
					return null;

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
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify(data)
							}
						).body;
					}

					catch(error) {

					}
				}

				return null;
			}
		}
	]
);
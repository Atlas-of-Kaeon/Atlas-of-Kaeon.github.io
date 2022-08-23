const PORT = process.env.PORT || 5000;

var pool = { };

require("http").createServer((request, response) => {
 
	if(request.url == "/favicon.ico")
		return;
 
	try {
 
		let url = require("url").parse(request.url, true).query;
 
		if(url["key"] != null) {
 
			if(url["value"] != null) {

				pool[url["key"]] = {
					value: url["value"],
					time: (new Date()).getTime()
				};
			}

			response.write(JSON.stringify(pool[url["key"]]));
		}

		else
			response.write("");
	}
 
	catch(error) {
		response.write("");
	}

	response.end();
}).listen(PORT);

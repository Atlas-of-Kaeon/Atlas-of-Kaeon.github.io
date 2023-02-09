var moduleDependencies = {
	cors: "https://corsproxy.io/?"
};

var httpUtils = require("kaeon-united")("httpUtils");
var platform = require("kaeon-united")("platform").getPlatform();

module.exports = {
	cors: moduleDependencies.cors,
	getInput: platform == "node" ?
		(query) => {

			return require('readline-sync').question(
				query != null ? query : ""
			);
		} :
		(query) => {
			return prompt("" + (query != null ? query : ""));
		},
	open: (file, callback, cors) => {

		if(platform != "node" ||
			file.toLowerCase().startsWith("http://") ||
			file.toLowerCase().startsWith("https://")) {

			let response = httpUtils.sendRequest(
				{
					request: {
						method: "GET",
						uri: file
					}
				},
				callback != null ? (response) => {
					callback(response.body);
				} : null,
				cors != false ?
					(typeof cors == "string" ? cors : module.exports.cors) : false
			);

			if(callback == null)
				return response.body;
		}

		else if(callback == null)
			return require("fs").readFileSync(file, "utf-8");

		else {

			require("fs").readFile(file, null, (error, data) => {

				if(error != null)
					callback("");

				callback(data);
			});
		}
	},
	save: platform == "node" ?
		(content, file) => {
			require('fs').writeFileSync(file, content);
		} :
		(content, file) => {

			let element = document.createElement('a');
		
			element.setAttribute(
				'href',
				'data:text/plain;charset=utf-8,' +
					encodeURIComponent(content));
		
			element.setAttribute('download', file);
		
			element.style.display = 'none';
			document.documentElement.appendChild(element);
		
			element.click();
		
			document.documentElement.removeChild(element);
		}
};
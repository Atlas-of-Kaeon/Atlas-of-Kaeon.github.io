var moduleDependencies = {
	cors: "https://ghost-cors.herokuapp.com/"
};

var platform = "browser";

if(typeof process === 'object') {

	if(typeof process.versions === 'object') {

		if(typeof process.versions.node !== 'undefined') {
			platform = "node";
		}
	}
}

function getXMLHTTP(url) {

	var rawFile = new XMLHttpRequest();

	rawFile.open("GET", url, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);

	return allText;
}

if(platform == "node") {

	module.exports = {

		cors: moduleDependencies.cors,
		
		getInput: (query) => {
			return require('readline-sync').question(query != null ? query : "");
		},

		open: (file) => {

			if(file.startsWith("http://") || file.startsWith("https://")) {
				
				var rawFile = new (require("xmlhttprequest").XMLHttpRequest)();
				rawFile.open("GET", file, false);
				
				var allText = "";
				
				rawFile.onreadystatechange = function() {
				
					if(rawFile.readyState === 4) {
				
						if(rawFile.status === 200 || rawFile.status == 0) {
							allText = rawFile.responseText;
						}
					}
				}
				
				rawFile.send(null);
				
				return allText;
			}
			
			else
				return require('fs').readFileSync(file, 'utf8');
		},

		save: (content, file) => {
			require('fs').writeFileSync(file, content);
		}
	};
}

if(platform == "browser") {
	
	module.exports = {

		cors: moduleDependencies.cors,

		getInput: (query) => {
			return prompt("" + (query != null ? query : ""));
		},

		open: (file) => {

			if(typeof file == "function") {
				
				let input = document.createElement("input");
		
				input.setAttribute("type", "file");
				input.setAttribute("style", "display: none");
		
				var callback = file;
		
				let listener = function(event) {
		
					let upload = event.target.files[0];
		
					if(!upload)
						return;
					
					let reader = new FileReader();
		
					reader.onload = function(event) {
						callback(event.target.result);
					}
		
					reader.readAsText(upload);
				}
		
				input.addEventListener(
					'change',
					listener,
					false
				);
		
				document.documentElement.appendChild(input);
		
				input.click();
		
				document.documentElement.removeChild(input);
			}
		
			else {
		
				try {
					return getXMLHTTP(module.exports.cors + file);
				}
		
				catch(error) {
		
					try {
						return getXMLHTTP(file);
					}
		
					catch(error) {
						return null;
					}
				}
			}
		},

		save: (content, file) => {

			let element = document.createElement('a');
		
			element.setAttribute(
				'href',
				'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
		
			element.setAttribute('download', file);
		
			element.style.display = 'none';
			document.documentElement.appendChild(element);
		
			element.click();
		
			document.documentElement.removeChild(element);
		}
	};
}
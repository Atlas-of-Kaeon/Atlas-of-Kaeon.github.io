var moduleDependencies = {
	oneSuite: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
};

var oneSuite = require(moduleDependencies.oneSuite);

function getContent(content) {

	return content.startsWith("\"") &&
		content.endsWith("\"") &&
		!content.endsWith("\\\"") ?
			content.substring(1, content.length - 1) :
			content;
}

function getObject(element) {

	let content = element.content.toLowerCase().trim();

	if(content == "object") {

		let object = {};

		for(let i = 0; i < element.children.length; i++) {

			if(element.children[i].children.length == 0)
				object[getContent(element.children[i].content)] = null;

			else {

				object[getContent(element.children[i].content)] =
					getObject(element.children[i].children[0]);
			}
		}

		return object;
	}

	if(content == "list" || element.parent == null) {

		let list = [];

		for(let i = 0; i < element.children.length; i++)
			list.push(getObject(element.children[i]));

		if(element.parent == null && list.length == 1)
			return list[0];

		else if(element.parent == null && list.length == 0)
			return null;

		return list;
	}

	if(content == "true")
		return true;

	if(content == "false")
		return false;

	if(!isNaN(content))
		return Number(content);
		
	return getContent(element.content);
}

function oneToJSON(data) {
	return JSON.stringify(getObject(oneSuite.read(data)));
}

function jsonToDynamicList(data, child) {

	if(!child)
		data = JSON.parse(json);

	if(typeof data == "object") {

		let keys = Object.keys(data);

		data = Object.values(data);
		data.dynamicAliases = [];
	
		keys.forEach((key, index) => {
			data.dynamicAliases[index] = key;
		});
	}

	if(Array.isArray(data)) {

		data.forEach((value, index) => {
			data[index] = jsonToDynamicList(value, true);
		});
	}

	return data;
}

function dynamicListToJSON(data, child) {

	if(typeof data == "object") {

		if(data.dynamicAliases != null) {
			
			let object = data;
	
			let data = { };
	
			Object.values(object).forEach((value, index) => {
	
				let alias = index < object.dynamicAliases.length ?
					(object.dynamicAliases[index] != null ?
						"" + object.dynamicAliases[index] :
						"" + index) :
					"" + index;
				
				data[alias] = dynamicListToJSON(value, true);
			});
		}

		else {

			data.forEach((value, index) => {
				data[index] = dynamicListToJSON(value, true);
			});
		}
	}

	return child ? data : JSON.stringify(data);
}

module.exports = {
	oneToJSON,
	jsonToDynamicList,
	dynamicListToJSON
}
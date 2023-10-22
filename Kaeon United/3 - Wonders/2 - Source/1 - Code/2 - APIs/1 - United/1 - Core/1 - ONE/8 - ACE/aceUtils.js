var formatConverter = require("kaeon-united")("formatConverter");
var io = require("kaeon-united")("io");
var one = require("kaeon-united")("one");
var onePlus = require("kaeon-united")("onePlus");

function formatDocument(document) {

	if(typeof document == "string") {

		try {
			return formatConverter.oneToJSON(formatConverter.jsonToONE(JSON.parse(document)));
		}

		catch(error) {
			result = formatConverter.oneToJSON(onePlus.read(document));
		}
	}

	if(isONE(document))
		return formatConverter.oneToJSON(document);

	return formatConverter.oneToJSON(formatConverter.jsonToONE(document));
}

function formatEntity(entity) {

	if(getValue(entity, "components") == null)
		entity.components = { };

	if(getValue(entity, "entities") == null)
		entity.entities = { };

	return entity;
}

function formatKaeonACE(document, open) {

	if(document.components != null) {
		// STUB
	}

	if(document.entities != null) {

		Object.keys(document.entities).forEach(
			key => formatKaeonACE(document.entities[key])
		);
	}

	return document;
}

function getUsage(document) {

	let usage = [];

	Object.keys(document).forEach((key) => {
		
		if(key.toLowerCase().trim() == "use")
			usage.push(document[key]);

		else
			usage = usage.concat(getUsage(document[key]));
	});

	return usage;
}

function getValue(object, key) {

	return object[Object.keys(object).filter(
		item => item.toLowerCase().trim() == key.toLowerCase().trim()
	)[0]];
}

function isONE(element) {

	try {

		one.write(element);

		return true;
	}

	catch(error) {
		return false;
	}
}

function overlayComponents(target, source) {

	Object.keys(source).forEach((key) => {

		if(getValue(target, key) == null)
			target[key] = getValue(source, key);

		else
			Object.assign(getValue(target, key), getValue(source, key));
	});
}

function overlayEntity(target, source) {

	[target, source].forEach(item => formatEntity(item));

	let targetEntities = getValue(target, "entities");
	let sourceEntities = getValue(source, "entities");

	overlayComponents(getValue(target, "components"), getValue(source, "components"));
			
	Object.keys(sourceEntities).forEach((key) => {

		if(getValue(targetEntities, key) == null)
			targetEntities[key] = getValue(sourceEntities, key);

		else
			overlayEntity(getValue(targetEntities, key), getValue(sourceEntities, key));
	});
}

function traceKaeonACE(document, criteria) {
	// STUB
}

function useACE() {

	let document = { components: { }, entities: { } };
	let documents = [];
	
	Array.from(arguments).forEach((argument) => {
		documents = documents.concat(Array.isArray(argument) ? argument : [argument]);
	});

	documents.map(item => getUsage(formatDocument(item))).flat().forEach((item) => {
		overlayEntity(document, item);
	});

	return document;
}

module.exports = {
	formatDocument,
	formatKaeonACE,
	getValue,
	isONE,
	traceKaeonACE,
	overlayEntity,
	useACE
};
var formatConverter = require("kaeon-united")("formatConverter");
var io = require("kaeon-united")("io");
var one = require("kaeon-united")("one");
var onePlus = require("kaeon-united")("onePlus");

function formatDocument(document) {

	if(typeof document == "string") {

		try {

			return formatConverter.oneToJSON(
				formatConverter.jsonToONE(JSON.parse(document))
			);
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

function formatKaeonACE(document, open, globalMap, meta, alias) {

	formatEntity(document);

	globalMap = globalMap != null ? globalMap : { };
	meta = meta != null ? JSON.parse(JSON.stringify(meta)) : { };

	let components = getValue(document, "components");
	let entities = getValue(document, "entities");

	let voidComponent = getValue(components, "void");
	
	if(voidComponent != null) {

		if(Object.keys(voidComponent).length == 0)
			meta = { };

		else {

			Object.keys(voidComponent).forEach((key) => {
				removeValue(components, key);
			});
		}
	}

	overlayComponents(
		components,
		overlayComponents(
			meta,
			getValue(components, "meta") != null ?
				getValue(components, "meta") : { }
		),
		false,
		true
	);

	overlayEntity(
		document,
		queryKaeonACE(
			getValue(components, "ace") != null ?
				getValue(components, "ace") : { },
			open
		)
	);

	if(getValue(components, "meta") != null)
		removeValue(components, "meta");

	if(alias != null) {

		if(globalMap[alias] == null)
			globalMap[alias] = { components: { }, entities: [] };

		overlayComponents(globalMap[alias].components, components);

		globalMap[alias].entities.push(document);
	}

	Object.keys(entities).forEach(
		key => formatKaeonACE(entities[key], open, globalMap, meta, key)
	);

	if(alias == null) {
		
		Object.values(globalMap).forEach((item) => {

			item.entities.forEach((entity) => {
				overlayComponents(entity, item.components, false, true);
			});
		});
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

function overlayComponents(target, source, clone, priority) {

	if(clone) {
		target = JSON.parse(JSON.stringify(target));
		source = JSON.parse(JSON.stringify(source));
	}

	Object.keys(source).forEach((key) => {

		if(getValue(target, key) == null)
			target[key] = getValue(source, key);

		else if(!priority)
			Object.assign(getValue(target, key), getValue(source, key));
	});

	return target;
}

function overlayEntity(target, source, clone) {

	if(clone) {
		target = JSON.parse(JSON.stringify(target));
		source = JSON.parse(JSON.stringify(source));
	}

	[target, source].forEach(item => formatEntity(item));

	let targetEntities = getValue(target, "entities");
	let sourceEntities = getValue(source, "entities");

	overlayComponents(
		getValue(target, "components"),
		getValue(source, "components")
	);
			
	Object.keys(sourceEntities).forEach((key) => {

		if(getValue(targetEntities, key) == null)
			targetEntities[key] = getValue(sourceEntities, key);

		else {

			overlayEntity(
				getValue(targetEntities, key),
				getValue(sourceEntities, key)
			);
		}
	});

	return target;
}

function queryKaeonACE(entity, open) {

	open = open != null ? open : io.open;

	// STUB

	return entity;
}

function removeValue(object, key) {

	delete object[Object.keys(object).filter(
		item => item.toLowerCase().trim() == key.toLowerCase().trim()
	)[0]];
}

function traceKaeonACE(document, criteria, alias) {

	let components = getValue(document, "components");
	let entities = getValue(document, "entities");

	if(criteria.alias == null || criteria.alias == alias) {

		if(components != null && criteria[0].components != null) {
	
			if(JSON.stringify(components) == JSON.stringify(
				overlayComponents(components, criteria[0].components, true))) {
				
				criteria.splice(0, 1);
		
				if(criteria.length == 0)
					return [document];
			}
		}
	}

	if(entities == null)
		return [];

	let results = [];

	Object.keys(entities).forEach((key) => {
		results = results.concat(traceKaeonACE(entities[key], criteria, key));
	});

	return results;
}

function useACE() {

	let document = { components: { }, entities: { } };
	let documents = [];
	
	Array.from(arguments).forEach((argument) => {

		documents = documents.concat(
			Array.isArray(argument) ? argument : [argument]
		);
	});

	documents.map(item => getUsage(formatDocument(item))).flat().forEach(
		(item) => {
			overlayEntity(document, item);
		}
	);

	return document;
}

module.exports = {
	formatDocument,
	formatKaeonACE,
	getValue,
	isONE,
	traceKaeonACE,
	overlayEntity,
	queryKaeonACE,
	useACE
};
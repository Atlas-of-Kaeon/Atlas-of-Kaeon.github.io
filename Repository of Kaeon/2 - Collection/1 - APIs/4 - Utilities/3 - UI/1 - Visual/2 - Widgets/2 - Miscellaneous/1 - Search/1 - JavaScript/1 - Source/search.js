// item = { item: "...", action: { type: "...", ... (url: "...") } }

var moduleDependencies = {
	ui: "https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Original/1%20-%20Computation/1%20-%20APIs/4%20-%20Utilities/3%20-%20UI/1%20-%20Visual/1%20-%20General/1%20-%20UI/1%20-%20JavaScript/1%20-%20Source/ui.js"
};

var ui = require(moduleDependencies.ui);

function getDropItem(input, dropdown, value, onSelect) {
	
	let item = ui.create(
		{
			attributes: { class: "search-option" },
			style: {
				width: "100%",
				border: "solid 1px black"
			},
			content: [
				value
			]
		}
	);

	item.onclick = function() {

		input.value = value;

		ui.set(
			dropdown,
			{
				style: {
					display: "none"
				}
			}
		);

		onSelect(value);
	};

	return item;
}

function drop(input, dropdown, options, onSelect) {

	dropdown.innerHTML = "";

	ui.set(
		dropdown,
		{
			style: {
				display: options.length == 0 ? "none" : "block",
				width: input.getBoundingClientRect().width + "px"
			}
		}
	);

	for(let i = 0; i < options.length; i++)
		ui.extend(dropdown, getDropItem(input, dropdown, options[i], onSelect));
}

function createSearch(getOptions, onSelect) {
	
	let input = ui.create(
		{
			tag: "input",
			attributes: { class: "search-input", type: "text" }
		}
	);
	
	let go = ui.create(
		{
			tag: "button",
			attributes: { class: "search-button" },
			content: [
				"Go"
			]
		}
	);

	let dropdown = ui.create(
		{
			style: {
				display: "none",
				border: "1px solid black"
			}
		}
	);

	go.onclick = function() {

		ui.set(
			dropdown,
			{
				style: {
					display: "none"
				}
			}
		);

		onSelect(input.value);
	};

	input.oninput = function() {
		drop(input, dropdown, getOptions(input.value), onSelect);
	}

	input.onkeypress = function(event) {
		
		if(event.keyCode == 13) {

			ui.set(
				dropdown,
				{
					style: {
						display: "none"
					}
				}
			);
	
			onSelect(input.value);
		}
	}
	
	let search = ui.create(
		{
			attributes: { class: "search-container" },
			content: [input, go, dropdown]
		}
	);

	return search;
}
	
function selectItems(items, text, limit) {

	items = items.slice(0);

	text = text.trim().toLowerCase();

	if(text.length == 0)
		return [];

	let options = [];

	for(let i = 0; i < items.length; i++) {
		
		let item = items[i].item.trim().toLowerCase();

		if(item.startsWith(text)) {

			let match = items[i].item;

			items.splice(i, 1);
			i--;

			options.push(match);
		}
	}

	for(let i = 0; i < items.length; i++) {
		
		let item = items[i].item.trim().toLowerCase();

		if(item.includes(text)) {

			let match = items[i].item;

			items.splice(i, 1);
			i--;

			options.push(match);
		}
	}

	if(limit != null) {

		if(options.length > limit)
			options.splice(limit);
	}

	return options;
}

function executeItemMatch(action) {
		
	if(action.type == "link")
		window.location.href = action.url;
}

function executeItem(items, text) {

	let options = selectItems(items, text);

	if(options.length == 0)
		return;
		
	text = options[0].trim().toLowerCase();

	for(let i = 0; i < items.length; i++) {
		
		let item = items[i].item.trim().toLowerCase();

		if(text == item) {

			executeItemMatch(items[i].action);

			return;
		}
	}
}

module.exports = {
	createSearch,
	selectItems,
	executeItem
};
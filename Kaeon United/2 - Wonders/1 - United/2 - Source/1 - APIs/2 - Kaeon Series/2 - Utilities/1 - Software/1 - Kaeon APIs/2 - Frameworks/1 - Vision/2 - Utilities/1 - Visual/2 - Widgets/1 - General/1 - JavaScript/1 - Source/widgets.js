var moduleDependencies = {
	virtualSystem: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/3%20-%20Operations/1%20-%20Virtual%20System/1%20-%20JavaScript/1%20-%20Source/virtualSystem.js",
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js"
};

var virtualSystem = require(moduleDependencies.virtualSystem);
var vision = require(moduleDependencies.vision);

function createStartScreen(element, text, callback) {

	let newScreen = element == null;

	if(newScreen) {

		element = vision.create({
			style: {
				position: "absolute",
				left: "0%",
				top: "0%",
				width: "100%",
				height: "100%",
				"z-index": "999"
			}
		});

		vision.extend(element);
	}

	let button = vision.create(
		{
			tag: "button",
			style: {
				position: "absolute",
				left: "40%",
				top: "45%",
				width: "20%",
				height: "10%",
				background: "white",
				color: "black",
				"border-radius": "25px",
				font: "bold 100% arial"
			},
			content: [
				text
			]
		}
	);

	button.onclick = function() {

		if(!newScreen)
			element.innerHTML = "";

		callback(element);

		if(newScreen)
			vision.remove(element);
	}
	
	vision.extend(
		element,
		vision.create(
			{
				tag: "div",
				style: {
					position: "absolute",
					left: "0%",
					top: "0%",
					width: "100%",
					height: "100%",
					background: "black"
				},
				content: [
					button
				]
			}
		)
	);
}

function getTerminal(onSubmit) {

	onSubmit = onSubmit != null ? onSubmit : () => { };

	let log = vision.create();
	let mark = vision.create({ fields: { innerHTML: ">" } });

	let field = vision.create({
		tag: "input",
		attributes: {
			rows: "1"
		},
		style: {
			"border-top-style": "hidden",
			"border-right-style": "hidden",
			"border-left-style": "hidden",
			"border-bottom-style": "hidden",
			outline: "none",
			"width": "100%",
			"font-family": "monospace",
			resize: "none",
			overflow: "auto"
		}
	});

	let terminal = vision.create({
		content: [
			{
				tag: "table",
				content: [
					{
						tag: "tr",
						content: [
							{ tag: "td", content: [log] }
						]
					}
				],
				style: {
					width: "100%",
					"border-collapse": "collapse"
				}
			},
			{
				tag: "table",
				content: [
					{
						tag: "tr",
						content: [
							{
								tag: "td",
								content: [mark],
								style: {
									width: "1%",
									"white-space": "nowrap"
								}
							},
							{ tag: "td", content: [field] }
						]
					}
				],
				style: {
					width: "100%",
					"border-collapse": "collapse"
				}
			}
		],
		style: {
			"font-family": "monospace",
			"position": "absolute",
			"left": "0%",
			"top": "0%",
			"width": "100%",
			"height": "100%",
			"overflow": "auto"
		}
	});

	terminal.current = null;
	terminal.index = null;
	terminal.history = [];

	terminal.clear = () => {
		log.innerHTML = "";
	}

	terminal.getContent = () => {
		return log.innerHTML;
	}

	terminal.getText = () => {
		return log.textContent;
	}

	terminal.logContent = (content) => {

		log.innerHTML +=
			(log.innerHTML.length > 0 ? "<br/>" : "") +
			content;

		terminal.scrollTop = terminal.scrollHeight;
	}

	terminal.setContent = (content) => {

		log.innerHTML = content;

		terminal.scrollTop = terminal.scrollHeight;
	}

	terminal.getMark = () => {
		return mark.textContent;
	}

	terminal.setMark = (content) => {
		mark.innerHTML = content + (content.length > 0 ? " " : "") + ">";
	}

	terminal.onSubmit = onSubmit;

	field.onkeypress = (event) => {
		
		if(event.keyCode == 13) {

			if(field.value.trim().length > 0) {

				terminal.history.push(field.value);
				terminal.logContent(terminal.getMark() + " " + field.value);

				terminal.onSubmit(field.value);

				terminal.scrollTop = terminal.scrollHeight;
			}

			field.value = "";
		}
	};

	return terminal;
}

function getVSTerminal(paths) {

	let reference = null;
	
	let terminal = getTerminal((command) => {
		vsTerminalOnSubmit(command, reference, terminal.paths.concat([terminal.location]));
	});

	reference = terminal;

	terminal.setLocation = (location) => {

		terminal.location = location;

		terminal.setMark(location);
	};

	terminal.setPaths = (paths) => {
		terminal.paths = paths != null ? paths : [];
	};

	terminal.setLocation("");
	terminal.setPaths(paths);

	return terminal;
}

function getVSTerminalCommand(command, paths) {

	for(let i = 0; i < paths.length; i++) {

		let folder = virtualSystem.getResource(paths[i]);

		if(folder == null)
			return;

		if(!Array.isArray(folder))
			return;

		let index = folder[1].map((item) => {

			if(item.includes("."))
				item = item.substring(0, item.indexOf("."));

			return item.toLowerCase();
		}).indexOf(command.toLowerCase());

		if(index != -1) {

			return paths[i] +
				(paths[i].endsWith("/") ? "" : "/") +
				folder[1][index];
		}
	}

	return null;
}

function vsTerminalOnSubmit(command, terminal, paths) {

	let args = virtualSystem.getCommandArguments(command);
	let loadedCommand = getVSTerminalCommand(args[0], paths);

	command = (loadedCommand == null ? command : loadedCommand) +
		" " +
		args.slice(1).map((item) => {
			return "\"" + item.split("\"").join("\\\"") + "\"";
		}).join(" ")

	let tempLog = console.log;

	console.log = function() {

		let toLog = "";

		for(let i = 0; i < arguments.length; i++)
			toLog += (i > 0 ? " " : "") + arguments[i];

		terminal.logContent(toLog);
	}

	virtualSystem.executeCommand(
		(loadedCommand == null ? command : loadedCommand) +
			" " +
			args.slice(1).map((item) => {
				return "\"" + item.split("\"").join("\\\"") + "\"";
			}).join(" ")
	);

	console.log = tempLog;
}

function getTextbox(options) {

	options = options != null ? options : { };

	let data = { tag: "textarea", attributes: { }, style: { } };

	if(!options.spellCheck)
		data.attributes["spellcheck"] = "false";

	if(!options.resize)
		data.style["resize"] = "none";

	if(!options.wrap)
		data.style["white-space"] = "pre";

	let text = vision.create(data);

	if(options.readOnly)
		text.readOnly = true;

	else {

		text.addEventListener(
			"keydown",
			function(event) {
	
				let scrollY = text.scrollTop;
					
				let start = this.selectionStart;
				let end = this.selectionEnd;
	
				if(event.keyCode == 9 || event.which == 9) {
	
					event.preventDefault();
	
					if(start != end) {
	
						let value = text.value.substring(start, end).indexOf("\n");
	
						if(value == -1) {
	
							document.execCommand("insertText", false, "\t");
	
							return;
						}
	
						let startValue = start;
	
						while(start > 0) {
							
							if(text.value.charAt(start) == "\n")
								break;
	
							start--;
						}
	
						this.selectionStart = start;
	
						let insert = text.value.substring(start, end);
	
						if(start == 0) {
	
							if(!event.shiftKey)
								insert = "\t" + insert;
							
							else if(
								insert.charAt(0) == "\t" ||
								insert.charAt(0) == "\n") {
	
								insert = insert.substring(1);
							}
						}
	
						if(event.shiftKey)
							insert = insert.split("\n\t").join("\n");
	
						else
							insert = insert.split("\n").join("\n\t");
	
						let shifted =
							insert !=
							text.value.substring(
								this.selectionStart, this.selectionEnd);
	
						document.execCommand("insertText", false, insert);
	
						this.selectionStart =
							startValue +
							(shifted ?
								(event.shiftKey ? -1 : 1) : 0);
	
						this.selectionEnd = start + insert.length;
					}
					
					else
						document.execCommand("insertText", false, "\t");
				}
	
				if(start != end)
					text.scrollTop = scrollY;
			},
			false
		);
	}

	return text;
}

function addTab(tabs, name, content) {

	let tab = vision.create({ content: name, style: { display: "inline" } });
	let pane = vision.create({ content: content, style: { display: "none" } });
	
	pane.tab_id = name;

	tab.onclick = () => {
		setTab(tabs, name);
	}
	
	vision.extend(tabs.children[0], tab);
	vision.extend(tabs.children[1], pane);
}

function setTab(tabs, id) {
	
	Array.from(tabs.children[1].children).forEach((child) => {
		
		if(child.tab_id == id)
			vision.set(child, { style: { display: "block" } });
		
		else
			vision.set(child, { style: { display: "none" } });
	});
}

function getTabs(content, config) {

	content = content != null ? content : [];
	config = config != null ? config : { };

	let menuTabs = vision.create({ style: { position: "absolute", left: "0%", top: "0%", "overflow-x": "auto" } });
	let menu = vision.create({ content: menuTabs, style: { position: "absolute", left: "0%", top: "0%", height: "5%", width: "100%" } });

	let pane = vision.create({ style: { position: "absolute", left: "0%", top: "5%", height: "95%", width: "100%" } });

	let tabs = vision.create({
		content: [menu, pane]
	});

	content.forEach((item) => { addTab(tabs, item.name, item.content); });

	if(content.length > 0)
		setTab(tabs, content[0].name);

	return tabs;
}

module.exports = {
	createStartScreen,
	getTerminal,
	getVSTerminal,
	getTextbox,
	addTab,
	setTab,
	getTabs
};
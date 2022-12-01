var one = require("kaeon-united")("one");
var tokenizer = require("kaeon-united")("tokenizer");

function clear(source) {

	let indent = getIndent(source);
	let lines = source.split("\n");

	let inComment = false;

	for(let i = 0; i < lines.length; i++) {

		if(!inComment && lines[i].trim() == "-") {
			
			let length = getElementLength(lines, indent, i);
			i += length != -1 ? length : 0;

			continue;
		}

		let line = "";

		let tokens = escape(tokenizer.tokenize([
			"#", "#[", "]#", "~", "\'", "\""
		], lines[i]));

		for(let j = 0; j < tokens.length; j++) {

			if(!inComment && tokens[j] == "#")
				break;

			if(!inComment && tokens[j] == "#[")
				inComment = true;

			else if(inComment && tokens[j] == "]#")
				inComment = false;
			
			else if(!inComment)
				line += tokens[j];
		}

		lines[i] = line.trim().length != 0 ? line : null;
	}

	return lines.filter(line => line != null).join("\n");
}

function escape(line) {

	for(let i = 0; i < line.length - 1; i++) {
		
		if(line[i] == "~") {

			line[i] += line[i + 1];

			line.splice(i + 1, 1);
		}
	}

	let inSingleQuote = false;
	let inDoubleQuote = false;

	for(let i = 0; i < line.length - 1; i++) {

		let inQuote = inSingleQuote || inDoubleQuote;
	
		if(line[i] == "\'" && !inDoubleQuote)
			inSingleQuote = !inSingleQuote;
	
		if(line[i] == "\"" && !inSingleQuote)
			inDoubleQuote = !inDoubleQuote;

		if(inQuote || inSingleQuote || inDoubleQuote) {

			line[i] += line[i + 1];

			if(inSingleQuote && line[i + 1] == "\'")
				inSingleQuote = false;

			if(inDoubleQuote && line[i + 1] == "\"")
				inDoubleQuote = false;

			line.splice(i + 1, 1);
			i--;
		}
	}

	return line;
}

function getActiveElement(element, nest) {

	let current = element;
	
	for(let i = 0; i < nest; i++) {

		if(current.children.length > 0)
			current = current.children[current.children.length - 1];

		else
			break;
	}
	
	return current;
}

function getElementContent(lines, indent, index, length) {

	let content = [];
	let cutoff = getNest(lines[index], indent) * indent.length + 1;

	for(let i = index + 1; i < index + length + 1; i++) {

		if(lines[i].length < cutoff)
			content.push("");

		else
			content.push(lines[i].substring(cutoff));
	}

	return content.join("\n");
}

function getElementLength(lines, indent, index) {

	let nest = getNest(lines[index], indent);

	for(let i = index + 1; i < lines.length; i++) {

		if(lines[i].trim() != "") {

			let lineNest = getNest(lines[i], indent);

			if(lines[i].trim() == "-" && nest == lineNest)
				return i - index - 1;

			else if(lineNest <= nest)
				return -1;
		}
	}

	return -1;
}

function getIndent(source) {
	
	let sample = source.split("\n").filter(line =>
		line.trim().length > 0 && (
			line.startsWith(" ") ||
			line.startsWith("\t")
		)
	)[0];

	return sample != null ?
		sample.substring(0, sample.indexOf(sample.trim())) :
		"\t";
}

function getNest(line, indent) {

	let count = 0;

	for(; count * indent.length < line.length; count++) {

		if(!line.substring(count * indent.length).startsWith(indent))
			break;
	}

	return count;
}

function read(source) {

	let element = one.create();

	let indent = getIndent(source);
	source = clear(source).split("\n");

	let baseElements = [element];

	for(let i = 0; i < source.length; i++) {

		let currentElement = element;
		let nest = getNest(source[i], indent);

		if(nest < baseElements.length) {

			currentElement = baseElements[nest];

			baseElements.splice(nest + 1);
		}

		if(source[i].trim() == "-") {
			
			let length = getElementLength(source, indent, i);
			
			if(length != -1) {

				let newElement =
					one.create(getElementContent(source, indent, i, length));
	
				one.add(currentElement, newElement);

				currentElement = newElement;
				baseElements.push(currentElement);
	
				i += length + 1;
	
				continue;
			}
		}

		let separators = [",", ":", ";", "(", ")", "{", "}"];

		let tokens = escape(tokenizer.tokenize(
			separators.concat(["~", "\'", "\""]),
			source[i]
		)).map((token) => {
			
			if(token.startsWith("~")) {

				if(token == "~n")
					return "\n";

				if(token == "~t")
					return "\t";

				return token;
			}
			
			if(token.startsWith("\'")) {

				if(token.length > 1)
					return token.substring(1, token.length - 1);

				return "";
			}

			return token;
		});

		let parenStack = [];
		let curlyStack = [];

		let root = one.create();
		let content = null;

		nest = 0;

		for(let i = 0; i < tokens.length; i++) {

			if(tokens[i].trim().length == 0)
				continue;

			let active = getActiveElement(root, nest);

			if(!separators.includes(tokens[i])) {

				let token = tokens[i].trim();

				token = token.startsWith("~") ?
					token.substring(1) :
					token;

				if(content == null) {
					
					content = one.create(token);

					one.add(active, content);
				}

				else
					content.content += token;
			}

			else
				content = null;
			
			if(tokens[i] == ":" || tokens[i] == "{")
				nest++;

			if(tokens[i] == ";")
				nest--;

			if(tokens[i] == "(")
				parenStack.push(nest);

			if(tokens[i] == "{")
				curlyStack.push(nest - 1);

			if(tokens[i] == ")" && parenStack.length > 0)
				nest = parenStack.pop();

			if(tokens[i] == "}" && curlyStack.length > 0)
				nest = curlyStack.pop();

			if(nest < 0)
				nest = 0;
		}

		if(root.children.length > 0) {
	
			baseElements.push(getActiveElement(
				root.children[root.children.length - 1],
				nest
			));

			root.children.forEach((item) => {
				one.add(currentElement, item);
			});
		}
	}

	return element;
}

module.exports = {
	clear,
	read
};
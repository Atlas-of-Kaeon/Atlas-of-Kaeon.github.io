var moduleDependencies = {
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
	tokenizer: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20United/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/1%20-%20Tokenizer/1%20-%20JavaScript/1%20-%20Source/tokenizer.js"
};

var one = require(moduleDependencies.one);
var tokenizer = require(moduleDependencies.tokenizer);

function processONELisp(data) {

	let root = one.create();
	
	let tokens =
		tokenizer.tokenize(
			[" ", "\t", "\n", "\"", "(", ")", "\\"],
			data
		);
	
	let currentElement = root;
	root.content = null;
	
	let isQuote = false;
	let literal = "";
	
	for(let i = 0; i < tokens.length; i++) {
		
		if(tokens[i] == "\"") {
			
			isQuote = !isQuote;
			
			if(!isQuote && literal.length > 0) {
				
				if(currentElement.content == null)
					currentElement.content = literal;
				
				else
					one.add(currentElement, one.create(literal));
				
				literal = "";
			}
			
			continue;
		}
		
		if(tokens[i] == "\\" && i < tokens.length - 1) {
			
			if(isQuote)
				literal += tokens[i + 1];
			
			else {
				
				if(currentElement.content == null)
					currentElement.content = tokens[i + 1];
				
				else
					one.add(currentElement, one.create(tokens[i + 1]));
			}
			
			i++;
			
			continue;
		}
		
		if(tokens[i] == "(" && i < tokens.length - 1) {
			
			let newElement = one.create();
			newElement.content = null;
			
			one.add(currentElement, newElement);
			
			currentElement = newElement;
		}
		
		else if(tokens[i] == ")" && currentElement.parent != null)
			currentElement = currentElement.parent;
		
		else if(isQuote)
			literal += tokens[i];
		
		else if(tokens[i] != " " && tokens[i] != "\n" && tokens[i] != "\t") {
			
			if(currentElement.content == null)
				currentElement.content = tokens[i];
			
			else
				one.add(currentElement, one.create(tokens[i]));
		}
	}
	
	root.content = "";
	
	if(currentElement.content == null)
		currentElement.content = "";
	
	return one.write(root);
}

module.exports = function(item) {

	if(typeof item == "string")
		return processONELisp(item);

	item.returnValue = processONELisp(process.argv[2]);
};
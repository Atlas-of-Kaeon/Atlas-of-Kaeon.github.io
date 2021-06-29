var moduleDependencies = {
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
	philosophersStone: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Philosopher's%20Stone/1%20-%20Philosopher's%20Stone/1%20-%20JavaScript/1%20-%20Source/PhilosophersStone.js",
	onePlus: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20ONE/4%20-%20ONE%2B/1%20-%20JavaScript/1%20-%20Source/ONEPlus.js",
	io: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
};

var one = require(moduleDependencies.one);
var philosophersStone = require(moduleDependencies.philosophersStone);
var onePlus = require(moduleDependencies.onePlus);

var io = require(moduleDependencies.io);

function buildDialect() {

	this.name = "default";

	var reference = this;
	
	this.standard = function(packet) {
		
		if((("" + packet[0]).toLowerCase() != "build" ||
			("" + packet[0]).toLowerCase() == "derive") ||
			("" + packet[1]).toLowerCase() != reference.getName()) {
			
			return null;
		}
		
		let files = [];
		let code = packet[2];
		let args = packet.length > 3 ? packet[3] : [];
		let filePath = "";
		
		if(args.length > 0) {
			
			if(args[0] != null)
				filePath = "" + args[0];
			
			args.splice(0, 1);
		}
		
		let names = [];
		
		if(args.length > 0) {
			
			try {
				names = args[0];
			}
			
			catch(error) {
				
			}
			
			args.splice(0, 1);
		}
		
		if(("" + packet[0]).toLowerCase() == "build") {
			
			let codeElements = [];
			
			for(let i = 0; i < code.length; i++)
				codeElements.push(onePlus.readONEPlus("" + code[i]));
			
			let groups = getGroups(codeElements);
			
			for(let i = 0; i < groups.length; i++)
				reference.build(files, groups[i], getGroupName(names, i), i, args);
		}
		
		else {
			
			let codeStrings = [];
			
			for(let i = 0; i < code.length; i++)
				codeStrings.push("" + code[i]);
			
			let groups = getGroups(codeStrings);
			
			for(let i = 0; i < groups.length; i++)
				reference.derive(files, groups[i], getGroupName(names, i), i, args);
		}
		
		let workspace = "";
		
		if(filePath.length == 0) {
			
			try {
				workspace = "" + philosophersStone.call(reference, "Get Build Workspace")[0];
			}
			
			catch(error) {
				
			}
		}
		
		let toExport = true;
		
		for(let i = 0; i < args.length && toExport; i++) {
			
			if(("" + args[i]).toLowerCase() == "return")
				toExport = false;
		}
		
		if(toExport) {
			
			for(let i = 0; i < files.length; i++)
				io.save(files[i][1], workspace + filePath + files[i][0]);
		}
		
		return files;
	}
	
	this.getName = function() {
		return reference.name.toLowerCase();
	}
	
	this.getInjection = function(meta) {
		
		try {
			
			let injection = one.getChild(meta, "Injection");
			let use = one.getChild(meta, "Use");
			
			if(injection != null)
				return injection.children[0].content;
			
			if(use != null) {
				
				let dialect = one.getChild(use, "Dialect").children[0].content;
				
				let codeElement = one.copyElement(one.getChild(use, "Code"));
				codeElement.content = "";
				
				let code = [codeElement];
				
				let args = [];
				
				if(one.hasChild(use, "Arguments"))
					args = one.getChild(use, "Arguments").children.slice(0);
	
				args.push("");
				args.push([]);
				args.push("Return");
				
				let files =
					philosophersStone.call(
						reference,
						"Build",
						dialect,
						code,
						args)[0];
				
				return files[0][1];
			}
		}
		
		catch(error) {
			
		}
		
		return null;
	}
	
	this.build = function(files, code, name, index, args) {
		
	}
	
	this.derive = function(files, code, name, index, args) {
		
	}
}
	
function getGroups(items) {
	
	let groups = [];
	
	for(let i = 0; i < items.length; i++) {
		
		let group = [];
		group.push(items[i]);
		
		groups.push(group);
	}
	
	return groups;
}

function getGroupName(names, index) {
	
	if(index < names.length)
		return "" + names[index];
	
	return null;
}

function category() {
	this.name = "";
	this.objects = [];
}

module.exports = {
	buildDialect,
	getGroups,
	getGroupName,
	category
};
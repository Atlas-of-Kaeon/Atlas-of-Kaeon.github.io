var moduleDependencies = {
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js",
	widgets: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/2%20-%20Collection/1%20-%20General/2%20-%20Source/1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/1%20-%20General/1%20-%20JavaScript/1%20-%20Source/widgets.js"
};

var vision = require(moduleDependencies.vision);
var widgets = require(moduleDependencies.widgets);

let terminal = widgets.getVSTerminal([
	"Storage://",
	"Storage://Default/System/Commands",
	"Storage://User/Applications/Processes",
	"Storage://User/Applications/Apps"
]);

window.terminals = [terminal];

vision.extend({
	content: [terminal],
	style: {
		position: "absolute",
		left: "0%",
		top: "0%",
		width: "100%",
		height: "100%"
	}
});
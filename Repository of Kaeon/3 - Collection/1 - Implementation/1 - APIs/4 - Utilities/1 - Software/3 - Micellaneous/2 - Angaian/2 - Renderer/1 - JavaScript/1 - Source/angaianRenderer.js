var moduleDependencies = {
	vision: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/4%20-%20Utilities/1%20-%20Software/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js"
};

var vision = require(moduleDependencies.vision);

let urls = {
	"1": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/1%20-%20Boh.png",
	"2": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/2%20-%20Koh.png",
	"3": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/3%20-%20Doh.png",
	"4": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/4%20-%20Foh.png",
	"5": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/5%20-%20Goh.png",
	"6": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/6%20-%20Hoh.png",
	"7": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/7%20-%20Joh.png",
	"8": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/8%20-%20Loh.png",
	"9": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/9%20-%20Moh.png",
	"10": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/10%20-%20Noh.png",
	"11": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/11%20-%20Poh.png",
	"12": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/12%20-%20Roh.png",
	"13": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/13%20-%20Soh.png",
	"14": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/14%20-%20Toh.png",
	"15": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/15%20-%20Voh.png",
	"16": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/16%20-%20Woh.png",
	"17": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/17%20-%20Yoh.png",
	"18": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/18%20-%20Zoh.png",
	"19": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/19%20-%20Thoh.png",
	"20": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/20%20-%20Thhoh.png",
	"21": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/21%20-%20Choh.png",
	"22": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/22%20-%20Shoh.png",
	"23": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/23%20-%20Zhoh.png",
	"24": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/24%20-%20Ngoh.png",
	"25": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/25%20-%20Xoh.png",
	"26": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/26%20-%20Qoh.png",
	"33": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/33%20-%20Nah.png",
	"34": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/34%20-%20Neah.png",
	"35": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/35%20-%20Neh.png",
	"36": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/36%20-%20Nee.png",
	"37": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/37%20-%20Nih.png",
	"38": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/38%20-%20Noo.png",
	"39": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/39%20-%20Nuh.png",
	"40": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/40%20-%20Nuu.png",
	"65": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/65%20-%20Baey.png",
	"66": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/66%20-%20Kaey.png",
	"67": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/67%20-%20Daey.png",
	"68": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/68%20-%20Faey.png",
	"69": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/69%20-%20Gaey.png",
	"70": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/70%20-%20Haey.png",
	"71": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/71%20-%20Jaey.png",
	"72": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/72%20-%20Laey.png",
	"73": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/73%20-%20Maey.png",
	"257": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/257%20-%20Bai.png",
	"258": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/258%20-%20Kai.png",
	"260": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/260%20-%20Dai.png",
	"264": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/264%20-%20Fai.png",
	"272": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/272%20-%20Gai.png",
	"513": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/513%20-%20Hai.png",
	"514": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/514%20-%20Jai.png",
	"516": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/516%20-%20Lai.png",
	"520": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/520%20-%20Mai.png",
	"528": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/1%20-%20Angaian/1%20-%20Characters/528%20-%20Nai.png",
	"1023": "https://raw.githubusercontent.com/Atlas-of-Kaeon/Chronicle-of-Kaeon/master/Chronicle%20of%20Kaeon/3%20-%20Collection/2%20-%20Angaian/2%20-%20Angaian%20Crest/Angaian%20Crest.png"
};

function render(element, text, size) {

	size = size != null ? size * 5 : 5;
	
	let lines = 0;
	let spaces = 0;
	
	for(let i = 0; i < text.length; i++) {
	
		if(text[i] == 1024) {
	
			lines++;
			spaces = 0;
	
			continue;
		}
	
		if(text[i] != 0) {
			
			vision.extend(
				element,
				vision.create(
					{
						tag: "img",
						attributes: {
							src: urls["" + text[i]]
						},
						style: {
							"position": "absolute",
							"left": ((spaces * (size * 1.1)) + (size * .1)) + "vh",
							"top": ((lines * (size * 1.1)) + (size * .1)) + "vh",
							"width": size + "vh",
							"height": size + "vh"
						}
					}
				)
			);
		}
	
		spaces++;
	}
}

module.exports = {
	render
};
var virtualSystem = require("kaeon-united")("virtualSystem");

if(window.fileSystem == null)
	virtualSystem.initiateVirtualSystemDefault();

[
	[
		"Storage://User/Applications/Processes/kaeonMeta/Management/metaDispatch.js",
		`
			let config = { };
			let text = "";

			config = JSON.parse(fileSystem.getResource(arguments[0]));
			text = arguments[1];

			config.dispatchers.forEach((item) => {

				fileSystem.executeCommand(
					item +
						" \\"" +
						text +
						"\\""
				);
			});
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Management/metaInit.js",
		`
			let config = JSON.parse(fileSystem.getResource(arguments[0]));

			config.interfaces.forEach((item) => {
				
				fileSystem.executeCommand(
					item +
						" \\"" +
						arguments[0] +
						"\\""
				);
			});
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Management/metaConfig.json",
		`
			{
				"dispatch": "Storage://User/Applications/Processes/kaeonMeta/Management/metaDispatch.js",
				"dispatchers": [
					"Storage://User/Applications/Processes/kaeonMeta/Dispatchers/mediaDispatcher.js",
					"Storage://User/Applications/Processes/kaeonMeta/Dispatchers/articleDispatcher.js"
				],
				"interfaces": [
					"Storage://User/Applications/Processes/kaeonMeta/Interfaces/metaSpeech.js"
				]
			}
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Interfaces/metaSpeech.js",
		`
			let configPath = arguments[0];
			let config = JSON.parse(fileSystem.getResource(configPath));

			let speech = require("kaeon-united")("speech");
			let vision = require("kaeon-united")("vision");
			let widgets = require("kaeon-united")("widgets");
			let media = require("kaeon-united")("generalReference")("media");

			let tick = 1 / 60;
			let listening = 0;
			let interval = null;
			
			function startAssistant(que, effect) {
			
				que = que != null ? que : [
					"hey meta",
					"a meta",
					"play meta",
					"hey metta",
					"a metta",
					"play metta",
					"hey meda",
					"a meda",
					"play meda",
					"hey medda",
					"a medda",
					"play medda"
				];

				que = (Array.isArray(que) ? que : [que]).map((item) => {
					return item.toLowerCase();
				});

				effect = effect != null ? effect : "B14L61fYZlc"
			
				if(interval != null)
					return;
			
				speech.listen((text) => {
				
					if(que.includes(text.toLowerCase()) && listening == 0) {
				
						listening = 10;
				
						media.playAudio(effect);
				
						terminals[0].logContent("META RECEIVED: " + que[0]);
					}
			
					else {
				
						terminals[0].logContent("META RECEIVED: " + text);

						if(listening > 0) {
							
							fileSystem.executeCommand(
								config.dispatch +
									" \\"" +
									configPath +
									"\\" \\"" +
									text +
									"\\""
							);
						}
					}

					log.scrollTop = log.scrollHeight;
				});
			
				interval = setInterval(() => {
				
					if(listening <= 0)
						return;
				
					listening -= tick;
				
					if(listening < 0)
						listening = 0;
				}, tick * 1000);
			}
			
			function stopAssistant() {
			
				if(interval == null)
					return;
			
				speech.stopListening();
			
				clearInterval(interval);
				interval = null;
			}

			widgets.createStartScreen(null, "Start", () => {
				startAssistant();
			});
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Dispatchers/mediaDispatcher.js",
		`
			if(arguments[0].toLowerCase().startsWith("play ")) {

				fileSystem.executeCommand(
					"Storage://User/Applications/Processes/kaeonMeta/Apps/playMediaSong.js \\"" +
						arguments[0].substring(5) +
						"\\""
				);
			}

			if(arguments[0].toLowerCase().startsWith("stop"))
				fileSystem.executeCommand("Storage://User/Applications/Processes/kaeonMeta/Apps/stopMediaSong.js");
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Dispatchers/articleDispatcher.js",
		`
			if(arguments[0].toLowerCase().startsWith("tell me about ")) {

				fileSystem.executeCommand(
					"Storage://User/Applications/Processes/kaeonMeta/Apps/readArticleSummary.js \\"" +
						arguments[0].substring(14).trim() +
						"\\""
				);
			}
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Apps/playMediaSong.js",
		`
			let media = require("kaeon-united")("generalReference")("media");

			fileSystem.executeCommand("Storage://User/Applications/Processes/kaeonMeta/Apps/stopMediaSong.js");

			media.playAudio(media.search(arguments[0])[0]);
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Apps/stopMediaSong.js",
		`
			let media = require("kaeon-united")("generalReference")("media");

			Object.keys(media.getPlaying()).forEach((item) => {
				media.stop(item);
			});
		`
	],
	[
		"Storage://User/Applications/Processes/kaeonMeta/Apps/readArticleSummary.js",
		`
			let article = require("kaeon-united")("generalReference")("article");

			let results = article.search(arguments[0]);

			if(results.length > 0)
				require("kaeon-united")("speech").speak(article.getSummary(results[0]));
		`
	]
].forEach((item) => {
	fileSystem.setResource(item[0], item[1]);
});

fileSystem.executeCommand("Storage://User/Applications/Processes/kaeonMeta/Management/metaInit.js \"Storage://User/Applications/Processes/kaeonMeta/Management/metaConfig.json\"");
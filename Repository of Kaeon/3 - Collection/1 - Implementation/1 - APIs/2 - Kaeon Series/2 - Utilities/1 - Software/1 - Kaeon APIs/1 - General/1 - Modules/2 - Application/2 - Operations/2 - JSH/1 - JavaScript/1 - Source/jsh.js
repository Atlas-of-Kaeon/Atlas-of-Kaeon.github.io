var child_process = require("child_process");
var http = require("http");
var fs = require("fs");

var password = null;

var processes = { };
var expiredProcesses = [];
var processID = 0;

function processData(modules, data) {

	let response = { commands: [], modules: [] };

	if(modules != null) {

		modules.forEach((item) => {

			response.modules.push({
				"module": item.name,
				"response": item.process(data)
			})
		});
	}

	if(data.commands != null) {

		data.commands.forEach((command) => {

			processes["" + processID] = {
				"command": command.command,
				"location": command.location,
				"log": ""
			};

			let logFunction = (error, stdout, stderr) => {

				if(processes["" + processID] != null && stdout != null)
					processes["" + processID].log += stdout;
			};
			
			processes["" + processID].process = child_process.exec(
				command.command,
				command.location != null ?
					{ cwd: command.location } :
					logFunction,
				command.location != null ?
					logFunction :
					null
			);

			processes["" + processID].process.on('exit', () => {
				expiredProcesses.push["" + processID];
			});

			processes["" + processID].process.stdin.setEncoding('utf-8');

			processID++;
		});
	}

	if(data.processes != null) {

		data.processes.forEach((process) => {

			if(processes[process.id] == null)
				return;

			if(process.terminate)
				processes[process.id].process.kill();

			if(process.input != null)
				processes[process.id].process.stdin.write("" + process.input);
		});
	}

	Object.keys(processes).forEach((key) => {
		
		response.commands.push({
			"command": processes[key].command,
			"id": Number(key),
			"location": processes[key].location,
			"log": processes[key].log
		});

		processes[key].log = "";

		if(expiredProcesses.includes(key)) {

			delete processes[key];

			expiredProcesses.splice(expiredProcesses.indexOf(key), 1);
		}
	})

	return response;
}

function startJSHServer(port, passwordPath, modules) {

	if(!fs.existsSync(passwordPath))
		fs.writeFileSync(passwordPath, "null");

	password = JSON.parse(fs.readFileSync(passwordPath, 'utf-8'));

	http.createServer((request, response) => {

		try {

			let url = request.url.substring(1);
		
			if(url == "favicon.ico") {
		
				response.end();
		
				return;
			}
		
			let body = "";
		
			request.on('data', (chunk) => {
				body += chunk.toString();
			}).on('end', () => {

				let parsedBody = JSON.parse(body)
				
				if(password == null || password == parsedBody.password) {

					response.write(
						JSON.stringify(processData(modules, parsedBody))
					);

					if(parsedBody.newPassword != null) {

						fs.writeFileSync(
							passwordPath,
							JSON.stringify(parsedBody.newPassword)
						);
					}
				}

				else
					response.write("");
		
				response.end();
			});
		}

		catch(error) {

			console.log(error);

			response.end();
		}
	}).listen(port);
}

module.exports = {
	startJSHServer
};
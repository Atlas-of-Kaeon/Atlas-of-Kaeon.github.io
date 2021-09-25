var child = require("child_process");
 
let port = process.argv.length > 2 ? process.argv[2] : 1233;
 
child.exec("node ghi.js " + port);
child.exec("sudo python3 hologram.py " + port);
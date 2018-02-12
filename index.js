const WebServer = require("./webapp/WebServer");
const Config = require("./config.json");

const server = new WebServer(Config);
server.start();

process.on("SIGINT", () => server.stop());
process.on("message", (message) => {
	if(message === "shutdown") {
		server.stop().then(() => process.exit(0)).catch(() => process.exit(1));
	}
});

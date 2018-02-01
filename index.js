const WebServer = require("./webapp/WebServer");
const Config = require("./config.json");

new WebServer(Config.webserver).start();

const {inspect} = require("util");
const moment = require("moment");
const chalk = require("chalk");

class Log {

	static v(data) {
		this.log(data, 0);
	}

	static d(data) {
		this.log(data, 1);
	}

	static i(data) {
		this.log(data, 2);
	}

	static w(data) {
		this.log(data, 3);
	}

	static e(data) {
		this.log(data, 4);
	}

	static wtf(data) {
		this.log(data, Infinity);
	}

	static log(data, level) {
		data = data.stack || data.message || data;
		if(typeof data === "object" && typeof data !== "string") data = Array.isArray(data) ? data.join("\n") : inspect(data, {depth: 0, colors: true});

		let timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
		let type = "log";

		switch(level) {
			case 0: // Verbose
				timestamp = chalk.grey(timestamp);
				break;
			case 1: // Debug
				timestamp = chalk.magenta(timestamp);
				break;
			case 3: // Warn
				timestamp = chalk.black.bgYellow(timestamp);
				type = "warn";
				break;
			case 4: // Error
				timestamp = chalk.bgRed(timestamp);
				type = "error";
				break;
			case Infinity: // What a Terrible Failure (WTF)
				timestamp = chalk.underline.bold.bgRed(timestamp);
				type = "error";
				break;
			case 2: // Info
			default:
				timestamp = chalk.blue(timestamp);
				break;
		}

		console[type](data.split("\n").map(str => `${timestamp} ${level == Infinity ? chalk.underline.bold.bgRed(str) : level === 0 ? chalk.grey(str) : str}`).join("\n"));
	}
}

module.exports = Log;

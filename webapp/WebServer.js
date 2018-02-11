const {resolve} = require("path");

const Express = require("express");

const Favicon = require("serve-favicon");
const Sass = require("node-sass-middleware");
const Handlebars = require("hbs");

const RouterHelper = require("./RouterHelper");

const Log = require("./../utils/Log");

class WebServer {

	constructor(config = {}) {
		if(typeof config !== "object") throw new TypeError("Configuration for WebServer must be an Object.");

		Object.defineProperty(this, "server", { value: Express() });

		this.hostname = config.hostname || "127.0.0.1";
		this.port = config.port || 5000;

		this.routerConfig = config.router || {};
	}

	async _init() {
		if(this._inited) return;

		Handlebars.registerPartials(resolve(process.cwd(), "webapp", "views", "partials"));

		this.server.set("views", resolve(process.cwd(), "webapp", "views"));
		this.server.set("engine", "hbs");

		this.server.use(Sass({
			src: resolve(process.cwd(), "webapp", "static", "styles"),
			dest: resolve(process.cwd(), "webapp", "static", "styles"),
			outputStyle: "compressed"
		}));

		this.server.use(Favicon(resolve(process.cwd(), "webapp", "static", "favicon.ico")));
		this.server.use(Express.static(resolve(process.cwd(), "webapp", "static")));

		this.server.use((req, res, next) => {
			Log.v(`(${req.protocol}) [${req.method}] ${req.ip} => ${req.hostname} => ${req.originalUrl}`);
			if(req.query && Object.keys(req.query).length > 0) Log.v(`\t- Query: ${JSON.stringify(req.query)}`);
			if(req.xhr) Log.v(`\t- XHR: ${req.xhr}`);

			return next();
		});

		this.server.use("/", new RouterHelper(this, this.routerConfig).router);

		this.server.use((err, req, res, next) => {
			Log.wtf("Unable to process request. Stacktrace will follow.");
			Log.e(err);

			const error = {
				error: 500,
				message: "I couldn't find an excuse as to why this didn't work."
			};

			res.status(500);

			if(!req.xhr || req.headersSent) return next();

			if(req.accepts("html")) {
				return res.render("error.hbs", error, (err) => next(err));
			} else if(req.accepts("json")) {
				return res.json(error);
			} else {
				return res.type("txt").send(`${error.code}: ${error.message}`);
			}
		});

		Object.defineProperty(this, "_inited", { value: true });
	}

	async start() {
		this._init().then(() => {
			this.server.listen(this.port, this.hostname, (err) => {
				const address = `${this.hostname}:${this.port}`;
				err ? Log.e(`Failed to start WebServer on ${address}: ${err}`) : Log.i(`WebServer listening on http://${address}`);
			});
		}).catch((err) => {
			Log.e(`Failed to configure WebServer: ${err}`);
		});
	}

	async stop() {
		this.server.close().catch((err) => Log.e(`Failed to stop WebServer: ${err}`));
	}

	async restart() {
		this.stop().then(() => this.start()).catch((err) => Log.e(`Failed to restart WebServer: ${err}`));
	}
}

module.exports = WebServer;

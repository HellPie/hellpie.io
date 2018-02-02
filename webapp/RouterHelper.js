const Router = require("express").Router();

const MastodonAPI = require("../fediverse/MastodonAPI");
const Config = require("../config.json").mastodon;

const Log = require("./../utils/Log");

Router.get("/", (req, res) => {
	return res.render("index.hbs");
});

Router.get("*", (req, res, next) => {
	Log.wtf(`Unable to process request: Page ${req.path} does not exist.`);

	const error = {
		code: 404,
		message: "<insert variant of an overused \"page not found\" joke here>"
	};

	res.status(404);

	if(req.accepts("html")) {
		return res.render("error.hbs", error, (err) => next(err));
	} else if(req.accepts("json")) {
		return res.json(error);
	} else {
		return res.type("txt").send(`${error.code}: ${error.message}`);
	}
});

class RouterHelper {

	constructor(server) {
		Object.defineProperty(this, "server", { value: server });
	}

	get router() {
		if(!Router.server) Object.defineProperty(Router, "server", { value: this.server });
		if(!Router.mastodon) Object.defineProperty(Router, "mastodon", { value: new MastodonAPI(Config.token, Config.config) });
		return Router;
	}
}

module.exports = RouterHelper;

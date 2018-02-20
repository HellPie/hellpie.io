const Router = require("express").Router();

const MastodonAPI = require("../fediverse/MastodonAPI");

const Log = require("./../utils/Log");

// Matches hostnames as per RFC-1123
const regex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;

Router.get("/", (req, res) => {
	Router.helper.getData().then((profile) => {
		return res.render("index.hbs", {
			user: {
			header: profile.header,
			avatar: profile.avatar,
				name: profile.display_name,
				tag: profile.username
			},
			button: {
				url: profile.url
			},
			tooltip: Router.helper.mastodon.instance.match(regex),
			note: profile.note,
			badges: ["check_circle"],
			stats: {
				"Posts": profile.statuses_count,
				"Following": profile.following_count,
				"Followers": profile.followers_count
			}
		});
	}).catch((err) => {
		Log.wtf("Unable to fetch Mastodon API Token owner. Stacktrace will follow.");
		Log.e(err);
	});
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

	constructor(server, config = {}) {
		Object.defineProperty(this, "server", { value: server });

		this.account = config.account || null;
		this.mastodon = new MastodonAPI(config.token, config.mastodon || {});
	}

	get router() {
		if(!Router.helper) Object.defineProperty(Router, "helper", { value: this });
		return Router;
	}

	async getData() {
		if(this.account) {
			return this.mastodon.fetchUser(this.account);
		} else {
			return this.mastodon.fetchOwner();
		}
	}
}

module.exports = RouterHelper;

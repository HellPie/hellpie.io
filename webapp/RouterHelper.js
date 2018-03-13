const url = require("url");

const Router = require("express").Router();

const MastodonAPI = require("../fediverse/MastodonAPI");

const Log = require("./../utils/Log");

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
			tooltip: url.parse(Router.helper.mastodon.instance).hostname,
			note: profile.note,
			badges: ["check_circle"],
			stats: {
				"Posts": profile.statuses_count,
				"Following": profile.following_count,
				"Followers": profile.followers_count
			},
			links: Router.helper.links || undefined
		});
	}).catch((err) => {
		Log.wtf("Unable to fetch Mastodon API Token owner. Stacktrace will follow.");
		Log.e(err);
	});
});

Router.get("*", (req, res, next) => {
	Log.wtf(`Unable to process request: Page ${req.path} does not exist.`);

	const error = {
		code: "OOPSIE WOOPSIE!",
		message: "Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headwuarters are working VEWY HAWD to fix this!"
	};

	res.status(404);

	Router.helper.getData().then((profile) => {
		return res.render("error.hbs", {
			title: `${profile.display_name} - ${error.code}`,
			error: {
				image: profile.header,
				title: error.code.toString(),
				message: error.message
			},
			button: {
				url: "/",
				text: "Return to the main page"
			}
		});
	}).catch((err) => {
		Log.wtf("Unable to fetch Mastodon API Token owner. Stacktrace will follow.");
		Log.e(err);

		return next(err);
	});
});

class RouterHelper {

	constructor(server, config = {}) {
		Object.defineProperty(this, "server", { value: server });

		this.links = config.links || null;
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

const HelpTTP = require("./HelpTTP");

/**
 * @description Interface to access Mastodon APIs. Currently implements only a minimal non-Mastodon-specific set of APIs.
 * @class MastodonAPI
 */
class MastodonAPI {

	/**
	 * Creates an instance of MastodonAPI.
	 * @param {string} token The Mastodon Application Token used to access the Mastodon API.
	 * @param {object} [config={}] Configuration to customize the behavior and functionalities of this Mastodon client.
	 * @memberof MastodonAPI
	 */
	constructor(token, config = {}) {
		if(typeof token !== "string") throw new TypeError("Token for Mastodon API must be a string");
		if(typeof config !== "object") throw new TypeError("Configuration for Mastodon API must be an object.");
		if(!token) throw new SyntaxError("Token for Mastodon API cannot be empty or falsy.");

		/**
		 * @description The Mastodon Application Token to access the Mastodon API.
		 * @name token
		 * @type {string}
		 * @readonly
		 */
		Object.defineProperty(this, "token", { value: token });

		/**
		 * @description The highest Mastodon API version supported by this class.
		 * @name version
		 * @type {int}
		 * @readonly
		 */
		Object.defineProperty(this, "version", { value: 1 });

		/**
		 * @description The instance to which this Mastodon client should use to access the Mastodon API.
		 * @type {string}
		 */
		this.instance = config.instance || "https://mastodon.social";
	}

	get endpoint() {
		return `${this.instance}/api/v${this.version}`;
	}

	async _request(method, path) {
		return HelpTTP[method.toLowerCase()](`${this.endpoint}${path}`, {
			headers: { "Authorization": `Bearer ${this.token}` }
		}).then((response) => {
			try {
				return JSON.parse(response);
			} catch(err) {
				throw err;
			}
		}).catch((err) => {
			throw Error(err.message || err.toString());
		});
	}

	async fetchOwner() {
		return this._request("get", "/accounts/verify_credentials");
	}

	async fetchUser(id) {
		return this._request("get", `/accounts/${id}`);
	}
}

module.exports = MastodonAPI;

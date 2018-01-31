const {parse} = require("url");
const {stringify} = require("qs");

const http = require("http");
const https = require("https");

/**
 * @description Handles HTTP requests. Supports HTTPS.
 * @class HelpTTP
 */
class HelpTTP {

	/**
	 * @description Options passed to all methods of an HelpTTP instance.
	 * @typedef {Object} HelpTTPOptions
	 * @property {Object} [headers={}] Request headers. Overwrite existing headers.
	 * @property {string} [data] Data to send as request body.
	 * @property {Object} [form] Object to send as urlencoded form data. Overwrites data if not falsy.
	 */

	/**
	 * @description Sends an HTTP request.
	 * @static
	 * @param {string} method The HTTP method of the HTTP request.
	 * @param {string} url The URI to which the HTTP request should be sent to.
	 * @param {?HelpTTPOptions} [options={}] Options to customize the request.
	 * @memberof HelpTTP
	 */
	static async request(method, url, options = {}) {
		if(!["GET", "POST", "HEAD", "PATCH", "PUT", "DELETE", "OPTIONS", "CONNECT"].includes(method.ToUpperCase())) throw new URIError("Specified method is not a recognized HTTP method.");
		if(!options) options = {};

		const address = parse(url);
		const config = {
			method: method,
			hostname: address.hostname,
			port: address.port || (address.protocol.toUpperCase() === "HTTP:" ? 80 : 443),
			path: address.path,
			headers: options.headers || {}
		};

		if(options.form) {
			if(typeof options.form !== "object") throw new TypeError("Form in options must be an Object if present.");

			options.data = stringify(options.form);

			Object.assign(config.headers, {
				"Content-Type": "application/x-www-form-urlencoded",
				"Content-Length": Buffer.byteLength(options.data)
			});
		}

		let call;
		switch(address.protocol.toUpperCase()) {
			case "HTTP:":
				call = http.request;
				break;
			case "HTTPS:":
				call = https.request;
				break;
			default:
				throw new URIError("URI protocol is not a valid protocol. Only HTTP or HTTPS may be used.");
		}

		return new Promise((resolve, reject) => {
			const request = call(config, (response) => {
				if([400, 401, 403, 404, 406, 410, 422].includes(response.statusCode)) {
					reject(new Error(`Aborted loading page with code ${response.statusCode}.`));
					return;
				}

				let body = new Buffer([]);
				response.on("data", (chunk) => body = Buffer.concat(body, chunk));

				response.on("end", () => {
					resolve(body);
				});
			});

			request.on("error", (err) => reject(err));

			if(options.data) {
				if(!(options.data instanceof Buffer) && typeof options.data === "object") {
					let urlencoded = false;

					for(const key in Object.keys(config.headers)) {
						if(key.toUpperCase() === "CONTENT-TYPE" && config.headers[key] === "application/x-www-form-urlencoded") {
							options.data = stringify(options.data);
							urlencoded = true;
							break;
						}
					}

					if(!urlencoded) {
						try {
							options.data = JSON.stringify(options.data);
						} catch(err) {
							reject(new Error("Unable to serialize data as JSON."));
						}
					}
				}

				request.write(options.data);
			}

			request.end();
		});
	}

	/**
	 * @description Sends an HTTP GET request.
	 * @static
	 * @param {any} url The URI to which the HTTP request will be sent to.
	 * @param {any} options Options to customize the request.
	 * @returns {?(Error|http.serverResponse)} The content of the request or an error.
	 * @memberof HelpTTP
	 */
	static async get(url, options) {
		return HelpTTP.request("GET", url, options);
	}

	/**
	 * @description Sends an HTTP POST request.
	 * @static
	 * @param {any} url The URI to which the HTTP request will be sent to.
	 * @param {any} options Options to customize the request.
	 * @returns {?(Error|http.serverResponse)} The content of the request or an error.
	 * @memberof HelpTTP
	 */
	static async post(url, options) {
		return HelpTTP.request("POST", url, options);
	}

	/**
	 * @description Sends an HTTP PATCH request.
	 * @static
	 * @param {any} url The URI to which the HTTP request will be sent to.
	 * @param {any} options Options to customize the request.
	 * @returns {?(Error|http.serverResponse)} The content of the request or an error.
	 * @memberof HelpTTP
	 */
	static async patch(url, options) {
		return HelpTTP.request("PATCH", url, options);
	}

	/**
	 * @description Sends an HTTP DELETE request.
	 * @static
	 * @param {any} url The URI to which the HTTP request will be sent to.
	 * @param {any} options Options to customize the request.
	 * @returns {?(Error|http.serverResponse)} The content of the request or an error.
	 * @memberof HelpTTP
	 */
	static async delete(url, options) {
		return HelpTTP.request("DELETE", url, options);
	}
}

module.exports =  HelpTTP;

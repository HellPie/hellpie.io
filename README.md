# `HELLPIE.IO` - My own personal webpage

Low profile and minimalistic but with a couple tricks ups its sleeve.

---

> Basic website description - W.I.P.

---
### Setup instructions:

> W.I.P.

---
### Configuration:

Configuration is loaded from a file called `config.json`, a template of its structure can be found in the file [`config_template.json`](./config_template.json). It is suggested that this file is used by first renaming it to `config.json` and then replacing (or removing) the values and keys in it.

> **Note:**\
> All values are required unless otherwise specified.

The root attributes of the configuration are used to bind the ExpressJS [WebServer](./webapp/WebServer.js) to the proper IP and port to listen for incoming connections.

- **`hostname`**: The IP or hostname where the ExpressJS server will listen on.
- **`port`**: Which port the ExpressJS server will listen on.
- **`router`**: Contains the required configuration for the [`RouterHelper`](./webapp/RouterHelper.js) class.
	- **`token`**: Mastodon API Token provided to the Mastodon Application upon creation.
	- **`account`**: Mastodon Account ID of the user whose data will be fetched to fill the [`index`](./webapp/views/index.hbs) page.
	- **`mastodon`**: Contains the required configuration for the [`MastodonAPI`](./fediverse/MastodonAPI.js) class.
		- **`instance`**: The Mastodon instance where the Mastodon API Token was registered.

> **Note:**\
> It is highly suggested setting the `hostname` value to `127.0.0.1` and use nginx, Apache or other webserver software to port-forward from the local port to the public port on the public IP address. Using `localhost` may open up the ExpressJS server to unwanted connections depending on which address the system binds to `localhost`.

> **Note:**\
> If the `router.account` field of the configuration is not provided or its value evaluates to [`falsy`](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) the account owner of the Mastodon API token will be used to populate the template instead.

---
### Where to find me:
- Website [hellpie.io](https://hellpie.io)
- Mastodon: [_HellPie@masto.quad.moe](https://masto.quad.moe/@_HellPie)
- Discord: [_HellPie#9429](https://discord.gg/uGsUTmB)
- Twitch: [HellPie](https://www.twitch.tv/hellpie/)

### Support my bots:
- Patreon: [HellPie](https://www.patreon.com/hellpie)

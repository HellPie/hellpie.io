# `HELLPIE.IO` - My own personal webpage
Low profile and minimalistic but with a couple tricks ups its sleeve.
---

> Basic website description - W.I.P.

---
### Setup instructions:
> W.I.P.

---
### Configuration:

Configuration is loaded from a file called `config.json`, a template of its structure can be found in the file [`config_template.json`](./config_template.json). Please use this file by renaming it to `config.json` and replacing (or removing) the values and keys in it according to your needs.

#### `mastodon`:

This JSON object contains the required configuration for integrating the Mastodon API with the WebServer. All values are required unless otherwise specified.

- **`token`**: The Mastodon API token provided to your Application upon its creation.
- **`id`**: Optional. The ID of the user you want to track. If no value is specified or this parameter is missing, the owner of the Mastodon API token will be used instead.
- **`config`**: This JSON object contains the required configuration for the  [Mastodon API](./fediverse/MastodonAPI.js):
	- **`instance`**: The Mastodon instance where the Mastodon API token was registered.

**Note:**
As of now the `id` parameter's functionality is not yet implemented and is planned for version `2.0.0`. The API client will always use the owner of the Mastodon API token when fetching data for the webpage.

#### `webserver`:

This JSON object contains the required configuration to bind the ExpressJS [WebServer](./webapp/WebServer.js) to the proper IP and port to listen for incoming connections.

- **`hostname`**: The IP or hostname where the ExpressJS server will listen on.
- **`port`**: Which port the ExpressJS server will listen on.

**Note:**
It is highly suggested setting the `hostname` value to `127.0.0.1` and use nginx, Apache or other webserver software to port-forward from the local port to the public port on the public IP address. Using `localhost` may open up the ExpressJS server to unwanted connections depending on which address the system binds to `localhost`.

---
### Where to find me:
- Website [hellpie.io](https://hellpie.io)
- Mastodon: [_HellPie@masto.quad.moe](https://masto.quad.moe/@_HellPie)
- Discord: [_HellPie#9429](https://discord.gg/uGsUTmB)
- Twitch: [HellPie](https://www.twitch.tv/hellpie/)

### Support my bots:
- Patreon: [HellPie](https://www.patreon.com/hellpie)

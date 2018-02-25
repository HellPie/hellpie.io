# [`HELLPIE.IO`](https://hellpie.io) - My own personal webpage

Low profile and minimalistic but with a couple tricks ups its sleeve.

---

The website is extremely simple. It doesn't have any fancy feature besides automatically fetching data from Mastodon-compatible APIs and the complete lack of client-side JavaScript.

Among its features are:
- Complete lack of JavaScript client-side, compliant with the 0-bullshit architecture.
- Minimalistic style inspired by Twitter with easily configurable color palettes.
- Fully automated fetching of data from Mastodon-compatible APIs to compile the webpage template.
- Single page design containing the minimal necessary information to describe the user.
- Easily customizable interface with support to custom links to user-defined pages.

> **Note:**\
> Copying the project is discouraged even if compliant with the [Apache 2.0 License](./LICENSE). Instead, it is encouraged to use the code as a base to build upon to develop personalized versions of this software, in accordance with the [`LICENSE`](./LICENSE) terms.

---
### Setup instructions:

> **Note:**\
> Before cloning this repository it should be noted that the project makes use of [NodeJS](https://nodejs.org) server-side and it will therefore be impossible to host it on GitHub Pages or any other static website hosting service, unless [`index.hbs`](./webapp/views/index.hbs) and [`main.scss`](./webapp/static/styles/main.scss) are filled and compiled to static HTML and CSS files.

Before setting up the project the following software will need to be installed on the target system:
- [Git](https://git-scm.com/) (referenced as the `git` command).
- [NodeJS](https://nodejs.org/en/) (referenced as the `node` command) at version `9.5.0` or higher (refer to the `engines.node` property in [`packages.json`](./packages.json#L45) for the required version).
- [Yarn](https://yarnpkg.com/) (referenced as the `yarn` command) or NPM, included in NodeJS but unreliable in its latest versions.

> **Note:**\
> Additional software such as [NGINX](https://www.nginx.com/) or other web servers is not documented in this setup guide and it is suggested the user refers to specific guides about how to configure the project to communicate to the outside world.

The repository will need to be cloned locally to be executed:
```shell
git clone https://github.com/HellPie/hellpie.io.git
```

From now on the source code of this repository will be available locally at what is assumed to be the path corresponding to `~/hellpie.io/` on the user's system.

To execute the project the first time, installation of NodeJS dependencies is required:
```shell
cd ~/hellpie.io
yarn install --production
```

> **Note:**\
> It is suggested that, before running the software, the user configures the project to its likings as specified in the [Configuration](#configuration) section of this document since the project will not start until a valid `config.json` is found.

After installing the required dependencies the project will be executable through the command:
```shell
node index.js
```

Although it is suggested the usage of a process manager, such as [PM2](http://pm2.keymetrics.io/), for which this project already provides a startup configuration. This will allow the project to automatically run in the background, keep itself up-to-date and restart in case of crashes, system reboots or other issues.

To run this project through PM2, referenced as the `pm2` command, it is required that no other instance of the server is running before executing the following command:
```shell
pm2 start ecosystem.json
```

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
	- **`links`**: A key-value pair where the key is a [Material Icon](https://material.io/icons/) and the value a URL.

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

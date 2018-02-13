# Changelog
All changes to this project wll be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2018-02-13 14:57
### Updated:
- Dependencies for logging output
### Fixed:
- Sending events to the process crashing NodeJS when not starting the script as a fork.
- Stopping the server or the process (`Ctrl+C` or `SIGINT`) not working due to ExpressJS applications missing a method.

## [2.0.2] - 2018-02-12 09:47
### Added:
- Integration with `SIGINT` (`message shutdown` on Windows) for graceful shutdown support.
- Emit of `ready` event after the webserver is properly listening on its designated address.
- Documentation regarding setup and execution of the server in the `README` file.
- Description and list of "features" of the project in the `README` file.
### Updated:
- Node package dependencies and engine to the latest version.
- Package version matches current version in changelog.
- PM2 `ecosystem` file to support `wait_ready` flag and increase memory limit to include the Node runtime in the total.

## [2.0.1] - 2018-02-12 00:39
### Updated:
- `README` file with documentation regarding the new configuration schema.
### Fixed:
- Date in changelog of version `2.0.0`
- Link for the changelog of this version (`2.0.1`) which got borked due to applying the commit by amending it.

## [2.0.0] - 2018-02-11 23:36
### Added:
- Support for defining a specific Mastodon-compatible Account ID from which to fetch data.
### Updated:
- Configuration file (see `config_template.json`) to have a tree-like format and allow propagating sub-configs downward.
- `WebServer._inited` is now hidden and read-only after being set the first time to avoid interference from outsiders.

## [1.0.2] - 2018-02-04 22:53
### Added:
- Documentation within `README.md` for the WebServer and Mastodon API configuration.
- Links to releases at the bottom of this changelog.
### Updated:
- Configuration template to match the current required configuration.
- Older changelog entries to make use of more markdown formatting features.
- `LICENSE` file's filename to remove its extension to fully comply with the Apache License requirements.
### Removed:
- Link placeholders from some older changelog entries who didn't get a proper tag or present minimal code changes.

## [1.0.1] - 2018-02-02 18:32
### Added:
- Logging of all requests for statistics and security/spam.

## [1.0.0] - 2018-02-02 18:28
### Added:
- Mastodon API integration within ExpressJS router.
- Sass/Scss style with color palette based on Twitter Light theme for `index` page.
- Rendering of `index` page with data from Mastodon using the ExpressJS router.
### Updated:
- Renamed `display_name` in handlebars template to be shorter and discard usage of `snake_case`.
### Fixed:
- Day in `0.3.0` changelog.
### Removed:
- Unused class that was setup ahead-of-time for storing handlebars helpers.
- Unpublished `0.3.1` release changelog which had its tag deleted before pushing to `master`.

## [0.3.0] - 2018-02-02 17:47
### Added:
- Handlebars header template with style links and fonts.
- Handlebars index page with dynamic profile card markup.
- Favicon served through ExpressJS.

## [0.2.0] - 2018-02-01 12:14
### Added:
- WebServer with basic route and error handling.
- Logging utility with support for colored console output.
### Updated:
- Required dependencies for logging utility.

## [0.1.0] - 2018-02-01 01:43
### Added:
- Beginning of Mastodon API.
- Test `index.js` to see if the Mastodon API endpoints work.
### Fixed:
- `HelpTTP` breaking and showing wrong types in JSDoc.

## [0.0.3] - 2018-02-01 00:54
### Added:
- `HelpTTP` class as a 0-dependency asynchronous HTTP and HTTPS request client.
### Removed:
- Phin dependency, due to the hacky feel and the excessive spam on Reddit to get people to use it in the past. I do not like spam-bots.

## 0.0.2 - 2018-01-30 23:56
### Added:
- PM2 `ecosystem` file
- Empty entry point file
- Config template

## 0.0.1 - 2018-01-30 01:07
### Added
- Node package configuration
- Yarn package manager lockfile

## 0.0.0 - 2018-01-30 00:07
### Added
- This `CHANGELOG` file
- `README` file as a work in progress file that will host basic documentation for this software
- `LICENSE` file from the Apache2 license
- `.gitignore` and linting configuration

[2.0.3]: https://github.com/HellPie/hellpie.io/releases/tag/v2.0.3
[2.0.2]: https://github.com/HellPie/hellpie.io/releases/tag/v2.0.2
[2.0.1]: https://github.com/HellPie/hellpie.io/tree/e6c2ff
[2.0.0]: https://github.com/HellPie/hellpie.io/releases/tag/v2.0.0
[1.0.2]: https://github.com/HellPie/hellpie.io/releases/tag/v1.0.2
[1.0.1]: https://github.com/HellPie/hellpie.io/tree/dea2f4
[1.0.0]: https://github.com/HellPie/hellpie.io/releases/tag/v1.0.0
[0.3.0]: https://github.com/HellPie/hellpie.io/releases/tag/v0.3.0
[0.2.0]: https://github.com/HellPie/hellpie.io/releases/tag/v0.2.0
[0.1.0]: https://github.com/HellPie/hellpie.io/releases/tag/v0.1.0
[0.0.3]: https://github.com/HellPie/hellpie.io/tree/ce27bc

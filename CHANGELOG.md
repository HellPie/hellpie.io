# Changelog
All changes to this project wll be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2018-02-02 18:32
### Added:
- Logging of all requests for statistics and security/spam.

## [1.0.0] - 2018-02-02 18:28
### Added:
- Mastodon API integration within ExpressJS router.
- Sass/Scss style with color palette based on Twitter Light theme for index page.
- Rendering of index page with data from Mastodon using the ExpressJS router.
### Updated:
- Renamed display_name in handlebars template to be shorter and discard usage of snake_case.
### Fixed:
- Day in 0.3.0 changelog.
### Removed:
- Unused class that was setup ahead-of-time for storing handlebars helpers.
- Unpublished 0.3.1 release changelog which had its tag deleted before pushing to master.

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
- Test index.js to see if the Mastodon API endpoints work.
### Fixed:
- HelpTTP breaking and showing wrong types in JSDoc.

## [0.0.3] - 2018-02-01 00:54
### Added:
- HelpTTP class as a 0-dependency asynchronous HTTP and HTTPS request client.
### Removed:
- Phin dependency, due to the hacky feel and the excessive spam on Reddit to get people to use it in the past. I do not like spam-bots.

## [0.0.2] - 2018-01-30 23:56
### Added:
- PM2 ecosystem file
- Empty entry point file
- Config template

## [0.0.1] - 2018-01-30 01:07
### Added
- Node package configuration
- Yarn package manager lockfile

## [0.0.0] - 2018-01-30 00:07
### Added
- This CHANGELOG file
- README file as a work in progress file that will host basic documentation for this software
- LICENSE file from the Apache2 license
- .gitignore and linting configuration

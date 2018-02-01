class HelpersStore {

	constructor() {
		this.helpers = {
			//
		};
	}

	async register(handlebars) {
		for(const key in this.helpers) {
			handlebars.registerHelper(key, this.helpers[key]);
		}
	}
}

module.exports = HelpersStore;

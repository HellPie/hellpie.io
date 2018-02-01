const {inspect} = require("util");

const Config = require("./config.json");
const MastodonAPI = require("./fediverse/MastodonAPI");

const api = new MastodonAPI(Config.token, {instance: "https://masto.quad.moe"});

api.fetchOwner().then((x) =>console.debug(inspect(x, {colors: true}))).catch((e) => console.log(e));
api.fetchUser(6421).then((x) =>console.debug(inspect(x, {colors: true}))).catch((e) => console.log(e));

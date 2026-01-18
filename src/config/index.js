const env = require("./env.config");
const { connectMongoDb } = require("./database");

module.exports = Object.freeze({
	...env,
	connectMongoDb: () => connectMongoDb(env.mongoUri),
});

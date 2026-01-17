require("dotenv").config();

const app = require("./app");
const config = require("./config");

const startServer = async () => {
	try {
		config.connectMongoDb();

		app.listen(config.port, () => {
			console.log(
				`Server running in ${config.env} mode on port ${config.port}`
			);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

startServer();

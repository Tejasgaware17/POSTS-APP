const mongoose = require("mongoose");

const connectMongoDb = async (mongoUri) => {
	try {
		await mongoose.connect(mongoUri);
		console.log("Database connected successfully");
	} catch (error) {
		console.error("Database connection failed:", error.message);
		process.exit(1);
	}
};

module.exports = { connectMongoDb };

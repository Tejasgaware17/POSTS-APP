const requiredEnvVariables = ["JWT_SECRET", "MONGODB_URI"];

requiredEnvVariables.forEach((key) => {
	if (!process.env[key]) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
});

module.exports = {
	env: process.env.NODE_ENV || "development",
	port: Number(process.env.PORT) || 3000,
	jwtSecret: process.env.JWT_SECRET,
	mongoUri: process.env.MONGODB_URI,
};

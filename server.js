require("dotenv").config();

// External dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Internal modules
const config = require("./config");
const {
	authMiddleware,
	routeNotFound,
	errorHandlerMiddleware,
} = require("./middlewares");
const { authRoutes, postsRoutes, exploreRoutes } = require("./routes");


const app = express();

app.set("trust proxy", 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100,
	})
);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", authMiddleware, postsRoutes);
app.use("/api/v1/explore", authMiddleware, exploreRoutes);

app.get("/", (req, res) => {
	res.send(`
		<div style="margin: 2rem 4rem;">
			<pre style="font-size: 1.5rem">
Welcome to <b>Posts API</b> 📱
			</pre>
			<p style="font-family: Arial;">
				🧪 Check the API documentation for usage details<br>
				🔐 Register as a user and start using the API<br><br>
				Share your experience with us 🙇💕
			</p>
		</div>
	`);
});

// Error handling middlewares
app.use(routeNotFound);
app.use(errorHandlerMiddleware);

// Server
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

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const {
	authMiddleware,
	routeNotFound,
	errorHandlerMiddleware,
} = require("./middlewares");

const { authRoutes, postsRoutes, exploreRoutes } = require("./routes");

const app = express();

// App-level config
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

// Api health check
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "ok",
		service: "posts-api",
		version: "v1",
		uptime: process.uptime(),
	});
});

// Error handling
app.use(routeNotFound);
app.use(errorHandlerMiddleware);

module.exports = app;

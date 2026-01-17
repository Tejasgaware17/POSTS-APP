require("dotenv").config();

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const config = require("./config");

// Middlewares
const { authMiddleware, routeNotFound, errorHandlerMiddleware } = require('./middlewares')

const express = require("express");
const app = express();

app.set("trust proxy", 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // setting to 15mins
		max: 100, // setting 100 requests per windoMs
	})
);
app.use(helmet());
app.use(cors());

app.use(express.json());

// routers
const authRouter = require("./routes/routes.auth");
const postsRouter = require("./routes/routes.posts");
const exploreRouter = require("./routes/routes.explore");
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/posts/", authMiddleware, postsRouter);
app.use("/api/v1/explore/", authMiddleware, exploreRouter);
// routes
app.get("/", (req, res) => {
	res.send(`
      <div style="margin: 2rem 4rem;">
      <pre style="font-size: 1.5rem">Welcome to <b>Posts API</b> 📱</pre>
      <p style="font-family:Arial;">
        🧪Check documentation to get the details
        <br>
        🔐Register as a user and start using now
        <br><br>
        Share your experience with us 🙇💕
      </p>
      </div>
    `);
});

// error handling middlewares
app.use(errorHandlerMiddleware);
app.use(routeNotFound);

const start = async () => {
	try {
		config.connectMongoDb();
		app.listen(
			config.port,
			console.log(`Server listening on port ${config.port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();

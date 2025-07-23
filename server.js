require("dotenv").config();

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDatabase = require("./config/db");
const routeNotFound = require("./middlewares/routeHandler");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authentication");
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
app.use("/api/v1/explore/", exploreRouter);
// routes
app.get("/", (req, res) => {
  res.send("on / route");
});

// error handling middlewares
app.use(errorHandlerMiddleware);
app.use(routeNotFound);

const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    connectDatabase(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

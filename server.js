require("dotenv").config();
const connectDatabase = require("./config/db");
const routeNotFound = require("./middlewares/routeHandler");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const express = require("express");
const app = express();

// database

app.use(express.json());

// routers
const authRouter = require("./routes/routes.auth");
const postsRouter = require("./routes/routes.posts");
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/posts/", postsRouter);

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

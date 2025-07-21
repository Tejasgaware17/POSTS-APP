require("dotenv").config();
const connectDatabase = require("./config/db");
const routeNotFound = require("./middlewares/routeHandler");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const express = require("express");
const app = express();

// database
connectDatabase();

app.use(express.json());

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
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

require("dotenv").config();
const connectDatabase = require("./config/db");
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

const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

const User = require("../models/User");
const { UnauthorisedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthorisedError("Authentication failed!");

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // sending the data from token to the request object
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (error) {
    throw new UnauthorisedError("Authentication failed!");
  }
};

module.exports = authMiddleware;

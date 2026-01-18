const authMiddleware = require("./authentication");
const routeNotFound = require("./routeHandler");
const errorHandlerMiddleware = require("./errorHandler");

module.exports = { authMiddleware, routeNotFound, errorHandlerMiddleware };

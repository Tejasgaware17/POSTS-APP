const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./CustomApiError");

class UnauthorisedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.name = "UNAUTHORISED";
  }
}

module.exports = UnauthorisedError;

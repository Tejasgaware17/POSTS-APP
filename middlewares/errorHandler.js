const { CustomApiError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  if (err.code && err.code == "11000") {
    customError.message = `Provided ${Object.keys(
      err.keyValue
    )} already exists, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name == "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");

    customError.statusCode = 400;
  }

  if (err.name == "CastError") {
    customError.message = `Nothing found with id ${
      err.valueType == "string" ? err.value : err.value._id
    }`;

    customError.statusCode = 404;
  }

  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;

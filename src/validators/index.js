const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const loginValidator = require("./login.validator");
const registerValidator = require("./register.validator");

function validate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const message = errors
			.array()
			.map((error) => error.msg)
			.join(", ");

		const error = new Error(message);
		error.statusCode = StatusCodes.BAD_REQUEST;

		return next(error);
	}

	return next();
}

module.exports = {
	loginValidator,
	registerValidator,
	validate,
};

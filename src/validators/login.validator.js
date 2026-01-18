const { body } = require("express-validator");

const loginValidator = [
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please enter a valid email")
		.normalizeEmail(),

	body("password").notEmpty().withMessage("Password is required").trim(),
];

module.exports = loginValidator;

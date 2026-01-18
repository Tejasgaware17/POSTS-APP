const { body } = require("express-validator");

const registerValidator = [
	body("name")
		.notEmpty()
		.withMessage("Name is required")
		.trim()
		.isLength({ min: 3, max: 40 })
		.withMessage("Name must be between 3 and 40 characters")
		.matches(/^[a-zA-Z ]+$/)
		.withMessage("Name can only contain alphabets and spaces"),

	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Enter a valid email")
		.normalizeEmail(),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters")
		.trim(),
];

module.exports = registerValidator;

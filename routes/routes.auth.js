const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/controller.auth");
const { StatusCodes } = require("http-status-codes");
const { body, validationResult } = require("express-validator");

// validation middlewares for register and login
const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required").trim(),
];

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

// checking validation from request
function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
    const error = new Error(message);
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  next();
}

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

module.exports = router;

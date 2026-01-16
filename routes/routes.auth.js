const express = require("express");
const {
	loginValidator,
	registerValidator,
	validate,
} = require("../validators");
const { register, login } = require("../controllers/controller.auth");

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

module.exports = router;

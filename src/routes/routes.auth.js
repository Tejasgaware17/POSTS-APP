const express = require("express");

const {
	loginValidator,
	registerValidator,
	validate,
} = require("../validators");

const { registerController, loginController } = require("../controllers");

const router = express.Router();

router.post("/register", registerValidator, validate, registerController);

router.post("/login", loginValidator, validate, loginController);

module.exports = router;

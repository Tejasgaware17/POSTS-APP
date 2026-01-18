const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorisedError } = require("../errors");
const { User } = require("../models");

const registerController = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError("All fields are required");
	}

	const user = await User.create({ name, email, password });

	const token = user.createJWT();
	res
		.status(StatusCodes.CREATED)
		.json({ user: { name: user.name, email: user.email }, token });
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new UnauthorisedError("Invalid Credentials");
	}

	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		throw new UnauthorisedError("Invalid Credentials");
	}

	const token = user.createJWT();
	res
		.status(StatusCodes.OK)
		.json({ user: { name: user.name, email: user.email }, token });
};

module.exports = { registerController, loginController };

const express = require("express");

const {
	createPostController,
	getAllPostController,
	getPostController,
	updatePostController,
	deletePostController,
} = require("../controllers");

const router = express.Router();

// Collection routes
router.route("/").get(getAllPostController).post(createPostController);

// Single resource routes
router
	.route("/:id")
	.get(getPostController)
	.patch(updatePostController)
	.delete(deletePostController);

module.exports = router;

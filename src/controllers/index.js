// Auth controllers
const { registerController, loginController } = require("./controller.auth");

// Explore controllers
const {
	exploreGetAllPostController,
	exploreGetSinglePostController,
	likePostController,
} = require("./controller.explore");

// Post controllers
const {
	createPostController,
	getAllPostController,
	getPostController,
	updatePostController,
	deletePostController,
} = require("./controller.posts");

module.exports = {
	// Auth
	registerController,
	loginController,

	// Explore
	exploreGetAllPostController,
	exploreGetSinglePostController,
	likePostController,

	// Posts
	createPostController,
	getAllPostController,
	getPostController,
	updatePostController,
	deletePostController,
};

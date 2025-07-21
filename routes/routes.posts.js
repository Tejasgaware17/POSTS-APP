const express = require("express");
const router = express.Router();

const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/controller.posts");

router.route("/").post(createPost).get(getAllPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  exploreGetAllPost,
  exploreGetSinglePost,
  likePost,
} = require("../controllers/controller.explore");

router.route("/").get(exploreGetAllPost);
router.route("/:id").get(exploreGetSinglePost);
router.patch("/:id/like", likePost);

module.exports = router;

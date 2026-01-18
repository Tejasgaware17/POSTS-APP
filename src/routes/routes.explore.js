const express = require("express");
const {
	exploreGetAllPostController,
	exploreGetSinglePostController,
	likePostController,
} = require("../controllers");

const router = express.Router();

router.get("/", exploreGetAllPostController);

router.post("/:id/like", likePostController);

router.get("/:id", exploreGetSinglePostController);

module.exports = router;

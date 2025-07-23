const express = require("express");
const router = express.Router();

const {
  exploreGetAllPost,
  exploreGetSinglePost,
} = require("../controllers/controller.explore");

router.route("/").get(exploreGetAllPost);
router.route("/:id").get(exploreGetSinglePost);

module.exports = router;

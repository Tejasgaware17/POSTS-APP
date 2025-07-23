const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const exploreGetAllPost = async (req, res) => {
  const posts = await Post.find({}, "title description likes category").sort(
    "-createdBy"
  );
  res.status(StatusCodes.OK).json({ total: posts.length, posts });
};

const exploreGetSinglePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne(
    { _id: postId },
    "-_id -updatedAt -__v"
  ).populate("createdBy", "name -_id");

  if (!post) throw new NotFoundError("No post found");

  res.status(StatusCodes.OK).json({ post });
};

module.exports = { exploreGetAllPost, exploreGetSinglePost };

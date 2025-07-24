const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const exploreGetAllPost = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments();
  const totalPages = Math.ceil(total / limit);

  if (page > totalPages && total !== 0) {
    return res.status(StatusCodes.OK).json({
      message: "No posts found on this page",
      total,
      totalPages,
      posts: [],
    });
  }

  const posts = await Post.find({}, "title description likes category")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    total,
    totalPages,
    page,
    posts,
  });
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

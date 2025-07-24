const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const exploreGetSinglePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne(
    { _id: postId },
    "-_id -updatedAt -__v"
  ).populate("createdBy", "name -_id");

  if (!post) throw new NotFoundError("No post found");

  res.status(StatusCodes.OK).json({ post });
};

// Explore posts route
const exploreGetAllPost = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments();
  const totalPages = Math.ceil(total / limit);

  // filters
  const { search, category } = req.query;
  const queryObject = {};

  if (search) {
    const user = await User.findOne({ name: search });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No user found with name ${search}`,
        posts: [],
      });
    }
    queryObject.createdBy = user._id;
  }

  if (category) queryObject.category = category;

  // pagination
  if (page > totalPages && total !== 0) {
    return res.status(StatusCodes.OK).json({
      message: "No posts found on this page",
      total,
      totalPages,
      posts: [],
    });
  }

  const posts = await Post.find(queryObject, "title description likes category")
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

module.exports = { exploreGetAllPost, exploreGetSinglePost };

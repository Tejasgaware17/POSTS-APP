const Post = require("../models/Post");
const User = require("../models/User");
const Like = require("../models/Like");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const exploreGetSinglePost = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findOne({ _id: postId })
    .select("-_id -updatedAt -__v")
    .populate("createdBy", "name -_id")
    .lean();

  if (!post) throw new NotFoundError("No post found");

  // formatting { createdAt }
  const date = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = new Date(post.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  post.createdAt = `${date} at ${time}`;

  res.status(StatusCodes.OK).json({ post });
};

const exploreGetAllPost = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const { search, category, hashtags } = req.query;
  const queryObject = {};

  // search posts by User's name
  if (search) {
    const user = await User.findOne({
      name: { $regex: `^${search}`, $options: "i" },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No user found with name "${search}"`,
        posts: [],
      });
    }

    queryObject.createdBy = user._id;
  }

  // find posts by categories
  if (category) {
    queryObject.category = category;
  }

  // find posts by hashtags
  if (hashtags) {
    const tags = req.query.hashtags
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean);

    if (tags.length) {
      queryObject.hashtags = { $in: tags };
    }
  }

  // paginations and total pages
  const total = await Post.countDocuments(queryObject);
  const totalPages = Math.ceil(total / limit);

  if (page > totalPages && total !== 0) {
    return res.status(StatusCodes.OK).json({
      message: "No posts found on this page",
      total,
      totalPages,
      posts: [],
    });
  }

  // all posts and their data attributes
  const posts = await Post.find(queryObject)
    .select("-createdBy -hashtags -createdAt -updatedAt -__v")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(StatusCodes.OK).json({
    total,
    totalPages,
    page,
    posts,
  });
};

const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.userId;

  const post = await Post.findById(postId);
  if (!post) throw new NotFoundError(`Invalid post id ${postId}`);

  const queryObject = { userId, postId };
  let liked;

  const likeExists = await Like.findOne(queryObject);

  // ḷike and unlike
  if (likeExists) {
    await Like.deleteOne(queryObject);
    await Post.updateOne({ _id: postId }, { $inc: { likes: -1 } });
    liked = false;
  } else {
    await Like.create(queryObject);
    await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });
    liked = true;
  }

  const updatedPost = await Post.findById(postId).select("likes");

  res.status(StatusCodes.OK).json({
    message: liked ? "Post liked" : "Removed like from the post",
    liked,
    totalLikes: updatedPost.likes,
  });
};

module.exports = { exploreGetAllPost, exploreGetSinglePost, likePost };

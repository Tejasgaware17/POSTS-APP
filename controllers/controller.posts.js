const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllPost = async (req, res) => {
  const posts = await Post.find({ createdBy: req.user.userId })
    .select("-createdBy -__v -createdAt -updatedAt")
    .sort("-createdAt")
    .lean();

  res.status(StatusCodes.OK).json({ total: posts.length, posts });
};

const getPost = async (req, res) => {
  const { userId } = req.user;
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId, createdBy: userId })
    .select("-__v")
    .lean();

  if (!post) {
    throw new NotFoundError(`No post found with id ${postId}`);
  }

  const createdDate = new Date(post.createdAt);
  post.createdAtFormatted = createdDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
  const { title, caption, hashtags, category } = req.body;
  let postDetails = {
    title,
    createdBy: req.user.userId,
    caption,
    hashtags,
    category,
    likes: 0,
  };

  const post = await Post.create(postDetails);
  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const { userId } = req.user;
  const { id: postId } = req.params;

  const post = await Post.findOneAndUpdate(
    { _id: postId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
    .select("-__v")
    .lean();

  if (!post) {
    throw new NotFoundError(`No post found with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { userId } = req.user;
  const { id: postId } = req.params;

  const post = await Post.findOneAndDelete({ _id: postId, createdBy: userId });

  if (!post) {
    throw new NotFoundError(`No post found with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ message: "Post deleted successfully" });
};

module.exports = {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

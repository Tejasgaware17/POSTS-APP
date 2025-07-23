const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllPost = async (req, res) => {
  const posts = await Post.find(
    { createdBy: req.user.userId },
    "-createdBy -__v"
  ).sort("-createdAt");

  res.status(StatusCodes.OK).json({ total: posts.length, posts });
};

const getPost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOne(
    {
      _id: postId,
      createdBy: userId,
    },
    "-_id -__v"
  );

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const post = await Post.create(req.body);

  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const {
    body: { title, category },
    user: { userId },
    params: { id: postId },
  } = req;

  if (title == "" || category == "") {
    throw new BadRequestError("Title or category must not be empty");
  }

  const post = await Post.findByIdAndUpdate(
    { _id: postId, user: userId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOneAndDelete({ _id: postId, createdBy: userId });

  if (!post) {
    throw new BadRequestError(`No Post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ message: "Post deleted successfuly" });
};

module.exports = {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

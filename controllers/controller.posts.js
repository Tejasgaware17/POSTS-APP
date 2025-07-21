const getAllPost = async (req, res) => {
  res.send("getAllPost/");
};
const getPost = async (req, res) => {
  res.send("getPost/");
};
const createPost = async (req, res) => {
  res.send("createPost/");
};
const updatePost = async (req, res) => {
  res.send("updatePost/");
};
const deletePost = async (req, res) => {
  res.send("deletePost/");
};

module.exports = {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

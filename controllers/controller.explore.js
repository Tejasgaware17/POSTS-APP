const exploreGetAllPost = async (req, res) => {
  res.send("/ all posts on explore page");
};
const exploreGetSinglePost = async (req, res) => {
  res.send("/ single post from explore page");
};

module.exports = { exploreGetAllPost, exploreGetSinglePost };

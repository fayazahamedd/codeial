const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user", "name")
    .populate({ path: "comments", populate: { path: "user" } });
  return res.json(200, {
    message: "list of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.redirect("back");
    }
    if (post.user == req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
      return res.json(200, {
        message: "Message and associated Comments deleted successfully",
      });
    } else {
      return res.json(401, {
        message: "You cannot delete this post",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: " Internal Server error: " + err,
    });
  }
};

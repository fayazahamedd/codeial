const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error creating post Controller");
    return;
  }
};

//Delete the post
module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.redirect("back");
    }
    if (post.user == req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error deleting post and associated comments:", err);
    return res.redirect("back");
  }
};


const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
      await Post.create({
      content: req.body.content,
      user: req.user.id,
    });
    req.flash('success','Post published successfully');
    return res.redirect("back");
  } catch (err) {
    req.flash('error','Post not published successfully');
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
      req.flash('success','Post and associated comments are destroyed successfully');
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error','Error deleting post and associated comments');
    return res.redirect("back");
  }
};


const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require('../models/like');

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });
    const postWithUser = await Post.findById(post._id).populate("user", "name");
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: postWithUser,
        },
        message: "Post Created",
      });
    }
    req.flash("success", "Post published successfully");
    return res.redirect("back");
  } catch (err) {
    if (req.xhr) {
      return res.status(500).json({
        message: 'Post not published successfully',
        error: err.message,
      });
    }

    req.flash('error', 'Post not published successfully');
    console.log('Error creating post Controller', err);
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
      await Like.deleteMany({likeable: post, onModel: 'Post'});
      await Like.deleteMany({_id: {$in: post.comments}});
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted successfully",
        });
      }
      req.flash(
        "success",
        "Post and associated comments are destroyed successfully"
      );
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Error deleting post and associated comments");
    return res.redirect("back");
  }
};

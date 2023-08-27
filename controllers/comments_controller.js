const Post = require("../models/post");
const Comment = require("../models/comment");
const commentsMailer = require("../mailer/comments_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../worker/comment_email_worker");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      comment = await comment.populate(["user"])
      commentsMailer.newComment(comment);
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("Error in sending to the queue");
          return;
        }
        console.log("job enqueued", job.id); 
      }); 

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment published!");

      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

//Delete the comment

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.redirect("back");
    }
    if (comment.user == req.user.id) {
      let postId = comment.post;
      await comment.remove();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "Comments deleted successfully");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Error deleting comment and updating associated post");
    return res.redirect("back");
  }
};
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req?.body?.content, // Use 'content' instead of 'post'
        post: req.body.post, // Use 'post' instead of 'content'
        user: req?.user?._id, // Use 'user' instead of 'id'
      });
      
      post.comments.push(comment);
      await post.save();
      
      res.redirect("/");
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    // Handle any errors that occur during the execution of the function
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error deleting comment and updating associated post:", err);
    return res.redirect("back");
  }
};


const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req?.body?.post,
        post: req?.body?.post,
        id: req?.user?._id,
      });
      post.comments.push(comment);
      await post.save();
      await comment.save();
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

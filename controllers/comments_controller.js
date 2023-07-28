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
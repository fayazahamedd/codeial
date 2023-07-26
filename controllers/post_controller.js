const Post = require("../models/post");

module.exports.create = async function (req, res) {
  console.log(req.body.content);
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });
    console.log('-------------------------------------',req.body);  /// user.id
    return res.redirect("back");
  } catch (err) {
    console.log("Error creating post Controller");
    return;
  }
};

const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate("user", "name")
      .populate({ path: "comments", populate: { path: "user" } })
      const users = await User.find({}) 
          return res.render("home", {
            title: "Home ~ post",
            posts: posts,
            all_users: users,
          });
  } catch (err) {
    console.log("Error fetching posts:", err);
    return;
  }
};

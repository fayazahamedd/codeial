const Post = require("../models/post");

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({}).populate('user','name').exec();
    // console.log(posts)
    console.log('**************',req.user)

    console.log('posts',posts);
    return res.render('home', {
      title: "Home ~ post",
      user: {
        name: req?.user?.name,
        email: req?.user?.email,
        id: req?.user?._id,
      },
      posts: posts
    });
  } catch (err) {
    console.log("Error fetching posts:", err);
    return;
  }
};

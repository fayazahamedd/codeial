const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function(err,user){
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
});
};

module.exports.update = function(req,res){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    req.flash('success','Updated successfully');
      return res.redirect('back');
    });
  }else {
    req.flash('error','Contact Admin');
    return res.status(401).send('Unauthorized');
  }
}

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      req.flash('success','Signed up successfully');
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error','Some Error occurred');
    console.log("Error in finding/creating user while signing up", err);
    return res.redirect("back");
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully')
  return res.redirect('/');
};


module.exports.destroySession = function (req, res) {
  req.logout(req.user, (err) => {
    if (err) return;
    req.flash('success', 'Logged out Successfully')
    res.redirect("/");
  });
  req.flash('success', 'Logged out Successfully')
  return res.redirect("/");
};
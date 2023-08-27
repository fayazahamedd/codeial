const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password !== password) {
            req.flash("error", "Invalid Username/Password");
            return done(null, false);
          }else {
            return done(null, user);
          }
          // return done(null, user);
        })
        .catch((err) => {
          req.flash("error", err);
          console.log("Error in finding the user", err);
          return done(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("USER", user)
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport");
      return done(err);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //reg user contains the current signed in user from session cookie and we are just sending this to local the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;

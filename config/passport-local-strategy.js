const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password !== password) {
            console.log("Invalid Username");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding the user", err);
          return done(err);
        });
    }
  )
);

//Serialization which key need to kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Deserialization which user from the key in the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding the user", err);
      done(err);
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
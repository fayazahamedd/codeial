const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding the user");
          return done(err);
        }
        if (!user || user.password !== password) {
          console.log("Invalid Username");
          return done(null, false);
        }
        return done(null, user);
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
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding the user");
            return done(err);
          }
        done(err, user);
    });
});

module.exports = passport;
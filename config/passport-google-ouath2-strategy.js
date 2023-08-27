const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require('./environment');

passport.use(
  new googleStrategy(
    {
      clientID: env.google_clientID,
      clientSecret: env.google_clientSecret,
      callbackURL: env.google_callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          console.log('Created User', newUser);
          return done(null, newUser);
        }
      } catch (error) {
        console.log('Error in OAuth', error);
        return;
      }
    }
  )
);

module.exports = passport;
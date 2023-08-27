const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const env = require('./environment');

const User = require("../models/user");

if (!process.env.jwt_secret_key) {
  throw new Error('JWT secret key not found in environment variables.');
}

let opts = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.jwt_secret_key
}


passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
      User.findById(jwtPayload._id, function(err,user) {
        if(err) { console.log('Error in finding the user from JWT'); return ;}
        if(user){
            return done(null,user);
        }else {
            return done(null,false);
        }
      })
    }
  )
);

module.exports = passport;
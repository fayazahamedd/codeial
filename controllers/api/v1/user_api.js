const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require('../../../config/environment')

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or Password",
      });
    }

    return res.json(200, {
      message: "Signed in successfully, here it the token",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret_key, { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    console.log("Error in finding the user", err);
    return res.json(500, {
      message: "Internal Error",
    });
  }
};

const express = require("express");
const env = require("./config/environment");
const logger = require("morgan");
const rfs = require("rotating-file-stream");
const cookieParser = require("cookie-parser");
const app = express();
require("./config/view-helper")(app);
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const http = require("http");
const path = require("path");

const customMiddleware = require("./config/middelware");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJwWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-ouath2-strategy");
const MongoStore = require("connect-mongodb-session")(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(env.assert_path));
app.use("/uploads", express.static(__dirname + "/uploads")); // Make the upoload path available to the browser

// app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        uri: "mongodb://localhost:27017/codeialDev1",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

//Set up chat server
const chatServer = http.Server(app);
const chatSocket = require("./config/chat_sockets");
chatSocket(chatServer);
const PORT = 5000;
chatServer.listen(PORT, () => {
  console.log(`Chat server is running, listening on port ${PORT}`);
});

console.log("Running on " + env.name + " Environment");

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
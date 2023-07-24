const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/codeialDev");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connection to db:"));

db.once("open", function () {
  console.log("connected to the Database");
});

module.exports = db;
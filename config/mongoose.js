const mongoose = require("mongoose");
const env = require('./environment')

mongoose.connect(`mongodb://localhost:27017/${env.db}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connection to db:"));

db.once("open", function () {
  console.log("connected to the Database");
});

module.exports = db;
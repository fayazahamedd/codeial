const express = require("express");
const app = express();
const port = 3000;

//Use Express Router
app.use('/', require('./routes'))



app.listen(port, function (err) {
  if (err) {
    console.log("Some error in app.listen");
    return;
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

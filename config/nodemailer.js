const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require('./environment');

//How communication gonna to happen
let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering mail");
        return;
      }

      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
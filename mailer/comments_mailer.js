const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {

  let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

  // CONSOOLE.LOG(COMMENTY)
  console.log("comment",comment);
  console.log("inside newComment Mailer");

  nodeMailer.transporter.sendMail(
    {
      from: "fayazahamed035@gmail.com",
      to: "fayazahamed035@gmail.com",
      subject: "New Comment Published",
      html: htmlString
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending the mail ", err);
        return;
      }
      console.log("Message sent to ", info);
      return;
    }
  );
};
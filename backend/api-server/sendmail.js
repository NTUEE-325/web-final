import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hackhaha0808@gmail.com",
    pass: "ck1060941NTU11",
  },
});

const mailOptions = {
  from: "hackhaha0808@gmail.com",
  to: "b09901031@g.ntu.edu.tw",
  subject: "test",
  text: "Create new account",
  html: '<p>Click <a href="http://localhost:3000/login">here</a> to create your new account</p>',
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

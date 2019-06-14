require('dotenv').config()
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const email = {
  from: process.env.EMAIL,
  to: process.env.RECIPIENT_EMAIL,
  subject: 'So cool it works!',
  html: '<h1>What is up?</h1>'
};

transporter.sendMail(email, (err, info) => {
  if (err) console.log(err)
  else console.log(info);
});
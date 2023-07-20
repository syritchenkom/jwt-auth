const nodemailer = require('nodemailer');

// Function to create a transporter for nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  });
};

// Function to send an activation mail
const sendActivationMail = async (to, link) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Account activation on ' + process.env.API_URL,
    text: '', // You can use text or html, but we'll use html in this example
    html: `
      <div>
        <h1>For activation click the link below</h1>
        <a href="${link}">${link}</a>
      </div>
    `
  });
};

module.exports = {
  sendActivationMail
};
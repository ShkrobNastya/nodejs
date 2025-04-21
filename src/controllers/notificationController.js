const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

exports.sendFeedbackForm = asyncHandler(async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    const error = new Error("All fields are neccesary");
    error.status = 400;
    return next(error);
  }

  const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Feedback form: new message",
    text: message,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  });

  res.status(200).json({ message: "Feedback successfully sent!" });
});

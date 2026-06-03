const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.submit = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });

    const doc = new ContactMessage({ name, email, message });
    await doc.save();

    // Send confirmation to user
    const userMail = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for contacting me',
      text: `Hi ${name},\n\nThanks for your message. I'll get back to you soon.\n\n— Portfolio Site`,
    };

    // Send notification to owner
    const ownerMail = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    transporter.sendMail(userMail).catch(err => console.warn('userMail error', err));
    transporter.sendMail(ownerMail).catch(err => console.warn('ownerMail error', err));

    res.json({ message: 'Message received' });
  } catch (err) { next(err); }
};

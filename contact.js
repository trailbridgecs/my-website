const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Titan Email SMTP settings (GoDaddy "Professional Email", confirmed by
    // the secureserver.titan.email login page).
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TrailBridge Website" <${process.env.SMTP_USER}>`,
      to: "info@trailbridgecs.co.in",
      replyTo: email,
      subject: "New message from the TrailBridge website",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};

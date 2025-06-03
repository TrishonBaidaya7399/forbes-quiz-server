const formData = require("form-data");
const Mailgun = require("mailgun.js");

let mg = null;

// Only initialize Mailgun if credentials are provided and not placeholders
if (
  process.env.MAILGUN_API_KEY &&
  process.env.MAILGUN_DOMAIN &&
  process.env.MAILGUN_API_KEY !== "your_mailgun_api_key_here" &&
  process.env.MAILGUN_DOMAIN !== "your_mailgun_domain_here"
) {
  try {
    const mailgun = new Mailgun(formData);
    mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
      url: "https://api.eu.mailgun.net", // EU endpoint
    });

    console.log(
      "✅ Mailgun initialized with domain:",
      process.env.MAILGUN_DOMAIN
    );
  } catch (error) {
    console.error("❌ Failed to initialize Mailgun:", error.message);
  }
} else {
  console.log("⚠️  Mailgun not configured - email sending will be skipped");
}

module.exports = mg;

const mailgun = require("mailgun-js");

let mg = null;

// Only initialize Mailgun if credentials are provided and not placeholders
if (
  process.env.MAILGUN_API_KEY &&
  process.env.MAILGUN_DOMAIN &&
  process.env.MAILGUN_API_KEY !== "your_mailgun_api_key_here" &&
  process.env.MAILGUN_DOMAIN !== "your_mailgun_domain_here"
) {
  try {
    mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      host: "api.mailgun.net", // Ensure we're using the correct host
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

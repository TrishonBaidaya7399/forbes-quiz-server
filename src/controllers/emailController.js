const mg = require("../config/mailgun");
const { generateEmailTemplate } = require("../utils/emailTemplate");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// Send result email
exports.sendResultEmail = async (req, res) => {
  try {
    const { userData, results, theme = "light" } = req.body;

    if (!userData || !results) {
      return errorResponse(res, "User data and results are required", 400);
    }

    // Check if Mailgun is properly configured
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.log("⚠️  Mailgun not configured - skipping email send");
      return successResponse(res, {
        message: "Survey submitted successfully (email sending disabled)",
        emailSent: false,
      });
    }

    // Check if using placeholder values
    if (
      process.env.MAILGUN_API_KEY === "your_mailgun_api_key_here" ||
      process.env.MAILGUN_DOMAIN === "your_mailgun_domain_here"
    ) {
      console.log("⚠️  Mailgun using placeholder values - skipping email send");
      return successResponse(res, {
        message:
          "Survey submitted successfully (email sending disabled - placeholder credentials)",
        emailSent: false,
      });
    }

    // Check if mg is properly initialized
    if (!mg) {
      console.log("⚠️  Mailgun client not initialized - skipping email send");
      return successResponse(res, {
        message: "Survey submitted successfully (email client not initialized)",
        emailSent: false,
      });
    }

    // Add this before the generateEmailTemplate call (around line 40-45):
    let emailResults;
    if (Array.isArray(results)) {
      // If results is already an array (old format)
      emailResults = results;
    } else if (results && results.categoryResults) {
      // If results is an object with categoryResults (new format)
      emailResults = results.categoryResults;
    } else {
      // Fallback or error handling
      console.error("❌ Invalid results format:", results);
      return errorResponse(res, "Invalid results format", 400);
    }

    const htmlTemplate = generateEmailTemplate(userData, emailResults, theme);
    console.log(results);

    const emailData = {
      from: `Forbes Business Club <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: userData.email,
      subject: `Az Ön adaptív vezető felmérés eredménye`,
      html: htmlTemplate,
    };

    console.log("📧 Attempting to send email to:", userData.email);
    console.log("📧 Using domain:", process.env.MAILGUN_DOMAIN);
    console.log("🔍 Debug Mailgun config:", {
      apiKey: process.env.MAILGUN_API_KEY
        ? process.env.MAILGUN_API_KEY.substring(0, 8) + "..."
        : "NOT SET",
      domain: process.env.MAILGUN_DOMAIN || "NOT SET",
      mgInitialized: !!mg,
    });

    try {
      // Check if using new SDK or old SDK
      if (mg.messages && typeof mg.messages.create === "function") {
        // New SDK approach
        console.log("📧 Using new Mailgun SDK");
        const result = await mg.messages.create(
          process.env.MAILGUN_DOMAIN,
          emailData
        );
        console.log("✅ Email sent successfully (new SDK):", result);

        return successResponse(res, {
          message: "Survey submitted and email sent successfully",
          emailSent: true,
        });
      } else if (mg.messages && typeof mg.messages === "function") {
        // Old SDK approach with Promise wrapper
        console.log("📧 Using old Mailgun SDK");
        const result = await new Promise((resolve, reject) => {
          mg.messages().send(emailData, (error, body) => {
            if (error) {
              console.error("❌ Mailgun send error:", {
                message: error.message,
                statusCode: error.statusCode,
                details: error.details || "No additional details",
              });
              reject(error);
            } else {
              console.log("✅ Email sent successfully (old SDK):", body);
              resolve(body);
            }
          });
        });

        return successResponse(res, {
          message: "Survey submitted and email sent successfully",
          emailSent: true,
        });
      } else {
        throw new Error("Mailgun client not properly configured");
      }
    } catch (emailError) {
      // Log the specific error but don't fail the request
      console.error({ emailError });

      // Check for specific Mailgun errors using both status and statusCode
      const statusCode = emailError.status || emailError.statusCode;
      let errorMessage = "Email sending failed";

      if (statusCode === 401) {
        if (emailError.details === "Forbidden") {
          errorMessage =
            "Mailgun authentication failed - API key invalid or domain not authorized";
        } else {
          errorMessage =
            "Mailgun authentication failed (check API key format - should start with 'key-')";
        }
      } else if (statusCode === 402) {
        errorMessage = "Mailgun payment required (account limits exceeded)";
      } else if (statusCode === 403) {
        errorMessage =
          "Mailgun forbidden (domain not verified or sandbox restrictions)";
      } else if (statusCode === 404) {
        errorMessage = "Mailgun domain not found (check domain configuration)";
      } else if (statusCode === 405) {
        errorMessage =
          "Mailgun API error - Method Not Allowed (check endpoint URL)";
      } else if (
        emailError.message &&
        emailError.message.includes("ENOTFOUND")
      ) {
        errorMessage =
          "Mailgun DNS resolution failed (check internet connection or API endpoint)";
      } else if (emailError.message && emailError.message.includes("timeout")) {
        errorMessage = "Mailgun request timeout (check network connectivity)";
      } else if (emailError.type === "MailgunAPIError") {
        errorMessage = `Mailgun API Error: ${
          emailError.details || emailError.message
        }`;
      }

      console.log(`⚠️  ${errorMessage} - continuing anyway`);

      return successResponse(res, {
        message: "Survey submitted successfully (email sending failed)",
        emailSent: false,
        emailError: errorMessage,
      });
    }
  } catch (error) {
    console.error("❌ Send email controller error:", error);
    console.log({ res, error });
    // Still return success to not break the user flow
    return successResponse(res, {
      message: "Survey submitted successfully (email service unavailable)",
      emailSent: false,
    });
  }
};

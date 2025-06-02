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

    const htmlTemplate = generateEmailTemplate(userData, results, theme);

    const emailData = {
      from: `Forbes Business Club <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: userData.email,
      subject: `Az Ön adaptív vezető felmérés eredménye`,
      html: htmlTemplate,
    };

    console.log("📧 Attempting to send email to:", userData.email);
    console.log("📧 Using domain:", process.env.MAILGUN_DOMAIN);

    try {
      await new Promise((resolve, reject) => {
        mg.messages().send(emailData, (error, body) => {
          if (error) {
            console.error("❌ Mailgun send error:", {
              message: error.message,
              statusCode: error.statusCode,
              details: error.details || "No additional details",
            });
            reject(error);
          } else {
            console.log("✅ Email sent successfully:", body);
            resolve(body);
          }
        });
      });

      return successResponse(res, {
        message: "Survey submitted and email sent successfully",
        emailSent: true,
      });
    } catch (emailError) {
      // Log the specific error but don't fail the request
      console.error("❌ Email sending failed:", {
        error: emailError.message,
        statusCode: emailError.statusCode,
        to: userData.email,
      });

      // Check for specific Mailgun errors
      let errorMessage = "Email sending failed";
      if (emailError.statusCode === 405) {
        errorMessage =
          "Mailgun API error - Method Not Allowed (check domain configuration)";
      } else if (emailError.statusCode === 401) {
        errorMessage = "Mailgun authentication failed (check API key)";
      } else if (emailError.statusCode === 402) {
        errorMessage = "Mailgun payment required (account limits exceeded)";
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

    // Still return success to not break the user flow
    return successResponse(res, {
      message: "Survey submitted successfully (email service unavailable)",
      emailSent: false,
    });
  }
};

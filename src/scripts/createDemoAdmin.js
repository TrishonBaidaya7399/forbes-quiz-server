const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ltpfdm.mongodb.net/forbes-survey?retryWrites=true&w=majority`;

async function createDemoAdmin() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    console.log(`Using database: forbes-survey`);
    console.log(
      `Connection string: ${MONGODB_URI.replace(
        /\/\/([^:]+):([^@]+)@/,
        "//***:***@"
      )}`
    );

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log("✅ Connected to MongoDB successfully");

    // Define Admin schema directly in this script
    const adminSchema = new mongoose.Schema(
      {
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        password: {
          type: String,
          required: true,
          minlength: 6,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        role: {
          type: String,
          default: "admin",
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        lastLogin: {
          type: Date,
        },
      },
      {
        timestamps: true,
      }
    );

    // Create Admin model
    const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

    // Check current admin count
    const adminCount = await Admin.countDocuments();
    console.log(`📊 Current admin count: ${adminCount}`);

    // Check if demo admin already exists
    const existingAdmin = await Admin.findOne({
      email: "shukantobaidya2018@gmail.com",
    });
    if (existingAdmin) {
      console.log("⚠️  Demo admin already exists:");
      console.log(`   📧 Email: ${existingAdmin.email}`);
      console.log(`   👤 Name: ${existingAdmin.name}`);
      console.log(`   🔑 Password: T.b.s.@7399 (use this to login)`);
      console.log(`   ✅ Active: ${existingAdmin.isActive}`);
      return;
    }

    console.log("🔐 Creating demo admin...");

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("T.b.s.@7399", salt);

    // Create demo admin
    const demoAdmin = new Admin({
      email: "shukantobaidya2018@gmail.com",
      password: hashedPassword,
      name: "Demo Admin",
      role: "admin",
      isActive: true,
    });

    const savedAdmin = await demoAdmin.save();
    console.log("✅ Demo admin created successfully!");
    console.log(`   📧 Email: ${savedAdmin.email}`);
    console.log(`   👤 Name: ${savedAdmin.name}`);
    console.log(`   🔑 Password: T.b.s.@7399`);
    console.log(`   🆔 ID: ${savedAdmin._id}`);
    console.log(`   ✅ Active: ${savedAdmin.isActive}`);

    // Verify the admin was created
    const verifyAdmin = await Admin.findOne({
      email: "shukantobaidya2018@gmail.com",
    });
    if (verifyAdmin) {
      console.log("✅ Verification successful - admin exists in database");
    } else {
      console.log("❌ Verification failed - admin not found in database");
    }

    // Show final admin count
    const finalAdminCount = await Admin.countDocuments();
    console.log(`📊 Final admin count: ${finalAdminCount}`);
  } catch (error) {
    console.error("❌ Error creating demo admin:", error);
    if (error.code === 11000) {
      console.log("💡 This error usually means the admin already exists");
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run the function
createDemoAdmin();

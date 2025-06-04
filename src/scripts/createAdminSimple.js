const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ltpfdm.mongodb.net/forbes-survey?retryWrites=true&w=majority`;

async function createSimpleAdmin() {
  try {
    console.log("🔗 Connecting to MongoDB...");

    const connection = await mongoose.createConnection(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log("✅ Connected to MongoDB successfully");

    // Define Admin schema (no password hashing)
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

    const Admin = connection.model("Admin", adminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: "shukantobaidya2018@gmail.com",
    });

    if (existingAdmin) {
      console.log("⚠️  Demo admin already exists:");
      console.log(`   📧 Email: ${existingAdmin.email}`);
      console.log(`   👤 Name: ${existingAdmin.name}`);
      console.log(`   🔑 Password: ${existingAdmin.password}`);
      console.log(`   ✅ Active: ${existingAdmin.isActive}`);
      await connection.close();
      return;
    }

    console.log("🔐 Creating demo admin with plain text password...");

    // Create demo admin with plain text password
    const demoAdmin = new Admin({
      email: "shukantobaidya2018@gmail.com",
      password: "T.b.s.@7399", // Plain text password
      name: "Forbes",
      role: "admin",
      isActive: true,
    });

    const savedAdmin = await demoAdmin.save();
    console.log("✅ Demo admin created successfully!");
    console.log(`   📧 Email: ${savedAdmin.email}`);
    console.log(`   👤 Name: ${savedAdmin.name}`);
    console.log(`   🔑 Password: ${savedAdmin.password}`);
    console.log(`   🆔 ID: ${savedAdmin._id}`);
    console.log(`   ✅ Active: ${savedAdmin.isActive}`);

    await connection.close();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error creating demo admin:", error);
  }
}

createSimpleAdmin();

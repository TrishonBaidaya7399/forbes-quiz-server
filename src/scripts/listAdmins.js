const mongoose = require("mongoose")
require("dotenv").config()

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ltpfdm.mongodb.net/forbes-survey?retryWrites=true&w=majority`

async function listAdmins() {
  try {
    console.log("🔗 Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    })

    console.log("✅ Connected to MongoDB")

    // Define Admin schema
    const adminSchema = new mongoose.Schema(
      {
        email: String,
        password: String,
        name: String,
        role: String,
        isActive: Boolean,
        lastLogin: Date,
      },
      {
        timestamps: true,
      },
    )

    const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema)

    // Get all admins
    const admins = await Admin.find({}).select("-password")

    console.log(`\n📊 Found ${admins.length} admin(s):`)

    if (admins.length === 0) {
      console.log("❌ No admins found in database")
      console.log("💡 Run 'npm run create-admin' to create the demo admin")
    } else {
      admins.forEach((admin, index) => {
        console.log(`\n${index + 1}. Admin Details:`)
        console.log(`   📧 Email: ${admin.email}`)
        console.log(`   👤 Name: ${admin.name}`)
        console.log(`   🔑 Role: ${admin.role}`)
        console.log(`   ✅ Active: ${admin.isActive}`)
        console.log(`   🆔 ID: ${admin._id}`)
        console.log(`   📅 Created: ${admin.createdAt}`)
        console.log(`   🕐 Last Login: ${admin.lastLogin || "Never"}`)
      })
    }
  } catch (error) {
    console.error("❌ Error listing admins:", error)
  } finally {
    await mongoose.disconnect()
    console.log("\n🔌 Disconnected from MongoDB")
  }
}

listAdmins()

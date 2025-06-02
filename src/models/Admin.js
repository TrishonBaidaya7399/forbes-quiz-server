const mongoose = require("mongoose");

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

// Remove password hashing - store plain text for development
// NO pre-save middleware for hashing

// Simple password comparison method - direct string comparison
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return this.password === candidatePassword;
};

// Remove password from JSON output
adminSchema.methods.toJSON = function () {
  const admin = this.toObject();
  delete admin.password;
  return admin;
};

// Use existing model if it exists, otherwise create a new one
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

module.exports = Admin;

// Simple logger utility
const log = {
  info: (message, data = "") => {
    console.log(`ℹ️  ${message}`, data);
  },

  success: (message, data = "") => {
    console.log(`✅ ${message}`, data);
  },

  warning: (message, data = "") => {
    console.log(`⚠️  ${message}`, data);
  },

  error: (message, data = "") => {
    console.error(`❌ ${message}`, data);
  },

  email: (message, data = "") => {
    console.log(`📧 ${message}`, data);
  },
};

module.exports = log;

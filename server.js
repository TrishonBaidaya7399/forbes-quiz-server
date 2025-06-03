const app = require("./src/app");
const { connectToDatabase } = require("./src/config/database");
const log = require("./src/utils/logger");

require("dotenv").config();

const PORT = process.env.PORT || 5000;



// Start server
app.listen(PORT, () => {
  log.success(`Server running on port ${PORT}`);
  log.info(`API available at http://localhost:${PORT}/api`);
  log.info(`Health check: http://localhost:${PORT}/api/health`);
});



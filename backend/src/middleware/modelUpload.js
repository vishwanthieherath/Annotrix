const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store in memory for R2 upload

module.exports = upload;

const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    user: req.user?.id || "Guest",
  });

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

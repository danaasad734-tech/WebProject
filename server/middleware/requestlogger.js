const requestLogger = (req, res, next) => {

  const now = new Date();
  const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${time}] ${method} request to: ${url}`);

  next();
};

module.exports = requestLogger;
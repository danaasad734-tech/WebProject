const requestLogger = (req, res, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  const method = req.method;
  const url = req.originalUrl;
  
  const user = req.session && req.session.userId ? `User:${req.session.userId}` : "Guest";

  console.log(`[${time}] ${method} request to: ${url} | By: ${user}`);

  next();
};

module.exports = requestLogger;
const fs = require('fs');
const path = require('path');
const { getIPv4Address } = require('./getIpAddress');

const logDir = path.join(__dirname, '../logs'); // Directory path: root/logs

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const requestLogger = (req, res, next) => {
  const currentTime = new Date().toISOString();

  const ip = getIPv4Address(req.ip);
  const url = req.originalUrl;
  const method = req.method;
  const rateLimitStatus = req.rateLimitStatus || 'Unknown';

  const logMessage = `[${currentTime}] ${method} ${url} - IP: ${ip} - Rate Limit Status: ${rateLimitStatus}\n`;

  // Log to console
  console.log(logMessage);

  // Log to file
  const logFilePath = path.join(logDir, 'access.log'); // Path to log file: root/logs/access.log
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });

  next();
};

module.exports = requestLogger;

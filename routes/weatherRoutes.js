const express = require('express');
const {
  getWeatherData,
  ping,
  getWeatherDataSimple,
} = require('../controllers/weatherController');
const { rateLimiter } = require('../utils/rateLimiter');
const requestLogger = require('../utils/requestLogger');
const router = express.Router();

router.get('/ping-unlimited', ping);
router.get('/ping-rate-limited', rateLimiter, requestLogger, ping);
router.get('/proxy-unlimited', getWeatherDataSimple);
router.get('/proxy-rate-limited', rateLimiter, requestLogger, getWeatherData);

module.exports = router;

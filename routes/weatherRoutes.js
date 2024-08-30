const express = require('express');
const { getWeatherData, ping } = require('../controllers/weatherController');
const router = express.Router();

router.get('/ping-unlimited', ping);
router.get('/proxy-unlimited', getWeatherData);

module.exports = router;

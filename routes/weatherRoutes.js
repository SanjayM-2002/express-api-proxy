const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');
const router = express.Router();

router.get('/proxy-unlimited', getWeatherData);

module.exports = router;

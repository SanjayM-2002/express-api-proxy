const axios = require('axios');
const redisClient = require('../utils/redis');

const ping = async (req, res) => {
  //   console.log('url is: ', req.originalUrl);
  res.status(200).json({ success: 'true', message: 'pong' });
};

const getWeatherDataSimple = async (req, res) => {
  const API_URL = process.env.API_URL;

  //   console.log('api url is: ', API_URL);
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: 'Latitude and longitude are required' });
  }

  try {
    const apiUrl = `${API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    const response = await axios.get(apiUrl);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching data from the API' });
  }
};

const getWeatherData = async (req, res) => {
  const API_URL = process.env.API_URL;
  const CACHE_DURATION = parseInt(process.env.CACHE_DURATION, 10) || 300000;
  //   console.log('api url is: ', API_URL);
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: 'Latitude and longitude are required' });
  }

  const cacheKey = `weather:${latitude}:${longitude}`;
  console.log('cache key is: ', cacheKey);

  try {
    const cachedData = await redisClient.hget(cacheKey, 'weatherdata');

    if (cachedData) {
      console.log('Serving from cache');
      return res.status(200).json(JSON.parse(cachedData));
    }
    const apiUrl = `${API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

    const response = await axios.get(apiUrl);
    await redisClient.hset(
      cacheKey,
      'weatherdata',
      JSON.stringify(response.data)
    );
    await redisClient.expire(cacheKey, CACHE_DURATION / 1000);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching data from the API' });
  }
};

module.exports = {
  getWeatherData,
  ping,
  getWeatherDataSimple,
};

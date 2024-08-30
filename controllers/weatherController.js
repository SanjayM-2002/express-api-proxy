const axios = require('axios');

const getWeatherData = async (req, res) => {
  const API_URL = process.env.API_URL;
  console.log('api url is: ', API_URL);
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: 'Latitude and longitude are required' });
  }

  try {
    const apiUrl = `${API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

    const response = await axios.get(apiUrl);

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
};

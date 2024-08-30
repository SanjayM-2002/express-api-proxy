const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  console.log('hello');
  res.status(200).json({ message: 'Health check success' });
});

app.get('/proxy', async (req, res) => {
  const { latitude, longitude } = req.body;
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
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}/`);
});

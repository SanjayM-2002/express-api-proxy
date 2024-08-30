const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const weatherRoutes = require('./routes/weatherRoutes');
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  console.log('hello');
  res.status(200).json({ message: 'Health check success' });
});

app.use('/api/v1', weatherRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}/`);
});

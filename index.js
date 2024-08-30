const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  console.log('hello');
  res.status(200).json({ message: 'Health check success' });
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}/`);
});

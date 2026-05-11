const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/weather', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Weather API key is missing on server' });
  }

  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: apiKey,
        q: q
      }
    });
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Failed to fetch weather data';
    res.status(status).json({ error: message });
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Weather proxy listening on port ${PORT}`);
});

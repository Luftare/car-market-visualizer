const express = require('express');
const path = require('path');
const app = express();
const PORT = 8888;
const { getCars } = require('./cars');

app.use('/', express.static(path.join(__dirname, '/client')));

app.get('/cars', async (req, res) => {
  try {
    const cars = await getCars(req.query.url);
    res.json(cars);
  } catch (e) {
    res.send('nope...');
  }
});

app.listen(PORT);
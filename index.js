const express = require('express');
const path = require('path');
const app = express();
const request = require("request");
const cheerio = require("cheerio");
const PORT = 8888;

const getCars = (url, cb) => {
  request.get(url, (err, res, data) => {
    const $ = cheerio.load(data);

    let results = []

    $('a.childVifUrl').each((i, el) => {
      const make = $(el).attr('data-make');
      const model = $(el).attr('data-model');
      const price = $(el).attr('data-price');
      const year = $(el).attr('data-year');
      const mileage = $(el).attr('data-mileage');
      const url = $(el).attr('href');
      const id = $(el).attr('data-id');
      let images = [];

      $(`a[href='${url}']`).each((i, el) => {
        const image = $(el).attr('alt');

        if (image) {
          images.push(image);
        }
      });

      results.push({
        make, model, year, price, mileage, url, id, images
      });
    });

    cb(results);
  });
}

app.use('/', express.static(path.join(__dirname, '/client')));
app.get('/cars', (req, res) => {
  try {
    getCars(req.query.url, (data) => {
      res.json(data);
    });
  } catch (e) {
    res.send('nope...');
  }
});

app.listen(PORT);
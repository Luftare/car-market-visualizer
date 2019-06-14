const request = require("request");
const cheerio = require("cheerio");

const getCars = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, data) => {
      const $ = cheerio.load(data);

      let cars = []

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

        cars.push({
          make, model, year, price, mileage, url, id, images
        });
      });

      resolve(cars);
    });
  });
}

module.exports = {
  getCars
}
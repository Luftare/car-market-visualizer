require('dotenv').config()
const fs = require('fs');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});
const { getCars } = require('./cars');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const carsToMessage = cars => {
  return `${cars.map(car => (
    `<h4>${car.make} ${car.model}, ${car.year}</h4>
        <div>${car.mileage} km</div>
        <div>${car.price} €</div>
        ${car.images.filter((_, i) => i < 6).map(src => (
      `<img src="${src}"/>`
    ))}<a href="${car.url}">Näytä</a><hr/>`
  ))}`;
};

const runUpdate = async () => {
  const urls = fs.readFileSync('./searchUrls.txt', 'utf8').split('\n');
  const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

  let cars = [];

  await asyncForEach(urls, async url => {
    const carsPart = await getCars(url);
    cars = [...cars, ...carsPart];
  });

  const newCars = cars.filter(car => !db.carIds.some(id => id === car.id));

  if (newCars.length === 0) {
    console.log('No new cars...');
    return;
  }

  db.carIds = [...db.carIds, ...newCars.map(car => car.id)];

  const message = carsToMessage(newCars);

  const email = {
    from: process.env.EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Autopäivitys (${newCars.length} kpl)`,
    html: message
  };

  transporter.sendMail(email, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      fs.writeFileSync('db.json', JSON.stringify(db), 'utf8');
      console.log(`Sent ${newCars.length} new cars.`)
    }
  });
};

runUpdate();

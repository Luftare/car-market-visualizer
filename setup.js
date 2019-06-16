const fs = require('fs');

const SEARCH_URLS_FILENAME = 'searchUrls.txt';
const DB_FILENAME = 'db.json';
const DOT_ENV_FILENAME = '.env';
const LOG_FILENAME = 'log.txt';

const dbExists = fs.existsSync(`./${DB_FILENAME}`);
const searcUrlsExists = fs.existsSync(`./${SEARCH_URLS_FILENAME}`);
const dotEnvExists = fs.existsSync(`./${DOT_ENV_FILENAME}`);
const logExists = fs.existsSync(`./${LOG_FILENAME}`);

if (!dbExists) {
  const db = { carIds: [] };
  fs.writeFileSync(DB_FILENAME, JSON.stringify(db), 'utf8');
}

if (!searcUrlsExists) {
  fs.writeFileSync(SEARCH_URLS_FILENAME, '', 'utf8');
}

if (!dotEnvExists) {
  const dotEnvTemplate = `EMAIL=
EMAIL_PASSWORD=
RECIPIENT_EMAIL=`;
  fs.writeFileSync(DOT_ENV_FILENAME, dotEnvTemplate, 'utf8');
}

if (!logExists) {
  fs.writeFileSync(LOG_FILENAME, '', 'utf8');
}
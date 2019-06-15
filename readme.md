# Car market visualizer

## Installation

`npm install`

## How to use

1. `node .`
2. Open browser at localhost:8888
3. Search for cars at online car market
4. Paste url to the input field

## Email

Add .env file to root of repo with contents of:
`
EMAIL=
EMAIL_PASSWORD=
RECIPIENT_EMAIL=
`

Add `searchUrls.txt` to root with search urls on their own lines

run:
`
node sendUpdate.js
`
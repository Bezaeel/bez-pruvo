# Currency Converter Service

Bez-Pruvo is a currency converter service that converts an amount from 1 currency to another 

### Features
1. POST endpoint `/convert` for accepting currency conversion request with body like below

```

{
    "currFrom": "USD",
    "currTo": "NGN",
    "amount": 100.60
}

```

## Technology used
[Node js](https://nodejs.org/en/)
[Express](https://expressjs.com/)

## Installation
Requires [Node js](https://nodejs.org/en/), Version 14 or higher

Requires Docker (Optional if you have URL to Queue)

### Without Docker

Start the App by running:

`npm install`

`npm start`


### With Docker

`nano .env (set all env as describle in env.example)`

`docker compose up`

### TODO
- [ ] Testing
- [x] Docker Support
- [ ] CI (github workflow)
- [ ] ReadME
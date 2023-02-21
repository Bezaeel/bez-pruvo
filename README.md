# Currency Converter Service

Bez-Pruvo is a currency converter service that converts an amount from 1 currency to another 

# Assumptions
- rate change is very spontenous (treated like stock prices), therefore
- no need for permanent storage
- only send mail when you have results from third-party API
- - 

# Implementation
The approach to solving this task is to use 2 queues.

- `FETCH_CONVERT = 'bez-pruvo.fetch_convert'` queue requests for conversion
- `SEND_EMAIL = 'bez-pruvo.send_email'` queue results for email sending to user

```
request from endpoint => |
                         |queue(FETCH_CONVERT) => |
                         |                        |fetch response from API => |
                         |                        |                           |publish result to SEND_EMAIL => |
                         |                        |                           |                                |send email
```
I took this approach to using the queue based on some elements in the requirement
- cost: this approach is guaranteed to save cost as messages in queue are short lived, <br/>
  and taking a look at [pricing from AWS for SQS](https://aws.amazon.com/sqs/pricing/) <br/>

- maintenance: I employed some notable design patterns and principles in structuring this code such as <br/>
 `dependency injection`, `outbox pattern` etc this is so to reduce number of files affected by <br/>
 code changes, also, easier to extend the implementation.


# Further Improvement
- cost: deploy as a serverless function, taking full advantage of the `pay-as-you-use` pricing model

- worker tasks/jobs: in the current implementation the api and consumers are shipped together, in the future,<br/> 
  the consumers can be separated as jobs and can be scaled to based on the number of messages in the queue

- Adapter pattern: at the moment, the third-party provider would be difficult to swap out in case of a change, <br/> 
  using this pattern, I can cater for multiple `currency converter` providers and can inject them as they fit.


## Features
1. POST `/convert` for accepting currency conversion request with body like below

```

{
    "currFrom": "USD",
    "currTo": "NGN",
    "amount": 100.60
}

```

## Technology used
- [Node js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Installation
Requires [Node js](https://nodejs.org/en/), Version 14 or higher

Requires Docker (Optional if you have URL to Queue)

## Without Docker
make a copy of the `.env.sample` file, rename to `.env` and fill appropriately

Start the App by running:

`npm install`

### Testing
`npm run build && npm run test`

### Development mode
`npm run build && npm run start:dev`

### Production mode
`npm run build && npm run start:prod`

## With Docker

*the networking system within docker can be tricky*

for example

RABBITMQ_URL: `amqp://guest:guest@localhost:5672` 
`localhost` would be replaced with the `<service name>` from `docker-compose` file <br/>

thus becoming: `amqp://guest:guest@rabbitmq:5672`

`nano .env (set all env as describle in env.example)`

`docker compose up`


## Challenges
- N/A
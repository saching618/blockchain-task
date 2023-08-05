# blockchain-task
This is a simple demo of blockchain transaction API, which have three endpoints to make a transaction from sender to receiver, fetch user balance and all the transaction of a user

This project is using Node.JS, express server and TypeScript.


## Requirements
NodeJS v16.x 

## Setup Guide
Clone this project

Run - npm install

Run - npm run dev

API ENDPOINT http://localhost:8000 


## Guide to test using postman collection

  import given file in repo in postman to test endpoints.
  
  ### filename: blockchain-task.postman_collection.json

API ENDPOINT http://localhost:8000


## How to keep it running forever

Install pm2 with 

npm install -g pm2

Run - pm2 start dist/index.js

Run - pm2 list to check the status of the blockchain-task

Run - pm2 logs to check blockchain-task logs


## Config variables explanation
filename '/.env'

## Required params
PORT= # port number of server

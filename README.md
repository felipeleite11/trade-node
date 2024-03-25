# Trader Node 📈

This project implements message queues (RabbitMQ) for send the Bitcoin exchange rate to a web client via web socket.

## Prerequisites

- Instance of MongoDB
- Instance of RabbitMQ

## Libs 📚

- AMQP Lib
- Mongoose
- Socket IO
- Express
- React
- Axios
- Apex Charts

## Project structure 🎉

├── candle-generator<br/>
├── api<br/>
└── web

## Architecture 🔶

This application has 3 parts:

The first is the **candle-generator**. This gets the Bitcoin exchange rate from the Coingecko API and enqueue on RabbitMQ.

The second one is the **main API**. This consumes the queue from RabbitMQ and send candle data to the web client.

The last part is the **web client**. This receive candle data to plot a candle chart.

## How to try 🔥

- Open **3 terminals**;
- Enter the **/candle-generator** folder and execute **yarn dev**;
- Enter the **/api** folder and execute **yarn dev**;
- Enter the **/web** folder, execute **yarn dev** and open **http://localhost:5173** on your browser.

Alternatively, use a process manager as **[PM2](https://pm2.keymetrics.io/)** to run all parts simultaneously.

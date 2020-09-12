const express = require('express');
const app = express.Router();
const transactionService = require('../services/transactionService.js');


app.get("/findPerMonth", transactionService.findPerMonth);
app.get("/findOne", transactionService.findOne);
app.post("/", transactionService.create);
app.put("/", transactionService.put);
app.delete("/", transactionService.delete);

module.exports = app;


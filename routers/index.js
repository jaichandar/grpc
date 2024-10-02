const express = require('express')
const api = express.Router();
const productRouter = require('./product');

api.use('/product', productRouter);

module.exports = api;
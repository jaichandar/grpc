const express = require('express')
const productRoute = express.Router();
const controller = require('../controllers/product');

productRoute.get('/getall', controller.getAllProducts);

module.exports = productRoute;
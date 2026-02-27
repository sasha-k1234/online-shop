const express = require('express');
const authenticateToken = require('../middleware/middleware');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.post('/create',authenticateToken,orderController.createOrder);
orderRouter.get('/allOrders',authenticateToken,orderController.getOrders);
orderRouter.get('/statuses',authenticateToken,orderController.getStatuses);

module.exports = orderRouter;
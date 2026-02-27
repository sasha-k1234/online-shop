const express = require('express');
const authenticateToken = require('../middleware/middleware');
const cartController = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.get('/',authenticateToken,cartController.getCart);
cartRouter.post('/',authenticateToken,cartController.addToCart);
cartRouter.delete('/:id',authenticateToken,cartController.delCart);
cartRouter.put('/inc/:id',authenticateToken,cartController.incCart);
cartRouter.put('/dec/:id',authenticateToken,cartController.decCart);


module.exports = cartRouter;

const express = require('express');
const authenticateToken = require('../middleware/middleware');
const productController = require('../controllers/productController');
const wrap = require('../utils/errorHandler');
const productRouter = express.Router();


productRouter.get('/allProducts',authenticateToken,wrap(productController.allProducts));
productRouter.post('/addProducts',authenticateToken,productController.addProduct);
productRouter.delete('/:id',authenticateToken,productController.deleteProduct);
productRouter.get('/allProducts/:id',authenticateToken,productController.getById);
productRouter.put('/editProduct/:id',authenticateToken,productController.editProduct);
productRouter.put('/addPhoto/:id',authenticateToken,productController.addProductPhoto);
productRouter.post('/setFavorite/:id',authenticateToken,productController.setFavorite);
productRouter.post('/undoFavorite/:id',authenticateToken,productController.undoFavorite);
productRouter.get('/favorites',authenticateToken,productController.getFavorites);
productRouter.get('/maxPrice',wrap(productController.getMaxPrice));

module.exports = productRouter;
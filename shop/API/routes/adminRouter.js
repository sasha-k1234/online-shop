const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();
const authenticateToken = require('../middleware/middleware');
const wrap = require('../utils/errorHandler');

adminRouter.get('/users',authenticateToken,adminController.getUsers);
adminRouter.get('/products',authenticateToken,adminController.allProducts);
adminRouter.put('/activate/:id',authenticateToken,adminController.activateProduct);
adminRouter.get('/notifications',authenticateToken,adminController.getAllNotifications);
adminRouter.post('/available/:id',authenticateToken,adminController.makeAvailable);
adminRouter.put('/updatePhotos',authenticateToken,adminController.updatePhotos);
adminRouter.get('/orders',authenticateToken,adminController.getOrders);
adminRouter.put('/order/:id/changeStatus/:status',authenticateToken,wrap(adminController.changeStatus));

module.exports = adminRouter;
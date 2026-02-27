const express = require('express');
const authenticateToken = require('../middleware/middleware');
const categoryController = require('../controllers/categoryController');
const categoryRouter = express.Router();

categoryRouter.get('/allCategories',authenticateToken,categoryController.allCategories);
categoryRouter.post('/createCategory',authenticateToken,categoryController.addCategory);

module.exports = categoryRouter;
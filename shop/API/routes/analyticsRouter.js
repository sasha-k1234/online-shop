const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const authenticateToken = require('../middleware/middleware');
const analyticsRouter = express.Router();

analyticsRouter.get('/count-by-category',authenticateToken,analyticsController.countByCategory);
analyticsRouter.get('/most-viewed',authenticateToken,analyticsController.getMostViewed);

module.exports = analyticsRouter;
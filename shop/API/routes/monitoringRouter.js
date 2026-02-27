const express = require('express');
const authenticateToken = require('../middleware/middleware');
const monitoringController = require('../controllers/monitoringController');
const monitoringRouter = express.Router();

monitoringRouter.get('/health',monitoringController.health);


module.exports = monitoringRouter;
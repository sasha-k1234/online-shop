const express = require('express');
const authenticateToken = require('../middleware/middleware');
const notifyController = require('../controllers/notificationController');
const notifyRouter = express.Router();

notifyRouter.post('/',authenticateToken,notifyController.createNotification);
notifyRouter.get('/:id',authenticateToken,notifyController.getNotificationById);
notifyRouter.get('/',authenticateToken,notifyController.getUserNotifications);
notifyRouter.put('/readed/:id',authenticateToken,notifyController.makeReaded);


module.exports = notifyRouter;
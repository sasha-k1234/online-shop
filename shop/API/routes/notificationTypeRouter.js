const express = require('express');
const authenticateToken = require('../middleware/middleware');
const notifyTypeController = require('../controllers/notificationTypeController');
const typeRouter = express.Router();

typeRouter.get('/',notifyTypeController.getTypes);
typeRouter.post('/',authenticateToken,notifyTypeController.createType);
typeRouter.put('/:id',authenticateToken,notifyTypeController.editNotificationType);
typeRouter.delete('/:id',authenticateToken,notifyTypeController.deleteType);
typeRouter.get('/:id',notifyTypeController.getNotificationTypeById);

module.exports = typeRouter;
const express = require('express');
const authenticateToken = require('../middleware/middleware');
const fileController = require('../controllers/fileTestControler');
const fileRouter = express.Router();

fileRouter.get('/',fileController.getFile);
fileRouter.post('/',fileController.loadFile);

module.exports = fileRouter;
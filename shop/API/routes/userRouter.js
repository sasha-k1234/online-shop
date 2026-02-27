const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const authenticateToken = require('../middleware/middleware');

 userRouter.get('/:username',authenticateToken,userController.userPage);
 userRouter.post('/edit',authenticateToken,userController.editUser);
 userRouter.post('/upload',authenticateToken,userController.addProfilePhoto);
 userRouter.put('/changeMainPhoto/:id',authenticateToken,userController.changeIsMain);
 userRouter.delete('/photo/:id',authenticateToken,userController.deletePhoto);

module.exports = userRouter;
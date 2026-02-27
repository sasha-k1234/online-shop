const express = require('express');
const authenticateToken = require('../middleware/middleware');
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router();

reviewRouter.post('/',authenticateToken,reviewController.postReview);
reviewRouter.put('/',authenticateToken,reviewController.editReview);
reviewRouter.delete('/:id',authenticateToken,reviewController.deleteReview);
reviewRouter.get('/:id',reviewController.getReviews);

module.exports = reviewRouter;
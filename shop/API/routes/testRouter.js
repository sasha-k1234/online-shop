const express = require('express');
const testController = require('../controllers/testController');
const wrap = require('../utils/errorHandler');
const router = express.Router();

router.get('/test',wrap(testController.test));

module.exports = router;
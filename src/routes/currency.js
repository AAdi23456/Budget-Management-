const express = require('express');
const { getCurrencyConversion } = require('../controllers/currencyController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.use(authenticate);

router.get('/convert', getCurrencyConversion);

module.exports = router;

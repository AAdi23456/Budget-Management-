const express = require('express');
const { getCurrencyConversion } = require('../controllers/currencyController');
const router = express.Router();


router.get('/convert', getCurrencyConversion);

module.exports = router;

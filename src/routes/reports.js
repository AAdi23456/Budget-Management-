const express = require('express');
const { getMonthlyReport } = require('../controllers/reportController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.use(authenticate);

router.get('/monthly', getMonthlyReport);

module.exports = router;

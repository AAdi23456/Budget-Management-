const express = require('express');
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.use(authenticate);

router.get('/', getTransactions);
router.post('/', addTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;

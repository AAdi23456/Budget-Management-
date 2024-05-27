const express = require('express');
const { getBudgets, addBudget, updateBudget, deleteBudget } = require('../controllers/budgetController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.use(authenticate);

router.get('/', getBudgets);
router.post('/', addBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;

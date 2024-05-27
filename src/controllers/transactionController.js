const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');
const prisma = new PrismaClient();

const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user;
    const transactions = await prisma.transaction.findMany({ where: { userId } });
    res.json(transactions);
    logger.info(`Transactions retrieved for user: ${userId}`);
  } catch (error) {
    logger.error(`Error retrieving transactions: ${error.message}`, { error });
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount, type, categoryId, date } = req.body;
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount,
        type,
        categoryId,
        date: new Date(date)
      }
    });
    res.status(201).json(transaction);
    logger.info(`Transaction added for user: ${userId}, Transaction ID: ${transaction.id}`);
  } catch (error) {
    logger.error(`Error adding transaction: ${error.message}`, { error });
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, categoryId, date } = req.body;
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        amount,
        type,
        categoryId,
        date: new Date(date)
      }
    });
    res.json(transaction);
    logger.info(`Transaction updated: Transaction ID: ${id}`);
  } catch (error) {
    logger.error(`Error updating transaction: ${error.message}`, { error });
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.transaction.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
    logger.info(`Transaction deleted: Transaction ID: ${id}`);
  } catch (error) {
    logger.error(`Error deleting transaction: ${error.message}`, { error });
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
};

const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');
const prisma = new PrismaClient();

const getBudgets = async (req, res) => {
  const { userId } = req.user;

  try {
    const budgets = await prisma.budget.findMany({ where: { userId } });
    res.json(budgets);
    logger.info(`Budgets retrieved for user: ${userId}`);
  } catch (error) {
    logger.error(`Error retrieving budgets for user ${userId}: ${error.message}`, { error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const addBudget = async (req, res) => {
  const { userId } = req.user;
  const { amount, categoryId, startDate, endDate } = req.body;

  try {
    const budget = await prisma.budget.create({
      data: {
        userId,
        amount,
        categoryId,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });
    res.status(201).json(budget);
    logger.info(`Budget added for user: ${userId}, Budget ID: ${budget.id}`);
  } catch (error) {
    logger.error(`Error adding budget for user ${userId}: ${error.message}`, { error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, categoryId, startDate, endDate } = req.body;

  try {
    const budget = await prisma.budget.update({
      where: { id: parseInt(id) },
      data: {
        amount,
        categoryId,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });
    res.json(budget);
    logger.info(`Budget updated: Budget ID: ${id}`);
  } catch (error) {
    logger.error(`Error updating budget ID ${id}: ${error.message}`, { error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.budget.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
    logger.info(`Budget deleted: Budget ID: ${id}`);
  } catch (error) {
    logger.error(`Error deleting budget ID ${id}: ${error.message}`, { error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget
};

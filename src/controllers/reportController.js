const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');
const prisma = new PrismaClient();

const getMonthlyReport = async (req, res) => {
  const { userId } = req.user;
  const { month, year } = req.query;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    const income = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);

    res.json({ income, expenses, balance: income - expenses });
    logger.info(`Monthly report generated for user: ${userId}, Month: ${month}, Year: ${year}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate monthly report' });
    logger.error(`Failed to generate monthly report for user ${userId}: ${error.message}`, { error });
  }
};

module.exports = { getMonthlyReport };

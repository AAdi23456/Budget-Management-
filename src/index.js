require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');
const currencyRoutes = require('./routes/currency');
const logger = require('./logger');
const cors =require("cors")

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);
app.use('/reports', reportRoutes);
app.use('/currency', currencyRoutes);

app.get('/', (req, res) => {
  res.send('Personal Finance Management System');
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

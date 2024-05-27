const axios = require('axios');
const logger = require('../logger');

const getCurrencyConversion = async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.query;

  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const rate = response.data.rates[toCurrency];
    const convertedAmount = amount * rate;

    res.json({ convertedAmount });
    logger.info(`Currency conversion succeeded: ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}`);
  } catch (error) {
    res.status(500).json({ error: 'Currency conversion failed' });
    logger.error(`Currency conversion failed: ${error.message}`, { error });
  }
};

module.exports = { getCurrencyConversion };

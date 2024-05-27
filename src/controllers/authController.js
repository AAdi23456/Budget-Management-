const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret';

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    res.status(201).json(user);
    logger.info(`User registered: ${email}`);
  } catch (error) {
    logger.error(`Registration error: ${error.message}`, { error });
    res.status(400).json({ error: 'User already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, SECRET_KEY);
      res.json({ token });
      logger.info(`User logged in: ${email}`);
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
      logger.warn(`Failed login attempt: ${email}`);
    }
  } catch (error) {
    logger.error(`Login error: ${error.message}`, { error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { register, login };

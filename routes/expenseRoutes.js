const express = require('express');
const router = express.Router();
const { Expense } = require('../models/user');
const { validUser } = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shijo7488@gmail.com',
    pass: 'ahpgntqrjykpptbu',
  },
});

router.post('/create', validUser, async (req, res) => {
  const { amount, description, category } = req.body;
  const date = new Date().toISOString();

  try {
    const newExpense = await Expense.create({
      amount,
      description,
      category,
      date,
      UserId: req.user.userID, 
    });

    const mailOptions = {
      from: 'shijo7488@gmail.com',
      to: 'shijo9345@gmail.com',
      subject: 'Expense Created',
      text: `An expense of ${newExpense.amount} ${newExpense.category} was created on ${newExpense.date}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json(newExpense);
  } catch (error) {
    console.error('Error inserting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expense.amount = amount;
    expense.description = description;
    expense.category = category;
    expense.date = new Date().toISOString();

    await expense.save();

    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

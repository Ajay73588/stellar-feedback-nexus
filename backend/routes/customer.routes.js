const express = require('express');
const router = express.Router();
const { Customer, Product, Feedback } = require('../models');

// Register customer
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const customer = await Customer.create({ name, email, password });
    res.status(201).json({ message: 'Customer registered successfully', customer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login customer
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const isValidPassword = await customer.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Login successful', customer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Company, attributes: ['name'] }]
    });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit feedback
router.post('/feedback', async (req, res) => {
  try {
    const { customer_id, product_id, rating, review_text } = req.body;
    const feedback = await Feedback.create({
      customer_id,
      product_id,
      rating,
      review_text
    });
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View own feedbacks
router.get('/my-feedback', async (req, res) => {
  try {
    const { customer_id } = req.query;
    const feedbacks = await Feedback.findAll({
      where: { customer_id },
      include: [
        { model: Product, attributes: ['name', 'description'] }
      ]
    });
    res.json(feedbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
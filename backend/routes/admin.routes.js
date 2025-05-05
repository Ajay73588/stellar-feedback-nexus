const express = require('express');
const router = express.Router();
const { Admin, Customer, Company, Product, Feedback } = require('../models');

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isValidPassword = await admin.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View all customers
router.get('/users', async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Company, attributes: ['name'] }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View all feedbacks
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [
        { model: Customer, attributes: ['name'] },
        { model: Product, attributes: ['name'] }
      ]
    });
    res.json(feedbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review
router.delete('/feedbacks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    await feedback.destroy();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
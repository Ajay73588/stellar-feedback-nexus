const express = require('express');
const router = express.Router();
const { Company, Product, Feedback } = require('../models');

// Register company
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const company = await Company.create({ name, email, password });
    res.status(201).json({ message: 'Company registered successfully', company });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login company
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ where: { email } });
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const isValidPassword = await company.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Login successful', company });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add product
router.post('/products', async (req, res) => {
  try {
    const { name, description, company_id } = req.body;
    const product = await Product.create({ name, description, company_id });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({ name, description });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View feedback for a product
router.get('/feedback/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const feedbacks = await Feedback.findAll({
      where: { product_id: productId },
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

module.exports = router; 
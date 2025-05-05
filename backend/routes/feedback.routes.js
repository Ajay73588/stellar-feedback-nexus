const express = require('express');
const router = express.Router();
const { Feedback, Customer, Product } = require('../models');

// Get all feedback
router.get('/', async (req, res) => {
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

// Get feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id, {
      include: [
        { model: Customer, attributes: ['name'] },
        { model: Product, attributes: ['name'] }
      ]
    });
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const emailController = require('../controllers/emailController');

// Get all portfolio items
router.get('/items', portfolioController.getAllPortfolioItems);

// Get single portfolio item
router.get('/items/:id', portfolioController.getPortfolioItemById);

// Create portfolio item
router.post('/items', portfolioController.createPortfolioItem);

// Update portfolio item
router.put('/items/:id', portfolioController.updatePortfolioItem);

// Delete portfolio item
router.delete('/items/:id', portfolioController.deletePortfolioItem);

// Get all skills
router.get('/skills', portfolioController.getAllSkills);

// Get about me info
router.get('/about', portfolioController.getAboutInfo);

// Contact form - Send email
router.post('/contact', emailController.sendContactMessage);

module.exports = router;

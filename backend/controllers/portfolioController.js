const Portfolio = require('../models/Portfolio');

// Get all portfolio items
exports.getAllPortfolioItems = async (req, res) => {
  try {
    const items = await Portfolio.getAllItems();
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single portfolio item
exports.getPortfolioItemById = async (req, res) => {
  try {
    const item = await Portfolio.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create portfolio item
exports.createPortfolioItem = async (req, res) => {
  try {
    const { title, description, technologies, imageUrl, liveLink, githubLink } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const result = await Portfolio.createItem({
      title,
      description,
      technologies,
      imageUrl,
      liveLink,
      githubLink
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update portfolio item
exports.updatePortfolioItem = async (req, res) => {
  try {
    const { title, description, technologies, imageUrl, liveLink, githubLink } = req.body;
    
    const result = await Portfolio.updateItem(req.params.id, {
      title,
      description,
      technologies,
      imageUrl,
      liveLink,
      githubLink
    });

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete portfolio item
exports.deletePortfolioItem = async (req, res) => {
  try {
    await Portfolio.deleteItem(req.params.id);
    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Portfolio.getAllSkills();
    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get about me info
exports.getAboutInfo = async (req, res) => {
  try {
    const aboutInfo = await Portfolio.getAboutInfo();
    res.json({
      success: true,
      data: aboutInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

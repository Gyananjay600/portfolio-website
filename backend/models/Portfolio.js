const db = require('../database');

class Portfolio {
  // Get all portfolio items
  static async getAllItems() {
    const connection = await db.getConnection();
    try {
      const [items] = await connection.query(
        'SELECT * FROM portfolio_items ORDER BY created_at DESC'
      );
      return items;
    } finally {
      connection.release();
    }
  }

  // Get single portfolio item
  static async getItemById(id) {
    const connection = await db.getConnection();
    try {
      const [items] = await connection.query(
        'SELECT * FROM portfolio_items WHERE id = ?',
        [id]
      );
      return items[0];
    } finally {
      connection.release();
    }
  }

  // Create portfolio item
  static async createItem(data) {
    const connection = await db.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO portfolio_items (title, description, technologies, image_url, live_link, github_link, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [data.title, data.description, data.technologies, data.imageUrl, data.liveLink, data.githubLink]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  // Update portfolio item
  static async updateItem(id, data) {
    const connection = await db.getConnection();
    try {
      await connection.query(
        'UPDATE portfolio_items SET title = ?, description = ?, technologies = ?, image_url = ?, live_link = ?, github_link = ?, updated_at = NOW() WHERE id = ?',
        [data.title, data.description, data.technologies, data.imageUrl, data.liveLink, data.githubLink, id]
      );
      return { id, ...data };
    } finally {
      connection.release();
    }
  }

  // Delete portfolio item
  static async deleteItem(id) {
    const connection = await db.getConnection();
    try {
      await connection.query('DELETE FROM portfolio_items WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }

  // Get all skills
  static async getAllSkills() {
    const connection = await db.getConnection();
    try {
      const [skills] = await connection.query(
        'SELECT * FROM skills ORDER BY proficiency_level DESC'
      );
      return skills;
    } finally {
      connection.release();
    }
  }

  // Get about me info
  static async getAboutInfo() {
    const connection = await db.getConnection();
    try {
      const [aboutInfo] = await connection.query(
        'SELECT * FROM about_me LIMIT 1'
      );
      return aboutInfo[0];
    } finally {
      connection.release();
    }
  }
}

module.exports = Portfolio;

-- ================================
-- Portfolio Database Setup
-- ================================

-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- ================================
-- Portfolio Items Table
-- ================================
CREATE TABLE IF NOT EXISTS portfolio_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    technologies VARCHAR(500),
    image_url VARCHAR(500),
    live_link VARCHAR(500),
    github_link VARCHAR(500),
    category VARCHAR(100) DEFAULT 'fullstack',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ================================
-- Skills Table
-- ================================
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency_level INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- About Me Table
-- ================================
CREATE TABLE IF NOT EXISTS about_me (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bio LONGTEXT NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ================================
-- Insert Sample Data
-- ================================

-- Insert sample portfolio items
INSERT INTO portfolio_items (title, description, technologies, image_url, live_link, github_link, category) VALUES
('E-Commerce Platform', 'A complete e-commerce solution with product catalog, shopping cart, order management, and payment gateway integration. Built with Spring Boot backend and React frontend.', 'Java, Spring Boot, Hibernate, MySQL, React, Redux, Stripe', 'images/project-placeholder.jpg', 'https://example.com/ecommerce', 'https://github.com/username/ecommerce', 'fullstack'),
('Task Management Dashboard', 'Collaborative task management application with real-time updates, notifications, and team collaboration features. Includes user authentication and role-based access control.', 'Node.js, Express, MongoDB, Socket.io, React, Redux', 'images/project-placeholder.jpg', 'https://example.com/taskmanager', 'https://github.com/username/taskmanager', 'fullstack'),
('Weather API Microservice', 'RESTful microservice for weather data aggregation with caching, load balancing, and CI/CD pipeline. Deployed on Docker and Kubernetes.', 'Java, Spring Boot, Docker, Kubernetes, Redis, MySQL', 'images/project-placeholder.jpg', 'https://example.com/weather', 'https://github.com/username/weather-api', 'backend'),
('Interactive Portfolio Website', 'Modern responsive portfolio website showcasing projects, skills, and professional experience. Features smooth animations and mobile-first design.', 'HTML5, CSS3, JavaScript, Responsive Design, API Integration', 'images/project-placeholder.jpg', 'https://example.com/portfolio', 'https://github.com/username/portfolio', 'frontend'),
('User Authentication System', 'Secure user authentication system with JWT tokens, role-based access control, and password encryption using bcrypt.', 'Node.js, Express, JWT, bcrypt, MySQL, Redis', 'images/project-placeholder.jpg', 'https://example.com/auth', 'https://github.com/username/auth-system', 'backend'),
('Data Visualization Dashboard', 'Interactive dashboard for data visualization with charts, graphs, and real-time data updates. Includes data filtering and export functionality.', 'React, D3.js, Chart.js, Redux, Node.js, MySQL', 'images/project-placeholder.jpg', 'https://example.com/dashboard', 'https://github.com/username/dashboard', 'frontend');

-- Insert sample skills
INSERT INTO skills (name, category, proficiency_level) VALUES
('Java', 'Backend Development', 5),
('Spring Boot', 'Backend Development', 5),
('Hibernate ORM', 'Backend Development', 4),
('Node.js', 'Backend Development', 4),
('Express.js', 'Backend Development', 4),
('Microservices', 'Architecture', 4),
('Docker', 'DevOps', 3),
('Kubernetes', 'DevOps', 3),
('HTML5', 'Frontend Development', 5),
('CSS3', 'Frontend Development', 5),
('JavaScript', 'Frontend Development', 4),
('React', 'Frontend Development', 4),
('Redux', 'Frontend Development', 3),
('MySQL', 'Database', 4),
('MongoDB', 'Database', 3),
('Redis', 'Database', 3),
('REST APIs', 'Architecture', 5),
('Git', 'Tools', 4),
('Linux', 'Tools', 3),
('Postman', 'Tools', 4);

-- Insert about me information
INSERT INTO about_me (bio, email, phone, location) VALUES
('I am a passionate software developer with 3+ years of dedicated learning in Java technologies including Core Java, Advanced Java, Spring Framework, Spring Boot, Hibernate, and Microservices architecture. Currently interning at Merstack, I am expanding my expertise to full-stack development using modern technologies like Node.js, Express.js, React, and MySQL. I believe in writing clean, maintainable code and following industry best practices. My goal is to create applications that not only solve problems but also provide excellent user experiences. I am enthusiastic about learning new technologies and contributing to open-source projects.', 'your.email@example.com', '+91 123 456 789', 'India');

-- ================================
-- Create Indexes for Better Performance
-- ================================
CREATE INDEX idx_portfolio_category ON portfolio_items(category);
CREATE INDEX idx_portfolio_created ON portfolio_items(created_at);
CREATE INDEX idx_skills_category ON skills(category);

-- ================================
-- Verify Tables
-- ================================
-- Run these queries to verify the setup:
-- SELECT * FROM portfolio_items;
-- SELECT * FROM skills;
-- SELECT * FROM about_me;

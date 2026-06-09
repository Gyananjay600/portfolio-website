// ================================
// Portfolio Page JavaScript
// ================================

let allProjects = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    loadAllProjects();
    setupFilterButtons();
});

// Load all portfolio projects
async function loadAllProjects() {
    const portfolioContainer = document.getElementById('portfolioContainer');
    
    try {
        const response = await ApiClient.getPortfolioItems();
        
        if (response.success && response.data && response.data.length > 0) {
            allProjects = response.data;
            displayProjects(allProjects);
        } else {
            loadPlaceholderProjects();
        }
    } catch (error) {
        console.error('Error loading portfolio items:', error);
        loadPlaceholderProjects();
    }
}

// Display portfolio projects
function displayProjects(projects) {
    const portfolioContainer = document.getElementById('portfolioContainer');
    
    if (projects.length === 0) {
        portfolioContainer.innerHTML = `
            <div class="empty-state">
                <h3>No projects found</h3>
                <p>Check back soon for more projects!</p>
            </div>
        `;
        return;
    }

    portfolioContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = createPortfolioItem(project);
        portfolioContainer.appendChild(projectElement);
    });
}

// Create portfolio item element
function createPortfolioItem(project) {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.setAttribute('data-category', project.category || 'fullstack');
    
    const technologies = project.technologies ? project.technologies.split(',') : [];
    const techHTML = technologies.map(tech => 
        `<span class="tech-item">${tech.trim()}</span>`
    ).join('');
    
    item.innerHTML = `
        <div class="portfolio-item-image">
            <img src="${project.image_url || 'images/project-placeholder.jpg'}" alt="${project.title}">
        </div>
        <div class="portfolio-item-body">
            <span class="portfolio-item-category">${project.category || 'Full Stack'}</span>
            <h3 class="portfolio-item-title">${project.title}</h3>
            <p class="portfolio-item-description">${project.description}</p>
            <div class="portfolio-item-tech">
                ${techHTML}
            </div>
            <div class="portfolio-item-actions">
                ${project.live_link ? `<a href="${project.live_link}" target="_blank">View Live</a>` : '<a href="#" style="opacity: 0.5; cursor: not-allowed;">View Live</a>'}
                ${project.github_link ? `<a href="${project.github_link}" target="_blank" class="view-code">View Code</a>` : '<a href="#" class="view-code" style="opacity: 0.5; cursor: not-allowed;">View Code</a>'}
            </div>
        </div>
    `;
    
    return item;
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            currentFilter = this.getAttribute('data-filter');
            
            // Filter and display projects
            filterProjects(currentFilter);
        });
    });
}

// Filter projects by category
function filterProjects(category) {
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = allProjects;
    } else {
        filteredProjects = allProjects.filter(project => {
            const projectCategory = (project.category || 'fullstack').toLowerCase();
            return projectCategory === category;
        });
    }
    
    displayProjects(filteredProjects);
}

// Load placeholder projects for demo
function loadPlaceholderProjects() {
    const placeholderProjects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A complete e-commerce solution with product catalog, shopping cart, order management, and payment gateway integration.',
            category: 'fullstack',
            technologies: 'Java, Spring Boot, Hibernate, MySQL, React, Redux, Stripe',
            image_url: 'images/project-placeholder.jpg',
            live_link: '#',
            github_link: '#'
        },
        {
            id: 2,
            title: 'Task Management Dashboard',
            description: 'Collaborative task management application with real-time updates, notifications, and team collaboration features.',
            category: 'fullstack',
            technologies: 'Node.js, Express, MongoDB, Socket.io, React',
            image_url: 'images/project-placeholder.jpg',
            live_link: '#',
            github_link: '#'
        },
        {
            id: 3,
            title: 'Weather API Service',
            description: 'RESTful microservice for weather data aggregation with caching, load balancing, and CI/CD pipeline.',
            category: 'backend',
            technologies: 'Java, Spring Boot, Docker, Kubernetes, Redis',
            image_url: 'images/project-placeholder.jpg',
            live_link: '#',
            github_link: '#'
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description: 'Modern responsive portfolio website showcasing projects, skills, and professional experience.',
            category: 'frontend',
            technologies: 'HTML5, CSS3, JavaScript, Responsive Design',
            image_url: 'images/project-placeholder.jpg',
            live_link: '#',
            github_link: '#'
        },
        {
            id: 5,
            title: 'User Authentication System',
            description: 'Secure user authentication system with JWT tokens, role-based access control, and password encryption.',
            category: 'backend',
            technologies: 'Node.js, Express, JWT, bcrypt, MySQL',
            image_url: 'images/project-placeholder.jpg',
            live_link: '#',
            github_link: '#'
        },
        {
            id: 6,
            title: 'Data Visualization Dashboard',
            description: 'Interactive dashboard for data visualization with charts, graphs, and real-time data updates.',
            category: 'frontend',
            technologies: 'React, D3.js, Chart.js, Redux',
            image_url: 'images/project-placeholder.jpg',
            live_link: '#',
            github_link: '#'
        }
    ];

    allProjects = placeholderProjects;
    displayProjects(allProjects);
}

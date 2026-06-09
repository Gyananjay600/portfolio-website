// ================================
// Homepage JavaScript
// ================================

// Skill icons mapping
const skillIcons = {
    'java': 'fab fa-java',
    'spring boot': 'fab fa-java',
    'javascript': 'fab fa-js-square',
    'react': 'fab fa-react',
    'node.js': 'fab fa-node-js',
    'mysql': 'fas fa-database',
    'html': 'fab fa-html5',
    'css': 'fab fa-css3-alt',
    'mongodb': 'fas fa-leaf',
    'docker': 'fab fa-docker',
    'kubernetes': 'fas fa-cube',
    'express': 'fab fa-node-js',
    'typescript': 'fas fa-code',
    'python': 'fab fa-python',
    'git': 'fab fa-git-alt',
    'microservices': 'fas fa-network-wired',
    'rest': 'fas fa-exchange-alt',
    'redis': 'fas fa-memory',
    'postgresql': 'fas fa-database',
    'aws': 'fab fa-aws'
};

document.addEventListener('DOMContentLoaded', function() {
    loadSkills();
    loadFeaturedProjects();
});

// Get icon for skill
function getSkillIcon(skillName) {
    const lowerName = skillName.toLowerCase();
    return skillIcons[lowerName] || 'fas fa-cog';
}

// Load skills from backend
async function loadSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    
    try {
        const response = await ApiClient.getSkills();
        
        if (response.success && response.data) {
            // Group skills by category
            const skillsByCategory = {};
            
            response.data.forEach(skill => {
                const category = skill.category || 'Other';
                if (!skillsByCategory[category]) {
                    skillsByCategory[category] = [];
                }
                skillsByCategory[category].push(skill);
            });

            // Create skill badges
            skillsContainer.innerHTML = '';
            
            Object.keys(skillsByCategory).forEach(category => {
                const skills = skillsByCategory[category];
                skills.forEach(skill => {
                    const skillBadge = createSkillBadge(skill);
                    skillsContainer.appendChild(skillBadge);
                });
            });
        } else {
            showSkillsPlaceholder(skillsContainer);
        }
    } catch (error) {
        console.error('Error loading skills:', error);
        showSkillsPlaceholder(skillsContainer);
    }
}

// Create skill badge element
function createSkillBadge(skill) {
    const badge = document.createElement('div');
    badge.className = 'skill-badge';
    const icon = getSkillIcon(skill.name);
    
    badge.innerHTML = `
        <i class="${icon} skill-icon"></i>
        <h3>${skill.name || 'Skill'}</h3>
        <p>${skill.category || 'Technology'}</p>
    `;
    return badge;
}

// Show placeholder skills if no data from backend
function showSkillsPlaceholder(container) {
    const placeholderSkills = [
        { name: 'Java', category: 'Backend' },
        { name: 'Spring Boot', category: 'Framework' },
        { name: 'JavaScript', category: 'Frontend' },
        { name: 'React', category: 'Frontend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'MySQL', category: 'Database' },
        { name: 'HTML/CSS', category: 'Frontend' },
        { name: 'Microservices', category: 'Architecture' }
    ];

    container.innerHTML = '';
    placeholderSkills.forEach(skill => {
        const badge = createSkillBadge(skill);
        container.appendChild(badge);
    });
}

// Load featured projects from backend
async function loadFeaturedProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    try {
        const response = await ApiClient.getPortfolioItems();
        
        if (response.success && response.data && response.data.length > 0) {
            // Get only first 3 projects
            const featuredProjects = response.data.slice(0, 3);
            
            projectsContainer.innerHTML = '';
            
            featuredProjects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        } else {
            showProjectsPlaceholder(projectsContainer);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        showProjectsPlaceholder(projectsContainer);
    }
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const technologies = project.technologies ? project.technologies.split(',') : [];
    const techHTML = technologies.map(tech => 
        `<span class="tech-tag">${tech.trim()}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image_url || 'images/project-placeholder.jpg'}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techHTML}
            </div>
            <div class="project-links">
                ${project.live_link ? `<a href="${project.live_link}" target="_blank">View Live</a>` : ''}
                ${project.github_link ? `<a href="${project.github_link}" target="_blank">View Code</a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Show placeholder projects if no data from backend
function showProjectsPlaceholder(container) {
    const placeholderProjects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce application with product catalog, cart, and payment integration.',
            technologies: 'Java, Spring Boot, MySQL, React',
            image_url: 'images/project-placeholder.jpg'
        },
        {
            title: 'Task Management App',
            description: 'Collaborative task management application with real-time updates and notifications.',
            technologies: 'Node.js, Express, MongoDB, Vue.js',
            image_url: 'images/project-placeholder.jpg'
        },
        {
            title: 'Weather Microservice',
            description: 'RESTful microservice for weather data aggregation with caching and load balancing.',
            technologies: 'Java, Microservices, Docker, Kubernetes',
            image_url: 'images/project-placeholder.jpg'
        }
    ];

    container.innerHTML = '';
    placeholderProjects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

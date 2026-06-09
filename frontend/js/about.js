// ================================
// About Page JavaScript
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
    'aws': 'fab fa-aws',
    'hibernate': 'fab fa-java',
    'linux': 'fab fa-linux'
};

// Get icon for skill
function getSkillIcon(skillName) {
    const lowerName = skillName.toLowerCase();
    return skillIcons[lowerName] || 'fas fa-cog';
}

document.addEventListener('DOMContentLoaded', function() {
    loadAboutInfo();
    loadAllSkills();
});

// Load about information
async function loadAboutInfo() {
    const aboutContainer = document.getElementById('aboutContainer');
    
    try {
        const response = await ApiClient.getAboutInfo();
        
        if (response.success && response.data) {
            const about = response.data;
            
            aboutContainer.innerHTML = `
                <p class="about-paragraph">${about.bio || getDefaultBio()}</p>
                <div class="about-highlights">
                    <div class="highlight-item">
                        <div class="highlight-icon">3+</div>
                        <div class="highlight-text">
                            <h4>Years Learning</h4>
                            <p>Dedicated to Java & Web Technologies</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">50+</div>
                        <div class="highlight-text">
                            <h4>Projects</h4>
                            <p>Various scales and complexities</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">🎯</div>
                        <div class="highlight-text">
                            <h4>Focus</h4>
                            <p>Clean Code & Best Practices</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">🚀</div>
                        <div class="highlight-text">
                            <h4>Passion</h4>
                            <p>Building scalable solutions</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            showDefaultAbout(aboutContainer);
        }
    } catch (error) {
        console.error('Error loading about info:', error);
        showDefaultAbout(aboutContainer);
    }
}

// Default about content
function getDefaultBio() {
    return `I'm a passionate software developer with a deep interest in building scalable and efficient web applications. 
    With 3+ years of dedicated learning in Java technologies including Core Java, Advanced Java, Spring Framework, Spring Boot, 
    Hibernate, and Microservices architecture, I've developed a strong foundation in backend development. 
    
    Currently interning at Merstack, I'm expanding my expertise to full-stack development using modern technologies like Node.js, 
    Express.js, React, and MySQL. I believe in writing clean, maintainable code and following industry best practices. 
    My goal is to create applications that not only solve problems but also provide excellent user experiences.`;
}

// Show default about section
function showDefaultAbout(container) {
    const bio = getDefaultBio();
    
    container.innerHTML = `
        <p class="about-paragraph">${bio}</p>
        <div class="about-highlights">
            <div class="highlight-item">
                <div class="highlight-icon">3+</div>
                <div class="highlight-text">
                    <h4>Years Learning</h4>
                    <p>Dedicated to Java & Web Technologies</p>
                </div>
            </div>
            <div class="highlight-item">
                <div class="highlight-icon">50+</div>
                <div class="highlight-text">
                    <h4>Projects</h4>
                    <p>Various scales and complexities</p>
                </div>
            </div>
            <div class="highlight-item">
                <div class="highlight-icon">🎯</div>
                <div class="highlight-text">
                    <h4>Focus</h4>
                    <p>Clean Code & Best Practices</p>
                </div>
            </div>
            <div class="highlight-item">
                <div class="highlight-icon">🚀</div>
                <div class="highlight-text">
                    <h4>Passion</h4>
                    <p>Building scalable solutions</p>
                </div>
            </div>
        </div>
    `;
}

// Load all skills
async function loadAllSkills() {
    const skillsContainer = document.getElementById('allSkillsContainer');
    
    try {
        const response = await ApiClient.getSkills();
        
        if (response.success && response.data && response.data.length > 0) {
            displaySkillsGrouped(response.data, skillsContainer);
        } else {
            loadDefaultSkills(skillsContainer);
        }
    } catch (error) {
        console.error('Error loading skills:', error);
        loadDefaultSkills(skillsContainer);
    }
}

// Display skills grouped by category
function displaySkillsGrouped(skills, container) {
    // Group skills by category
    const skillsByCategory = {};
    
    skills.forEach(skill => {
        const category = skill.category || 'Other';
        if (!skillsByCategory[category]) {
            skillsByCategory[category] = [];
        }
        skillsByCategory[category].push(skill);
    });

    // Create skill groups
    container.innerHTML = '';
    
    Object.keys(skillsByCategory).forEach(category => {
        const categorySkills = skillsByCategory[category];
        const skillGroup = createSkillGroup(category, categorySkills);
        container.appendChild(skillGroup);
    });
}

// Create skill group element
function createSkillGroup(category, skills) {
    const group = document.createElement('div');
    group.className = 'skill-group';
    
    const skillItems = skills.map(skill => {
        const proficiency = skill.proficiency_level || 5;
        const stars = Array(5).fill(0).map((_, i) => {
            const isFilled = i < proficiency;
            return `<div class="skill-star ${!isFilled ? 'empty' : ''}">★</div>`;
        }).join('');
        
        const icon = getSkillIcon(skill.name);
        
        return `
            <div class="skill-item">
                <span class="skill-name">
                    <i class="${icon}" style="margin-right: 8px; color: var(--primary-color);"></i>
                    ${skill.name}
                </span>
                <div class="skill-level">${stars}</div>
            </div>
        `;
    }).join('');
    
    group.innerHTML = `
        <h3 class="skill-group-title">${category}</h3>
        <div class="skill-list">
            ${skillItems}
        </div>
    `;
    
    return group;
}

// Load default skills if no data from backend
function loadDefaultSkills(container) {
    const defaultSkills = {
        'Backend Development': [
            { name: 'Java', proficiency_level: 5 },
            { name: 'Spring Boot', proficiency_level: 5 },
            { name: 'Hibernate', proficiency_level: 4 },
            { name: 'Node.js', proficiency_level: 4 },
            { name: 'Express.js', proficiency_level: 4 }
        ],
        'Frontend Development': [
            { name: 'HTML5', proficiency_level: 5 },
            { name: 'CSS3', proficiency_level: 5 },
            { name: 'JavaScript', proficiency_level: 4 },
            { name: 'React', proficiency_level: 4 }
        ],
        'Databases & ORMs': [
            { name: 'MySQL', proficiency_level: 4 },
            { name: 'Hibernate ORM', proficiency_level: 4 },
            { name: 'SQL Optimization', proficiency_level: 3 }
        ],
        'Architecture & Tools': [
            { name: 'Microservices', proficiency_level: 4 },
            { name: 'REST APIs', proficiency_level: 5 },
            { name: 'Docker', proficiency_level: 3 },
            { name: 'Git', proficiency_level: 4 }
        ]
    };

    container.innerHTML = '';
    
    Object.keys(defaultSkills).forEach(category => {
        const group = createSkillGroup(category, defaultSkills[category]);
        container.appendChild(group);
    });
}

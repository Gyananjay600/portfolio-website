// ================================
// Theme Switcher JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setupThemeButtons();
});

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

// Setup theme toggle buttons
function setupThemeButtons() {
    const lightBtn = document.getElementById('lightMode');
    const darkBtn = document.getElementById('darkMode');
    const brownBtn = document.getElementById('brownMode');
    
    if (lightBtn) {
        lightBtn.addEventListener('click', () => switchTheme('light'));
    }
    if (darkBtn) {
        darkBtn.addEventListener('click', () => switchTheme('dark'));
    }
    if (brownBtn) {
        brownBtn.addEventListener('click', () => switchTheme('brown'));
    }
}

// Switch theme
function switchTheme(theme) {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
}

// Apply theme
function applyTheme(theme) {
    const body = document.body;
    const lightBtn = document.getElementById('lightMode');
    const darkBtn = document.getElementById('darkMode');
    const brownBtn = document.getElementById('brownMode');
    
    // Remove all theme classes
    body.classList.remove('light-mode', 'dark-mode', 'brown-mode');
    
    // Remove active class from all buttons
    if (lightBtn) lightBtn.classList.remove('active');
    if (darkBtn) darkBtn.classList.remove('active');
    if (brownBtn) brownBtn.classList.remove('active');
    
    // Apply selected theme
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (darkBtn) darkBtn.classList.add('active');
    } else if (theme === 'brown') {
        body.classList.add('brown-mode');
        if (brownBtn) brownBtn.classList.add('active');
    } else {
        if (lightBtn) lightBtn.classList.add('active');
    }
}

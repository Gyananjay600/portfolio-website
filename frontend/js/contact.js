// ================================
// Contact Form JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
});

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validation
    if (!validateForm(data)) {
        notifier.error('Please fill all fields correctly');
        return;
    }
    
    try {
        // Disable submit button
        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        
        // Send to backend
        const response = await ApiClient.post('/portfolio/contact', data);
        
        if (response.success) {
            notifier.success(response.message || 'Message sent successfully! I will get back to you soon.');
            
            // Reset form
            e.target.reset();
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        } else {
            notifier.error(response.message || 'Error sending message. Please try again later.');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        notifier.error('Error sending message. Please try again later or contact directly via email/phone.');
        
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Validate form data
function validateForm(data) {
    const { name, email, subject, message } = data;
    
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Check minimum length
    if (name.length < 2 || subject.length < 3 || message.length < 10) {
        return false;
    }
    
    return true;
}

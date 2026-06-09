// ================================
// Notification/Toast System
// ================================

class Notifier {
    constructor() {
        this.toastContainer = null;
        this.initContainer();
    }

    initContainer() {
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.className = 'toast-container';
            document.body.appendChild(this.toastContainer);
        }
    }

    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close notification">×</button>
        `;

        this.toastContainer.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        if (duration > 0) {
            setTimeout(() => this.removeToast(toast), duration);
        }

        return toast;
    }

    removeToast(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }

    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }

    loading(message) {
        return this.show(message, 'info', 0);
    }
}

// Create global notifier instance
const notifier = new Notifier();

// ================================
// Modal/Dialog System
// ================================

class Modal {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.modalElement = null;
        this.createModal();
    }

    createModal() {
        this.modalElement = document.createElement('div');
        this.modalElement.id = this.id;
        this.modalElement.className = 'modal';
        this.modalElement.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.title}</h2>
                    <button class="modal-close" aria-label="Close modal">×</button>
                </div>
                <div class="modal-body"></div>
            </div>
        `;

        document.body.appendChild(this.modalElement);

        // Close button click handler
        this.modalElement.querySelector('.modal-close').addEventListener('click', () => this.close());

        // Click outside modal to close
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) {
                this.close();
            }
        });

        // Keyboard escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalElement.classList.contains('show')) {
                this.close();
            }
        });
    }

    setContent(content) {
        const modalBody = this.modalElement.querySelector('.modal-body');
        if (typeof content === 'string') {
            modalBody.innerHTML = content;
        } else {
            modalBody.innerHTML = '';
            modalBody.appendChild(content);
        }
    }

    open() {
        this.modalElement.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modalElement.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    setIframeContent(src) {
        this.setContent(`<iframe src="${src}" frameborder="0"></iframe>`);
    }
}

// Resume Modal
const resumeModal = new Modal('resumeModal', 'My Resume');

// ================================
// Resume Button Setup
// ================================

function setupResumeButton() {
    let resumeButton = document.querySelector('.resume-button');
    
    if (!resumeButton) {
        resumeButton = document.createElement('button');
        resumeButton.className = 'resume-button';
        resumeButton.innerHTML = '<i class="fas fa-file-pdf"></i> View Resume';
        resumeButton.title = 'View my resume';
        document.body.appendChild(resumeButton);
    }

    resumeButton.addEventListener('click', () => {
        // Update this URL to your actual resume PDF
        resumeModal.setIframeContent('https://docs.google.com/gview?url=YOUR_RESUME_URL_HERE&embedded=true');
        resumeModal.open();
        
        // Show message if no resume URL set
        if (resumeModal.modalElement.querySelector('iframe').src.includes('YOUR_RESUME_URL')) {
            notifier.info('Resume URL not configured. Update the resume button code with your actual resume link.', 6000);
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', setupResumeButton);

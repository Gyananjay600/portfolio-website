// ================================
// API Client for Backend Communication
// ================================

const API_BASE_URL = 'https://portfolio-website-1-fbhb.onrender.com/api';

class ApiClient {
    // Generic GET request
    static async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GET Request Error:', error);
            throw error;
        }
    }

    // Generic POST request
    static async post(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('POST Request Error:', error);
            throw error;
        }
    }

    // Generic PUT request
    static async put(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('PUT Request Error:', error);
            throw error;
        }
    }

    // Generic DELETE request
    static async delete(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('DELETE Request Error:', error);
            throw error;
        }
    }

    // Portfolio specific methods
    static getPortfolioItems() {
        return this.get('/portfolio/items');
    }

    static getPortfolioItem(id) {
        return this.get(`/portfolio/items/${id}`);
    }

    static createPortfolioItem(data) {
        return this.post('/portfolio/items', data);
    }

    static updatePortfolioItem(id, data) {
        return this.put(`/portfolio/items/${id}`, data);
    }

    static deletePortfolioItem(id) {
        return this.delete(`/portfolio/items/${id}`);
    }

    static getSkills() {
        return this.get('/portfolio/skills');
    }

    static getAboutInfo() {
        return this.get('/portfolio/about');
    }

    // Health check
    static healthCheck() {
        return this.get('/health');
    }
}

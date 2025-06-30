// Security service za dodatne sigurnosne mere
class SecurityService {
    static maxLoginAttempts = 3;
    static lockoutDuration = 15 * 60 * 1000; // 15 minuta
    static loginAttempts = new Map();
    static csrfToken = null;

    static initializeCSRFProtection() {
        this.csrfToken = this.generateCSRFToken();
        localStorage.setItem('csrfToken', this.csrfToken);
        
        // Dodaj CSRF token svim formama
        document.querySelectorAll('form').forEach(form => {
            if (!form.querySelector('input[name="_csrf"]')) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = '_csrf';
                input.value = this.csrfToken;
                form.appendChild(input);
            }
        });

        // Dodaj CSRF token svim AJAX zahtevima
        const originalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;
            xhr.open = function() {
                const result = originalOpen.apply(this, arguments);
                this.setRequestHeader('X-CSRF-Token', SecurityService.csrfToken);
                return result;
            };
            return xhr;
        };
    }

    static generateCSRFToken() {
        const buffer = new Uint8Array(32);
        crypto.getRandomValues(buffer);
        return Array.from(buffer)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    static validateCSRFToken(token) {
        return token === localStorage.getItem('csrfToken');
    }

    static checkLoginAttempts(username) {
        const attempts = this.loginAttempts.get(username) || { count: 0, timestamp: 0 };
        
        if (attempts.count >= this.maxLoginAttempts) {
            const timePassed = Date.now() - attempts.timestamp;
            if (timePassed < this.lockoutDuration) {
                const remainingTime = Math.ceil((this.lockoutDuration - timePassed) / 1000 / 60);
                return {
                    allowed: false,
                    message: `Nalog je privremeno zaključan. Pokušajte ponovo za ${remainingTime} minuta.`
                };
            }
            attempts.count = 0;
        }
        
        return { allowed: true };
    }

    static recordLoginAttempt(username, success) {
        const attempts = this.loginAttempts.get(username) || { count: 0, timestamp: Date.now() };
        
        if (success) {
            this.loginAttempts.delete(username);
        } else {
            attempts.count += 1;
            attempts.timestamp = Date.now();
            this.loginAttempts.set(username, attempts);
        }
    }

    static sanitizeHTML(text) {
        if (typeof text !== 'string') return text;
        
        const element = document.createElement('div');
        element.textContent = text;
        return element.innerHTML;
    }

    static validateInput(input) {
        if (typeof input !== 'string') return input;
        
        // Ukloni potencijalno opasan sadržaj
        return this.sanitizeHTML(input.trim())
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/onerror=/gi, '')
            .replace(/onclick=/gi, '');
    }

    static validateFileUpload(file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            return {
                isValid: false,
                error: 'Nedozvoljen tip fajla. Dozvoljeni su samo JPG, PNG i GIF.'
            };
        }

        if (file.size > maxSize) {
            return {
                isValid: false,
                error: 'Fajl je prevelik. Maksimalna veličina je 5MB.'
            };
        }

        return { isValid: true };
    }

    static setupSecurityHeaders() {
        // U produkciji, ovo bi bilo na serveru
        const headers = {
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        };

        // Simuliramo primenu headera na frontend
        this.securityHeaders = headers;
    }
}

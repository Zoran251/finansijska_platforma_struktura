class ErrorHandler {
    static errors = [];
    static maxErrors = 100;
    static errorTypes = {
        VALIDATION: 'validation',
        AUTH: 'auth',
        NETWORK: 'network',
        SECURITY: 'security',
        SYSTEM: 'system',
        UI: 'ui'
    };

    static handleError(error, context = 'system') {
        const errorObj = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? {
                message: error.message,
                stack: error.stack,
                name: error.name
            } : error,
            context,
            userId: window.app?.currentUser?.id,
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        console.error(`[${context}]:`, error);
        this.logError(errorObj);
        
        // Obavesti korisnika na odgovarajući način
        this.showErrorNotification(context, error);
        
        // Pošalji error na analitiku ako je dostupna
        if (window.app?.analytics) {
            window.app.analytics.logError(errorObj);
        }

        return errorObj;
    }

    static logError(errorObj) {
        this.errors.unshift(errorObj);
        
        // Održavaj maksimalnu veličinu log-a
        if (this.errors.length > this.maxErrors) {
            this.errors.pop();
        }

        try {
            // Sačuvaj u localStorage
            localStorage.setItem('errorLog', JSON.stringify(this.errors));
            
            // Ako je kritična greška, sačuvaj i u sessionStorage
            if (this.isCriticalError(errorObj)) {
                sessionStorage.setItem('lastCriticalError', JSON.stringify(errorObj));
            }
        } catch (e) {
            console.error('Error saving error log:', e);
        }
    }

    static showErrorNotification(context, error) {
        let message = 'Došlo je do greške.';
        let type = 'error';

        switch(context) {
            case 'validation':
                message = 'Molimo proverite unete podatke.';
                type = 'warning';
                break;
            case 'auth':
                message = 'Problem sa autentifikacijom. Molimo prijavite se ponovo.';
                break;
            case 'network':
                message = 'Problem sa internet konekcijom. Proverite vašu vezu.';
                type = 'warning';
                break;
            case 'security':
                message = 'Sigurnosno upozorenje. Vaši podaci su bezbedni.';
                type = 'warning';
                break;
            default:
                if (error instanceof Error) {
                    message = error.message;
                } else if (typeof error === 'string') {
                    message = error;
                }
        }

        if (window.NotificationService) {
            NotificationService.show(message, type);
        } else {
            alert(message);
        }
    }

    static isCriticalError(errorObj) {
        return errorObj.context === 'auth' || 
               errorObj.context === 'security' ||
               (errorObj.error instanceof Error && errorObj.error.name === 'SecurityError');
    }

    static getErrorLog() {
        return this.errors;
    }

    static getErrorStats() {
        return {
            total: this.errors.length,
            byContext: this.errors.reduce((acc, err) => {
                acc[err.context] = (acc[err.context] || 0) + 1;
                return acc;
            }, {})
        };
    }

    static clearErrorLog() {
        this.errors = [];
        localStorage.removeItem('errorLog');
        sessionStorage.removeItem('lastCriticalError');
    }

    static init() {
        // Učitaj postojeće greške iz storage-a
        try {
            const savedErrors = localStorage.getItem('errorLog');
            if (savedErrors) {
                this.errors = JSON.parse(savedErrors);
            }
        } catch (e) {
            console.error('Error loading error log:', e);
            this.errors = [];
        }

        // Postavi globalne error handlere
        window.onerror = (msg, url, lineNo, columnNo, error) => {
            this.handleError(error || msg, 'system');
            return false;
        };

        window.onunhandledrejection = (event) => {
            this.handleError(event.reason, 'promise');
        };

        // Prati greške u network requestima
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            } catch (error) {
                this.handleError(error, 'network');
                throw error;
            }
        };
    }
}

// Glavni fajl za koordinaciju svih modula - main.js
class MainApplication {
    constructor() {
        this.currentPage = 'dashboard';
        this.modules = {};
        this.user = {
            name: 'Marko Marković',
            email: 'marko@example.com',
            role: 'admin',
            isAdmin: true
        };
        this.init();
    }

    init() {
        this.waitForModules();
        this.setupGlobalEventListeners();
        this.handleInitialPage();
    }

    waitForModules() {
        // Čekamo da se svi moduli učitaju
        const checkModules = () => {
            if (typeof booking !== 'undefined' && 
                typeof calculator !== 'undefined' && 
                typeof support !== 'undefined' && 
                typeof admin !== 'undefined') {
                
                this.modules = { booking, calculator, support, admin };
                console.log('✅ Svi moduli uspešno učitani!');
                this.initializeApplication();
            } else {
                setTimeout(checkModules, 100);
            }
        };
        checkModules();
    }

    initializeApplication() {
        console.log('🚀 Golden Balance aplikacija pokrenuta!');
        console.log('📊 Dostupne funkcionalnosti:');
        console.log('   - Zakazivanje konsultacija');
        console.log('   - Investicioni kalkulatori');
        console.log('   - Tehnička podrška');
        console.log('   - Admin panel');
        
        // Prikazujemo welcome poruku
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const toast = this.createToast(
                'Dobrodošli u Golden Balance! Sve funkcionalnosti su spremne za korišćenje.',
                'success'
            );
            document.body.appendChild(toast);
        }, 1000);
    }

    createToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `app-toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Dodaj stilove ako već nisu dodani
        this.ensureToastStyles();

        // Auto-remove nakon 5 sekundi
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);

        return toast;
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    ensureToastStyles() {
        if (document.querySelector('#toast-styles')) return;

        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .app-toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--dark-card);
                border: 1px solid var(--border-light);
                border-radius: 8px;
                padding: 1rem;
                min-width: 350px;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                animation: slideInFromRight 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            
            .toast-success { border-left: 4px solid var(--success); }
            .toast-error { border-left: 4px solid var(--error); }
            .toast-warning { border-left: 4px solid var(--warning); }
            .toast-info { border-left: 4px solid var(--gold-bright); }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--light-text);
            }
            
            .toast-content i {
                font-size: 1.2rem;
            }
            
            .toast-success .toast-content i { color: var(--success); }
            .toast-error .toast-content i { color: var(--error); }
            .toast-warning .toast-content i { color: var(--warning); }
            .toast-info .toast-content i { color: var(--gold-bright); }
            
            .toast-close {
                background: none;
                border: none;
                color: var(--muted-text);
                cursor: pointer;
                padding: 0.25rem;
                font-size: 1rem;
                transition: color 0.3s ease;
            }
            
            .toast-close:hover {
                color: var(--light-text);
            }
            
            @keyframes slideInFromRight {
                from { 
                    transform: translateX(100%);
                    opacity: 0;
                }
                to { 
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupGlobalEventListeners() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.refreshCurrentPage();
            }
        });

        // Handle form submissions globally
        document.addEventListener('submit', (event) => {
            this.handleFormSubmission(event);
        });

        // Handle clicks globally for analytics
        document.addEventListener('click', (event) => {
            this.trackUserInteraction(event);
        });
    }

    handleInitialPage() {
        // Proveravamo URL hash za početnu stranicu
        const hash = window.location.hash.substr(1);
        if (hash && this.isValidPage(hash)) {
            this.currentPage = hash;
        }
        
        // Ažuriramo navigaciju
        this.updateNavigation();
    }

    isValidPage(pageId) {
        const validPages = ['dashboard', 'preview', 'consultation', 'calculator', 'support', 'admin', 'profile'];
        return validPages.includes(pageId);
    }

    updateNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const onclick = link.getAttribute('onclick');
            if (onclick && onclick.includes(this.currentPage)) {
                link.classList.add('active');
            }
        });
    }

    refreshCurrentPage() {
        // Osvežavamo trenutnu stranicu kada korisnik vrati fokus
        switch(this.currentPage) {
            case 'dashboard':
                this.refreshDashboard();
                break;
            case 'admin':
                if (this.modules.admin && this.user.isAdmin) {
                    this.modules.admin.updateSystemStats();
                }
                break;
            case 'support':
                if (this.modules.support) {
                    this.modules.support.renderTickets();
                }
                break;
        }
    }

    refreshDashboard() {
        // Simuliramo osvežavanje dashboard podataka
        console.log('🔄 Osvežavanje dashboard podataka...');
    }

    handleFormSubmission(event) {
        const form = event.target;
        
        // Support ticket forma
        if (form.id === 'supportForm') {
            event.preventDefault();
            this.handleSupportTicket(form);
        }
        
        // Calculator forme
        if (form.classList.contains('calculator-form')) {
            event.preventDefault();
            this.handleCalculatorForm(form);
        }
    }

    handleSupportTicket(form) {
        const formData = new FormData(form);
        const ticketData = {
            subject: formData.get('ticketSubject'),
            description: formData.get('ticketDescription'),
            priority: formData.get('ticketPriority')
        };

        if (this.modules.support) {
            this.modules.support.createTicket(
                ticketData.subject, 
                ticketData.description, 
                ticketData.priority
            );
            
            // Zatvaramo modal
            const modal = form.closest('.modal-overlay');
            if (modal) modal.remove();
            
            // Prikazujemo success poruku
            const toast = this.createToast('Support tiket je uspešno kreiran!', 'success');
            document.body.appendChild(toast);
        }
    }

    handleCalculatorForm(form) {
        const calculatorType = form.getAttribute('data-calculator-type');
        
        if (this.modules.calculator) {
            switch(calculatorType) {
                case 'compound':
                    this.modules.calculator.calculateCompoundInterest();
                    break;
                case 'retirement':
                    this.modules.calculator.calculateRetirement();
                    break;
                case 'portfolio':
                    this.modules.calculator.updatePortfolio();
                    break;
                case 'risk':
                    this.modules.calculator.calculateRiskProfile();
                    break;
            }
        }
    }

    trackUserInteraction(event) {
        // Jednostavno praćenje korisničkih interakcija
        const target = event.target;
        
        if (target.classList.contains('btn') || target.closest('.btn')) {
            const buttonText = target.textContent.trim();
            console.log(`👆 Korisnik kliknuo: "${buttonText}"`);
        }
        
        if (target.classList.contains('nav-link')) {
            const pageId = this.extractPageFromClick(target);
            if (pageId) {
                this.currentPage = pageId;
                console.log(`📄 Promena stranice: ${pageId}`);
            }
        }
    }

    extractPageFromClick(element) {
        const onclick = element.getAttribute('onclick');
        if (onclick) {
            const match = onclick.match(/showPage\('([^']+)'\)/);
            return match ? match[1] : null;
        }
        return null;
    }

    // Utility metode za globalnu upotrebu
    showNotification(message, type = 'info', duration = 5000) {
        const toast = this.createToast(message, type);
        document.body.appendChild(toast);
        
        if (duration > 0) {
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, duration);
        }
        
        return toast;
    }

    formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatDate(dateString, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        
        return new Date(dateString).toLocaleDateString('sr-RS', { ...defaultOptions, ...options });
    }

    // Debug metode
    getAppStatus() {
        return {
            currentPage: this.currentPage,
            loadedModules: Object.keys(this.modules),
            user: this.user,
            timestamp: new Date().toISOString()
        };
    }

    exportToGlobal() {
        window.mainApp = this;
        
        // Eksportujemo utility funkcije
        window.showNotification = (message, type, duration) => this.showNotification(message, type, duration);
        window.formatCurrency = (amount, currency) => this.formatCurrency(amount, currency);
        window.formatDate = (dateString, options) => this.formatDate(dateString, options);
    }
}

// Pokretamo aplikaciju kada se učita DOM
document.addEventListener('DOMContentLoaded', () => {
    const mainApp = new MainApplication();
    mainApp.exportToGlobal();
    
    // Debug informacije u konzoli
    console.log('%c🏦 Golden Balance', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
    console.log('%cFinancijska aplikacija uspešno pokrenuta!', 'color: #22c55e; font-size: 14px;');
    console.log('%cKoristite window.mainApp za pristup aplikacijskim funkcijama', 'color: #6b7280; font-size: 12px;');
});

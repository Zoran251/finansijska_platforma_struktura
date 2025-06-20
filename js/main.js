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
        this.budget = JSON.parse(localStorage.getItem('userBudget')) || {
            monthly: 3000,
            spent: 2250,
            categories: []
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
    console.log('Golden Balance - Finansijska platforma uspešno pokrenuta! 🎉');
});

// ===== BUDGET MANAGEMENT FUNCTIONS =====
var budgetCategories = [];

function openBudgetModal() {
    var modal = document.getElementById('budgetModal');
    if (modal) {
        // Učitavamo trenutne podatke
        var savedBudget = JSON.parse(localStorage.getItem('userBudget')) || {
            monthly: 3000,
            spent: 2250,
            categories: [
                { name: 'Hrana', amount: 800 },
                { name: 'Transport', amount: 300 },
                { name: 'Stan', amount: 1200 }
            ]
        };
        
        document.getElementById('monthlyBudget').value = savedBudget.monthly;
        document.getElementById('spentAmount').value = savedBudget.spent;
        budgetCategories = savedBudget.categories || [];
        
        loadBudgetCategories();
        updateBudgetSummary();
        modal.style.display = 'flex';
        
        // Setup form submission
        var form = document.getElementById('budgetForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            saveBudgetChanges();
        };
        
        // Setup real-time updates
        document.getElementById('monthlyBudget').addEventListener('input', updateBudgetSummary);
        document.getElementById('spentAmount').addEventListener('input', updateBudgetSummary);
    }
}

function closeBudgetModal() {
    var modal = document.getElementById('budgetModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function loadBudgetCategories() {
    var container = document.getElementById('budgetCategories');
    if (!container) return;
    
    container.innerHTML = '';
    
    budgetCategories.forEach(function(category, index) {
        var categoryDiv = document.createElement('div');
        categoryDiv.style.cssText = 'display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center;';
        categoryDiv.innerHTML = `
            <input type="text" value="${category.name}" 
                   onchange="updateCategoryName(${index}, this.value)" 
                   class="form-input" style="flex: 2;" placeholder="Naziv kategorije">
            <input type="number" value="${category.amount}" 
                   onchange="updateCategoryAmount(${index}, this.value)" 
                   class="form-input" style="flex: 1;" placeholder="Iznos" min="0" step="10">
            <button type="button" onclick="removeBudgetCategory(${index})" 
                    class="btn btn-secondary" style="padding: 0.4rem;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(categoryDiv);
    });
}

function addBudgetCategory() {
    budgetCategories.push({ name: '', amount: 0 });
    loadBudgetCategories();
    updateBudgetSummary();
}

function removeBudgetCategory(index) {
    budgetCategories.splice(index, 1);
    loadBudgetCategories();
    updateBudgetSummary();
}

function updateCategoryName(index, name) {
    if (budgetCategories[index]) {
        budgetCategories[index].name = name;
        updateBudgetSummary();
    }
}

function updateCategoryAmount(index, amount) {
    if (budgetCategories[index]) {
        budgetCategories[index].amount = parseFloat(amount) || 0;
        updateBudgetSummary();
    }
}

function updateBudgetSummary() {
    var monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value) || 0;
    var spentAmount = parseFloat(document.getElementById('spentAmount').value) || 0;
    var remaining = monthlyBudget - spentAmount;
    var percentage = monthlyBudget > 0 ? (spentAmount / monthlyBudget) * 100 : 0;
    
    document.getElementById('totalBudgetDisplay').textContent = '€' + monthlyBudget.toLocaleString();
    document.getElementById('spentAmountDisplay').textContent = '€' + spentAmount.toLocaleString();
    document.getElementById('remainingBudgetDisplay').textContent = '€' + remaining.toLocaleString();
    document.getElementById('budgetProgressBar').style.width = Math.min(percentage, 100) + '%';
    
    // Color coding
    var remainingElement = document.getElementById('remainingBudgetDisplay');
    if (remaining < 0) {
        remainingElement.style.color = 'var(--error)';
    } else if (remaining < monthlyBudget * 0.2) {
        remainingElement.style.color = '#ff9800';
    } else {
        remainingElement.style.color = 'var(--success)';
    }
}

function saveBudgetChanges() {
    var monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value) || 0;
    var spentAmount = parseFloat(document.getElementById('spentAmount').value) || 0;
    
    var budgetData = {
        monthly: monthlyBudget,
        spent: spentAmount,
        categories: budgetCategories,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('userBudget', JSON.stringify(budgetData));
    
    // Ažuriramo prikaz na stranici
    updateBudgetDisplay();
    
    // Prikazujemo obaveštenje
    showNotification('Budžet je uspešno ažuriran!', 'success');
    
    closeBudgetModal();
}

function updateBudgetDisplay() {
    var savedBudget = JSON.parse(localStorage.getItem('userBudget'));
    if (!savedBudget) return;
    
    // Ažuriramo sve elemente na stranici koji prikazuju budžet
    var monthlyBudgetElements = document.querySelectorAll('[data-budget="monthly"]');
    var spentElements = document.querySelectorAll('[data-budget="spent"]');
    var remainingElements = document.querySelectorAll('[data-budget="remaining"]');
    
    monthlyBudgetElements.forEach(function(el) {
        el.textContent = '€' + savedBudget.monthly.toLocaleString();
    });
    
    spentElements.forEach(function(el) {
        el.textContent = '€' + savedBudget.spent.toLocaleString();
    });
    
    var remaining = savedBudget.monthly - savedBudget.spent;
    remainingElements.forEach(function(el) {
        el.textContent = '€' + remaining.toLocaleString();
    });
    
    // Ažuriramo progress bar
    var progressBars = document.querySelectorAll('[data-budget="progress"]');
    var percentage = savedBudget.monthly > 0 ? (savedBudget.spent / savedBudget.monthly) * 100 : 0;
    progressBars.forEach(function(bar) {
        bar.style.width = Math.min(percentage, 100) + '%';
    });
}

// ===== PROFILE MANAGEMENT FUNCTIONS =====
var isEditingProfile = false;

function toggleProfileEdit() {
    isEditingProfile = !isEditingProfile;
    var form = document.getElementById('profileForm');
    var btn = document.getElementById('editProfileBtn');
    var actions = document.getElementById('profileEditActions');
    var passwordGroup = document.getElementById('passwordGroup');
    
    if (isEditingProfile) {
        // Enable editing
        var inputs = form.querySelectorAll('input[readonly]');
        inputs.forEach(function(input) {
            input.removeAttribute('readonly');
            input.style.background = 'var(--dark-card)';
            input.style.border = '1px solid var(--gold-medium)';
        });
        
        btn.innerHTML = '<i class="fas fa-times"></i> Otkaži';
        actions.style.display = 'flex';
        passwordGroup.style.display = 'block';
    } else {
        cancelProfileEdit();
    }
}

function cancelProfileEdit() {
    isEditingProfile = false;
    var form = document.getElementById('profileForm');
    var btn = document.getElementById('editProfileBtn');
    var actions = document.getElementById('profileEditActions');
    var passwordGroup = document.getElementById('passwordGroup');
    
    // Disable editing
    var inputs = form.querySelectorAll('input:not([type="password"])');
    inputs.forEach(function(input) {
        input.setAttribute('readonly', true);
        input.style.background = 'transparent';
        input.style.border = '1px solid rgba(255,255,255,0.1)';
    });
    
    btn.innerHTML = '<i class="fas fa-edit"></i> Uredi';
    actions.style.display = 'none';
    passwordGroup.style.display = 'none';
    
    // Reset password field
    document.getElementById('profileNewPassword').value = '';
    
    // Reload original values
    loadProfileData();
}

function loadProfileData() {
    var userData = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Zoran Dostić',
        email: 'zorandostica2@gmail.com',
        phone: '0038765827710',
        username: 'zoran.dostica'
    };
    
    document.getElementById('profileName').value = userData.name;
    document.getElementById('profileEmail').value = userData.email;
    document.getElementById('profilePhone').value = userData.phone;
    document.getElementById('profileUsername').value = userData.username;
    
    // Load avatar
    var avatar = localStorage.getItem('userAvatar');
    if (avatar) {
        document.getElementById('profileAvatarDisplay').src = avatar;
    }
}

function saveProfileChanges() {
    var name = document.getElementById('profileName').value;
    var email = document.getElementById('profileEmail').value;
    var phone = document.getElementById('profilePhone').value;
    var username = document.getElementById('profileUsername').value;
    var newPassword = document.getElementById('profileNewPassword').value;
    
    // Validacija
    if (!name || !email || !username) {
        showNotification('Molimo unesite sva obavezna polja!', 'error');
        return;
    }
    
    // Email validacija
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Molimo unesite valjan email!', 'error');
        return;
    }
    
    // Username validacija (provera jedinstvenosti)
    var existingUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    var currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    var usernameExists = existingUsers.find(function(user) {
        return user.username === username && user.id !== currentUser.id;
    });
    
    if (usernameExists) {
        showNotification('Korisničko ime već postoji!', 'error');
        return;
    }
    
    // Sačuvaj promene
    var userData = {
        id: currentUser.id || Date.now(),
        name: name,
        email: email,
        phone: phone,
        username: username,
        lastUpdated: new Date().toISOString()
    };
    
    if (newPassword) {
        userData.password = newPassword; // U stvarnoj aplikaciji bi trebalo hash-ovati
    }
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Ažuriraj listu svih korisnika
    var allUsers = existingUsers.filter(function(user) {
        return user.id !== userData.id;
    });
    allUsers.push(userData);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    
    showProfileNotification('Profil je uspešno ažuriran!', 'success');
    cancelProfileEdit();
}

function showProfileNotification(message, type) {
    // Kreiraj notification element
    var notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Animacija pojavljivanja
    setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto uklanjanje
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function handleAvatarUpload(event) {
    var file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showNotification('Slika je prevelika! Maksimalna veličina je 5MB.', 'error');
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function(e) {
            var avatarSrc = e.target.result;
            document.getElementById('profileAvatarDisplay').src = avatarSrc;
            localStorage.setItem('userAvatar', avatarSrc);
            showNotification('Profilna slika je uspešno ažurirana!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function removeAvatar() {
    var defaultAvatar = 'https://via.placeholder.com/150x150/667eea/ffffff?text=USER';
    document.getElementById('profileAvatarDisplay').src = defaultAvatar;
    localStorage.removeItem('userAvatar');
    showNotification('Profilna slika je uklonjena!', 'success');
}

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('profileForm')) {
        loadProfileData();
    }
    if (document.querySelector('[data-budget]')) {
        updateBudgetDisplay();
    }
});

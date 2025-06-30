// Glavni fajl za koordinaciju svih modula - main.js

// Globalna zaštita za admin modul
if (typeof window.admin === 'undefined') {
    window.admin = undefined;
}

// Globalna zaštita za support modul
if (typeof window.support === 'undefined') {
    window.support = undefined;
}

// Fallback za showNotification ako nije definisan
if (typeof window.showNotification !== 'function') {
    window.showNotification = function(message, type = 'info', duration = 5000) {
        alert((type ? `[${type}] ` : '') + message);
    };
}

// 🔄 JEDINSTVENE FUNKCIJE ZA BUDŽET SINHRONIZACIJU
window.BudgetSync = {
    // Čita budžet podatke iz različitih formata i vraća unifikovane podatke
    getUnifiedBudgetData() {
        console.log('🔍 Čitanje unifikovanih budžet podataka...');
        
        const userBudget = JSON.parse(localStorage.getItem('userBudget'));
        const mainBudget = JSON.parse(localStorage.getItem('budget'));
        
        let unifiedData = null;
        
        if (userBudget && userBudget.monthlyIncome !== undefined) {
            // Format iz profila - konvertuj u unifikovane podatke
            const monthlyIncome = userBudget.monthlyIncome;
            const necessitiesAmount = (monthlyIncome * (userBudget.necessities || 0)) / 100;
            const hobbyAmount = (monthlyIncome * (userBudget.hobby || 0)) / 100;
            const savingsAmount = (monthlyIncome * (userBudget.savings || 0)) / 100;
            const totalExpenses = necessitiesAmount + hobbyAmount;
            
            unifiedData = {
                source: 'profile',
                monthlyIncome: monthlyIncome,
                totalExpenses: totalExpenses,
                netSavings: savingsAmount,
                remainingBalance: monthlyIncome - totalExpenses,
                categories: {
                    necessities: necessitiesAmount,
                    hobby: hobbyAmount,
                    savings: savingsAmount
                },
                percentages: {
                    necessities: userBudget.necessities,
                    hobby: userBudget.hobby,
                    savings: userBudget.savings
                },
                lastUpdated: userBudget.lastUpdated || new Date().toISOString()
            };
        } else if (mainBudget && mainBudget.monthly !== undefined) {
            // Format iz main.js
            unifiedData = {
                source: 'main',
                monthlyIncome: mainBudget.monthly,
                totalExpenses: mainBudget.spent,
                netSavings: mainBudget.monthly - mainBudget.spent,
                remainingBalance: mainBudget.monthly - mainBudget.spent,
                categories: mainBudget.categories || {},
                lastUpdated: new Date().toISOString()
            };
        }
        
        console.log('📊 Unifikovani podatci:', unifiedData);
        return unifiedData;
    },
    
    // Sinhronizuje sve prikaze budžeta u aplikaciji
    synchronizeAllDisplays() {
        console.log('🔄 Sinhronizacija svih prikaza...');
        
        const budgetData = this.getUnifiedBudgetData();
        if (!budgetData) {
            console.log('❌ Nema podataka za sinhronizaciju');
            return false;
        }
        
        // Sinhronizuj dashboard
        this.updateDashboardDisplay(budgetData);
        
        // Sinhronizuj preview
        this.updatePreviewDisplay(budgetData);
        
        // Pozovi globalne funkcije ako postoje
        if (typeof window.updateBudgetDisplay === 'function') {
            window.updateBudgetDisplay();
        }
        
        console.log('✅ Sinhronizacija završena');
        return true;
    },
      // Ažurira dashboard prikaz
    updateDashboardDisplay(budgetData) {
        try {
            console.log('🔄 Ažuriram dashboard sa podacima:', budgetData);
            
            // Ažuriraj osnovne stats kartice
            const elements = {
                totalIncome: document.querySelector('[data-budget="total-income"]'),
                totalExpenses: document.querySelector('[data-budget="total-expenses"]'),
                netSavings: document.querySelector('[data-budget="net-savings"]'),
                monthlyBudget: document.querySelector('[data-budget="monthly-budget"]'),
                remainingBudget: document.querySelector('[data-budget="remaining-budget"]')
            };
            
            if (elements.totalIncome) {
                elements.totalIncome.textContent = `€${budgetData.monthlyIncome.toLocaleString()}`;
            }
            if (elements.totalExpenses) {
                elements.totalExpenses.textContent = `€${budgetData.totalExpenses.toLocaleString()}`;
            }
            if (elements.netSavings) {
                elements.netSavings.textContent = `€${budgetData.netSavings.toLocaleString()}`;
            }
            if (elements.monthlyBudget) {
                elements.monthlyBudget.textContent = `€${budgetData.monthlyIncome.toLocaleString()}`;
            }
            if (elements.remainingBudget) {
                elements.remainingBudget.textContent = `€${budgetData.remainingBalance.toLocaleString()}`;
            }
            
            // Ažuriraj progress bar-ove ako postoje
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                if (bar.closest('[data-category="expenses"]') && budgetData.monthlyIncome > 0) {
                    const percentage = (budgetData.totalExpenses / budgetData.monthlyIncome) * 100;
                    bar.style.width = `${Math.min(percentage, 100)}%`;
                }
            });
            
            console.log('✅ Dashboard ažuriran sa novim podacima');
        } catch (error) {
            console.error('❌ Greška pri ažuriranju dashboard-a:', error);
        }
    },
    
    // Ažurira preview prikaz
    updatePreviewDisplay(budgetData) {
        try {
            console.log('🔄 Ažuriram preview sa podacima:', budgetData);
            
            // Ciljamo elemente sa specifičnim data-budget atributima
            const dataElements = {
                income: document.querySelector('[data-budget="total-income"]'),
                expenses: document.querySelector('[data-budget="total-expenses"]'),
                available: document.querySelector('[data-budget="remaining-budget"]'),
                netSavings: document.querySelector('[data-budget="net-savings"]')
            };
            
            // Ažuriramo vrednosti po ID-u
            const idElements = {
                income: document.getElementById('summaryIncome'),
                expenses: document.getElementById('summaryExpenses'),
                available: document.getElementById('summaryAvailable')
            };
            
            // Ažuriramo sve pronađene elemente
            if (dataElements.income) dataElements.income.textContent = `€${budgetData.monthlyIncome.toLocaleString()}`;
            if (dataElements.expenses) dataElements.expenses.textContent = `€${budgetData.totalExpenses.toLocaleString()}`;
            if (dataElements.available) dataElements.available.textContent = `€${budgetData.remainingBalance.toLocaleString()}`;
            if (dataElements.netSavings) dataElements.netSavings.textContent = `€${budgetData.netSavings.toLocaleString()}`;
            
            // Ažuriramo i po ID-u za potpunu pokrivenost
            if (idElements.income) idElements.income.textContent = `€${budgetData.monthlyIncome.toLocaleString()}`;
            if (idElements.expenses) idElements.expenses.textContent = `€${budgetData.totalExpenses.toLocaleString()}`;
            if (idElements.available) idElements.available.textContent = `€${budgetData.remainingBalance.toLocaleString()}`;
            
            // Ažuriramo i dodatne elemente za pregled
            const overviewElements = document.querySelectorAll('#overview .glass-card .stat-value');
            if (overviewElements.length >= 3) {
                try {
                    overviewElements[0].textContent = `€${budgetData.monthlyIncome.toLocaleString()}`;
                    overviewElements[1].textContent = `€${budgetData.totalExpenses.toLocaleString()}`;
                    overviewElements[2].textContent = `€${budgetData.remainingBalance.toLocaleString()}`;
                } catch (err) {
                    console.error('Greška pri ažuriranju overview elemenata:', err);
                }
            }
            
            console.log('✅ Preview ažuriran sa novim podacima');
        } catch (error) {
            console.error('❌ Greška pri ažuriranju preview-a:', error);
        }
    },
    
    // Omogućava drugim modulima da pozovu sinhronizaciju
    triggerSync() {
        setTimeout(() => {
            this.synchronizeAllDisplays();
        }, 100);
    }
};

// Globalne funkcije za kompatibilnost
window.updateBudgetDisplay = function() {
    console.log('🔄 Poziv globalne updateBudgetDisplay funkcije');
    window.BudgetSync.synchronizeAllDisplays();
};

window.triggerBudgetSync = function() {
    console.log('🔄 Poziv triggerBudgetSync funkcije');
    window.BudgetSync.triggerSync();
};

// Dodajemo listener za promene u localStorage za automatsku sinhronizaciju
window.addEventListener('storage', function(e) {
    console.log('🔄 Storage event detected:', e.key);
    if (e.key === 'userBudget' || e.key === 'budget') {
        console.log('💰 Budžet promenjen u drugom prozoru/tabu, ažuriram prikaz...');
        setTimeout(() => {
            window.BudgetSync.synchronizeAllDisplays();
        }, 100);
    }
});

// Inicijalna sinhronizacija pri učitavanju stranice
window.EventManager.onDOMReady('budgetSync', function() {
    console.log('🔄 DOMContentLoaded - iniciram sinhronizaciju...');
    setTimeout(() => {
        window.BudgetSync.synchronizeAllDisplays();
    }, 500);
});

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
    }    waitForModules() {
        // Čekamo da se svi moduli učitaju
        const checkModules = () => {
            const modulesLoaded = {
                booking: typeof booking !== 'undefined',
                calculator: typeof calculator !== 'undefined', 
                support: typeof support !== 'undefined',
                admin: typeof admin !== 'undefined'
            };
            
            console.log('🔍 Checking modules:', modulesLoaded);
            
            // Nastavi bez admin modula ako nije dostupan
            if (modulesLoaded.booking && modulesLoaded.calculator && modulesLoaded.support) {
                this.modules = {};
                if (modulesLoaded.booking) this.modules.booking = booking;
                if (modulesLoaded.calculator) this.modules.calculator = calculator; 
                if (modulesLoaded.support) this.modules.support = support;
                if (modulesLoaded.admin) this.modules.admin = admin;
                
                console.log('✅ Moduli učitani:', Object.keys(this.modules));
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
window.EventManager.onDOMReady('mainApp', () => {
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
        
        // Auto scroll to modal if not visible
        setTimeout(function() {
            modal.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
        
        // Setup form submission - uklanjamo prethodni event handler i dodajemo novi
        var form = document.getElementById('budgetForm');
        // Prvo uklonimo sve postojeće event listenere
        var clonedForm = form.cloneNode(true);
        form.parentNode.replaceChild(clonedForm, form);
        form = clonedForm;
        
        // Dodajemo novi event listener
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted - pozivam saveBudgetChanges()');
            saveBudgetChanges();
        });
        
        // Setup real-time updates
        document.getElementById('monthlyBudget').addEventListener('input', updateBudgetSummary);
        document.getElementById('spentAmount').addEventListener('input', updateBudgetSummary);
        // Removed duplicate event listener
    }
}

// Globalna funkcija za zatvaranje budžet modala
window.closeBudgetModal = function() {
    console.log('Zatvaram budget modal...');
    var modal = document.getElementById('budgetModal');
    if (modal) {
        modal.style.display = 'none';
        
        // Reset forme
        var form = document.getElementById('budgetForm');
        if (form) {
            form.reset();
        }
        
        // Sakrij modal sa CSS-om takođe 
        modal.classList.remove('active');
        modal.classList.add('closed');
        
        console.log('Budget modal zatvoren.');
    } else {
        console.log('Ne mogu da pronađem budget modal.');
    }
};

function loadBudgetCategories() {
    var container = document.getElementById('budgetCategories');
    if (!container) return;
    
    container.innerHTML = '';
    
    budgetCategories.forEach(function(category, index) {
        var categoryDiv = document.createElement('div');
        categoryDiv.style.cssText = 'display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center;';
        categoryDiv.className = 'budget-category-item';
        // Dodajemo label i input sa jedinstvenim ID-om za svaku kategoriju
        categoryDiv.innerHTML = `
            <label for="categoryName${index}" class="form-label">Naziv kategorije ${index+1}</label>
            <input type="text" id="categoryName${index}" name="categoryName${index}" value="${category.name}" 
                   onchange="updateCategoryName(${index}, this.value)" 
                   class="form-input" style="flex: 2;" placeholder="Naziv kategorije" autocomplete="off">
            <label for="categoryAmount${index}" class="form-label">Iznos za kategoriju ${index+1}</label>
            <input type="number" id="categoryAmount${index}" name="categoryAmount${index}" value="${category.amount}" 
                   onchange="updateCategoryAmount(${index}, this.value)" 
                   class="form-input" style="flex: 1;" placeholder="Iznos" min="0" step="10" autocomplete="off">
            <button type="button" onclick="removeBudgetCategory(${index})" 
                    class="btn btn-secondary" style="padding: 0.4rem;" aria-label="Ukloni kategoriju ${index+1}">
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

// Globalna funkcija za čuvanje budžeta
window.saveBudgetChanges = function() {
    console.log('🔄 saveBudgetChanges() pozvan!');
    
    var monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value) || 0;
    var spentAmount = parseFloat(document.getElementById('spentAmount').value) || 0;
    
    console.log('💰 Budžet podaci:', { monthlyBudget, spentAmount, categories: budgetCategories });
    
    var budgetData = {
        monthly: monthlyBudget,
        spent: spentAmount,
        categories: budgetCategories,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('userBudget', JSON.stringify(budgetData));
    console.log('💾 Podaci sačuvani u localStorage');
    
    // Ažuriramo prikaz na stranici
    updateBudgetDisplay();
    console.log('🔄 updateBudgetDisplay() pozvan');
    
    // Pozivamo BudgetSync da sinhronizuje prikaz na svim stranicama
    if (typeof window.BudgetSync !== 'undefined') {
        console.log('🔄 Pozivam BudgetSync.synchronizeAllDisplays()');
        window.BudgetSync.synchronizeAllDisplays();
    }
    
    // Prikazujemo obaveštenje
    if (typeof showProfileNotification === 'function') {
        showProfileNotification('Budžet je uspešno ažuriran!', 'success');
    } else if (typeof window.showNotification === 'function') {
        window.showNotification('Budžet je uspešno ažuriran!', 'success');
    } else {
        console.log('✅ Budžet je uspešno ažuriran!');
    }
    
    // Zatvaramo modal
    closeBudgetModal();
};

function updateBudgetDisplay() {
    console.log('📊 updateBudgetDisplay() pozvana');
    
    var savedBudget = JSON.parse(localStorage.getItem('userBudget'));
    if (!savedBudget) {
        console.log('❌ Nema sačuvanih podataka o budžetu');
        return;
    }
    
    console.log('💾 Učitani budžet:', savedBudget);
    
    // Podrška za oba formata budžeta - stari (monthly/spent) i novi (monthlyIncome/necessities/hobby/savings)
    var monthlyAmount, spentAmount, remaining;
    
    if (savedBudget.monthly !== undefined) {
        // Stari format iz main.js
        monthlyAmount = savedBudget.monthly;
        spentAmount = savedBudget.spent || 0;
        remaining = monthlyAmount - spentAmount;
    } else if (savedBudget.monthlyIncome !== undefined) {
        // Novi format iz profile.html
        monthlyAmount = savedBudget.monthlyIncome;
        // Izračunavamo potrošeno na osnovu procenata necessities i hobby
        var necessitiesAmount = (monthlyAmount * (savedBudget.necessities || 0)) / 100;
        var hobbyAmount = (monthlyAmount * (savedBudget.hobby || 0)) / 100;
        spentAmount = necessitiesAmount + hobbyAmount;
        remaining = monthlyAmount - spentAmount;    } else {
        console.log('❌ Nema validnih podataka za budžet');
        return; // Nema validnih podataka
    }
    
    console.log('📊 Izračunate vrednosti:', { monthlyAmount, spentAmount, remaining });
    
    // Ažuriramo sve elemente na stranici koji prikazuju budžet (index.html - data-budget atributi)
    var monthlyBudgetElements = document.querySelectorAll('[data-budget="monthly"]');
    var spentElements = document.querySelectorAll('[data-budget="spent"]');
    var remainingElements = document.querySelectorAll('[data-budget="remaining"]');
    
    console.log('🔍 Pronađeni elementi:', {
        monthly: monthlyBudgetElements.length,
        spent: spentElements.length,
        remaining: remainingElements.length
    });
    
    monthlyBudgetElements.forEach(function(el) {
        el.textContent = '€' + monthlyAmount.toLocaleString();
    });
    
    spentElements.forEach(function(el) {
        el.textContent = '€' + spentAmount.toLocaleString();
    });
    
    remainingElements.forEach(function(el) {
        el.textContent = '€' + remaining.toLocaleString();
    });
    
    // Ažuriramo progress bar
    var progressBars = document.querySelectorAll('[data-budget="progress"]');
    var percentage = monthlyAmount > 0 ? (spentAmount / monthlyAmount) * 100 : 0;
    progressBars.forEach(function(bar) {
        bar.style.width = Math.min(percentage, 100) + '%';
    });
      // Ažuriramo i profile elemente (profile.html - ID selektori)
    var totalIncomeEl = document.getElementById('totalIncome');
    var totalExpensesEl = document.getElementById('totalExpenses');
    var currentBalanceEl = document.getElementById('currentBalance');
    
    if (totalIncomeEl) {
        totalIncomeEl.textContent = '€' + monthlyAmount.toLocaleString();
    }
    
    if (totalExpensesEl) {
        totalExpensesEl.textContent = '€' + spentAmount.toLocaleString();
    }
    
    if (currentBalanceEl) {
        currentBalanceEl.textContent = '€' + remaining.toLocaleString();
    }
      // Ažuriramo i kategorije budžeta ako postoje
    if (savedBudget.categories) {
        Object.keys(savedBudget.categories).forEach(function(categoryKey) {
            var categoryData = savedBudget.categories[categoryKey];
            var categoryAmountEl = document.getElementById(categoryKey + 'Amount');
            var categoryAmountDisplayEl = document.getElementById(categoryKey + 'AmountDisplay');
            
            if (categoryAmountEl) {
                categoryAmountEl.textContent = '€' + (categoryData.amount || 0).toLocaleString();
            }
            
            if (categoryAmountDisplayEl) {
                categoryAmountDisplayEl.textContent = '€' + (categoryData.amount || 0).toLocaleString();
            }
        });
    }
    
    // Ažuriranje elemenata za novi format budžeta (necessities, hobby, savings)
    if (savedBudget.monthlyIncome !== undefined) {
        var necessitiesAmountEl = document.getElementById('necessitiesAmount');
        var hobbyAmountEl = document.getElementById('hobbyAmount');
        var savingsAmountEl = document.getElementById('savingsAmount');
        
        if (necessitiesAmountEl) {
            var necessitiesAmount = (monthlyAmount * (savedBudget.necessities || 0)) / 100;
            necessitiesAmountEl.textContent = '€' + necessitiesAmount.toLocaleString();
        }
        
        if (hobbyAmountEl) {
            var hobbyAmount = (monthlyAmount * (savedBudget.hobby || 0)) / 100;
            hobbyAmountEl.textContent = '€' + hobbyAmount.toLocaleString();
        }
        
        if (savingsAmountEl) {
            var savingsAmount = (monthlyAmount * (savedBudget.savings || 0)) / 100;
            savingsAmountEl.textContent = '€' + savingsAmount.toLocaleString();
        }
    }
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
window.EventManager.onDOMReady('profileData', function() {
    if (document.getElementById('profileForm')) {
        loadProfileData();
    }
    if (document.querySelector('[data-budget]')) {
        updateBudgetDisplay();
    }
    
    // Dodajemo globalni event listener za budget formu
    const budgetFormHandler = function(e) {
        if (e.target.id === 'budgetForm') {
            console.log('📝 Budget forma submitted!');
            e.preventDefault();
            saveBudgetChanges();
        }
    };
    
    // Remove existing listener first
    document.removeEventListener('submit', window.budgetFormHandler);
    
    // Store reference globally for later cleanup
    window.budgetFormHandler = budgetFormHandler;
    document.addEventListener('submit', budgetFormHandler);
    
    console.log('🏁 main.js učitan i event listeneri postavljeni');
});

// Utility for managing event listeners to prevent duplicates and memory leaks
window.EventManager = {
    listeners: new Map(),
    
    // Add event listener with automatic cleanup of previous listeners
    addListener(element, eventType, handler, options) {
        if (!element) return;
        
        // Create unique key for this element+event combination
        const key = `${element}:${eventType}`;
        
        // Remove any existing listener for this element+event
        if (this.listeners.has(key)) {
            const oldHandler = this.listeners.get(key);
            element.removeEventListener(eventType, oldHandler, options);
        }
        
        // Add new listener and store reference
        element.addEventListener(eventType, handler, options);
        this.listeners.set(key, handler);
        
        return handler; // Return handler in case it's needed elsewhere
    },
    
    // Remove a specific listener
    removeListener(element, eventType, options) {
        if (!element) return;
        
        const key = `${element}:${eventType}`;
        if (this.listeners.has(key)) {
            const handler = this.listeners.get(key);
            element.removeEventListener(eventType, handler, options);
            this.listeners.delete(key);
        }
    },
    
    // Utility for adding a safe DOMContentLoaded listener
    // This ensures only one listener runs for each callback ID
    onDOMReady(callbackId, callback) {
        // Use a special prefix for document:DOMContentLoaded
        const key = `document:DOMContentLoaded:${callbackId}`;
        
        // Check if DOM is already loaded
        if (document.readyState === 'loading') {
            // If not loaded yet, add the listener
            const handler = () => {
                callback();
                this.listeners.delete(key);
            };
            
            // Remove existing listener if any
            if (this.listeners.has(key)) {
                document.removeEventListener('DOMContentLoaded', this.listeners.get(key));
            }
            
            // Add new listener
            document.addEventListener('DOMContentLoaded', handler);
            this.listeners.set(key, handler);
        } else {
            // If already loaded, run immediately
            setTimeout(callback, 0);
        }
    }
};
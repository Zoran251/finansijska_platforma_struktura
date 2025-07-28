/**
 * Profile Tabs Navigation System - Proširena verzija
 * Omogućava laku navigaciju između sekcija u profile.html
 */

// Globalne funkcije za navigaciju između tabova
window.ProfileNavigation = {
    // Trenutni aktivni tab
    currentTab: 'profile',
    
    // Mapiranje tab ID-jeva sa sekcijama
    tabMapping: {
        'profileLink': 'profileSection',
        'budgetLink': 'budgetSection', 
        'settingsLink': 'settingsSection'
    },
    
    // Aktiviraj specifični tab
    activateTab(tabId) {
        console.log(`🎯 Aktiviram tab: ${tabId}`);
        
        try {
            // Ukloni active klasu sa svih navigacijskih linkova
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Sakrij sve sekcije
            Object.values(this.tabMapping).forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.style.display = 'none';
                }
            });
            
            // Aktiviraj željeni tab
            const activeLink = document.getElementById(tabId);
            const sectionId = this.tabMapping[tabId];
            const section = document.getElementById(sectionId);
            
            if (activeLink && section) {
                // Aktiviraj link
                activeLink.classList.add('active');
                
                // Prikaži sekciju
                section.style.display = 'block';
                
                // Smooth scroll do sekcije
                setTimeout(() => {
                    section.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
                
                this.currentTab = tabId.replace('Link', '');
                console.log(`✅ Aktiviran tab: ${this.currentTab}`);
                
                // Posebna logika za različite tabove
                this.handleTabSpecificLogic(this.currentTab);
                
                return true;
            } else {
                console.error(`❌ Ne mogu da pronađem tab: ${tabId} ili sekciju: ${sectionId}`);
                return false;
            }
        } catch (error) {
            console.error('❌ Greška pri aktivaciji taba:', error);
            return false;
        }
    },
    
    // Specifična logika za svaki tab
    handleTabSpecificLogic(tabName) {
        switch(tabName) {
            case 'profile':
                console.log('👤 Učitavam profil podatke...');
                if (typeof loadUserData === 'function') {
                    loadUserData();
                }
                break;
                
            case 'budget':
                console.log('💰 Učitavam budžet podatke...');
                if (typeof loadBudgetData === 'function') {
                    loadBudgetData();
                }
                if (typeof window.BudgetSync !== 'undefined') {
                    window.BudgetSync.triggerSync();
                }
                break;
                
            case 'settings':
                console.log('⚙️ Učitavam podešavanja...');
                if (typeof loadUserSettings === 'function') {
                    loadUserSettings();
                }
                break;
        }
    },
    
    // Navigiraj na specifični tab pomoću indeksa
    navigateByIndex(index) {
        const tabIds = Object.keys(this.tabMapping);
        if (index >= 0 && index < tabIds.length) {
            return this.activateTab(tabIds[index]);
        }
        return false;
    },
    
    // Setup event listeners
    setupEventListeners() {
        console.log('🎯 Postavljam event listenere za profile navigaciju...');
        
        // Click handleri za navigacijske linkove
        Object.keys(this.tabMapping).forEach(tabId => {
            const link = document.getElementById(tabId);
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.activateTab(tabId);
                    
                    // Ažuriraj URL hash
                    const tabName = tabId.replace('Link', '');
                    window.history.pushState(null, '', `#${tabName}`);
                });
                
                console.log(`✅ Event listener dodat za: ${tabId}`);
            }
        });
        
        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    },
    
    // Handle logout
    handleLogout() {
        if (confirm('Da li ste sigurni da se želite odjaviti?')) {
            console.log('🚪 Odjavljujem korisnika...');
            
            // Očisti korisničke podatke
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('admin_logged_in');
            
            // Redirect na glavnu stranicu
            window.location.href = 'preview-fixed.html';
        }
    },
    
    // Inicijalizuj navigaciju
    init() {
        console.log('🚀 Inicijalizujem Profile Navigation sistem...');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Handle početni hash ili aktiviraj default tab
        const hash = window.location.hash.replace('#', '');
        if (hash && ['profile', 'budget', 'settings'].includes(hash)) {
            const tabMap = {
                'profile': 'profileLink',
                'budget': 'budgetLink', 
                'settings': 'settingsLink'
            };
            this.activateTab(tabMap[hash]);
        } else {
            // Default na profil tab
            this.activateTab('profileLink');
        }
        
        console.log('✅ Profile Navigation sistem spreman!');
    }
};

// Script za aktivaciju "Moj Budžet" kartice
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 profile_tabs.js učitan - inicijalizujem navigaciju...');
    
    // Kratka pauza da se profile.html potpuno učita
    setTimeout(() => {
        window.ProfileNavigation.init();
    }, 100);
    
    // Funkcija za aktivaciju kartice (kompatibilnost sa starim kodom)
    function activateTab(tabIndex) {
        return window.ProfileNavigation.navigateByIndex(tabIndex);
    }
    
    // Proveri localStorage za vrednost aktivnog taba
    const activeTab = localStorage.getItem('activeProfileTab');
    if (activeTab !== null) {
        // Konvertuj u broj i aktiviraj tab
        const tabIndex = parseInt(activeTab);
        setTimeout(() => {
            activateTab(tabIndex);
            localStorage.removeItem('activeProfileTab');
        }, 200);
    }
    
    // Proveri da li treba da skrolujemo do određene sekcije
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
        setTimeout(function() {
            const element = document.getElementById(scrollToSection);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            localStorage.removeItem('scrollToSection');
        }, 300);
    }
    
    // Proveri da li treba otvoriti tab za unos troškova
    const openExpenseTab = localStorage.getItem('openExpenseTab');
    if (openExpenseTab === 'true') {
        setTimeout(function() {
            // Prvo aktiviraj budžet tab
            window.ProfileNavigation.activateTab('budgetLink');
            
            // Onda pronađi expense button
            const expenseButton = document.querySelector('[data-expense-tab="true"]');
            if (expenseButton) {
                expenseButton.click();
            }
            localStorage.removeItem('openExpenseTab');
        }, 500);
    }
    
    // Proveri URL parametre za direktan pristup
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('directToBudget') === 'true' || urlParams.get('showBudget') === 'true') {
        setTimeout(() => {
            window.ProfileNavigation.activateTab('budgetLink');
            // Očisti parametre
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 300);
    }
});
});

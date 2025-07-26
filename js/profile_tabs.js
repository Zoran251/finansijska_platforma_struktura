// Script za aktivaciju "Moj Budžet" kartice
document.addEventListener('DOMContentLoaded', function() {
    // Funkcija za aktivaciju kartice
    function activateTab(tabIndex) {
        // Pronađi sve tab elemente
        const tabElements = document.querySelectorAll('.nav-link');
        
        // Ako postoje tabovi i imamo validni indeks, simuliraj klik na željenu karticu
        if (tabElements && tabElements.length > tabIndex && tabIndex >= 0) {
            setTimeout(function() {
                tabElements[tabIndex].click();
            }, 100);
        }
    }
    
    // Proveri localStorage za vrednost aktivnog taba
    const activeTab = localStorage.getItem('activeProfileTab');
    if (activeTab !== null) {
        // Konvertuj u broj i aktiviraj tab
        const tabIndex = parseInt(activeTab);
        activateTab(tabIndex);
        
        // Očisti localStorage da ne bi uticalo na buduće posete
        localStorage.removeItem('activeProfileTab');
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
            // Ovde možemo dodati kod za otvaranje dodatnih tabova unutar budžet sekcije
            const expenseButton = document.querySelector('[data-expense-tab="true"]');
            if (expenseButton) {
                expenseButton.click();
            }
            localStorage.removeItem('openExpenseTab');
        }, 500);
    }
});

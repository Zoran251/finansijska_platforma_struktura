// Funkcija za ažuriranje prikaza budžeta
function updateBudgetDisplay() {
    try {
        // Učitaj i validiraj podatke iz localStorage-a
        let budget = {};
        let userBudget = {};
        
        try {
            const budgetStr = localStorage.getItem('budget');
            if (budgetStr) budget = JSON.parse(budgetStr);
        } catch (e) {
            console.warn('Greška pri učitavanju budget podataka:', e);
        }
        
        try {
            const userBudgetStr = localStorage.getItem('userBudget');
            if (userBudgetStr) userBudget = JSON.parse(userBudgetStr);
        } catch (e) {
            console.warn('Greška pri učitavanju userBudget podataka:', e);
        }

        // Izračunaj vrednosti sa validacijom
        const monthlyBudget = parseFloat(budget.monthlyBudget) || 
            parseFloat(userBudget.monthlyIncome) || 0;
        
        const spentAmount = parseFloat(budget.totalSpent) || 
            (parseFloat(userBudget.necessities || 0) + parseFloat(userBudget.hobby || 0)) || 0;
        
        const remainingAmount = Math.max(0, monthlyBudget - spentAmount);

        // Ažuriraj DOM elemente
        const elements = {
            monthlyBudget: document.getElementById('monthlyBudget'),
            spentAmount: document.getElementById('spentAmount'),
            remainingAmount: document.getElementById('remainingAmount'),
            progressBar: document.getElementById('budgetProgressBar')
        };

        // Proveri da li elementi postoje pre ažuriranja
        if (!elements.monthlyBudget && !elements.spentAmount && 
            !elements.remainingAmount && !elements.progressBar) {
            return; // Tiho prekini ako nijedan element ne postoji
        }

        // Funkcija za animirano ažuriranje vrednosti
        const updateWithAnimation = (element, newValue) => {
            if (!element) return;
            
            const oldValue = parseFloat(element.textContent.replace('€', '')) || 0;
            const duration = 1000; // 1 sekunda za animaciju
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = oldValue + (newValue - oldValue) * progress;
                element.textContent = `€${currentValue.toFixed(2)}`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        };

        // Ažuriraj vrednosti sa animacijom
        updateWithAnimation(elements.monthlyBudget, monthlyBudget);
        updateWithAnimation(elements.spentAmount, spentAmount);
        updateWithAnimation(elements.remainingAmount, remainingAmount);

        // Ažuriraj progres bar sa animacijom
        if (elements.progressBar) {
            const percentage = monthlyBudget > 0 ? (spentAmount / monthlyBudget) * 100 : 0;
            elements.progressBar.style.transition = 'width 0.5s ease-out, background 0.3s ease';
            elements.progressBar.style.width = `${Math.min(100, percentage)}%`;
            
            // Koristi CSS varijable za boje
            if (percentage >= 90) {
                elements.progressBar.style.background = 'var(--gradient-gold-dark)';
            } else if (percentage >= 75) {
                elements.progressBar.style.background = 'var(--gradient-gold)';
            } else {
                elements.progressBar.style.background = 'var(--gradient-gold-light)';
            }
        }

        // Emituj custom event za sinhronizaciju
        window.dispatchEvent(new CustomEvent('budget-updated', { 
            detail: { monthlyBudget, spentAmount, remainingAmount } 
        }));

    } catch (error) {
        console.error('Greška pri ažuriranju prikaza budžeta:', error);
    }
}

// Inicijalno učitavanje
document.addEventListener('DOMContentLoaded', updateBudgetDisplay);

// Osluškuj promene u localStorage-u
window.addEventListener('storage', (e) => {
    if (e.key === 'budget' || e.key === 'userBudget' || e.key === 'currentUser') {
        updateBudgetDisplay();
    }
});

// Osluškuj custom event za sinhronizaciju
window.addEventListener('budget-updated', (e) => {
    console.log('Budžet je ažuriran:', e.detail);
});

// Ažuriraj svakih 30 sekundi
setInterval(updateBudgetDisplay, 30000);

// Izvozi funkcije za upotrebu u drugim fajlovima
window.updateBudgetDisplay = updateBudgetDisplay;

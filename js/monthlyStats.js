// Praćenje i prikaz razlike troškova po mesecima i procenta promene za profile.html
// Ovaj fajl se uključuje na dnu profile.html

(function() {
    // Helper: vrati mesec i godinu iz datuma (YYYY-MM)
    function getMonthKey(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d)) return '';
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    }

    // Sumira troškove po mesecima za datu kategoriju
    function getMonthlySums(category) {
        const expenses = JSON.parse(localStorage.getItem('expenses_' + category) || '[]');
        const sums = {};
        expenses.forEach(e => {
            const key = getMonthKey(e.date);
            if (!key) return;
            sums[key] = (sums[key] || 0) + Number(e.amount || 0);
        });
        return sums;
    }

    // Vrati sumu za tekući i prethodni mesec
    function getCurrentAndPrevMonthSums(category) {
        const now = new Date();
        const thisMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonth = prevMonthDate.getFullYear() + '-' + String(prevMonthDate.getMonth() + 1).padStart(2, '0');
        const sums = getMonthlySums(category);
        return {
            current: sums[thisMonth] || 0,
            previous: sums[prevMonth] || 0
        };
    }

    // Prikaz statistike za kartice i kategorije
    function updateMonthlyStats() {
        const categories = [
            { key: 'necessities', changeId: 'necessitiesChange' },
            { key: 'hobby', changeId: 'hobbyChange' },
            { key: 'savings', changeId: 'savingsChange' }
        ];
        categories.forEach(cat => {
            const { current, previous } = getCurrentAndPrevMonthSums(cat.key);
            const diff = current - previous;
            let percent = previous ? ((diff / previous) * 100) : (current ? 100 : 0);
            percent = Math.round(percent);
            const el = document.getElementById(cat.changeId);
            if (el) {
                el.innerHTML =
                    (diff > 0 ? '<i class="fas fa-arrow-up"></i>' : (diff < 0 ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-minus"></i>')) +
                    ' ' + percent + '% u odnosu na prošli mesec';
                el.className = 'stat-change ' + (diff > 0 ? 'negative' : (diff < 0 ? 'positive' : ''));
            }
        });
        // Za ukupne kartice
        const plan = JSON.parse(localStorage.getItem('budgetPlan') || '{"income":0,"expenses":0,"balance":0}');
        // Prihodi
        const incomeHistory = JSON.parse(localStorage.getItem('incomeHistory') || '[]');
        const now = new Date();
        const thisMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonth = prevMonthDate.getFullYear() + '-' + String(prevMonthDate.getMonth() + 1).padStart(2, '0');
        const currIncome = (incomeHistory.find(i => i.month === thisMonth) || {}).income || plan.income || 0;
        const prevIncome = (incomeHistory.find(i => i.month === prevMonth) || {}).income || 0;
        const incomeDiff = currIncome - prevIncome;
        let incomePercent = prevIncome ? ((incomeDiff / prevIncome) * 100) : (currIncome ? 100 : 0);
        incomePercent = Math.round(incomePercent);
        const incomeChange = document.getElementById('incomeChange');
        if (incomeChange) {
            incomeChange.innerHTML =
                (incomeDiff > 0 ? '<i class="fas fa-arrow-up"></i>' : (incomeDiff < 0 ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-minus"></i>')) +
                ' ' + incomePercent + '% u odnosu na prošli mesec';
            incomeChange.className = 'stat-change ' + (incomeDiff > 0 ? 'positive' : (incomeDiff < 0 ? 'negative' : ''));
        }
        // Rashodi
        const { current: currExp, previous: prevExp } = getCurrentAndPrevMonthSums('necessities');
        const { current: currHobby, previous: prevHobby } = getCurrentAndPrevMonthSums('hobby');
        const { current: currSavings, previous: prevSavings } = getCurrentAndPrevMonthSums('savings');
        const totalCurrExp = currExp + currHobby + currSavings;
        const totalPrevExp = prevExp + prevHobby + prevSavings;
        const expDiff = totalCurrExp - totalPrevExp;
        let expPercent = totalPrevExp ? ((expDiff / totalPrevExp) * 100) : (totalCurrExp ? 100 : 0);
        expPercent = Math.round(expPercent);
        const expenseChange = document.getElementById('expenseChange');
        if (expenseChange) {
            expenseChange.innerHTML =
                (expDiff > 0 ? '<i class="fas fa-arrow-up"></i>' : (expDiff < 0 ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-minus"></i>')) +
                ' ' + expPercent + '% u odnosu na prošli mesec';
            expenseChange.className = 'stat-change ' + (expDiff > 0 ? 'negative' : (expDiff < 0 ? 'positive' : ''));
        }
        // Stanje
        const currBal = currIncome - totalCurrExp;
        const prevBal = prevIncome - totalPrevExp;
        const balDiff = currBal - prevBal;
        let balPercent = prevBal ? ((balDiff / prevBal) * 100) : (currBal ? 100 : 0);
        balPercent = Math.round(balPercent);
        const balanceChange = document.getElementById('balanceChange');
        if (balanceChange) {
            balanceChange.innerHTML =
                (balDiff > 0 ? '<i class="fas fa-arrow-up"></i>' : (balDiff < 0 ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-minus"></i>')) +
                ' ' + balPercent + '% u odnosu na prošli mesec';
            balanceChange.className = 'stat-change ' + (balDiff > 0 ? 'positive' : (balDiff < 0 ? 'negative' : ''));
        }
    }

    // Čuvanje istorije prihoda po mesecima
    function saveIncomeHistory(income) {
        const now = new Date();
        const thisMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        let history = JSON.parse(localStorage.getItem('incomeHistory') || '[]');
        const idx = history.findIndex(i => i.month === thisMonth);
        if (idx >= 0) history[idx].income = income;
        else history.push({ month: thisMonth, income });
        localStorage.setItem('incomeHistory', JSON.stringify(history));
    }

    // Hook na postojeće funkcije
    document.addEventListener('DOMContentLoaded', function() {
        updateMonthlyStats();
        // Kada se sačuva plan budžeta, sačuvaj i istoriju prihoda
        const saveBtn = document.getElementById('saveBudgetPlan');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const income = parseFloat(document.getElementById('monthlyIncome').value) || 0;
                saveIncomeHistory(income);
                setTimeout(updateMonthlyStats, 100); // update posle ažuriranja
            });
        }
        // Kada se menja trošak, ažuriraj statistiku
        ['necessities','hobby','savings'].forEach(cat => {
            const orig = window['updateExpensesTable'];
            window['updateExpensesTable'] = function(category) {
                if (orig) orig.apply(this, arguments);
                if (category === cat) {
                    setTimeout(updateMonthlyStats, 100);
                }
            }
        });
    });
})();

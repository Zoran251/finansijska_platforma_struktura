class FinancialApp {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.budgets = JSON.parse(localStorage.getItem('budgets')) || [];
        this.users = JSON.parse(localStorage.getItem('users')) || this.createDefaultUsers();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.appSettings = JSON.parse(localStorage.getItem('appSettings')) || this.createDefaultSettings();
        this.categories = this.appSettings.categories;
        
        this.charts = {};
        this.init();
    }
    
    createDefaultUsers() {
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                password: 'admin123',
                name: 'Administrator',
                email: 'admin@finplatforma.com',
                phone: '',
                role: 'admin',
                avatar: 'https://via.placeholder.com/150x150/dc3545/ffffff?text=ADMIN',
                registrationDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            },
            {
                id: 2,
                username: 'user',
                password: 'user123',
                name: 'Korisnik',
                email: 'user@example.com',
                phone: '',
                role: 'user',
                avatar: 'https://via.placeholder.com/150x150/667eea/ffffff?text=USER',
                registrationDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            }
        ];
          localStorage.setItem('users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    
    createDefaultSettings() {
        const defaultSettings = {
            appName: 'Golden Balance',
            appLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiMwQTBBMEEiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCA0MCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIzIiBmaWxsPSIjRkZENzAwIi8+PGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjIwIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSItMjAiIHkxPSIyMCIgeDI9IjIwIiB5Mj0iMjAiIHN0cm9rZT0iI0ZGRDcwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iLTE1IiBjeT0iMjAiIHI9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRDcwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSIyMCIgcj0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZENzAwIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+',
            categories: {
                income: ['Plata', 'Freelance', 'Investicije', 'Poklon', 'Ostalo'],
                expense: ['Hrana', 'Transport', 'Stan', 'Zdravlje', 'Zabava', 'Odeca', 'Ostalo']
            }
        };
        
        localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
        return defaultSettings;
    }
    
    init() {
        this.updateAppBranding();
        
        if (!this.currentUser) {
            this.showLoginScreen();
        } else {
            this.showApp();
        }
    }
    
    updateAppBranding() {
        // Update logos
        const logos = document.querySelectorAll('#appLogo, #navLogo, #currentLogo');
        logos.forEach(logo => {
            if (logo) logo.src = this.appSettings.appLogo;
        });
        
        // Update app name
        document.title = this.appSettings.appName;
        const brandElements = document.querySelectorAll('.nav-brand span');
        brandElements.forEach(element => {
            if (element) element.textContent = this.appSettings.appName;
        });
    }
    
    showLoginScreen() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
        this.setupLoginListeners();
    }
    
    showApp() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        this.setupEventListeners();
        this.loadCategories();
        this.showSection('dashboard');
        this.updateDashboard();
        this.loadTransactions();
        this.loadBudgets();
        this.setupDateFilter();
        this.updateUserInterface();
        this.loadProfile();
        
        // Show admin link if user is admin
        if (this.currentUser.role === 'admin') {
            document.querySelector('.admin-only').style.display = 'flex';
            this.setupAdminPanel();
        }
    }
    
    setupLoginListeners() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        document.getElementById('adminLoginBtn').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('username').value = 'admin';
            document.getElementById('password').value = 'admin123';
        });
    }
    
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            user.lastActivity = new Date().toISOString();
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
            
            this.showApp();
            this.showNotification(`Dobrodošli, ${user.name}!`, 'success');
        } else {
            this.showNotification('Neispravno korisničko ime ili lozinka!', 'error');
        }
    }
    
    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showLoginScreen();
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        this.showNotification('Uspešno ste se odjavili!', 'info');
    }
      updateUserInterface() {
        if (document.getElementById('currentUser')) {
            document.getElementById('currentUser').textContent = this.currentUser.name;
        }
        
        // Update profile section - new profile form
        if (document.getElementById('profileName')) {
            document.getElementById('profileName').value = this.currentUser.name;
        }
        if (document.getElementById('profileEmail')) {
            document.getElementById('profileEmail').value = this.currentUser.email;
        }
        if (document.getElementById('profilePhone')) {
            document.getElementById('profilePhone').value = this.currentUser.phone || '';
        }
        if (document.getElementById('profileUsername')) {
            document.getElementById('profileUsername').value = this.currentUser.username;
        }
        if (document.getElementById('profileAvatarDisplay')) {
            document.getElementById('profileAvatarDisplay').src = this.currentUser.avatar;
        }
        
        // Update legacy profile elements if they exist
        if (document.getElementById('userAvatar')) {
            document.getElementById('userAvatar').src = this.currentUser.avatar;
        }
        if (document.getElementById('userTransactionCount')) {
            const userTransactions = this.transactions.filter(t => t.userId === this.currentUser.id || !t.userId);
            document.getElementById('userTransactionCount').textContent = userTransactions.length;
        }
        if (document.getElementById('userRegistrationDate')) {
            document.getElementById('userRegistrationDate').textContent = 
                new Date(this.currentUser.registrationDate).toLocaleDateString('sr-RS');
        }
        if (document.getElementById('userLastActivity')) {
            document.getElementById('userLastActivity').textContent = 
                new Date(this.currentUser.lastActivity).toLocaleDateString('sr-RS');
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Modal controls
        this.setupModalControls();
        
        // Form submissions
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        document.getElementById('budgetForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBudget();
        });
        
        // Filter controls
        document.getElementById('filterBtn').addEventListener('click', () => {
            this.updateDashboard();
        });
        
        document.getElementById('typeFilter').addEventListener('change', () => {
            this.loadTransactions();
        });
        
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.loadTransactions();
        });
        
        // Transaction type change
        document.getElementById('transactionType').addEventListener('change', (e) => {
            this.updateCategoryOptions(e.target.value);
        });
        
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });
        
        // Profile management
        this.setupProfileListeners();
        
        // Image uploads
        this.setupImageUploads();
        
        // Data export
        this.setupDataExport();
    }
      setupModalControls() {
        // Transaction modal
        document.getElementById('addTransactionBtn').addEventListener('click', () => {
            document.getElementById('transactionModal').style.display = 'block';
            // Resetuj datum na danas
            document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
            this.updateCategoryOptions('expense'); // Default to expense
        });
        
        document.getElementById('cancelTransaction').addEventListener('click', () => {
            document.getElementById('transactionModal').style.display = 'none';
            document.getElementById('transactionForm').reset();
        });
        
        // Transaction type change listener
        document.getElementById('transactionType').addEventListener('change', (e) => {
            this.updateCategoryOptions(e.target.value);
        });
        
        // Budget modal
        document.getElementById('addBudgetBtn').addEventListener('click', () => {
            document.getElementById('budgetModal').style.display = 'block';
            this.updateBudgetCategories();
        });
        
        document.getElementById('cancelBudget').addEventListener('click', () => {
            document.getElementById('budgetModal').style.display = 'none';
            document.getElementById('budgetForm').reset();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
                // Reset forms when modal is closed
                const forms = e.target.querySelectorAll('form');
                forms.forEach(form => form.reset());
            }
        });
        
        // Close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                modal.style.display = 'none';
                // Reset form when modal is closed
                const form = modal.querySelector('form');
                if (form) form.reset();
            });
        });
    }
    
    setupDateFilter() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        
        document.getElementById('endDate').value = endDate.toISOString().split('T')[0];
        document.getElementById('startDate').value = startDate.toISOString().split('T')[0];
    }
    
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        document.getElementById(sectionName).classList.add('active');
        
        // Load section-specific data
        switch(sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'transactions':
                this.loadTransactions();
                break;
            case 'budget':
                this.loadBudgets();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
        }
    }
    
    loadCategories() {
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.innerHTML = '<option value="">Sve kategorije</option>';
        
        [...this.categories.income, ...this.categories.expense].forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
      updateCategoryOptions(type) {
        const categorySelect = document.getElementById('transactionCategory');
        categorySelect.innerHTML = '<option value="">Izaberite kategoriju</option>';
        
        if (type && this.categories[type]) {
            this.categories[type].forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }
    }
      updateBudgetCategories() {
        const categorySelect = document.getElementById('budgetCategory');
        categorySelect.innerHTML = '<option value="">Izaberite kategoriju</option>';
        
        this.categories.expense.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
      addTransaction() {
        const form = document.getElementById('transactionForm');
        
        // Validacija polja
        const type = document.getElementById('transactionType').value;
        const amount = parseFloat(document.getElementById('transactionAmount').value);
        const category = document.getElementById('transactionCategory').value;
        const description = document.getElementById('transactionDescription').value;
        const date = document.getElementById('transactionDate').value;
        
        // Proverava da li su sva polja ispunjena
        if (!type || !amount || amount <= 0 || !category || !date) {
            this.showNotification('Molimo unesite sva obavezna polja!', 'error');
            return;
        }
        
        // Proverava da li je datum valjan
        const transactionDate = new Date(date);
        const today = new Date();
        if (transactionDate > today) {
            this.showNotification('Datum ne može biti u budućnosti!', 'error');
            return;
        }
        
        const transaction = {
            id: Date.now(),
            userId: this.currentUser.id,
            type: type,
            amount: amount,
            category: category,
            description: description.trim(),
            date: date,
            timestamp: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        this.saveTransactions();
        
        // Close modal and reset form
        document.getElementById('transactionModal').style.display = 'none';
        form.reset();
        
        // Reset kategorije na prazan select
        document.getElementById('transactionCategory').innerHTML = '<option value="">Izaberite kategoriju</option>';
        
        // Refresh displays
        this.updateDashboard();
        this.loadTransactions();
        this.updateUserInterface();
        this.updateBudgetProgress();
        
        const typeText = type === 'income' ? 'prihod' : 'rashod';
        this.showNotification(`${typeText.charAt(0).toUpperCase() + typeText.slice(1)} je uspešno dodat!`, 'success');
    }
      addBudget() {
        const form = document.getElementById('budgetForm');
        
        // Validacija polja
        const category = document.getElementById('budgetCategory').value;
        const amount = parseFloat(document.getElementById('budgetAmount').value);
        const period = document.getElementById('budgetPeriod').value;
        
        if (!category || !amount || amount <= 0 || !period) {
            this.showNotification('Molimo unesite sva obavezna polja!', 'error');
            return;
        }
        
        // Provera da li već postoji budžet za ovu kategoriju
        const existingBudget = this.budgets.find(b => b.category === category);
        if (existingBudget) {
            if (!confirm(`Već postoji budžet za kategoriju "${category}". Da li želite da ga zamenite?`)) {
                return;
            }
        }
        
        const budget = {
            id: Date.now(),
            category: category,
            amount: amount,
            period: period,
            spent: 0,
            timestamp: new Date().toISOString()
        };
        
        // Remove existing budget for the same category
        this.budgets = this.budgets.filter(b => b.category !== budget.category);
        
        this.budgets.push(budget);
        this.saveBudgets();
        
        // Close modal and reset form
        document.getElementById('budgetModal').style.display = 'none';
        form.reset();
        
        // Refresh display
        this.loadBudgets();
        this.updateBudgetProgress();
        
        this.showNotification('Budžet je uspešno dodat!', 'success');
    }
      deleteTransaction(id) {
        if (confirm('Da li ste sigurni da želite da obrišete ovu transakciju?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveTransactions();
            this.updateDashboard();
            this.loadTransactions();
            this.updateBudgetProgress();
            this.showNotification('Transakcija je obrisana!', 'info');
        }
    }
    
    deleteBudget(id) {
        if (confirm('Da li ste sigurni da želite da obrišete ovaj budžet?')) {
            this.budgets = this.budgets.filter(b => b.id !== id);
            this.saveBudgets();
            this.loadBudgets();
            this.showNotification('Budžet je obrisan!', 'info');
        }
    }
    
    getDateRange() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        return { startDate, endDate };
    }
    
    filterTransactionsByDate(transactions) {
        const { startDate, endDate } = this.getDateRange();
        
        if (!startDate || !endDate) return transactions;
        
        return transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
        });
    }
    
    updateDashboard() {
        const filteredTransactions = this.filterTransactionsByDate(this.transactions);
        
        const totalIncome = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const balance = totalIncome - totalExpense;
        
        document.getElementById('totalIncome').textContent = `${totalIncome.toLocaleString('sr-RS')} RSD`;
        document.getElementById('totalExpense').textContent = `${totalExpense.toLocaleString('sr-RS')} RSD`;
        document.getElementById('balance').textContent = `${balance.toLocaleString('sr-RS')} RSD`;
        
        // Update balance color
        const balanceElement = document.getElementById('balance');
        if (balance >= 0) {
            balanceElement.style.color = '#4CAF50';
        } else {
            balanceElement.style.color = '#f44336';
        }
        
        this.updateMonthlyChart(filteredTransactions);
    }
    
    updateMonthlyChart(transactions) {
        const ctx = document.getElementById('monthlyChart').getContext('2d');
        
        // Destroy existing chart
        if (this.charts.monthly) {
            this.charts.monthly.destroy();
        }
        
        // Group transactions by month
        const monthlyData = {};
        transactions.forEach(t => {
            const month = new Date(t.date).toLocaleDateString('sr-RS', { 
                year: 'numeric', 
                month: 'short' 
            });
            
            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expense: 0 };
            }
            
            monthlyData[month][t.type] += t.amount;
        });
        
        const labels = Object.keys(monthlyData).sort();
        const incomeData = labels.map(month => monthlyData[month].income);
        const expenseData = labels.map(month => monthlyData[month].expense);
        
        this.charts.monthly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Prihodi',
                        data: incomeData,
                        backgroundColor: 'rgba(76, 175, 80, 0.8)',
                        borderColor: 'rgba(76, 175, 80, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Rashodi',
                        data: expenseData,
                        backgroundColor: 'rgba(244, 67, 54, 0.8)',
                        borderColor: 'rgba(244, 67, 54, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('sr-RS') + ' RSD';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       context.parsed.y.toLocaleString('sr-RS') + ' RSD';
                            }
                        }
                    }
                }
            }
        });
    }
    
    loadTransactions() {
        const container = document.getElementById('transactionsList');
        container.innerHTML = '';
        
        // Filter by current user
        let userTransactions = this.transactions.filter(t => t.userId === this.currentUser.id || !t.userId);
        
        // Apply filters
        const typeFilter = document.getElementById('typeFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        
        if (typeFilter) {
            userTransactions = userTransactions.filter(t => t.type === typeFilter);
        }
        
        if (categoryFilter) {
            userTransactions = userTransactions.filter(t => t.category === categoryFilter);
        }
        
        // Sort by date (newest first)
        userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (userTransactions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nema transakcija za prikaz.</p>';
            return;
        }
        
        userTransactions.forEach(transaction => {
            const transactionElement = this.createTransactionElement(transaction);
            container.appendChild(transactionElement);
        });
    }
    
    createTransactionElement(transaction) {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        
        const formattedDate = new Date(transaction.date).toLocaleDateString('sr-RS');
        const formattedAmount = transaction.amount.toLocaleString('sr-RS');
        
        div.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon ${transaction.type}">
                    <i class="fas fa-${transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}"></i>
                </div>
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.category} • ${formattedDate}</p>
                </div>
            </div>
            <div class="transaction-right">
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${formattedAmount} RSD
                </div>
                <button class="btn-delete" onclick="app.deleteTransaction(${transaction.id})" 
                        style="background: #f44336; color: white; border: none; padding: 0.25rem 0.5rem; 
                               border-radius: 3px; cursor: pointer; margin-top: 0.5rem;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }
    
    loadBudgets() {
        const container = document.getElementById('budgetContainer');
        container.innerHTML = '';
        
        if (this.budgets.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nema postavljenih budžeta.</p>';
            return;
        }
        
        this.budgets.forEach(budget => {
            // Calculate spent amount for this budget
            const spent = this.transactions
                .filter(t => t.type === 'expense' && t.category === budget.category)
                .reduce((sum, t) => sum + t.amount, 0);
            
            budget.spent = spent;
            
            const budgetElement = this.createBudgetElement(budget);
            container.appendChild(budgetElement);
        });
        
        this.saveBudgets(); // Update spent amounts
    }
    
    createBudgetElement(budget) {
        const div = document.createElement('div');
        div.className = 'budget-card';
        
        const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
        const remaining = Math.max(budget.amount - budget.spent, 0);
        
        let statusClass = 'success';
        if (percentage > 80) statusClass = 'warning';
        if (percentage >= 100) statusClass = 'danger';
        
        div.innerHTML = `
            <div class="budget-header">
                <h3>${budget.category}</h3>
                <span class="budget-amount">${budget.amount.toLocaleString('sr-RS')} RSD</span>
            </div>
            <div class="budget-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
            <div class="budget-stats">
                <span>Potrošeno: ${budget.spent.toLocaleString('sr-RS')} RSD</span>
                <span>Preostalo: ${remaining.toLocaleString('sr-RS')} RSD</span>
            </div>
            <div class="budget-percentage" style="text-align: center; margin-top: 1rem; 
                 color: ${statusClass === 'danger' ? '#f44336' : statusClass === 'warning' ? '#ff9800' : '#4CAF50'}">
                ${percentage.toFixed(1)}% iskorišćeno
            </div>
            <button class="btn-delete" onclick="app.deleteBudget(${budget.id})" 
                    style="background: #f44336; color: white; border: none; padding: 0.5rem 1rem; 
                           border-radius: 5px; cursor: pointer; margin-top: 1rem; width: 100%;">
                <i class="fas fa-trash"></i> Obriši budžet
            </button>
        `;
        
        return div;
    }
    
    loadAnalytics() {
        this.updateCategoryChart();
        this.updateTrendChart();
    }
    
    updateCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        
        if (this.charts.category) {
            this.charts.category.destroy();
        }
        
        // Group expenses by category
        const categoryData = {};
        this.transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
            });
        
        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        
        if (labels.length === 0) {
            ctx.fillText('Nema podataka za prikaz', 10, 50);
            return;
        }
        
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ];
        
        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = data.reduce((sum, value) => sum + value, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return context.label + ': ' + 
                                       context.parsed.toLocaleString('sr-RS') + ' RSD (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    updateTrendChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        
        if (this.charts.trend) {
            this.charts.trend.destroy();
        }
        
        // Group by month for the last 6 months
        const monthlyData = {};
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        this.transactions
            .filter(t => new Date(t.date) >= sixMonthsAgo)
            .forEach(t => {
                const month = new Date(t.date).toLocaleDateString('sr-RS', { 
                    year: 'numeric', 
                    month: 'short' 
                });
                
                if (!monthlyData[month]) {
                    monthlyData[month] = { income: 0, expense: 0 };
                }
                
                monthlyData[month][t.type] += t.amount;
            });
        
        const labels = Object.keys(monthlyData).sort();
        const incomeData = labels.map(month => monthlyData[month]?.income || 0);
        const expenseData = labels.map(month => monthlyData[month]?.expense || 0);
        
        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Prihodi',
                        data: incomeData,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Rashodi',
                        data: expenseData,
                        borderColor: '#f44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('sr-RS') + ' RSD';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       context.parsed.y.toLocaleString('sr-RS') + ' RSD';
                            }
                        }
                    }
                }
            }
        });
    }
    
    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
    
    saveBudgets() {
        localStorage.setItem('budgets', JSON.stringify(this.budgets));
    }
    
    saveCurrentUser() {
        // Update user in users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.currentUser };
            localStorage.setItem('users', JSON.stringify(this.users));
        }
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    
    saveAppSettings() {
        localStorage.setItem('appSettings', JSON.stringify(this.appSettings));
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    updateBudgetProgress() {
        // Ažuriraj spent amount za sve budžete na osnovu trenutnih transakcija
        this.budgets.forEach(budget => {
            const spent = this.transactions
                .filter(t => t.type === 'expense' && t.category === budget.category)
                .reduce((sum, t) => sum + t.amount, 0);
            
            budget.spent = spent;
            
            // Proverava da li je budžet prekoračen
            if (spent > budget.amount) {
                this.showNotification(
                    `Upozorenje: Prekoračili ste budžet za kategoriju "${budget.category}"!`, 
                    'warning'
                );
            }
        });
        
        this.saveBudgets();
    }
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FinancialApp();
});

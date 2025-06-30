class AppState {
    constructor() {
        this.state = {
            user: null,
            transactions: [],
            budgets: [],
            settings: {},
            ui: {
                currentSection: 'dashboard',
                loading: false,
                errors: [],
                notifications: []
            }
        };
        
        this.subscribers = new Set();
    }

    // Singleton pattern
    static getInstance() {
        if (!AppState.instance) {
            AppState.instance = new AppState();
        }
        return AppState.instance;
    }

    // Subscribe to state changes
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    // Notify all subscribers
    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    }

    // Get state
    getState() {
        return { ...this.state };
    }

    // Update state
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.notify();
        this.persistState();
    }

    // Update specific part of state
    updateState(path, value) {
        const parts = path.split('.');
        let current = this.state;
        
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = value;
        this.notify();
        this.persistState();
    }

    // Reset state
    resetState() {
        this.state = {
            user: null,
            transactions: [],
            budgets: [],
            settings: {},
            ui: {
                currentSection: 'dashboard',
                loading: false,
                errors: [],
                notifications: []
            }
        };
        this.notify();
        this.persistState();
    }

    // Persist state to localStorage
    persistState() {
        try {
            const persistedState = {
                user: this.state.user,
                transactions: this.state.transactions,
                budgets: this.state.budgets,
                settings: this.state.settings
            };
            localStorage.setItem('appState', JSON.stringify(persistedState));
        } catch (e) {
            console.error('Error persisting state:', e);
        }
    }

    // Load state from localStorage
    loadPersistedState() {
        try {
            const persisted = localStorage.getItem('appState');
            if (persisted) {
                const parsed = JSON.parse(persisted);
                this.setState({
                    ...this.state,
                    user: parsed.user,
                    transactions: parsed.transactions,
                    budgets: parsed.budgets,
                    settings: parsed.settings
                });
            }
        } catch (e) {
            console.error('Error loading persisted state:', e);
        }
    }

    // Helper methods for common state updates
    setLoading(loading) {
        this.updateState('ui.loading', loading);
    }

    addError(error) {
        const errors = [...this.state.ui.errors, error];
        this.updateState('ui.errors', errors);
    }

    clearErrors() {
        this.updateState('ui.errors', []);
    }

    addNotification(notification) {
        const notifications = [...this.state.ui.notifications, notification];
        this.updateState('ui.notifications', notifications);
    }

    clearNotifications() {
        this.updateState('ui.notifications', []);
    }

    setCurrentSection(section) {
        this.updateState('ui.currentSection', section);
    }

    // Transaction methods
    addTransaction(transaction) {
        const transactions = [...this.state.transactions, transaction];
        this.updateState('transactions', transactions);
    }

    updateTransaction(id, updatedTransaction) {
        const transactions = this.state.transactions.map(t => 
            t.id === id ? { ...t, ...updatedTransaction } : t
        );
        this.updateState('transactions', transactions);
    }

    deleteTransaction(id) {
        const transactions = this.state.transactions.filter(t => t.id !== id);
        this.updateState('transactions', transactions);
    }

    // Budget methods
    addBudget(budget) {
        const budgets = [...this.state.budgets, budget];
        this.updateState('budgets', budgets);
    }

    updateBudget(id, updatedBudget) {
        const budgets = this.state.budgets.map(b => 
            b.id === id ? { ...b, ...updatedBudget } : b
        );
        this.updateState('budgets', budgets);
    }

    deleteBudget(id) {
        const budgets = this.state.budgets.filter(b => b.id !== id);
        this.updateState('budgets', budgets);
    }

    // User methods
    setUser(user) {
        this.updateState('user', user);
    }

    clearUser() {
        this.updateState('user', null);
    }

    // Settings methods
    updateSettings(settings) {
        this.updateState('settings', {
            ...this.state.settings,
            ...settings
        });
    }
}

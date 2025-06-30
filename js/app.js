class FinancialApp {
    constructor() {
        // Inicijalizacija state management-a
        this.state = AppState.getInstance();
        this.initialized = false;
        this.initializationQueue = [];
        
        // Inicijalizacija servisa i storage-a
        this.initializeApp();
    }

    async initializeApp() {
        try {
            // Inicijalizacija sigurnosti i error handling-a
            SecurityService.setupSecurityHeaders();
            SecurityService.initializeCSRFProtection();
            ErrorHandler.init();
            
            // Inicijalizacija storage-a i učitavanje podataka
            await this.initializeStorage();
            
            // Inicijalizacija ostalih servisa
            this.initializeServices();
            
            // Čekaj da DOM bude spreman
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
        } catch (error) {
            ErrorHandler.handleError(error, 'initialization');
        }
    }

    async initializeStorage() {
        const startTime = Date.now();
        try {
            // Koristi keš za često pristupane podatke
            this.transactions = await CacheService.memoize(
                'transactions',
                async () => await StorageService.getItem('transactions') || []
            );
            
            this.budgets = await CacheService.memoize(
                'budgets',
                async () => await StorageService.getItem('budgets') || []
            );
            
            this.users = await CacheService.memoize(
                'users',
                async () => await StorageService.getItem('users') || this.createDefaultUsers()
            );
            
            // Proveri validnost trenutne sesije
            const currentUser = await StorageService.getItem('currentUser');
            const token = localStorage.getItem('token');
            
            if (currentUser && token && AuthService.validateToken(token)) {
                this.currentUser = currentUser;
            } else {
                this.currentUser = null;
                AuthService.logout(); // Očisti nevalidnu sesiju
            }
            
            this.appSettings = await CacheService.memoize(
                'appSettings',
                async () => await StorageService.getItem('appSettings') || this.createDefaultSettings()
            );
            
            this.categories = this.appSettings.categories;

            PerformanceMonitor.measureOperationTime('initializeStorage', startTime);
        } catch (e) {
            ErrorHandler.handleError(e, 'storage');
            this.setDefaultState();
        }
    }

    initializeServices() {
        try {
            // Monitoring i performanse
            PerformanceMonitor.startMonitoring();
            
            // Keš
            CacheService.initializeCleanup();
            
            // Auto-save i sinhronizacija
            this.autoSave = AutoSaveService.getInstance();
            this.sync = SyncService.getInstance();
            
            // Logovanje aktivnosti
            ActivityLogger.init();
            
            // Notifikacije
            NotificationService.loadNotifications();
            
            // Network monitoring
            NetworkService.setupNetworkListeners(
                () => NotificationService.show('Izgubljena je internet veza', 'warning'),
                () => NotificationService.show('Internet veza je ponovo uspostavljena', 'success')
            );
        } catch (error) {
            ErrorHandler.handleError(error, 'services');
        }
    }

    init() {
        if (this.initialized) return;
        
        try {
            this.setupEventListeners();
            this.showApp();
            this.initialized = true;
            
            // Izvrši sve funkcije u redu čekanja
            while (this.initializationQueue.length > 0) {
                const fn = this.initializationQueue.shift();
                fn();
            }
        } catch (error) {
            ErrorHandler.handleError(error, 'initialization');
        }
    }

    setupEventListeners() {
        // Event listener za logout
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            AuthService.logout();
            window.location.reload();
        });

        // Event listener-i za forme
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!SecurityService.validateCSRFToken(form.querySelector('[name="_csrf"]')?.value)) {
                    e.preventDefault();
                    ErrorHandler.handleError('Invalid CSRF token', 'security');
                }
            });
        });

        // Event listener za promenu teme
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    showApp() {
        try {
            // Proveri autentifikaciju
            if (!this.currentUser) {
                document.getElementById('loginSection')?.classList.remove('hidden');
                document.getElementById('mainSection')?.classList.add('hidden');
                return;
            }

            // Prikaži glavnu aplikaciju
            document.getElementById('loginSection')?.classList.add('hidden');
            document.getElementById('mainSection')?.classList.remove('hidden');

            // Ažuriraj UI sa podacima korisnika
            this.updateUserInterface();

            // Učitaj module bazirano na roli korisnika
            if (this.currentUser.role === 'admin') {
                this.loadAdminModule();
            }
        } catch (error) {
            ErrorHandler.handleError(error, 'ui');
        }
    }

    updateUserInterface() {
        try {
            // Ažuriraj header
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = this.currentUser.name;
            }

            // Ažuriraj avatar
            const avatarElement = document.getElementById('userAvatar');
            if (avatarElement) {
                avatarElement.src = this.currentUser.avatar || 'assets/images/default-avatar.png';
            }

            // Prikaži/sakrij admin kontrole
            document.querySelectorAll('.admin-only').forEach(element => {
                element.style.display = this.currentUser.role === 'admin' ? '' : 'none';
            });

        } catch (error) {
            ErrorHandler.handleError(error, 'ui');
        }
    }

    loadAdminModule() {
        try {
            const adminSection = document.getElementById('adminSection');
            if (!adminSection) return;

            // Lazy load admin modula
            import('./admin.js')
                .then(module => {
                    this.admin = new module.default();
                })
                .catch(error => {
                    ErrorHandler.handleError(error, 'admin');
                });
        } catch (error) {
            ErrorHandler.handleError(error, 'admin');
        }
    }

    // Pomoćne metode
    queueInitialization(fn) {
        if (this.initialized) {
            fn();
        } else {
            this.initializationQueue.push(fn);
        }
    }

    clearSessionData() {
        CacheService.clearCache();
        this.transactions = [];
        this.budgets = [];
        this.currentUser = null;
    }
}

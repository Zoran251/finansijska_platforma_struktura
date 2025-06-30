class AutoSaveService {
    static instance = null;
    
    constructor() {
        if (AutoSaveService.instance) {
            return AutoSaveService.instance;
        }
        
        this.saveQueue = new Map();
        this.isSaving = false;
        this.saveInterval = 5000; // 5 sekundi
        this.maxRetries = 3;
        
        this.setupAutoSave();
        AutoSaveService.instance = this;
    }

    setupAutoSave() {
        setInterval(() => this.processSaveQueue(), this.saveInterval);
        
        // Sačuvaj pre napuštanja stranice
        window.addEventListener('beforeunload', () => {
            this.processSaveQueueSync();
        });
    }

    async queueSave(key, data) {
        this.saveQueue.set(key, data);
        
        try {
            await this.processSaveQueue();
        } catch (error) {
            console.error('Error in queueSave:', error);
            NotificationService.show('Problem sa čuvanjem podataka', 'error');
        }
    }

    async processSaveQueue() {
        if (this.isSaving || this.saveQueue.size === 0) return;
        
        this.isSaving = true;
        const savedItems = new Map();
        
        try {
            for (const [key, data] of this.saveQueue.entries()) {
                let retries = 0;
                let saved = false;
                
                while (!saved && retries < this.maxRetries) {
                    try {
                        await StorageService.setItem(key, data);
                        saved = true;
                        savedItems.set(key, true);
                    } catch (error) {
                        retries++;
                        if (retries === this.maxRetries) {
                            console.error(`Failed to save ${key} after ${this.maxRetries} attempts`);
                            NotificationService.show(`Problem sa čuvanjem podataka za ${key}`, 'error');
                        }
                        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
                    }
                }
            }
        } finally {
            // Ukloni uspešno sačuvane stavke iz queue-a
            savedItems.forEach((_, key) => this.saveQueue.delete(key));
            this.isSaving = false;
        }
    }

    processSaveQueueSync() {
        if (this.saveQueue.size === 0) return;
        
        for (const [key, data] of this.saveQueue.entries()) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                this.saveQueue.delete(key);
            } catch (error) {
                console.error(`Error saving ${key}:`, error);
            }
        }
    }

    static getInstance() {
        if (!AutoSaveService.instance) {
            AutoSaveService.instance = new AutoSaveService();
        }
        return AutoSaveService.instance;
    }
}

class SyncService {
    constructor() {
        this.syncInterval = 60000; // 1 minut
        this.lastSync = null;
        this.isSyncing = false;
        this.setupSync();
    }

    setupSync() {
        // Započni sinhronizaciju kada je aplikacija online
        window.addEventListener('online', () => {
            this.sync();
        });

        // Periodična sinhronizacija
        setInterval(() => {
            if (navigator.onLine && !this.isSyncing) {
                this.sync();
            }
        }, this.syncInterval);
    }

    async sync() {
        if (this.isSyncing) return;
        
        this.isSyncing = true;
        const startTime = Date.now();
        
        try {
            // Sinhronizuj transakcije
            await this.syncTransactions();
            
            // Sinhronizuj budžete
            await this.syncBudgets();
            
            // Sinhronizuj podešavanja
            await this.syncSettings();
            
            this.lastSync = new Date().toISOString();
            
            const syncTime = Date.now() - startTime;
            console.log(`Sync completed in ${syncTime}ms`);
            
            // Ako je sinhronizacija trajala duže od 5 sekundi, povećaj interval
            if (syncTime > 5000) {
                this.syncInterval = Math.min(this.syncInterval * 1.5, 300000); // max 5 minuta
            } else {
                this.syncInterval = Math.max(this.syncInterval * 0.8, 60000); // min 1 minut
            }
            
        } catch (error) {
            console.error('Sync error:', error);
            NotificationService.show('Problem sa sinhronizacijom podataka', 'error');
        } finally {
            this.isSyncing = false;
        }
    }

    async syncTransactions() {
        try {
            const localTransactions = await StorageService.getItem('transactions') || [];
            const localTimestamp = await StorageService.getItem('transactionsTimestamp') || 0;
            
            // U pravoj implementaciji, ovde bi bio poziv ka serveru
            // const serverResponse = await NetworkService.get('/api/transactions?since=' + localTimestamp);
            
            // Simulacija serverskog odgovora
            const serverTransactions = localTransactions;
            
            // Spoji lokalne i serverske transakcije
            const mergedTransactions = this.mergeData(localTransactions, serverTransactions);
            
            await StorageService.setItem('transactions', mergedTransactions);
            await StorageService.setItem('transactionsTimestamp', Date.now());
            
        } catch (error) {
            console.error('Error syncing transactions:', error);
            throw error;
        }
    }

    async syncBudgets() {
        try {
            const localBudgets = await StorageService.getItem('budgets') || [];
            const localTimestamp = await StorageService.getItem('budgetsTimestamp') || 0;
            
            // Simulacija serverskog odgovora
            const serverBudgets = localBudgets;
            
            // Spoji lokalne i serverske budžete
            const mergedBudgets = this.mergeData(localBudgets, serverBudgets);
            
            await StorageService.setItem('budgets', mergedBudgets);
            await StorageService.setItem('budgetsTimestamp', Date.now());
            
        } catch (error) {
            console.error('Error syncing budgets:', error);
            throw error;
        }
    }

    async syncSettings() {
        try {
            const localSettings = await StorageService.getItem('appSettings');
            const localTimestamp = await StorageService.getItem('settingsTimestamp') || 0;
            
            // Simulacija serverskog odgovora
            const serverSettings = localSettings;
            
            if (serverSettings) {
                await StorageService.setItem('appSettings', serverSettings);
                await StorageService.setItem('settingsTimestamp', Date.now());
            }
            
        } catch (error) {
            console.error('Error syncing settings:', error);
            throw error;
        }
    }

    mergeData(local, server) {
        // Spajanje podataka na osnovu ID-ja i vremenske oznake
        const merged = new Map();
        
        // Dodaj lokalne podatke
        local.forEach(item => {
            merged.set(item.id, item);
        });
        
        // Dodaj ili ažuriraj sa serverskim podacima
        server.forEach(item => {
            const existing = merged.get(item.id);
            if (!existing || existing.timestamp < item.timestamp) {
                merged.set(item.id, item);
            }
        });
        
        return Array.from(merged.values()).sort((a, b) => b.timestamp - a.timestamp);
    }

    static getInstance() {
        if (!SyncService.instance) {
            SyncService.instance = new SyncService();
        }
        return SyncService.instance;
    }
}

class SettingsManager {
    static instance = null;
    static defaultSettings = {
        theme: 'light',
        language: 'sr',
        currency: 'RSD',
        dateFormat: 'DD.MM.YYYY',
        numberFormat: '1.234,56',
        notifications: {
            enabled: true,
            sound: true,
            desktop: false
        },
        display: {
            showDecimals: true,
            compactNumbers: false,
            chartAnimations: true
        },
        security: {
            autoLogout: 30, // minutes
            sessionTimeout: 60, // minutes
            requirePasswordChange: 90 // days
        },
        sync: {
            autoSync: true,
            syncInterval: 5, // minutes
            syncOnStartup: true
        },
        performance: {
            cacheTimeout: 5, // minutes
            maxCacheSize: 50, // MB
            prefetch: true
        }
    };

    constructor() {
        if (SettingsManager.instance) {
            return SettingsManager.instance;
        }
        
        this.settings = {};
        this.loadSettings();
        SettingsManager.instance = this;
    }

    async loadSettings() {
        try {
            const stored = await StorageService.getItem('appSettings');
            this.settings = stored ? 
                this.mergeSettings(this.defaultSettings, stored) : 
                { ...this.defaultSettings };
        } catch (error) {
            console.error('Error loading settings:', error);
            this.settings = { ...this.defaultSettings };
        }
    }

    async saveSettings() {
        try {
            await StorageService.setItem('appSettings', this.settings);
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    }

    mergeSettings(defaults, stored) {
        const merged = { ...defaults };
        
        for (const [key, value] of Object.entries(stored)) {
            if (value && typeof value === 'object') {
                merged[key] = this.mergeSettings(defaults[key] || {}, value);
            } else if (value !== undefined) {
                merged[key] = value;
            }
        }
        
        return merged;
    }

    get(path) {
        return this.getSettingByPath(this.settings, path);
    }

    async set(path, value) {
        this.setSettingByPath(this.settings, path, value);
        return this.saveSettings();
    }

    getSettingByPath(obj, path) {
        return path.split('.').reduce((curr, key) => 
            curr && curr[key] !== undefined ? curr[key] : undefined, obj);
    }

    setSettingByPath(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((curr, key) => {
            if (!curr[key] || typeof curr[key] !== 'object') {
                curr[key] = {};
            }
            return curr[key];
        }, obj);
        target[lastKey] = value;
    }

    reset(path = null) {
        if (path) {
            this.setSettingByPath(
                this.settings, 
                path, 
                this.getSettingByPath(this.defaultSettings, path)
            );
        } else {
            this.settings = { ...this.defaultSettings };
        }
        return this.saveSettings();
    }

    validate(settings = this.settings) {
        const errors = [];
        
        // Provera obaveznih polja
        if (!settings.language) errors.push('Jezik je obavezan');
        if (!settings.currency) errors.push('Valuta je obavezna');
        
        // Provera validnih vrednosti
        if (settings.security.autoLogout < 5) {
            errors.push('Automatsko odjavljivanje mora biti najmanje 5 minuta');
        }
        if (settings.security.sessionTimeout < settings.security.autoLogout) {
            errors.push('Timeout sesije mora biti veći od vremena za automatsko odjavljivanje');
        }
        
        // Provera performansi
        if (settings.performance.maxCacheSize > 100) {
            errors.push('Maksimalna veličina keša ne može biti veća od 100MB');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    export() {
        return {
            settings: this.settings,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
    }

    async import(data) {
        try {
            if (!data.settings || !data.version) {
                throw new Error('Nevažeći format podataka');
            }
            
            const validation = this.validate(data.settings);
            if (!validation.isValid) {
                throw new Error(`Nevažeće postavke: ${validation.errors.join(', ')}`);
            }
            
            this.settings = this.mergeSettings(this.defaultSettings, data.settings);
            await this.saveSettings();
            
            return true;
        } catch (error) {
            console.error('Error importing settings:', error);
            return false;
        }
    }

    watch(path, callback) {
        if (!this.watchers) this.watchers = new Map();
        
        if (!this.watchers.has(path)) {
            this.watchers.set(path, new Set());
        }
        
        this.watchers.get(path).add(callback);
        
        return () => this.watchers.get(path).delete(callback);
    }

    notifyWatchers(path, value) {
        if (!this.watchers) return;
        
        this.watchers.forEach((callbacks, watchPath) => {
            if (path.startsWith(watchPath)) {
                callbacks.forEach(callback => callback(value));
            }
        });
    }

    static getInstance() {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager();
        }
        return SettingsManager.instance;
    }
}

class CacheService {
    static cache = new Map();
    static defaultTTL = 5 * 60 * 1000; // 5 minuta

    static async get(key) {
        const item = this.cache.get(key);
        
        if (!item) return null;

        if (Date.now() > item.expires) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    static set(key, value, ttl = this.defaultTTL) {
        this.cache.set(key, {
            value,
            expires: Date.now() + ttl
        });
    }

    static delete(key) {
        this.cache.delete(key);
    }

    static clear() {
        this.cache.clear();
    }

    // Metoda za keširanje rezultata funkcije
    static async memoize(key, fn, ttl = this.defaultTTL) {
        const cached = await this.get(key);
        if (cached !== null) {
            return cached;
        }

        const result = await fn();
        this.set(key, result, ttl);
        return result;
    }

    // Metoda za pred-učitavanje podataka
    static preload(key, fn, ttl = this.defaultTTL) {
        setTimeout(async () => {
            try {
                const result = await fn();
                this.set(key, result, ttl);
            } catch (error) {
                console.error('Preload error:', error);
            }
        }, 0);
    }

    // Pomoćna metoda za generisanje ključa keša
    static generateKey(prefix, params) {
        return `${prefix}:${JSON.stringify(params)}`;
    }

    // Metoda za invalidaciju povezanih ključeva
    static invalidateByPrefix(prefix) {
        for (const key of this.cache.keys()) {
            if (key.startsWith(prefix)) {
                this.cache.delete(key);
            }
        }
    }

    // Periodično čišćenje isteklih stavki
    static initializeCleanup(interval = 60000) { // Default: 1 minut
        setInterval(() => {
            const now = Date.now();
            for (const [key, item] of this.cache.entries()) {
                if (now > item.expires) {
                    this.cache.delete(key);
                }
            }
        }, interval);
    }
}

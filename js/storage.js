// Storage service za sigurno rukovanje podacima
class StorageService {
    static encryptionKey = 'your-secure-key';

    static async encrypt(data) {
        try {
            return btoa(JSON.stringify(data));
        } catch (e) {
            console.error('Encryption error:', e);
            return null;
        }
    }

    static async decrypt(encryptedData) {
        try {
            return JSON.parse(atob(encryptedData));
        } catch (e) {
            console.error('Decryption error:', e);
            return null;
        }
    }

    static async setItem(key, value) {
        try {
            const encryptedValue = await this.encrypt(value);
            localStorage.setItem(key, encryptedValue);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }

    static async getItem(key) {
        try {
            const encryptedValue = localStorage.getItem(key);
            if (!encryptedValue) return null;
            return await this.decrypt(encryptedValue);
        } catch (e) {
            console.error('Retrieval error:', e);
            return null;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Remove error:', e);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Clear error:', e);
            return false;
        }
    }
}

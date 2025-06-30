class NetworkService {
    static async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Network request failed:', error);
            throw error;
        }
    }

    static async get(url) {
        return this.request(url, { method: 'GET' });
    }

    static async post(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async put(url, data) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async delete(url) {
        return this.request(url, { method: 'DELETE' });
    }

    static async uploadFile(url, file, onProgress) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            
            formData.append('file', file);
            
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && onProgress) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    onProgress(percentComplete);
                }
            });
            
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`Upload failed with status ${xhr.status}`));
                }
            });
            
            xhr.addEventListener('error', () => reject(new Error('Upload failed')));
            xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));
            
            xhr.open('POST', url);
            xhr.send(formData);
        });
    }

    static isOnline() {
        return navigator.onLine;
    }

    static checkConnection() {
        return new Promise((resolve) => {
            if (!this.isOnline()) {
                resolve(false);
                return;
            }

            const timeoutId = setTimeout(() => resolve(false), 5000);

            fetch('https://www.google.com/favicon.ico', {
                mode: 'no-cors',
            })
                .then(() => {
                    clearTimeout(timeoutId);
                    resolve(true);
                })
                .catch(() => {
                    clearTimeout(timeoutId);
                    resolve(false);
                });
        });
    }

    static setupNetworkListeners(onOffline, onOnline) {
        window.addEventListener('offline', () => {
            console.log('Network connection lost');
            if (onOffline) onOffline();
        });

        window.addEventListener('online', async () => {
            console.log('Network connection restored');
            const isConnected = await this.checkConnection();
            if (isConnected && onOnline) onOnline();
        });
    }

    static async retryWithBackoff(fn, maxAttempts = 3) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                
                const backoffTime = Math.min(1000 * Math.pow(2, attempt), 10000);
                await new Promise(resolve => setTimeout(resolve, backoffTime));
            }
        }
    }
}

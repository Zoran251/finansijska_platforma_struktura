class Config {
    static BASE_URL = 'https://zoran251.github.io/finansijska_platforma_struktura';
    
    static getFullPath(path) {
        return `${this.BASE_URL}${path}`;
    }
    
    static async init() {
        try {
            // Podesi putanje za resurse
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                if (!link.href.startsWith('http')) {
                    link.href = this.getFullPath(link.getAttribute('href'));
                }
            });

            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                if (!script.src.startsWith('http')) {
                    script.src = this.getFullPath(script.getAttribute('src'));
                }
            });

            // Podesi base URL za API pozive
            window.apiBaseUrl = this.BASE_URL;
            
            return true;
        } catch (error) {
            console.error('Config initialization error:', error);
            return false;
        }
    }
}

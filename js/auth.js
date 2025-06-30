// Auth service za sigurnu autentifikaciju
class AuthService {
    static SECRET_KEY = 'your-256-bit-secret'; // U produkciji, ovo bi trebalo biti env varijabla
    static SALT_ROUNDS = 10;
    
    static async hashPassword(password) {
        // Dodajemo salt i pepper za dodatnu zaštitu
        const pepper = crypto.randomBytes(32).toString('hex');
        const encoder = new TextEncoder();
        const data = encoder.encode(password + pepper);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    static generateToken(user) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            id: user.id,
            username: user.username,
            role: user.role,
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24h
        }));
        
        // Dodajemo signature
        const signature = this.signToken(`${header}.${payload}`);
        return `${header}.${payload}.${signature}`;
    }

    static signToken(str) {
        return crypto.createHmac('sha256', this.SECRET_KEY)
            .update(str)
            .digest('base64');
    }

    static validateToken(token) {
        try {
            const [header, payload, signature] = token.split('.');
            
            // Proveri signature
            const expectedSignature = this.signToken(`${header}.${payload}`);
            if (signature !== expectedSignature) {
                return false;
            }
            
            // Proveri expiration
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.exp > Date.now();
        } catch (e) {
            ErrorHandler.handleError(e, 'auth');
            return false;
        }
    }

    static async login(username, password) {
        try {
            // Proveri broj pokušaja prijave
            const loginCheck = SecurityService.checkLoginAttempts(username);
            if (!loginCheck.allowed) {
                return { error: loginCheck.message };
            }

            // Validiraj input
            if (!ValidationService.validate(username, 'username')) {
                SecurityService.recordLoginAttempt(username, false);
                return { error: 'Neispravno korisničko ime' };
            }

            const hashedPassword = await this.hashPassword(password);
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === hashedPassword);

            if (user) {
                // Uspešna prijava
                SecurityService.recordLoginAttempt(username, true);
                const token = this.generateToken(user);
                
                // Ažuriraj lastLogin
                user.lastLogin = new Date().toISOString();
                localStorage.setItem('users', JSON.stringify(users));
                
                return { token, user: { ...user, password: undefined } };
            }

            // Neuspešna prijava
            SecurityService.recordLoginAttempt(username, false);
            return { error: 'Pogrešni kredencijali' };
        } catch (e) {
            ErrorHandler.handleError(e, 'auth');
            return { error: 'Greška prilikom prijave' };
        }
    }

    static logout() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            sessionStorage.clear();
            
            // Očisti sensitive podatke
            if (window.app) {
                window.app.currentUser = null;
                window.app.clearSessionData();
            }
        } catch (e) {
            ErrorHandler.handleError(e, 'auth');
        }
    }
}

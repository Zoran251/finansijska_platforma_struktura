// Validation service za sigurnu validaciju podataka
class ValidationService {
    static patterns = {
        username: /^[a-zA-Z0-9_]{3,20}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        amount: /^\d+(\.\d{1,2})?$/,
        phone: /^\+?[\d\s-]{10,}$/,
        date: /^\d{4}-\d{2}-\d{2}$/,
        time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
    };

    static messages = {
        required: 'Polje je obavezno',
        username: 'Korisničko ime mora sadržati 3-20 karaktera (slova, brojevi i _)',
        password: 'Lozinka mora sadržati minimum 8 karaktera, jedno slovo, jedan broj i jedan specijalni karakter',
        email: 'Unesite validnu email adresu',
        amount: 'Unesite validan iznos (npr. 123.45)',
        phone: 'Unesite validan broj telefona',
        date: 'Unesite validan datum (YYYY-MM-DD)',
        time: 'Unesite validno vreme (HH:MM)',
        url: 'Unesite validan URL',
        numeric: 'Dozvoljen je samo unos brojeva',
        maxLength: 'Maksimalna dužina je {0} karaktera',
        minLength: 'Minimalna dužina je {0} karaktera',
        range: 'Vrednost mora biti između {0} i {1}'
    };

    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return SecurityService.validateInput(input);
    }

    static validate(value, type, options = {}) {
        if (value === null || value === undefined) {
            return !options.required;
        }

        const sanitizedValue = this.sanitizeInput(value.toString());

        if (options.required && !sanitizedValue) {
            return false;
        }

        if (options.maxLength && sanitizedValue.length > options.maxLength) {
            return false;
        }

        if (options.minLength && sanitizedValue.length < options.minLength) {
            return false;
        }

        if (this.patterns[type]) {
            return this.patterns[type].test(sanitizedValue);
        }

        return true;
    }

    static validateTransaction(transaction) {
        const errors = [];

        if (!transaction.type || !['income', 'expense', 'transfer'].includes(transaction.type)) {
            errors.push('Nevažeći tip transakcije');
        }

        if (!this.validate(transaction.amount.toString(), 'amount')) {
            errors.push('Nevažeći iznos');
        }

        if (!transaction.category || typeof transaction.category !== 'string') {
            errors.push('Kategorija je obavezna');
        }

        if (!transaction.date || !this.validate(transaction.date, 'date')) {
            errors.push('Nevažeći datum');
        }

        if (transaction.description && !this.validate(transaction.description, 'text', { maxLength: 200 })) {
            errors.push('Opis je predugačak (max 200 karaktera)');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateBudget(budget) {
        const errors = [];

        if (!budget.category || typeof budget.category !== 'string') {
            errors.push('Kategorija je obavezna');
        }

        if (!this.validate(budget.amount.toString(), 'amount')) {
            errors.push('Nevažeći iznos');
        }

        if (!budget.period || !['monthly', 'yearly'].includes(budget.period)) {
            errors.push('Nevažeći period');
        }

        if (budget.alerts) {
            if (!Array.isArray(budget.alerts)) {
                errors.push('Nevažeći format upozorenja');
            } else {
                budget.alerts.forEach(alert => {
                    if (!alert.threshold || !this.validate(alert.threshold.toString(), 'amount')) {
                        errors.push('Nevažeći prag za upozorenje');
                    }
                });
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateUser(user) {
        const errors = [];

        if (!this.validate(user.username, 'username', { required: true })) {
            errors.push(this.messages.username);
        }

        if (!this.validate(user.email, 'email', { required: true })) {
            errors.push(this.messages.email);
        }

        if (user.password && !this.validate(user.password, 'password')) {
            errors.push(this.messages.password);
        }

        if (user.phone && !this.validate(user.phone, 'phone')) {
            errors.push(this.messages.phone);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateProfile(profile) {
        const errors = [];

        if (!this.validate(profile.name, 'text', { required: true, minLength: 2 })) {
            errors.push('Ime je obavezno (minimum 2 karaktera)');
        }

        if (!this.validate(profile.email, 'email', { required: true })) {
            errors.push(this.messages.email);
        }

        if (profile.phone && !this.validate(profile.phone, 'phone')) {
            errors.push(this.messages.phone);
        }

        if (profile.avatar && profile.avatar !== '') {
            const fileValidation = SecurityService.validateFileUpload({
                type: profile.avatar.split(';')[0].split('/')[1],
                size: profile.avatar.length * 0.75 // Približna veličina base64 stringa
            });

            if (!fileValidation.isValid) {
                errors.push(fileValidation.error);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

class DataValidator {
    static patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        phone: /^\+?[\d\s-]{10,}$/,
        amount: /^\d+(\.\d{1,2})?$/,
        date: /^\d{4}-\d{2}-\d{2}$/
    };

    static rules = {
        required: {
            validate: value => value !== null && value !== undefined && value !== '',
            message: 'Polje je obavezno'
        },
        email: {
            validate: value => this.patterns.email.test(value),
            message: 'Nevažeća email adresa'
        },
        password: {
            validate: value => this.patterns.password.test(value),
            message: 'Lozinka mora imati najmanje 8 karaktera, jedno slovo i jedan broj'
        },
        phone: {
            validate: value => !value || this.patterns.phone.test(value),
            message: 'Nevažeći broj telefona'
        },
        amount: {
            validate: value => this.patterns.amount.test(value) && parseFloat(value) > 0,
            message: 'Nevažeći iznos'
        },
        date: {
            validate: value => this.patterns.date.test(value) && !isNaN(new Date(value)),
            message: 'Nevažeći datum'
        },
        maxLength: (max) => ({
            validate: value => !value || value.length <= max,
            message: `Maksimalna dužina je ${max} karaktera`
        }),
        minLength: (min) => ({
            validate: value => !value || value.length >= min,
            message: `Minimalna dužina je ${min} karaktera`
        }),
        range: (min, max) => ({
            validate: value => {
                const num = parseFloat(value);
                return !isNaN(num) && num >= min && num <= max;
            },
            message: `Vrednost mora biti između ${min} i ${max}`
        }),
        matches: (field) => ({
            validate: (value, formData) => value === formData[field],
            message: 'Vrednosti se ne poklapaju'
        })
    };

    static validateField(value, rules) {
        for (const rule of rules) {
            const validator = typeof rule === 'string' ? 
                this.rules[rule] : 
                this.rules[rule.type](rule.param);
            
            if (!validator.validate(value)) {
                return {
                    isValid: false,
                    error: rule.message || validator.message
                };
            }
        }
        
        return { isValid: true };
    }

    static validateForm(formData, validationRules) {
        const errors = {};
        let isValid = true;
        
        for (const [field, rules] of Object.entries(validationRules)) {
            const validation = this.validateField(formData[field], rules);
            
            if (!validation.isValid) {
                errors[field] = validation.error;
                isValid = false;
            }
        }
        
        return { isValid, errors };
    }

    static validateTransaction(transaction) {
        const rules = {
            type: ['required'],
            amount: ['required', 'amount'],
            category: ['required'],
            date: ['required', 'date'],
            description: [{ type: 'maxLength', param: 200 }]
        };
        
        return this.validateForm(transaction, rules);
    }

    static validateBudget(budget) {
        const rules = {
            category: ['required'],
            amount: ['required', 'amount'],
            period: ['required']
        };
        
        return this.validateForm(budget, rules);
    }

    static validateUser(user) {
        const rules = {
            username: ['required', { type: 'minLength', param: 3 }],
            password: ['required', 'password'],
            email: ['required', 'email'],
            phone: ['phone']
        };
        
        return this.validateForm(user, rules);
    }

    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/[<>]/g, '')
            .trim();
    }

    static sanitizeObject(obj) {
        const sanitized = {};
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                sanitized[key] = this.sanitizeObject(value);
            } else if (typeof value === 'string') {
                sanitized[key] = this.sanitizeInput(value);
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }

    static validateSettings(settings) {
        const rules = {
            'theme': ['required'],
            'language': ['required'],
            'currency': ['required'],
            'security.autoLogout': [{ type: 'range', param: [5, 120] }],
            'security.sessionTimeout': [{ type: 'range', param: [10, 240] }],
            'sync.syncInterval': [{ type: 'range', param: [1, 60] }]
        };
        
        const errors = {};
        let isValid = true;
        
        for (const [path, fieldRules] of Object.entries(rules)) {
            const value = path.split('.').reduce((obj, key) => obj && obj[key], settings);
            const validation = this.validateField(value, fieldRules);
            
            if (!validation.isValid) {
                errors[path] = validation.error;
                isValid = false;
            }
        }
        
        return { isValid, errors };
    }
}

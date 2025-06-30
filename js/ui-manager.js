class UIManager {
    static loadingElements = new Set();
    static modalStack = [];
    
    static showLoading(elementId = 'app') {
        const element = document.getElementById(elementId);
        if (!element || this.loadingElements.has(elementId)) return;
        
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">Učitavanje...</div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(loader);
        
        this.loadingElements.add(elementId);
    }
    
    static hideLoading(elementId = 'app') {
        const element = document.getElementById(elementId);
        if (!element || !this.loadingElements.has(elementId)) return;
        
        const loader = element.querySelector('.loading-overlay');
        if (loader) {
            loader.remove();
        }
        
        this.loadingElements.delete(elementId);
    }
    
    static showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'block';
        this.modalStack.push(modalId);
        
        // Dodaj event listener za zatvaranje
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.onclick = () => this.hideModal(modalId);
        }
        
        // Zatvori modal na klik van modala
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.hideModal(modalId);
            }
        };
    }
    
    static hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'none';
        this.modalStack = this.modalStack.filter(id => id !== modalId);
        
        // Ako postoje još modali, prikaži poslednji
        const lastModal = this.modalStack[this.modalStack.length - 1];
        if (lastModal) {
            document.getElementById(lastModal).style.display = 'block';
        }
    }
    
    static showSection(sectionId) {
        // Sakrij sve sekcije
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Prikaži željenu sekciju
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
        
        // Ažuriraj aktivni link u navigaciji
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    static updateElement(elementId, content, type = 'text') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        switch (type) {
            case 'text':
                element.textContent = content;
                break;
            case 'html':
                element.innerHTML = content;
                break;
            case 'value':
                element.value = content;
                break;
            case 'src':
                element.src = content;
                break;
            case 'style':
                Object.assign(element.style, content);
                break;
        }
    }
    
    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (content) {
            element.innerHTML = content;
        }
        
        return element;
    }
    
    static appendElement(parentId, element) {
        const parent = document.getElementById(parentId);
        if (parent && element) {
            parent.appendChild(element);
        }
    }
    
    static removeElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.remove();
        }
    }
    
    static showError(message, type = 'error') {
        const errorContainer = document.createElement('div');
        errorContainer.className = `alert alert-${type}`;
        errorContainer.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        document.body.appendChild(errorContainer);
        
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
        
        errorContainer.querySelector('.close-alert').onclick = () => {
            errorContainer.remove();
        };
    }
    
    static updateChart(chartId, data, options = {}) {
        const ctx = document.getElementById(chartId);
        if (!ctx) return;
        
        // Uništi postojeći chart ako postoji
        if (window.charts && window.charts[chartId]) {
            window.charts[chartId].destroy();
        }
        
        // Inicijalizuj charts objekat ako ne postoji
        if (!window.charts) {
            window.charts = {};
        }
        
        // Kreiraj novi chart
        window.charts[chartId] = new Chart(ctx, {
            ...data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                ...options
            }
        });
    }
    
    static setupFormValidation(formId, validationRules) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            
            let isValid = true;
            const formData = {};
            
            Object.entries(validationRules).forEach(([fieldName, rules]) => {
                const field = form.elements[fieldName];
                if (!field) return;
                
                const value = field.value;
                formData[fieldName] = value;
                
                rules.forEach(rule => {
                    if (!rule.validate(value)) {
                        isValid = false;
                        this.showFieldError(field, rule.message);
                    }
                });
            });
            
            if (isValid) {
                form.dispatchEvent(new CustomEvent('validSubmit', { detail: formData }));
            }
        };
    }
    
    static showFieldError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.classList.add('error');
        field.parentNode.appendChild(errorElement);
        
        setTimeout(() => {
            field.classList.remove('error');
            errorElement.remove();
        }, 3000);
    }
    
    static setupSearch(inputId, callback) {
        let timeout;
        const input = document.getElementById(inputId);
        if (!input) return;
        
        input.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(e.target.value);
            }, 300);
        });
    }
    
    static setupInfiniteScroll(containerId, loadMore) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let isLoading = false;
        
        container.addEventListener('scroll', () => {
            if (isLoading) return;
            
            const { scrollTop, scrollHeight, clientHeight } = container;
            
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                isLoading = true;
                
                loadMore().finally(() => {
                    isLoading = false;
                });
            }
        });
    }
}

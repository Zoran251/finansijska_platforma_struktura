class NotificationService {
    static notifications = [];
    static maxNotifications = 50;

    static notificationTypes = {
        success: {
            icon: 'fas fa-check-circle',
            color: '#4CAF50'
        },
        error: {
            icon: 'fas fa-exclamation-circle',
            color: '#f44336'
        },
        warning: {
            icon: 'fas fa-exclamation-triangle',
            color: '#ff9800'
        },
        info: {
            icon: 'fas fa-info-circle',
            color: '#2196F3'
        }
    };

    static show(message, type = 'info', duration = 5000) {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toISOString()
        };

        this.notifications.unshift(notification);
        
        // Održavaj maksimalnu veličinu
        if (this.notifications.length > this.maxNotifications) {
            this.notifications.pop();
        }

        // Sačuvaj u localStorage
        this.saveNotifications();

        // Prikaži notifikaciju
        this.displayNotification(notification, duration);

        return notification.id;
    }

    static displayNotification(notification, duration) {
        const { icon, color } = this.notificationTypes[notification.type];
        
        const element = document.createElement('div');
        element.className = 'notification-toast';
        element.id = `notification-${notification.id}`;
        
        element.innerHTML = `
            <div class="notification-content" style="border-left: 4px solid ${color}">
                <i class="${icon}" style="color: ${color}"></i>
                <span>${this.escapeHtml(notification.message)}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Stilovi
        Object.assign(element.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '9999',
            maxWidth: '300px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease-out'
        });

        // Dodaj CSS animacije
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            @keyframes slideOut {
                from { transform: translateX(0); }
                to { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);

        // Dodaj u DOM
        document.body.appendChild(element);

        // Event listener za zatvaranje
        const closeBtn = element.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.close(notification.id));

        // Automatsko zatvaranje nakon zadatog vremena
        if (duration > 0) {
            setTimeout(() => this.close(notification.id), duration);
        }
    }

    static close(id) {
        const element = document.getElementById(`notification-${id}`);
        if (element) {
            element.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(element)) {
                    document.body.removeChild(element);
                }
            }, 300);
        }
    }

    static escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static saveNotifications() {
        try {
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
        } catch (e) {
            console.error('Error saving notifications:', e);
        }
    }

    static loadNotifications() {
        try {
            const saved = localStorage.getItem('notifications');
            if (saved) {
                this.notifications = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading notifications:', e);
            this.notifications = [];
        }
    }

    static getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    static markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
        }
    }

    static markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
    }

    static clearAll() {
        this.notifications = [];
        this.saveNotifications();
        // Ukloni sve aktivne notifikacije iz DOM-a
        document.querySelectorAll('.notification-toast').forEach(el => {
            document.body.removeChild(el);
        });
    }
}

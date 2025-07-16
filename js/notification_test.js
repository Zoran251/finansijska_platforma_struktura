// Testna skripta za notifikacije

// Funkcija za kreiranje test notifikacije
function createTestNotification(title, message, type) {
    // Provera da li je ChatBotKB dostupan
    if (typeof ChatBotKB !== 'undefined' && ChatBotKB.createTestNotification) {
        return ChatBotKB.createTestNotification(title, message, type);
    }
    
    // Ako ChatBotKB nije dostupan, koristimo UserNotifications
    if (typeof UserNotifications !== 'undefined' && UserNotifications.addNotification) {
        UserNotifications.addNotification({
            title: title || "Test notifikacija",
            message: message || "Ovo je test notifikacija za proveru sistema.",
            type: type || "Obaveštenje"
        });
        return true;
    }
    
    // Direktan pristup localStorage kao poslednja opcija
    try {
        const userNotifications = localStorage.getItem('userNotifications') ? 
            JSON.parse(localStorage.getItem('userNotifications')) : [];
        
        userNotifications.push({
            id: 'user_notif_' + Date.now(),
            title: title || "Test notifikacija",
            message: message || "Ovo je test notifikacija za proveru sistema.",
            type: type || "Obaveštenje",
            timestamp: new Date().toISOString(),
            read: false
        });
        
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
        
        // Ažuriranje bedža ako postoji
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const unreadCount = userNotifications.filter(notif => !notif.read).length;
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
        
        return true;
    } catch (error) {
        console.error("Greška pri kreiranju notifikacije:", error);
        return false;
    }
}

// Test funkcija za inicijalizaciju notifikacionog centra
function initNotificationCenter() {
    // Provera da li je container već dostupan
    let notificationContainer = document.querySelector('.notification-bell');
    
    // Ako nema containera, kreiramo ga
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-bell';
        
        // Dodavanje zvonca
        const bellIcon = document.createElement('i');
        bellIcon.className = 'fas fa-bell';
        notificationContainer.appendChild(bellIcon);
        
        // Dodavanje bedža
        const badge = document.createElement('span');
        badge.className = 'notification-badge';
        badge.style.display = 'none';
        badge.textContent = '0';
        notificationContainer.appendChild(badge);
        
        // Dodavanje panela
        const panel = document.createElement('div');
        panel.className = 'notification-panel';
        panel.style.display = 'none';
        
        // Dodavanje header-a panela
        const header = document.createElement('div');
        header.className = 'notification-header';
        header.innerHTML = `
            <span class="notification-title">Notifikacije</span>
            <div class="notification-controls">
                <a id="markAllRead"><i class="fas fa-check-double"></i> Označi sve kao pročitano</a>
            </div>
        `;
        panel.appendChild(header);
        
        // Dodavanje liste notifikacija
        const list = document.createElement('div');
        list.className = 'notifications-list';
        list.innerHTML = `
            <div class="empty-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>Nemate notifikacija</p>
            </div>
        `;
        panel.appendChild(list);
        
        notificationContainer.appendChild(panel);
        
        // Dodavanje u DOM
        const navbar = document.querySelector('.navbar') || document.querySelector('header') || document.body;
        if (navbar) {
            navbar.appendChild(notificationContainer);
        }
    }
    
    // Provera notifikacija u localStorage
    const userNotifications = localStorage.getItem('userNotifications') ? 
        JSON.parse(localStorage.getItem('userNotifications')) : [];
    
    // Ažuriranje bedža
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        const unreadCount = userNotifications.filter(notif => !notif.read).length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
    
    // Event listener za zvonce
    notificationContainer.addEventListener('click', function(event) {
        const panel = this.querySelector('.notification-panel');
        if (panel) {
            const isVisible = panel.style.display === 'block';
            panel.style.display = isVisible ? 'none' : 'block';
            
            // Ako je panel otvoren, osvežavamo listu
            if (!isVisible) {
                renderNotifications();
            }
        }
    });
    
    // Event listener za "označi sve kao pročitano"
    const markAllReadBtn = document.getElementById('markAllRead');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            markAllAsRead();
        });
    }
    
    // Inicijalno osvežavanje liste
    renderNotifications();
}

// Funkcija za prikaz notifikacija u panelu
function renderNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    if (!notificationsList) return;
    
    // Učitavanje notifikacija iz localStorage
    const userNotifications = localStorage.getItem('userNotifications') ? 
        JSON.parse(localStorage.getItem('userNotifications')) : [];
    
    // Brisanje postojećih notifikacija
    notificationsList.innerHTML = '';
    
    // Ako nema notifikacija, prikaži poruku
    if (userNotifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="empty-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>Nemate notifikacija</p>
            </div>
        `;
        return;
    }
    
    // Sortiranje notifikacija od najnovije ka najstarijoj
    const sortedNotifications = [...userNotifications].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // Kreiranje HTML-a za svaku notifikaciju
    sortedNotifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification-item';
        notificationElement.setAttribute('data-id', notification.id);
        
        // Dodajemo klasu ako je pročitana notifikacija
        if (notification.read) {
            notificationElement.classList.add('read');
        }
        
        // Formatiranje vremena
        const time = new Date(notification.timestamp);
        const formattedTime = formatTimeAgo(time);
        
        // Ikona zavisno od tipa notifikacije
        let icon = 'bell';
        if (notification.type === 'Zakazani sastanak') icon = 'calendar-alt';
        if (notification.type === 'Važno') icon = 'exclamation-circle';
        
        // HTML struktura notifikacije
        notificationElement.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${formattedTime}</div>
            </div>
        `;
        
        // Event listener za klik na notifikaciju (označavanje kao pročitane)
        notificationElement.addEventListener('click', function(event) {
            event.stopPropagation();
            markAsRead(notification.id);
            this.classList.add('read');
        });
        
        // Dodajemo u listu
        notificationsList.appendChild(notificationElement);
    });
}

// Funkcija za formatiranje vremena (npr. "pre 5 minuta", "pre 2 sata")
function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
        return 'upravo sada';
    } else if (diffMin < 60) {
        return `pre ${diffMin} ${diffMin === 1 ? 'minut' : diffMin < 5 ? 'minuta' : 'minuta'}`;
    } else if (diffHour < 24) {
        return `pre ${diffHour} ${diffHour === 1 ? 'sat' : diffHour < 5 ? 'sata' : 'sati'}`;
    } else if (diffDay < 7) {
        return `pre ${diffDay} ${diffDay === 1 ? 'dan' : 'dana'}`;
    } else {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}

// Funkcija za označavanje notifikacije kao pročitane
function markAsRead(id) {
    let userNotifications = localStorage.getItem('userNotifications') ? 
        JSON.parse(localStorage.getItem('userNotifications')) : [];
    
    const index = userNotifications.findIndex(notif => notif.id === id);
    if (index !== -1) {
        userNotifications[index].read = true;
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
        
        // Ažuriranje bedža
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const unreadCount = userNotifications.filter(notif => !notif.read).length;
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
}

// Funkcija za označavanje svih notifikacija kao pročitanih
function markAllAsRead() {
    let userNotifications = localStorage.getItem('userNotifications') ? 
        JSON.parse(localStorage.getItem('userNotifications')) : [];
    
    userNotifications.forEach(notif => {
        notif.read = true;
    });
    
    localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
    
    // Ažuriranje bedža
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = '0';
        badge.style.display = 'none';
    }
    
    // Označavanje svih elemenata kao pročitanih u UI
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.classList.add('read');
    });
}

// Inicijalizacija notifikacionog centra kada je dokument spreman
document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizacija notifikacionog centra
    initNotificationCenter();
    
    // Dodavanje test funkcije na window objekat za lakše testiranje
    window.testNotification = function(title, message, type) {
        return createTestNotification(title, message, type);
    };
});

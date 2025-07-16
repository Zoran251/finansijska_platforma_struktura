/**
 * user_notifications.js
 * Skripta za upravljanje notifikacijama za korisnike
 */

// Funkcije za upravljanje korisničkim notifikacijama
const UserNotifications = (function() {
    "use strict";
    
    // Privatne varijable
    let userNotifications = localStorage.getItem('userNotifications') ? 
        JSON.parse(localStorage.getItem('userNotifications')) : [];
    let isNotificationPanelOpen = false;
    
    // Funkcija za inicijalizaciju
    function init() {
        // Ažuriranje brojača nepročitanih notifikacija
        updateUnreadBadge();
        
        // Event listener za zvonce (toggle panel)
        const notificationBell = document.querySelector('.notification-bell');
        if (notificationBell) {
            notificationBell.addEventListener('click', toggleNotificationPanel);
        }
        
        // Zatvaranje panela klikom van njega
        document.addEventListener('click', function(event) {
            const panel = document.querySelector('.notification-panel');
            const bell = document.querySelector('.notification-bell');
            
            if (panel && isNotificationPanelOpen && 
                !panel.contains(event.target) && 
                !bell.contains(event.target)) {
                toggleNotificationPanel();
            }
        });
        
        // Dugme za označavanje svih kao pročitanih
        const markAllReadButton = document.getElementById('markAllRead');
        if (markAllReadButton) {
            markAllReadButton.addEventListener('click', markAllNotificationsAsRead);
        }
    }
    
    // Funkcija za prikaz/sakrivanje panela sa notifikacijama
    function toggleNotificationPanel() {
        const panel = document.querySelector('.notification-panel');
        if (!panel) return;
        
        isNotificationPanelOpen = !isNotificationPanelOpen;
        panel.style.display = isNotificationPanelOpen ? 'block' : 'none';
        
        if (isNotificationPanelOpen) {
            // Pri otvaranju panela, učitavamo notifikacije
            renderNotifications();
        }
    }
    
    // Funkcija za prikaz notifikacija u panelu
    function renderNotifications() {
        const notificationsList = document.querySelector('.notifications-list');
        if (!notificationsList) return;
        
        // Osvežavanje iz localStorage-a
        userNotifications = localStorage.getItem('userNotifications') ? 
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
            notificationElement.addEventListener('click', function() {
                markNotificationAsRead(notification.id);
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
    
    // Funkcija za označavanje jedne notifikacije kao pročitane
    function markNotificationAsRead(id) {
        const index = userNotifications.findIndex(notif => notif.id === id);
        if (index !== -1) {
            userNotifications[index].read = true;
            saveNotifications();
            updateUnreadBadge();
        }
    }
    
    // Funkcija za označavanje svih notifikacija kao pročitanih
    function markAllNotificationsAsRead() {
        userNotifications.forEach(notif => {
            notif.read = true;
        });
        
        saveNotifications();
        updateUnreadBadge();
        
        // Označavanje svih elemenata kao pročitanih u UI
        const notificationItems = document.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.classList.add('read');
        });
    }
    
    // Funkcija za čuvanje notifikacija u localStorage
    function saveNotifications() {
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
    }
    
    // Funkcija za ažuriranje brojača nepročitanih notifikacija
    function updateUnreadBadge() {
        const unreadCount = userNotifications.filter(notif => !notif.read).length;
        
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    // Funkcija za dodavanje nove notifikacije (koristi se od strane admin panela)
    function addNotification(notification) {
        userNotifications.push({
            id: 'user_notif_' + Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type || 'Obaveštenje',
            timestamp: new Date().toISOString(),
            read: false
        });
        
        saveNotifications();
        updateUnreadBadge();
        
        // Osvežavanje prikaza ako je panel otvoren
        if (isNotificationPanelOpen) {
            renderNotifications();
        }
    }
    
    // Funkcija za brisanje svih notifikacija (korisno za testiranje)
    function clearAllNotifications() {
        userNotifications = [];
        saveNotifications();
        updateUnreadBadge();
        
        // Osvežavanje prikaza ako je panel otvoren
        if (isNotificationPanelOpen) {
            renderNotifications();
        }
    }
    
    // Javni API
    return {
        init: init,
        addNotification: addNotification,
        markAsRead: markNotificationAsRead,
        markAllAsRead: markAllNotificationsAsRead,
        clearAll: clearAllNotifications,
        getNotifications: function() { return [...userNotifications]; }
    };
})();

// Inicijalizacija nakon učitavanja stranice
document.addEventListener('DOMContentLoaded', function() {
    UserNotifications.init();
    
    // Izlaganje funkcije za testiranje (dodavanje test notifikacije)
    window.addTestNotification = function(title, message, type) {
        UserNotifications.addNotification({
            title: title || 'Test notifikacija',
            message: message || 'Ovo je test notifikacija za proveru sistema.',
            type: type || 'Obaveštenje'
        });
    };
    
    // Funkcija za čišćenje svih notifikacija (za testiranje)
    window.clearAllNotifications = function() {
        if (confirm('Da li ste sigurni da želite da obrišete sve notifikacije?')) {
            UserNotifications.clearAll();
        }
    };
});

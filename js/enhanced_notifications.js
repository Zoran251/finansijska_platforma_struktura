/**
 * enhanced_notifications.js
 * Enhanced script for better notification visibility and user experience
 */

const EnhancedNo            // HTML struktura notifikacije
            notificationElement.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message" data-id="${notification.id}">${linkifyText(notification.message)}</div>
                    <div class="notification-time">${formattedTime}</div>
                </div>
            `; = (function() {
    "use strict";
    
    // Konstante
    const ZOOM_MEETING_LINK = "https://us05web.zoom.us/j/5031740065?pwd=VYHmLjM3CGXI4WxXgD8TOdC4mNuDLX.1";
    
    // Private variables
    let userNotifications = localStorage.getItem('userNotifications') ? 
        JSON.parse(localStorage.getItem('userNotifications')) : [];
    let isNotificationPanelOpen = false;
    
    // Function to initialize
    function init() {
        // Update unread badge
        updateUnreadBadge();
        
        // Event listener for bell (toggle panel)
        const notificationBell = document.querySelector('.notification-bell');
        if (notificationBell) {
            notificationBell.addEventListener('click', toggleNotificationPanel);
        }
        
        // Close panel when clicking outside
        document.addEventListener('click', function(event) {
            const panel = document.querySelector('.notification-panel');
            const bell = document.querySelector('.notification-bell');
            
            if (panel && isNotificationPanelOpen && 
                !panel.contains(event.target) && 
                !bell.contains(event.target)) {
                toggleNotificationPanel();
            }
        });
        
        // Button to mark all as read
        const markAllReadButton = document.getElementById('markAllRead');
        if (markAllReadButton) {
            markAllReadButton.addEventListener('click', markAllNotificationsAsRead);
        }
    }
    
    // Function to toggle notification panel
    function toggleNotificationPanel() {
        const panel = document.querySelector('.notification-panel');
        if (!panel) return;
        
        isNotificationPanelOpen = !isNotificationPanelOpen;
        
        if (isNotificationPanelOpen) {
            panel.style.display = 'block';
            // Animate opening
            setTimeout(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 10);
            // Load notifications when opening panel
            renderNotifications();
        } else {
            // Animate closing
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 200);
        }
    }
    
    // Funkcija za pretvaranje URL-ova u klikabilne linkove i formatiranje teksta
    function linkifyText(text) {
        if (!text) return '';
        
        // Ako već sadrži HTML linkove, onda nema potrebe za daljim procesiranjem
        if (text.includes('<a href=')) {
            return text;
        }
        
        // Prvo zamenjujemo nove linije sa HTML oznakama za nove redove
        let formattedText = text.replace(/\n/g, '<br>');
        
        // Regex za pronalaženje URL-ova (uključujući https, http i file)
        const urlRegex = /(https?:\/\/[^\s]+|file:\/\/[^\s]+)/g;
        
        // Zamena URL-ova HTML linkovima
        return formattedText.replace(urlRegex, function(url) {
            // Posebno stilizovanje za Zoom linkove
            if (url.includes('zoom.us')) {
                return `<a href="${url}" target="_blank" class="zoom-link">${url}</a>`;
            } 
            // Posebno stilizovanje za file linkove
            else if (url.startsWith('file://')) {
                return `<a href="${url}" target="_blank" class="file-link">${url}</a>`;
            } 
            // Opći linkovi
            else {
                return `<a href="${url}" target="_blank">${url}</a>`;
            }
        });
    }
    
    // Funkcija za prikaz notifikacija u panelu
    function renderNotifications() {
        const notificationsList = document.querySelector('.notifications-list');
        if (!notificationsList) return;
        
        // Refresh from localStorage
        userNotifications = localStorage.getItem('userNotifications') ? 
            JSON.parse(localStorage.getItem('userNotifications')) : [];
        
        // Clear existing notifications
        notificationsList.innerHTML = '';
        
        // If no notifications, show message
        if (userNotifications.length === 0) {
            notificationsList.innerHTML = `
                <div class="empty-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>Nemate notifikacija</p>
                </div>
            `;
            return;
        }
        
        // Sort notifications from newest to oldest
        const sortedNotifications = [...userNotifications].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        // Create HTML for each notification
        sortedNotifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item';
            notificationElement.setAttribute('data-id', notification.id);
            notificationElement.setAttribute('data-type', notification.type);
            
            // Add class if notification is read
            if (notification.read) {
                notificationElement.classList.add('read');
            }
            
            // Format time
            const time = new Date(notification.timestamp);
            const formattedTime = formatTimeAgo(time);
            
            // Icon based on notification type
            let icon = 'bell';
            if (notification.type === 'meeting' || notification.type === 'Zakazani sastanak') icon = 'calendar-alt';
            if (notification.type === 'important' || notification.type === 'Važno') icon = 'exclamation-circle';
            
            // HTML structure of notification
            notificationElement.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message" data-id="${notification.id}">${notification.message}</div>
                    <div class="notification-time">${formattedTime}</div>
                </div>
            `;
            
            // Event listener for click on notification (mark as read)
            notificationElement.addEventListener('click', function(e) {
                // Mark as read
                if (!notification.read) {
                    markNotificationAsRead(notification.id);
                    this.classList.add('read');
                }
            });
            
            // Add to list
            notificationsList.appendChild(notificationElement);
        });
        
        // Restore expanded state if any - removed since we now show full messages by default
    }
    
    // Function to format time (e.g., "5 minutes ago", "2 hours ago")
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
    
    // Function to mark one notification as read
    function markNotificationAsRead(id) {
        const index = userNotifications.findIndex(notif => notif.id === id);
        if (index !== -1) {
            userNotifications[index].read = true;
            saveNotifications();
            updateUnreadBadge();
        }
    }
    
    // Function to mark all notifications as read
    function markAllNotificationsAsRead() {
        userNotifications.forEach(notif => {
            notif.read = true;
        });
        
        saveNotifications();
        updateUnreadBadge();
        
        // Mark all elements as read in UI
        const notificationItems = document.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.classList.add('read');
        });
    }
    
    // Function to save notifications to localStorage
    function saveNotifications() {
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
    }
    
    // Function to update unread badge count
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
        let finalMessage = notification.message;
        
        // Ako je tip notifikacije sastanak, automatski dodaj Zoom link
        if (notification.type === 'Zakazani sastanak' || notification.type === 'meeting') {
            finalMessage = `${notification.message}\n\nLink za sastanak: ${ZOOM_MEETING_LINK}`;
        }
        
        userNotifications.push({
            id: 'user_notif_' + Date.now(),
            title: notification.title,
            message: finalMessage,
            type: notification.type || 'Obaveštenje',
            timestamp: new Date().toISOString(),
            read: false
        });
        
        saveNotifications();
        updateUnreadBadge();
        
        // If panel is open, refresh notifications
        if (isNotificationPanelOpen) {
            renderNotifications();
        }
        
        return true;
    }
    
    // Function to remove a notification
    function removeNotification(id) {
        const index = userNotifications.findIndex(notif => notif.id === id);
        if (index !== -1) {
            userNotifications.splice(index, 1);
            saveNotifications();
            updateUnreadBadge();
            
            // If panel is open, refresh notifications
            if (isNotificationPanelOpen) {
                renderNotifications();
            }
            
            return true;
        }
        return false;
    }
    
    // Return public methods
    return {
        init: init,
        addNotification: addNotification,
        removeNotification: removeNotification,
        markAllAsRead: markAllNotificationsAsRead,
        getNotificationCount: function() {
            return userNotifications.length;
        },
        getUnreadCount: function() {
            return userNotifications.filter(notif => !notif.read).length;
        }
    };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    EnhancedNotifications.init();
});

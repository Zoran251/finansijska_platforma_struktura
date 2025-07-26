/**
 * notification_integration.js
 * Skripta koja povezuje admin panel i notifikacije sa poboljšanim funkcionalnostima
 */

// Funkcija za inicijalizaciju integracije notifikacija
document.addEventListener('DOMContentLoaded', function() {
    // Provjera da li je admin panel aktivan
    const adminTabs = document.querySelector('.admin-tabs');
    
    // Check if we have the old notification system
    const oldUserNotificationsInit = window.UserNotifications && window.UserNotifications.init;
    
    // Replace the old notification system with the enhanced one if available
    if (oldUserNotificationsInit && typeof EnhancedNotifications !== 'undefined') {
        console.log('Upgrading to enhanced notification system');
        window.UserNotifications = window.EnhancedNotifications;
    }
    
    // Initialize user notifications if available
    if (typeof UserNotifications !== 'undefined') {
        UserNotifications.init();
    }
    
    // Handle horizontal scrolling in notification messages
    const notificationsList = document.querySelector('.notifications-list');
    if (notificationsList) {
        // Enable horizontal scrolling with wheel if content is wider than container
        notificationsList.addEventListener('wheel', function(e) {
            // Omogućava horizontalno skrolovanje bez potrebe za shift tasterom
            if (this.scrollWidth > this.clientWidth) {
                // Ako je širina sadržaja veća od vidljive širine, omogući horizontalno skrolovanje
                if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && !e.shiftKey) {
                    e.preventDefault();
                    this.scrollLeft += e.deltaY;
                }
            }
        });
        
        // Add touch-based horizontal scrolling support
        let isDown = false;
        let startX;
        let scrollLeft;
        
        notificationsList.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - notificationsList.offsetLeft;
            scrollLeft = notificationsList.scrollLeft;
        });
        
        notificationsList.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        notificationsList.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        notificationsList.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - notificationsList.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            notificationsList.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        notificationsList.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - notificationsList.offsetLeft;
            scrollLeft = notificationsList.scrollLeft;
        });
        
        notificationsList.addEventListener('touchend', () => {
            isDown = false;
        });
        
        notificationsList.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - notificationsList.offsetLeft;
            const walk = (x - startX) * 2;
            notificationsList.scrollLeft = scrollLeft - walk;
        });
    }
    
    // If not admin panel, exit early
    if (!adminTabs) return;

    // Provjera da li je tab za notifikacije vidljiv
    const notificationsTabBtn = document.getElementById('notificationsTabBtn');
    if (!notificationsTabBtn) {
        console.error('Tab za notifikacije nije pronađen!');
        return;
    }

    // Provjera da li je AdminNotifications definisan
    if (typeof AdminNotifications === 'undefined') {
        console.error('AdminNotifications objekat nije definisan!');
        return;
    }

    // Inicijalizacija AdminNotifications
    AdminNotifications.init();

    // Postavljanje aktivnog taba ako dolazi iz linka
    if (window.location.hash === '#notifications') {
        notificationsTabBtn.click();
    }

    // Logika za kreiranje nove notifikacije
    const createNotificationBtn = document.getElementById('createNotificationBtn');
    const cancelNotificationBtn = document.getElementById('cancelNotificationBtn');
    const sendNotificationBtn = document.getElementById('sendNotificationBtn');
    const notificationForm = document.getElementById('notificationForm');
    
    if (createNotificationBtn && notificationForm) {
        createNotificationBtn.addEventListener('click', function() {
            notificationForm.style.display = 'block';
        });
    }
    
    if (cancelNotificationBtn && notificationForm) {
        cancelNotificationBtn.addEventListener('click', function() {
            notificationForm.style.display = 'none';
            // Resetovanje forme
            document.getElementById('notificationTitle').value = '';
            document.getElementById('notificationMessage').value = '';
            document.getElementById('notificationType').value = 'announcement';
            document.getElementById('notificationRecipients').value = 'all';
            document.getElementById('notificationUserEmail').value = '';
        });
    }
    
    if (sendNotificationBtn && notificationForm) {
        sendNotificationBtn.addEventListener('click', function() {
            const title = document.getElementById('notificationTitle').value;
            const message = document.getElementById('notificationMessage').value;
            const type = document.getElementById('notificationType').value;
            const recipients = document.getElementById('notificationRecipients').value;
            const userEmail = document.getElementById('notificationUserEmail').value;
            
            // Validacija
            if (!title || !message) {
                alert('Molimo unesite naslov i poruku notifikacije.');
                return;
            }
            
            if (recipients === 'individual' && !userEmail) {
                alert('Molimo unesite email korisnika.');
                return;
            }
            
            // Konverzija tipa iz forme u odgovarajući tip za notifikaciju
            let notificationType = 'Obaveštenje';
            if (type === 'announcement') notificationType = 'Obaveštenje';
            if (type === 'meeting') notificationType = 'Zakazani sastanak';
            if (type === 'important') notificationType = 'Važno';
            
            // Kreiranje notifikacije
            const notification = {
                title: title,
                message: message,
                type: notificationType,
                recipients: getRecipientsText(recipients),
                user_email: recipients === 'individual' ? userEmail : null
            };
            
            // Slanje notifikacije
            AdminNotifications.createNotification(notification);
            alert('Notifikacija je uspešno poslata!');
            notificationForm.style.display = 'none';
            
            // Resetovanje forme
            document.getElementById('notificationTitle').value = '';
            document.getElementById('notificationMessage').value = '';
            document.getElementById('notificationType').value = 'announcement';
            document.getElementById('notificationRecipients').value = 'all';
            document.getElementById('notificationUserEmail').value = '';
        });
    }
    
    // Pomoćna funkcija za pretvaranje recipijenata u tekstualni format
    function getRecipientsText(recipients) {
        switch(recipients) {
            case 'all': return 'Svi korisnici';
            case 'premium': return 'Premium korisnici';
            case 'standard': return 'Standardni korisnici';
            case 'individual': return 'Pojedinačni korisnik';
            default: return 'Svi korisnici';
        }
    }
    
    // Inicijalno osvježavanje tabele notifikacija
    if (typeof AdminNotifications !== 'undefined' && AdminNotifications.renderNotifications) {
        AdminNotifications.renderNotifications();
    }
});

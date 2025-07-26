/**
 * admin_notifications.js
 * Skripta za upravljanje notifikacijama u admin panelu
 */

// Funkcije za upravljanje notifikacijama
const AdminNotifications = (function() {
    "use strict";
    
    // Privatne varijable
    let notificationsDB = localStorage.getItem('adminNotifications') ? 
        JSON.parse(localStorage.getItem('adminNotifications')) : [];
    
    // Funkcija za inicijalizaciju
    function init() {
        // Aktiviranje tabova
        setupTabs();
        // Popunjavanje liste notifikacija ako postoje
        renderNotifications();
        
        // Event listener za tab Notifikacije
        const notificationsTabBtn = document.getElementById('notificationsTabBtn');
        if (notificationsTabBtn) {
            notificationsTabBtn.addEventListener('click', function() {
                // Osvežavanje liste notifikacija pri prelasku na tab
                renderNotifications();
            });
        }
    }
    
    // Postavljanje navigacije između tabova
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabs = document.querySelectorAll('[id$="Tab"]');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Resetovanje stila za sve tabove
                tabButtons.forEach(btn => {
                    btn.style.color = 'var(--muted-text)';
                    btn.style.borderBottom = 'none';
                    btn.classList.remove('active');
                });
                
                // Postavljanje aktivnog stila za trenutni tab
                this.style.color = 'var(--gold-bright)';
                this.style.borderBottom = '2px solid var(--gold-bright)';
                this.classList.add('active');
                
                // Prikazivanje odgovarajućeg sadržaja taba
                const tabId = this.id.replace('Btn', '');
                tabs.forEach(tab => {
                    if (tab.id === tabId) {
                        tab.style.display = 'block';
                    } else {
                        tab.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Funkcija za kreiranje notifikacije
    function createNotification(notification) {
        // Validacija obaveznih polja
        if (!notification.title || !notification.message || !notification.type || !notification.recipients) {
            console.error('Nedostaju obavezna polja za notifikaciju');
            return false;
        }
        
        // Generisanje ID-a i dopuna podataka
        const newNotification = {
            id: 'notif_' + Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type,
            recipients: notification.recipients,
            user_email: notification.user_email || null,
            date: new Date().toISOString(),
            status: 'Poslato',
            created_by: 'Admin',
            created_at: new Date().toISOString()
        };
        
        // Dodavanje u lokalnu bazu i čuvanje u localStorage
        notificationsDB.push(newNotification);
        saveNotifications();
        
        // Dodavanje u listu prikazanih notifikacija
        renderNotifications();
        
        // Slanje notifikacije korisnicima (simulacija)
        sendNotificationToUsers(newNotification);
        
        return true;
    }
    
    // Funkcija za ažuriranje notifikacije
    function updateNotification(id, updatedData) {
        const index = notificationsDB.findIndex(notif => notif.id === id);
        if (index !== -1) {
            notificationsDB[index] = {...notificationsDB[index], ...updatedData, updated_at: new Date().toISOString()};
            saveNotifications();
            renderNotifications();
            return true;
        }
        return false;
    }
    
    // Funkcija za brisanje notifikacije
    function deleteNotification(id) {
        const index = notificationsDB.findIndex(notif => notif.id === id);
        if (index !== -1) {
            notificationsDB.splice(index, 1);
            saveNotifications();
            renderNotifications();
            return true;
        }
        return false;
    }
    
    // Funkcija za čuvanje notifikacija u localStorage
    function saveNotifications() {
        localStorage.setItem('adminNotifications', JSON.stringify(notificationsDB));
    }
    
    // Funkcija za prikaz notifikacija u tabeli
    function renderNotifications() {
        const tableBody = document.querySelector('.notifications-list-container tbody');
        if (!tableBody) {
            console.error('Tabela notifikacija nije pronađena!');
            return;
        }
        
        // Brisanje postojećih redova
        tableBody.innerHTML = '';
        
        // Ako nema notifikacija, prikaži poruku
        if (notificationsDB.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="7" style="text-align: center; padding: 2rem 0; color: var(--muted-text);">
                    Nema dostupnih notifikacija.
                </td>
            `;
            tableBody.appendChild(emptyRow);
            return;
        }
        
        // Sortiranje notifikacija od najnovije ka najstarijoj
        const sortedNotifications = [...notificationsDB].sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );
        
        // Dodavanje redova za svaku notifikaciju
        sortedNotifications.forEach(notif => {
            const row = document.createElement('tr');
            
            // Formatiranje datuma
            const date = new Date(notif.created_at);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
            
            // Određivanje boje za tip notifikacije
            let typeColorScheme = 'blue';
            if (notif.type === 'Zakazani sastanak') typeColorScheme = 'orange';
            if (notif.type === 'Važno') typeColorScheme = 'red';
            
            // Određivanje boje za status
            let statusColorScheme = 'green';
            if (notif.status === 'U pripremi') statusColorScheme = 'yellow';
            if (notif.status === 'Otkazano') statusColorScheme = 'red';
            
            // Popunjavanje ćelija
            row.innerHTML = `
                <td>${notif.id.replace('notif_', '')}</td>
                <td>${formattedDate}</td>
                <td>${notif.title}</td>
                <td><span class="badge badge-${typeColorScheme}">${notif.type}</span></td>
                <td>${notif.user_email || notif.recipients}</td>
                <td><span class="badge badge-${statusColorScheme}">${notif.status}</span></td>
                <td>
                    <div class="action-icons">
                        <i class="fas fa-eye" title="Pregledaj" data-id="${notif.id}"></i>
                        <i class="fas fa-edit" title="Izmeni" data-id="${notif.id}"></i>
                        <i class="fas fa-trash" title="Obriši" data-id="${notif.id}"></i>
                    </div>
                </td>
            `;
            
            // Dodavanje hover efekta
            row.style.transition = 'background-color 0.2s';
            row.addEventListener('mouseover', () => {
                row.style.backgroundColor = 'var(--dark-accent)';
            });
            row.addEventListener('mouseout', () => {
                row.style.backgroundColor = '';
            });
            
            // Dodavanje u tabelu
            tableBody.appendChild(row);
        });
        
        // Dodavanje event listenera za akcione ikone
        setupActionListeners();
    }
    
    // Funkcija za postavljanje event listenera za akcije (pregled, izmena, brisanje)
    function setupActionListeners() {
        // Pregled notifikacije
        document.querySelectorAll('.fa-eye').forEach(icon => {
            icon.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const notification = notificationsDB.find(notif => notif.id === id);
                if (notification) {
                    showNotificationDetails(notification);
                }
            });
        });
        
        // Izmena notifikacije
        document.querySelectorAll('.fa-edit').forEach(icon => {
            icon.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const notification = notificationsDB.find(notif => notif.id === id);
                if (notification) {
                    showEditForm(notification);
                }
            });
        });
        
        // Brisanje notifikacije
        document.querySelectorAll('.fa-trash').forEach(icon => {
            icon.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if (confirm('Da li ste sigurni da želite da obrišete ovu notifikaciju?')) {
                    deleteNotification(id);
                }
            });
        });
    }
    
    // Funkcija za prikaz detalja notifikacije
    function showNotificationDetails(notification) {
        // Kreiranje modal prozora
        const modal = document.createElement('div');
        modal.className = 'notification-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '1000';
        
        // Formatiranje datuma
        const date = new Date(notification.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        // Sadržaj modala
        modal.innerHTML = `
            <div class="modal-content" style="background: var(--dark-card); border: 1px solid var(--gold-dark); border-radius: 8px; padding: 2rem; width: 80%; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <h2 style="color: var(--gold-bright); margin: 0;">${notification.title}</h2>
                    <span class="close-modal" style="cursor: pointer; color: var(--gold-medium); font-size: 1.5rem;">&times;</span>
                </div>
                <div style="margin-bottom: 1rem;">
                    <span style="background: var(--dark-accent); color: var(--gold-pale); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">${notification.type}</span>
                    <span style="color: var(--muted-text); font-size: 0.9rem; margin-left: 1rem;">${formattedDate}</span>
                </div>
                <div style="margin-bottom: 1rem;">
                    <p style="color: var(--light-text); white-space: pre-line;">${notification.message}</p>
                </div>
                <div style="border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: 1rem;">
                    <p style="color: var(--muted-text); font-size: 0.9rem;">Primaoci: ${notification.user_email || notification.recipients}</p>
                    <p style="color: var(--muted-text); font-size: 0.9rem;">Status: ${notification.status}</p>
                    <p style="color: var(--muted-text); font-size: 0.9rem;">Kreirao: ${notification.created_by}</p>
                </div>
            </div>
        `;
        
        // Dodavanje modala u DOM
        document.body.appendChild(modal);
        
        // Event listener za zatvaranje modala
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Zatvaranje klikom izvan modala
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Funkcija za prikaz forme za izmenu notifikacije
    function showEditForm(notification) {
        // TODO: Implementirati formu za izmenu notifikacije
        alert('Funkcionalnost izmene notifikacije će biti implementirana uskoro.');
    }
    
    // Funkcija za slanje notifikacije korisnicima (simulacija)
    function sendNotificationToUsers(notification) {
        console.log('Šaljem notifikaciju korisnicima:', notification);
        
        // Ovde bi trebalo implementirati stvarno slanje notifikacije korisnicima
        // Za sada ćemo samo simulirati slanje
        setTimeout(() => {
            console.log('Notifikacija uspešno poslata korisnicima!');
            
            // Dodavanje u listu notifikacija korisnika (za demo)
            addToUserNotifications(notification);
        }, 1000);
    }
    
    // Funkcija za dodavanje notifikacije u listu notifikacija korisnika
    function addToUserNotifications(notification) {
        // Učitavanje postojećih notifikacija korisnika
        let userNotifications = localStorage.getItem('userNotifications') ? 
            JSON.parse(localStorage.getItem('userNotifications')) : [];
        
        // Generisanje ID-a za notifikaciju korisnika
        const userNotification = {
            id: 'user_notif_' + Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type,
            timestamp: new Date().toISOString(),
            read: false,
            adminNotifId: notification.id
        };
        
        // Dodavanje u listu i čuvanje
        userNotifications.push(userNotification);
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
        
        // Ažuriranje brojača nepročitanih notifikacija ako je korisnik prijavljen
        updateUnreadBadge();
    }
    
    // Funkcija za ažuriranje brojača nepročitanih notifikacija
    function updateUnreadBadge() {
        const userNotifications = localStorage.getItem('userNotifications') ? 
            JSON.parse(localStorage.getItem('userNotifications')) : [];
        
        // Brojanje nepročitanih notifikacija
        const unreadCount = userNotifications.filter(notif => !notif.read).length;
        
        // Ažuriranje bedža ako postoji
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    // Javni API
    return {
        init: init,
        createNotification: createNotification,
        updateNotification: updateNotification,
        deleteNotification: deleteNotification,
        getNotifications: function() { return [...notificationsDB]; }
    };
})();

// Inicijalizacija nakon učitavanja stranice
document.addEventListener('DOMContentLoaded', function() {
    AdminNotifications.init();
    
    // Funkcija za aktiviranje taba notifikacija
    window.activateNotificationsTab = function() {
        const notificationsTabBtn = document.getElementById('notificationsTabBtn');
        if (notificationsTabBtn) {
            notificationsTabBtn.click();
        }
    };
    
    // Funkcija za otvaranje forme za novu notifikaciju
    window.toggleNotificationForm = function() {
        const formContainer = document.querySelector('.notification-form-container');
        if (formContainer) {
            const currentDisplay = getComputedStyle(formContainer).display;
            formContainer.style.display = currentDisplay === 'none' ? 'block' : 'none';
        }
    };
    
    // Funkcija za slanje notifikacije
    window.sendNotification = function(formData) {
        // Prikupljanje podataka iz forme
        const title = formData.get('notification_title');
        const message = formData.get('notification_message');
        const type = formData.get('notification_type');
        const recipients = formData.get('notification_recipients');
        const userEmail = formData.get('notification_user_email');
        
        // Kreiranje i slanje notifikacije
        const success = AdminNotifications.createNotification({
            title: title,
            message: message,
            type: type,
            recipients: recipients,
            user_email: recipients === 'Pojedinačni korisnik' ? userEmail : null
        });
        
        if (success) {
            // Resetovanje forme
            document.querySelector('form').reset();
            // Sakrivanje forme
            toggleNotificationForm();
            // Prikazivanje poruke o uspehu
            alert('Notifikacija je uspešno poslata!');
        } else {
            alert('Došlo je do greške prilikom slanja notifikacije. Proverite unete podatke.');
        }
    };
});

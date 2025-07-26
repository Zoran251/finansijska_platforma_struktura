# Dodaj ovo u klasu FinanceState u finance_state.py
import reflex as rx
from datetime import datetime

class FinanceState(rx.State):
    # ... postojeći kod ...

    # Stanje za notifikacije
    notification_title: str = ""
    notification_message: str = ""
    notification_type: str = "Obaveštenje"
    notification_recipients: str = "Svi korisnici"
    notification_user_email: str = ""
    show_notification_form: bool = False
    
    # Stanje za aktivni tab
    active_tab: str = "logoTab"
    
    # Lista notifikacija
    notifications: list = []
    
    # Funkcija za prebacivanje na tab notifikacija
    def switch_to_notifications_tab(self):
        self.active_tab = "notificationsTab"
        return rx.client_side("""
            document.addEventListener('DOMContentLoaded', function() {
                const notificationsTabBtn = document.getElementById('notificationsTabBtn');
                if (notificationsTabBtn) {
                    notificationsTabBtn.click();
                }
            });
            
            // Ako je DOMContentLoaded već prošao, odmah aktiviramo tab
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                const notificationsTabBtn = document.getElementById('notificationsTabBtn');
                if (notificationsTabBtn) {
                    notificationsTabBtn.click();
                }
            }
        """)
    
    def set_notification_title(self, value: str):
        self.notification_title = value
    
    def set_notification_message(self, value: str):
        self.notification_message = value
    
    def set_notification_type(self, value: str):
        self.notification_type = value
    
    def set_notification_recipients(self, value: str):
        self.notification_recipients = value
        
    def set_notification_user_email(self, value: str):
        self.notification_user_email = value
    
    def toggle_notification_form(self):
        self.show_notification_form = not self.show_notification_form
    
    def send_notification(self, form_data):
        """Funkcija za slanje notifikacije."""
        # U stvarnoj implementaciji, ovo bi sačuvalo notifikaciju u bazi podataka
        # i poslalo je odgovarajućim korisnicima
        
        # Kreiranje nove notifikacije
        new_notification = {
            "id": f"notif_{len(self.notifications) + 1}",
            "title": self.notification_title,
            "message": self.notification_message,
            "type": self.notification_type,
            "recipients": self.notification_recipients,
            "user_email": self.notification_user_email if self.notification_recipients == "Pojedinačni korisnik" else None,
            "date": datetime.now().strftime("%d.%m.%Y"),
            "status": "Poslato"
        }
        
        # Dodavanje u listu notifikacija
        self.notifications.append(new_notification)
        
        # Resetovanje forme
        self.notification_title = ""
        self.notification_message = ""
        self.notification_type = "Obaveštenje"
        self.notification_recipients = "Svi korisnici"
        self.notification_user_email = ""
        
        # Zatvaranje forme
        self.show_notification_form = False
        
        # Pozivanje JavaScript funkcije za slanje notifikacije korisniku
        # Ovo bi trebalo implementirati u stvarnoj aplikaciji
        # Ovde koristimo rx.client_side za izvršavanje JavaScript funkcije na klijentskoj strani
        return rx.client_side("""
            // Dodavanje notifikacije u localStorage
            const userNotifications = localStorage.getItem('userNotifications') ? 
                JSON.parse(localStorage.getItem('userNotifications')) : [];
            
            userNotifications.push({
                id: 'user_notif_' + Date.now(),
                title: '{}',
                message: '{}',
                type: '{}',
                timestamp: new Date().toISOString(),
                read: false
            });
            
            localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
            
            // Ažuriranje bedža
            const badge = document.querySelector('.notification-badge');
            if (badge) {{
                const unreadCount = userNotifications.filter(n => !n.read).length;
                badge.textContent = unreadCount;
                badge.style.display = unreadCount > 0 ? 'flex' : 'none';
            }}
            
            // Dodavanje u admin notifikacije ako je dostupno
            if (typeof AdminNotifications !== 'undefined') {{
                AdminNotifications.createNotification({{
                    title: '{}',
                    message: '{}',
                    type: '{}',
                    recipients: '{}',
                    user_email: '{}'
                }});
            }}
            
            // Prikaz poruke o uspehu
            alert('Notifikacija je uspešno poslata!');
        """.format(
            self.notification_title, 
            self.notification_message, 
            self.notification_type,
            self.notification_title, 
            self.notification_message, 
            self.notification_type,
            self.notification_recipients,
            self.notification_user_email if self.notification_recipients == "Pojedinačni korisnik" else ""
        ))

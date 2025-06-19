import reflex as rx
from datetime import datetime
import json

class FinanceState(rx.State):
    """State klasa za upravljanje finansijskom aplikacijom."""
    
    # Stanja modala
    is_transaction_modal_open: bool = False
    is_settings_modal_open: bool = False
    is_login_modal_open: bool = False
    delete_account_modal_open: bool = False
    
    # Osnovni finansijski podaci
    income: float = 5400.0
    expenses: float = 2250.0
    savings: float = 3150.0
    
    # Kategorije budžeta
    budget_categories = [
        {"name": "Stanovanje", "percent": 30, "description": "Najam, rate kredita, režije", "color": "#D4AF37"},
        {"name": "Hrana", "percent": 20, "description": "Namirnice, restorani, dostava", "color": "#A8861D"},
        {"name": "Transport", "percent": 15, "description": "Gorivo, javni prevoz, taksi", "color": "#E6C870"},
        {"name": "Zabava", "percent": 10, "description": "Izlasci, hobiji, pretplate", "color": "#C5A028"},
        {"name": "Ušteđevina", "percent": 15, "description": "Dugoročna štednja, investicije", "color": "#856614"},
        {"name": "Ostalo", "percent": 10, "description": "Neočekivani troškovi, razno", "color": "#B3962C"},
    ]
    
    # Admin podešavanja
    admin_email: str = "zorandostica2@gmail.com"
    admin_password: str = "admin123"  # Privremeno hardkodirano
    is_admin_logged_in: bool = False
    
    # Transakcije
    transactions = [
        {"date": "15.06.2025", "description": "Plata", "category": "Prihod", "amount": 2500.00, "type": "income"},
        {"date": "12.06.2025", "description": "Najam", "category": "Stanovanje", "amount": 500.00, "type": "expense"},
        {"date": "10.06.2025", "description": "Kupovina namirnica", "category": "Hrana", "amount": 120.00, "type": "expense"},
        {"date": "05.06.2025", "description": "Gorivo", "category": "Transport", "amount": 70.00, "type": "expense"},
        {"date": "01.06.2025", "description": "Bonus", "category": "Prihod", "amount": 300.00, "type": "income"},
    ]
    
    # Korisnički profil
    user_name: str = "Marko Marković"
    user_email: str = "marko@example.com"
    user_phone: str = "+381 64 1234567"
    user_status: str = "Premium korisnik"
    
    # Pomoćne varijable za forme
    new_transaction_data: dict = {
        "description": "",
        "amount": 0,
        "category": "",
        "type": "expense",
        "date": datetime.now().strftime("%d.%m.%Y")
    }
    
    # Modal poruke
    success_message: str = ""
    error_message: str = ""
    
    # Kategorije troškova i prihoda za expense tracker
    expense_categories = [
        "Stanovanje",
        "Hrana", 
        "Transport",
        "Zabava",
        "Zdravlje",
        "Obrazovanje",
        "Odeća",
        "Računi",
        "Ostalo"
    ]
    
    income_categories = [
        "Plata",
        "Bonus", 
        "Freelance",
        "Dividende",
        "Najam",
        "Ostali prihodi"
    ]

    def open_transaction_modal(self):
        """Otvara modal za dodavanje transakcija."""
        self.is_transaction_modal_open = True
    
    def close_transaction_modal(self):
        """Zatvara modal za dodavanje transakcija."""
        self.is_transaction_modal_open = False
    
    def add_transaction(self, form_data: dict):
        """Dodaje novu transakciju."""
        new_transaction = {
            "date": datetime.now().strftime("%d.%m.%Y"),
            "description": form_data.get("description", ""),
            "category": form_data.get("category", ""),
            "amount": float(form_data.get("amount", 0)),
            "type": form_data.get("type", "expense")
        }
        
        self.transactions.insert(0, new_transaction)
        
        # Ažuriranje ukupnih prihoda/rashoda
        if new_transaction["type"] == "income":
            self.income += new_transaction["amount"]
        else:
            self.expenses += new_transaction["amount"]
            
        self.savings = self.income - self.expenses
        self.success_message = "Transakcija uspešno dodata!"
        return self.close_transaction_modal()
    
    def view_budget(self):
        """Navigira na stranicu budžeta."""
        return rx.redirect("/preview")
    
    def generate_report(self):
        """Generiše finansijski izveštaj."""
        # Ovde bi došla logika za generisanje izveštaja
        self.success_message = "Izveštaj je uspešno generisan!"
        return rx.toast(self.success_message)
    
    def open_settings(self):
        """Otvara modal za podešavanja."""
        self.is_settings_modal_open = True
    
    def save_settings(self, form_data: dict):
        """Čuva sistemska podešavanja."""
        # Ovde bi došla logika za čuvanje podešavanja
        self.success_message = "Podešavanja su uspešno sačuvana!"
        return rx.toast(self.success_message)
    
    def update_profile(self, form_data: dict):
        """Ažurira korisnički profil."""
        self.user_name = form_data.get("name", "") + " " + form_data.get("surname", "")
        self.user_email = form_data.get("email", "")
        self.user_phone = form_data.get("phone", "")
        
        self.success_message = "Profil je uspešno ažuriran!"
        return rx.toast(self.success_message)
    
    def admin_login(self, form_data: dict):
        """Prijava administratora."""
        email = form_data.get("email", "")
        password = form_data.get("password", "")
        
        if email == self.admin_email and password == self.admin_password:
            self.is_admin_logged_in = True
            self.success_message = "Uspešna prijava!"
            return rx.toast(self.success_message)
        else:
            self.error_message = "Netačan email ili lozinka!"
            return rx.toast(self.error_message, type="error")
    
    def admin_logout(self):
        """Odjava administratora."""
        self.is_admin_logged_in = False
        return rx.redirect("/admin")
    
    def update_budget_category(self, category_index: int, new_percent: int):
        """Ažurira procenat kategorije budžeta."""
        if 0 <= category_index < len(self.budget_categories):
            old_percent = self.budget_categories[category_index]["percent"]
            diff = new_percent - old_percent
            
            # Validacija da ukupan procenat ne prelazi 100%
            total_percent = sum(cat["percent"] for cat in self.budget_categories) + diff
            
            if total_percent <= 100:
                self.budget_categories[category_index]["percent"] = new_percent
                self.success_message = f"Kategorija {self.budget_categories[category_index]['name']} ažurirana!"
            else:
                self.error_message = "Ukupan procenat ne može preći 100%!"
                return rx.toast(self.error_message, type="error")
                
            return rx.toast(self.success_message)
    
    def open_delete_account_modal(self):
        """Otvara modal za potvrdu brisanja naloga."""
        self.delete_account_modal_open = True
    
    def close_delete_account_modal(self):
        """Zatvara modal za potvrdu brisanja naloga."""
        self.delete_account_modal_open = False
    
    def delete_account(self):
        """Briše korisnički nalog."""
        # Ovde bi došla logika za brisanje naloga
        self.close_delete_account_modal()
        self.success_message = "Nalog je uspešno izbrisan!"
        return rx.redirect("/")
        
    def calculate_budget_distribution(self):
        """Preračunava raspodelu budžeta na osnovu unetog prihoda."""
        self.success_message = "Raspodela budžeta je izračunata!"
        return rx.toast(self.success_message)
        
    def save_budget_plan(self):
        """Čuva plan budžeta."""
        self.success_message = "Plan budžeta je uspešno sačuvan!"
        return rx.toast(self.success_message)
        
    # Funkcije za upravljanje transakcijama
    transaction_description: str = ""
    transaction_amount: float = 0
    transaction_category: str = ""
    transaction_date: str = datetime.now().strftime("%Y-%m-%d")
    
    def set_transaction_description(self, description: str):
        """Postavlja opis transakcije."""
        self.transaction_description = description
    
    def set_transaction_amount(self, amount: str):
        """Postavlja iznos transakcije."""
        try:
            self.transaction_amount = float(amount)
        except ValueError:
            self.transaction_amount = 0
    
    def set_transaction_category(self, category: str):
        """Postavlja kategoriju transakcije."""
        self.transaction_category = category
    
    def set_transaction_date(self, date: str):
        """Postavlja datum transakcije."""
        self.transaction_date = date
        
    def add_transaction(self, transaction_type: str):
        """Dodaje novu transakciju."""
        if not self.transaction_description or self.transaction_amount <= 0:
            self.error_message = "Molimo unesite sve obavezne podatke!"
            return rx.toast(self.error_message, type="error")
            
        # Formatiraj datum za prikaz
        display_date = datetime.strptime(self.transaction_date, "%Y-%m-%d").strftime("%d.%m.%Y")
        
        new_transaction = {
            "id": len(self.transactions) + 1,  # Jednostavan ID za identifikaciju
            "date": display_date,
            "description": self.transaction_description,
            "category": self.transaction_category if transaction_type == "expense" else "Prihod",
            "amount": self.transaction_amount,
            "type": transaction_type
        }
        
        self.transactions.insert(0, new_transaction)
        
        # Ažuriranje ukupnih prihoda/rashoda
        if transaction_type == "income":
            self.income += self.transaction_amount
        else:
            self.expenses += self.transaction_amount
            
        self.savings = self.income - self.expenses
        
        # Resetuj polja forme
        self.transaction_description = ""
        self.transaction_amount = 0
        self.transaction_category = ""
        self.transaction_date = datetime.now().strftime("%Y-%m-%d")
        
        self.success_message = "Transakcija uspešno dodata!"
        return rx.toast(self.success_message)
    
    def edit_transaction(self, transaction_id: int):
        """Uređivanje transakcije."""
        # Ovde bi došla logika za uređivanje
        self.success_message = "Transakcija ažurirana!"
        return rx.toast(self.success_message)
        
    def delete_transaction(self, transaction_id: int):
        """Brisanje transakcije."""
        # Pronađi transakciju po ID-u
        transaction_to_delete = None
        for idx, transaction in enumerate(self.transactions):
            if transaction.get("id") == transaction_id:
                transaction_to_delete = transaction
                del self.transactions[idx]
                break
                
        if transaction_to_delete:
            # Ažuriranje ukupnih prihoda/rashoda
            if transaction_to_delete["type"] == "income":
                self.income -= transaction_to_delete["amount"]
            else:
                self.expenses -= transaction_to_delete["amount"]
                
            self.savings = self.income - self.expenses
            self.success_message = "Transakcija je uspešno obrisana!"
            return rx.toast(self.success_message)
        else:
            self.error_message = "Transakcija nije pronađena!"
            return rx.toast(self.error_message, type="error")
    
    # Aktivni tab na profil stranici
    profile_active_tab: int = 0
    
    def set_profile_active_tab(self, tab_index: int):
        """Postavlja aktivni tab na profil stranici."""
        self.profile_active_tab = tab_index

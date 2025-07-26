import reflex as rx
import sys
import os

# Dodaje direktorijem na PYTHONPATH
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importuje stranice
from finansijska_platforma_struktura.pages.profile_page import profile_index, profile_page_compat, profile_budget
from finansijska_platforma_struktura.pages.main_page import finance_overview, quick_actions

# Definisanje aplikacije
app = rx.App()

# Dodavanje static direktorijuma za serviranje JS fajlova
app.add_page(profile_index)
app.add_page(profile_page_compat)
app.add_page(profile_budget)

# Postavljanje osnovne rute
@rx.page(route="/", title="Golden Balance | Finansijska aplikacija")
def index():
    return rx.vstack(
        rx.heading("Dobrodošli na Golden Balance", size="lg"),
        rx.link("Otvori profil", href="/profile", button=True),
        rx.link("Otvori budžet", href="/profile/budget", button=True),
        align="center",
        spacing="4",
        padding="10",
    )

# Stranica za testiranje
@rx.page(route="/test", title="Test stranica")
def test_page():
    return rx.vstack(
        rx.heading("Test stranica", size="lg"),
        rx.text("Ova stranica služi za proveru da li Reflex server radi."),
        rx.link("Nazad na početnu", href="/", button=True),
        align="center",
        spacing="4",
        padding="10",
    )

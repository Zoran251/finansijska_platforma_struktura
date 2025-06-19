# ShootMaster Finansijska Platforma

Moderna web aplikacija za upravljanje ličnim i poslovnim finansijama napravljena pomoću Reflex Python framework-a.

## Funkcionalnosti

- **Dashboard** - pregled ključnih finansijskih metrika
- **Pregled finansija** - detaljna analiza prihoda i rashoda sa grafikonima
- **Admin panel** - upravljanje korisnicima i sistemskim podešavanjima
- **Korisnički profil** - personalizacija korisničkog naloga

## Tehnologije

- **Reflex** - Python framework za reaktivne web aplikacije
- **Tailwind CSS** - za stilizovanje
- **Charting biblioteke** - za vizualizaciju podataka

## Pokretanje aplikacije

### Preduslovi

- Python 3.8+
- Node.js 16+

### Instalacija

1. Klonirajte repozitorijum:
   ```
   git clone https://github.com/username/finansijska-aplikacija.git
   cd finansijska-aplikacija
   ```

2. Instaliranje Reflex-a:
   ```
   pip install reflex
   ```

3. Instaliranje zavisnosti:
   ```
   pip install -r requirements.txt
   ```

4. Pokretanje aplikacije:
   ```
   reflex run
   ```

5. Otvorite aplikaciju u browseru:
   ```
   http://localhost:3000
   ```

## Struktura projekta

```
finansijska_platforma_struktura/
├── assets/            # Statički fajlovi (slike, fontovi)
├── components/        # Komponente za ponovnu upotrebu
│   ├── navbar.py
│   ├── sidebar.py
│   └── dashboard_widgets.py
├── pages/             # Stranice aplikacije
│   ├── main_page.py
│   ├── preview_page.py
│   ├── admin_page.py
│   └── profile_page.py
├── states/            # State menadzment
│   └── finance_state.py
└── __init__.py
```

## Razvoj

Za razvoj aplikacije, pokrenite:

```bash
reflex run --dev
```

Ovo će omogućiti hot-reloading funkcionalnost za brži razvoj.

## Licenca

Ovaj projekat je licenciran pod MIT licencom - pogledajte [LICENSE](LICENSE) fajl za detalje.

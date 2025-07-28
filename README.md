# Golden Balance - Finansijska Aplikacija

Moderna, mobilno-optimizovana finansijska aplikacija za praćenje budžeta i konsultacije.

## 🌟 Demo

Aplikacija je dostupna na: [Golden Balance Demo](https://zoran251.github.io/finansijska_platforma_struktura/preview-fixed.html)

## 🚀 Funkcionalnosti

### 💰 Finansijski Upravljanje
- **Budžet Planiranje** - Postavite i pratite mesečni budžet
- **Praćenje Troškova** - Kategorišite i analizirajte troškove
- **Finansijski Pregledi** - Detaljni izvještaji o prihodima/troškovima
- **Mobilno Optimizovano** - Potpuna responsivnost za sve uređaje

### 💼 Konsultacije
- **Zakazivanje Termina** - Jednostavno zakazivanje finansijskih konsultacija
- **Admin Panel** - Upravljanje terminima i notifikacijama
- **Real-time Chat** - Podrška uživo
- **Automatske Notifikacije** - Email i browser notifikacije

### 🔧 Tehnički Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: localStorage + centralizirani DataManager
- **Styling**: CSS Grid, Flexbox, Modern CSS features
- **Icons**: Font Awesome 6
- **Mobile-First**: Responsive design sa touch optimizacijom

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

## 📊 Status implementacije

✅ **ZAVRŠENO:**
- Kompletna HTML/CSS/JS implementacija
- Svi moduli povezani i funkcionalni
- GitHub Pages deployment aktivan: https://zoran251.github.io/finansijska_platforma_struktura/
- Responsive dizajn za sve uređaje
- localStorage integracija za perzistenciju podataka
- Python Reflex backend implementacija
- Sveobuhvatno testiranje i dokumentacija

🎯 **PRODUKTIVNO:**
- Aplikacija je spremna za korišćenje
- Sve funkcionalnosti testirane i verifikovane
- Dokumentacija kompletna

## 🔗 Korisni linkovi

- **Live Demo:** https://zoran251.github.io/finansijska_platforma_struktura/
- **Testiranje:** [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Pokretanje:** [POKRETANJE.md](POKRETANJE.md)

## 📞 Podrška

Za tehničku podršku koristite:
1. Support sistem u aplikaciji
2. GitHub Issues
3. Dokumentaciju u repozitorijumu

## Licenca

Ovaj projekat je licenciran pod MIT licencom - pogledajte [LICENSE](LICENSE) fajl za detalje.

# 🧪 Vodič za testiranje finansijske aplikacije

## 📋 Pregled aplikacije

Finansijska aplikacija je sada kompletno implementirana sa svim funkcionalnostima u dva format:
1. **Statička HTML verzija** - za GitHub Pages deployment
2. **Python Reflex verzija** - za lokalno pokretanje sa backend funkcionalnostima

## 🌐 Online testiranje (GitHub Pages)

**URL:** https://zoran251.github.io/finansijska_platforma_struktura/

### Glavne sekcije za testiranje:

#### 1. 📊 Dashboard
- **Lokacija:** Početna stranica
- **Test:** Proverite da li se prikazuju:
  - Ukupan budžet, troškovi, štednje
  - Grafik troškova po kategorijama (Chart.js)
  - Poslednje transakcije

#### 2. 💰 Budžet Manager
- **Lokacija:** Budžet tab
- **Test:**
  - Dodajte novi prihod/rashod
  - Proverite validaciju forme
  - Testirajte brisanje stavki
  - Proverite localStorage persistency (refresh stranicu)

#### 3. 📈 Investicioni kalkulator
- **Lokacija:** Kalkulator tab
- **Test:**
  - Unesite početni kapital (npr. 10000)
  - Mesečni ulog (npr. 500)
  - Godišnju kamatu (npr. 7)
  - Period (npr. 10 godina)
  - Kliknite "Izračunaj"
  - Proverite rezultate i grafik

#### 4. 📅 Zakazivanje konsultacija
- **Lokacija:** Konsultacije tab
- **Test:**
  - Izaberite tip konsultacije
  - Unesite datum/vreme (budući datum)
  - Dodajte poruku
  - Pošaljite zahtev
  - Proverite da li se dodaje u listu

#### 5. 🎯 Ciljevi štednje
- **Lokacija:** Ciljevi tab
- **Test:**
  - Dodajte novi cilj sa nazivom i sumom
  - Testirajte progress bar
  - Dodajte štednju ka cilju
  - Proverite označavanje kao završeno

#### 6. 🛡️ Tehnička podrška
- **Lokacija:** Podrška tab
- **Test:**
  - Otvorite chat
  - Pošaljite poruku
  - Testirajte odgovor bota
  - Kreirajte support tiket
  - Proverite FAQ sekciju

#### 7. 👤 Profil korisnika
- **Lokacija:** Profil link u navigation
- **Test:**
  - Upload slike profila
  - Izmena ličnih podataka
  - Bezbednosna podešavanja
  - Notifikacije

#### 8. ⚙️ Admin panel
- **Lokacija:** Admin link (vidljiv samo kada je ulogovan admin)
- **Test:**
  - Pregled korisnika
  - Statistike sistema
  - Upravljanje sadržajem
  - Sistemska podešavanja

## 💻 Lokalno testiranje

### HTML verzija:
1. Otvorite `index.html` u browser-u
2. Sve funkcionalnosti rade sa localStorage-om
3. Ne zahteva server

### Python Reflex verzija:
```bash
cd finansijska-aplikacija-main
python -m reflex init
python -m reflex run
```
Ili koristite VS Code launch konfiguraciju (F5).

## 🔍 Ključne funkcionalnosti za testiranje

### 1. State Management
- **localStorage persistency:** Svi podaci se čuvaju lokalno
- **Real-time updates:** Izmene se odmah reflektuju
- **Cross-tab synchronization:** Otvorite aplikaciju u više tabova

### 2. Responsivnost
- **Desktop:** Pun layout sa sidebar-om
- **Tablet:** Collapsed navigation
- **Mobile:** Stack layout

### 3. JavaScript moduli
Svi moduli su povezani kroz `js/main.js`:
- `app.js` - Glavna logika
- `booking.js` - Zakazivanje
- `support.js` - Tehnička podrška
- `investment-calculator.js` - Kalkulator
- `admin.js` - Admin panel
- `autofill.js` - Auto-popunjavanje
- `chat.js` - Chat funkcionalnost

### 4. Validacija i error handling
- Form validacija
- Error messages
- Loading states
- Fallback handling

## 🐛 Poznati problemi i ograničenja

1. **Backend simulacija:** Sve je frontend-only sa localStorage
2. **Realtime data:** Nema prave konakcije sa bazom podataka
3. **Authentication:** Simulirana kroz localStorage
4. **File uploads:** Rade sa base64 encoding

## 📝 Preporučeni test scenariji

### Scenario 1: Novi korisnik
1. Otvorite aplikaciju
2. Dodajte prvi prihod/rashod
3. Postavite cilj štednje
4. Zakažite konsultaciju
5. Testirajte kalkulator

### Scenario 2: Power user
1. Dodajte više transakcija
2. Kreirajte multiple ciljeva
3. Koristite admin panel
4. Testirajte support sistem
5. Proverite sve grafike

### Scenario 3: Mobile user
1. Otvorite na telefonu
2. Testirajte navigation
3. Proverite touch interactions
4. Testirajte forme na malom ekranu

## 🚀 Performance testiranje

- Otvorite browser dev tools
- Proverite network requests
- Testirajte localStorage limits
- Proverite memory usage
- Testirajte sa velikim brojem transakcija

## 📊 Metrije za praćenje

1. **Funkcionalne:** Sve opcije rade
2. **Performance:** Brze transakcije
3. **UX:** Intuitivno korisničko iskustvo
4. **Responsivnost:** Radi na svim uređajima
5. **Stabilnost:** Nema crash-ova ili grešaka

## 🔧 Debug opcije

U browser console možete koristiti:
```javascript
// Pregled stanja aplikacije
console.log(localStorage);

// Reset aplikacije
localStorage.clear();

// Debug modovi
window.DEBUG = true;
```

## 📞 Podrška

Za probleme ili predloge poboljšanja, koristite:
1. Tehnička podrška u aplikaciji
2. GitHub Issues
3. Direktan kontakt preko support sistema

---

**Napomena:** Aplikacija je trenutno u demo modu. Svi podaci se čuvaju lokalno i neće biti izgubljeni osim ako ne očistite browser cache.

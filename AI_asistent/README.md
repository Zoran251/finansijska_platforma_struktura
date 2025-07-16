# AI Asistent - Dokumentacija

## Pregled

AI asistent za finansijsku platformu je inteligentni chatbot koji odgovara na pitanja korisnika vezana za finansije. Koristi predefinisanu bazu znanja sa odgovorima na različite finansijske teme, uključujući:

- Investiranje
- Kredite
- Poreze
- Kriptovalute
- Osiguranje
- Planiranje penzije
- Dugoročne finansijske ciljeve
- Inflaciju
- Akcije i berzu
- Nekretnine
- Složenu kamatu

## Struktura foldera

```
AI_asistent/
│
├── kb.js                  # Knowledge Base - baza znanja i logika prepoznavanja upita
├── chat.js                # Logika chat interfejsa i komunikacije sa bazom znanja
├── chat.css               # Stilovi za chat interfejs
├── integration.js         # Pomoćne funkcije za integraciju asistenta u stranice
├── index.html             # Samostalna stranica sa asistentom
├── demo.html              # Demo stranica sa primerima integracije
└── README.md              # Ova dokumentacija
```

## Osnovno korišćenje

### 1. Samostalni asistent

Za korišćenje asistenta kao samostalne stranice, jednostavno otvorite `index.html` u vašem web pretraživaču.

### 2. Integracija u druge stranice

Za integraciju asistenta u druge stranice, koristite `integration.js`:

```html
<!-- Dodajte div gde želite da se pojavi asistent -->
<div id="ai-assistant-container"></div>

<!-- Učitajte integracionu skriptu -->
<script src="/AI_asistent/integration.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        AIAssistantIntegration.init();
    });
</script>
```

## API Reference

### ChatBotKB API

Glavni API za pristup bazi znanja:

- `ChatBotKB.getResponse(query)` - Vraća odgovor na korisnički upit
- `ChatBotKB.getGreeting()` - Vraća pozdravnu poruku
- `ChatBotKB.identifyTopic(query)` - Identifikuje kategoriju upita
- `ChatBotKB.isInvestmentIntent(query)` - Proverava da li je upit vezan za investiranje
- `ChatBotKB.isLongTermGoalQuestion(query)` - Proverava da li je upit vezan za dugoročne ciljeve

### AIAssistantIntegration API

API za integraciju asistenta u druge stranice:

- `AIAssistantIntegration.init(options)` - Inicijalizuje asistenta sa opcijama:
  - `baseUrl`: URL do AI_asistent foldera (default: './') 
  - `containerId`: ID kontejnera za asistenta (default: 'ai-assistant-container')
- `AIAssistantIntegration.sendMessage()` - Šalje poruku iz input polja
- `AIAssistantIntegration.sendProgrammaticMessage(message)` - Programski šalje poruku asistentu
- `AIAssistantIntegration.getResponseOnly(message)` - Vraća odgovor na poruku bez prikazivanja u chat-u
- `AIAssistantIntegration.identifyTopic(message)` - Identifikuje kategoriju upita

## Kategorije odgovora

Asistent prepoznaje sledeće kategorije upita:

- `greeting` - Pozdravne poruke
- `investment_intent` - Pitanja o investiranju
- `kredit` - Pitanja o kreditima
- `porezi` - Pitanja o porezima
- `kriptovalute` - Pitanja o kriptovalutama
- `osiguranje` - Pitanja o osiguranju
- `penzija` - Pitanja o penziji
- `dugoročni_ciljevi` - Pitanja o dugoročnim finansijskim ciljevima
- `inflacija` - Pitanja o inflaciji
- `finansijski_cilj` - Pitanja o konkretnim finansijskim ciljevima
- `akcije` - Pitanja o akcijama i berzi
- `nekretnine` - Pitanja o investiranju u nekretnine
- `složena_kamata` - Pitanja o složenoj kamati

## Funkcionalnosti prepoznavanja upita

Asistent koristi napredne obrasce (regex) za prepoznavanje različitih tipova upita:

1. **Dugoročni ciljevi** - Prepoznaje upite poput "Imam 10.000€, želim 300.000€ za 40 godina"
2. **Složena kamata** - Prepoznaje upite o računanju složene kamate i formuli
3. **Investicione namere** - Prepoznaje različite fraze vezane za investiranje

Kada korisnik postavi pitanje vezano za investiranje, asistent dodaje preporuku za konsultaciju sa brokerom.

## Razvoj i testiranje

Za testiranje baze znanja u razvojnom okruženju dostupne su sledeće funkcije:

```javascript
// U konzoli brauzera:
window.testKB.testDetection()        // Testira prepoznavanje kategorija
window.testKB.testResponses()        // Testira sve odgovore
window.testKB.ask("vaše pitanje")    // Testira specifično pitanje
window.testKB.isLongTermGoal("vaše pitanje")  // Testira prepoznavanje dugoročnih ciljeva
```

## Prilagođavanje

### Dodavanje novih kategorija

Za dodavanje nove kategorije, dodajte novi objekat u `knowledgeBase` u `kb.js`:

```javascript
mojaNovaTema: {
    response: "Odgovor na novu temu...",
    keywords: ["ključna reč 1", "ključna reč 2", "ključna reč 3"]
}
```

### Modifikacija postojećih odgovora

Za izmenu postojećih odgovora, pronađite odgovarajuću kategoriju u `kb.js` i izmenite `response` property.

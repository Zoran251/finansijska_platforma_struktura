// Tehnička podrška - support.js
class TechnicalSupport {
    constructor() {
        this.tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
        this.chatMessages = [];
        this.isTyping = false;
        this.knowledgeBase = this.initKnowledgeBase();
        this.initialized = false;
        this.boundInit = this.init.bind(this);
        
        // Handle both scenarios - already loaded and still loading
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.boundInit);
        } else {
            this.boundInit();
        }
    }
    
    initKnowledgeBase() {
        return {
            // Ključne reči koje zahtevaju konsultacije
            investmentKeywords: [
                'kako da kupim', 'kako kupiti', 'gde kupiti', 'gde da kupim',
                'kako da uložim', 'kako uložiti', 'gde uložiti', 'gde da uložim',
                'kako da investiram', 'kako investirati', 'gde investirati',
                'najbolja investicija', 'preporučujem investiciju', 'savjet za investiranje',
                'koji fond', 'koja akcija', 'koje akcije', 'koji ETF',
                'da li da kupim', 'da li da investiram', 'vredi li investirati',
                'koliko da uložim', 'koliko investirati', 'koliko novca',
                'kada kupiti', 'kada investirati', 'najbolje vreme',
                'broker preporuka', 'koja platforma', 'koja aplikacija za trgovanje'
            ],
            
            keywords: {
                // Investicije - opšte informacije
                'investicija': ['investiranje', 'investicije', 'portfolijo', 'portfolio', 'berza', 'akcije', 'obveznice', 'ETF', 'fondovi'],
                'rizik': ['rizik', 'sigurnost', 'rizično', 'volatilnost', 'stabilnost'],
                'profit': ['profit', 'prinos', 'zarada', 'dobit', 'kamata', 'dividenda'],
                
                // Štednja
                'štednja': ['štednja', 'šteđenje', 'ušteda', 'štedni račun', 'oročavanje'],
                'budžet': ['budžet', 'budzet', 'planiranje', 'troškovi', 'rashodi', 'prihodi'],
                'kredit': ['kredit', 'zajam', 'dug', 'hipoteka', 'rata', 'kamata na kredit'],
                
                // Penzija
                'penzija': ['penzija', 'penziono', 'starost', 'penzioni fond', 'treći stub'],
                
                // Osiguranje
                'osiguranje': ['osiguranje', 'polisa', 'životno osiguranje', 'auto osiguranje'],
                
                // Porezi
                'porez': ['porez', 'porezi', 'poreska', 'PDV', 'porez na dohodak', 'poreska prijava'],
                
                // Nekretnine
                'nekretnina': ['nekretnina', 'stan', 'kuća', 'investiranje u nekretnine', 'hipoteka'],
                
                // Tehnička podrška
                'tehnicka': ['ne radi', 'greška', 'bug', 'problem', 'ne mogu', 'ne funkcioniše', 'pomoć', 'kako da'],
                'login': ['prijava', 'lozinka', 'login', 'password', 'zaboravio sam', 'ne mogu da se ulogujem'],
                'aplikacija': ['aplikacija', 'sajt', 'web', 'stranica', 'sporo', 'ne učitava']
            },
            
            responses: {
                'consultation_required': {
                    message: `🎯 **Personalizovano finansijsko savetovanje**

Za pitanja o konkretnim investicijama, kupovini finansijskih proizvoda ili investicionim strategijama, preporučujemo zakazivanje **BESPLATNE konsultacije** sa našim stručnjakom.

**👨‍💼 Naš finansijski savetnik:**
- **Zoran Dostić** - Sertifikovani finansijski savetnik
- **1 godina iskustva** uz podršku tima sa **20+ godina** rada u finansijskom sektoru
- Specijalizovan za: investicije, štednju, planiranje budžeta

**🎁 Besplatna konsultacija uključuje:**
• Analizu vaše trenutne finansijske situacije
• Personalizovane preporuke za investiranje
• Strategiju za postizanje vaših ciljeva
• Odgovore na sva vaša specifična pitanja

**📅 Zakažite konsultaciju direktno kroz našu platformu!**`,
                    action: 'consultation',
                    consultationType: 'investments'
                },
                
                'investicija': {
                    message: `💼 **Investiranje - Opšte informacije**
                    
**🎯 Osnovni principi investiranja:**
• **Diversifikacija** - Rasporedite rizik kroz različite investicije
• **Dugoročnost** - Investirajte za period od 5+ godina
• **Redovnost** - Konstantno investiranje (DCA strategija)
• **Edukacija** - Razumejte u šta investirate

**📊 Tipovi investicija:**
1. **Akcije** - Udeli u kompanijama (veći rizik/potencijal)
2. **Obveznice** - Državni/korporativni dugovi (stabilnije)
3. **ETF fondovi** - Diversifikovani portfoliji
4. **Nekretnine** - Fizička imovina
5. **Zlato** - Zaštita od inflacije

**⚠️ Osnovni principi:**
- Nikad ne investirajte novac koji vam je potreban u narednih 5 godina
- Počnite sa malim iznosima dok učite
- Ne ulagajte sve odjednom - koristite DCA strategiju

**💡 Za konkretne savete o tome ŠTA i KADA da kupite/investirate, zakažite besplatnu konsultaciju!**`,
                    action: 'general_info'
                },
                
                'štednja': {
                    message: `💰 **Štednja - Temelj finansijske sigurnosti**
                    
**🎯 Pravilo 50/30/20:**
• 50% prihoda - osnovne potrebe (hrana, kirija, računi)
• 30% prihoda - želje i zabava
• 20% prihoda - štednja i investicije

**💡 Strategije štednje:**
1. **Rezervni fond** - 3-6 mesečnih plata za hitne slučajeve
2. **Ciljana štednja** - Za specifične ciljeve (odmor, auto)
3. **Automatska štednja** - Postavite automatski transfer
4. **Oročavanje** - Za novac koji ne trebate 1-3 godine

**📈 Praktični saveti:**
• Štedite čim primite platu (plaćajte sebe prvo)
• Koristite različite račune za različite ciljeve
• Pratite troškove kroz aplikacije za budžetiranje
• Redovno preispitajte svoje troškove

**🏦 Gde čuvati novac:**
- Tekući račun: novac za mesečne troškove
- Štedni račun: rezervni fond (veća kamata)
- Oročeni račun: srednjoročni ciljevi`,
                    action: 'general_info'
                },
                
                'budžet': {
                    message: `📊 **Budžetiranje - Kontrola nad vašim novcem**
                    
Budžet je plan koji vam pomaže da kontrolišete novac umesto da novac kontroliše vas:

**📝 Koraci za kreiranje budžeta:**
1. **Izračunajte ukupne prihode** (neto plata + dodatni prihodi)
2. **Napravite listu svih troškova:**
   - Fiksni (kirija, rate, osiguranje)
   - Varijabilni (hrana, transport, zabava)
3. **Kategorišite troškove** po važnosti
4. **Postavite limite** za svaku kategoriju
5. **Pratite troškove** tokom meseca

**💡 Popularni metodi:**
• **Envelope metod** - Fizički novac u koverti za svaku kategoriju
• **Zero-based budgeting** - Svaki dinar ima svrhu
• **50/30/20 pravilo** - Jednostavna podela prihoda

**📱 Alati za budžetiranje:**
Koristite naš ugrađeni budžet tracker ili aplikacije poput YNAB, Mint.`,
                    action: 'budgeting',
                    consultationType: 'budgeting'
                },
                
                'penzija': {
                    message: `👴 **Penziono planiranje - Nikad nije prerano za početak**
                    
Što ranije počnete, to će vam biti lakše:

**🏛️ Penzijski sistem u Srbiji:**
1. **Prvi stub** - Obavezno penzijsko osiguranje
2. **Drugi stub** - Dobrovoljni penzioni fond (trenutno ne radi)
3. **Treći stub** - Lična štednja i investicije

**💰 Strategije za penziju:**
• **Počnite rano** - Vreme je najsnažniji faktor
• **Investirajte u indeks fondove** - Dugoročni rast
• **Diversifikujte** - Ne oslanjajte se samo na državnu penziju
• **Redovni doprinosi** - Što god možete, koliko god možete

**📊 Primer:** 
Ako u 25. godini štedite 100€ mesečno (7% godišnji prinos), u 65. imate ~262.000€!
Ako počnete u 35., imaće te ~122.000€.

**🎯 Preporučeno:** 10-15% prihoda za penziju`,
                    action: 'consultation',
                    consultationType: 'retirement'
                },
                
                'kredit': {
                    message: `💳 **Upravljanje kreditima i dugovima**
                    
Kredit može biti alat ili tereta - zavisi kako ga koristite:

**⚠️ Tipovi kamata:**
• **Fiksna kamata** - Ista tokom celog perioda
• **Varijabilna kamata** - Menja se sa tržištem
• **EKS (Efektivna kamatna stopa)** - Ukupni trošak kredita

**🎯 Strategije otplate:**
1. **Snowball metoda** - Prvo najmanji dugovi (psihološki efekat)
2. **Avalanche metoda** - Prvo najveće kamate (matematički bolje)
3. **Refinansiranje** - Pregovaranje bojih uslova

**💡 Saveti:**
• Nikad ne uzimajte kredit za luksuz
• Čitajte ugovor pre potpisivanja
• Plaćajte više od minimuma kad god možete
• Izbegavajte kartice sa velikim kamatama

**📞 Problemi sa dugovima?** Kontaktirajte me za personalizovanu strategiju.`,
                    action: 'consultation',
                    consultationType: 'debt'
                },
                
                'tehnicka': {
                    message: `🔧 **Tehnička podrška**

Razumem da imate tehnički problem. Evo najčešćih rešenja:

**🚀 Osnovna rešenja:**
1. **Osvežite stranicu** (F5 ili Ctrl+R)
2. **Očistite cache** (Ctrl+Shift+Delete)
3. **Proverite internet konekciju**
4. **Probajte drugi browser** (Chrome, Firefox, Edge)

**📱 Mobilni uređaji:**
- Zatvorite i ponovo otvorite aplikaciju
- Restartujte uređaj
- Proverite ažuriranja aplikacije

**💡 Ako problem i dalje postoji:**
Kreirajte tiket sa detaljnim opisom problema i mi ćemo vam pomoći u najkraćem roku.`,
                    action: 'general_info'
                },
                
                'login': {
                    message: `🔐 **Problemi sa prijavom**

Evo kako možete rešiti probleme sa prijavom:

**🔑 Zaboravljena lozinka:**
1. Kliknite "Zaboravili ste lozinku?"
2. Unesite svoj email
3. Proverite email za link za reset
4. Sledite instrukcije u email-u

**👤 Zaboravljeno korisničko ime:**
- Proverite email potvrde registracije
- Kontaktirajte podršku sa email adresom

**⚠️ Račun je zaključan:**
- Sačekajte 15 minuta pa probajte ponovo
- Ili kontaktirajte podršku za trenutno otključavanje

**🔒 Sigurnosni saveti:**
- Koristite jaku lozinku (8+ karaktera, brojevi, simboli)
- Ne delite podatke za prijavu
- Odjavite se kad završite rad`,
                    action: 'general_info'
                },
                
                'aplikacija': {
                    message: `📱 **Problemi sa aplikacijom**

Ako aplikacija radi sporo ili se ne učitava:

**⚡ Brzina:**
1. **Zatvorite nepotrebne tabove** u browseru
2. **Restartujte browser**
3. **Proverite brzinu interneta**
4. **Koristite najnoviju verziju browsera**

**🔄 Učitavanje:**
- Osvežite stranicu (F5)
- Očistite cache i cookies
- Onemogućite ad-block za naš sajt
- Probajte incognito/private mode

**📊 Sistemski zahtevi:**
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- Stabilna internet konekcija (min 1 Mbps)
- JavaScript mora biti omogućen

**💻 Najbolje performanse:**
Chrome ili Firefox na desktop računaru`,
                    action: 'general_info'
                },
                
                'default': {
                    message: `👋 **Zdravo! Tu sam da pomognem.**

Mogu da vam pomognem sa:

**💰 Finansijska pitanja:**
- Štednja i budžetiranje
- Osnove investiranja  
- Penziono planiranje
- Upravljanje dugovima

**🔧 Tehnička podrška:**
- Problemi sa prijavom
- Sporija aplikacija
- Greške i bugovi

**📞 Dodatna pomoć:**
- Za specifične savete o investiranju → **besplatna konsultacija**
- Za tehničke probleme → **kreirajte tiket**
- Za hitne slučajeve → **pozovite +381 11 123 4567**

Kako vam mogu pomoći danas? 😊`,
                    action: 'general_info'
                }
            }
        };
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderChat();
            this.bindEvents();
            this.renderTickets();
            this.initialized = true;
        });
    }
    
    bindEvents() {
        const _this = this;
        
        // Slanje poruke na Enter
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    _this.sendMessage();
                }
            });
        } else {
            console.error('Element #chat-input nije pronađen');
        }
        
        // Klik na dugme za slanje poruke
        const sendButton = document.getElementById('send-button');
        if (sendButton) {
            sendButton.addEventListener('click', function() {
                _this.sendMessage();
            });
        } else {
            console.error('Element #send-button nije pronađen');
        }
        
        // Klik na dugme za zakazivanje konsultacije
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('schedule-consultation')) {
                    _this.scheduleConsultation(e.target.dataset.type);
                }
            });
        } else {
            console.error('Element #chat-container nije pronađen');
        }
    }
    
    renderChat() {
        const chatContainer = document.getElementById('chat-container');
        if (!chatContainer) {
            console.error('Element #chat-container nije pronađen');
            return;
        }
        
        chatContainer.innerHTML = '';
        
        this.chatMessages.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('chat-message');
            div.classList.add(msg.type);
            div.innerHTML = msg.type === 'user' ? `
                <div class="message-content user-message">
                    ${msg.text}
                </div>
            ` : `
                <div class="message-content bot-message">
                    ${msg.text}
                </div>
            `;
            chatContainer.appendChild(div);
        });
        
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    renderTickets() {
        const ticketsContainer = document.getElementById('tickets-container');
        if (!ticketsContainer) {
            console.error('Element #tickets-container nije pronađen');
            return;
        }
        
        ticketsContainer.innerHTML = '';
        
        this.tickets.forEach((ticket, index) => {
            const div = document.createElement('div');
            div.classList.add('ticket');
            div.innerHTML = `
                <div class="ticket-header">
                    <span class="ticket-id">Ticket #${ticket.id}</span>
                    <span class="ticket-status ${ticket.status}">${ticket.status}</span>
                </div>
                <div class="ticket-body">
                    <div class="ticket-question">${ticket.question}</div>
                    <div class="ticket-answer ${ticket.answer ? '' : 'hidden'}">${ticket.answer}</div>
                </div>
                <div class="ticket-footer">
                    <button class="btn btn-primary btn-sm" onclick="support.replyToTicket(${index})">Odgovori</button>
                    <button class="btn btn-danger btn-sm" onclick="support.deleteTicket(${index})">Obriši</button>
                </div>
            `;
            ticketsContainer.appendChild(div);
        });
    }
    
    sendMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        
        if (!text) return;
        
        // Dodaj korisničku poruku u chat
        this.chatMessages.push({ type: 'user', text });
        this.renderChat();
        
        // Očisti input polje
        input.value = '';
        
        // Simuliraj odgovor bota
        this.simulateBotResponse(text);
    }
    
    simulateBotResponse(userText) {
        const lowerCaseText = userText.toLowerCase();
        let responseKey = 'default';
        
        // Proveri da li korisnik traži konsultaciju
        if (this.knowledgeBase.investmentKeywords.some(keyword => lowerCaseText.includes(keyword))) {
            responseKey = 'consultation_required';
        } else {
            // Prođi kroz sve ključne reči i pronađi odgovarajući odgovor
            for (const [key, keywords] of Object.entries(this.knowledgeBase.keywords)) {
                for (const keyword of keywords) {
                    if (lowerCaseText.includes(keyword)) {
                        responseKey = key;
                        break;
                    }
                }
                if (responseKey !== 'default') break;
            }
        }
        
        const response = this.knowledgeBase.responses[responseKey];
        
        // Dodaj odgovor bota u chat
        this.chatMessages.push({ type: 'bot', text: response.message });
        this.renderChat();
        
        // Ako je potrebna konsultacija, dodaj dugme za zakazivanje
        if (response.action === 'consultation') {
            this.addConsultationButton(response.consultationType);
        }
    }
    
    addConsultationButton(type) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-success', 'schedule-consultation');
        button.dataset.type = type;
        button.innerText = 'Zakazivanje konsultacije';
        
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.appendChild(button);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            console.error('Element #chat-container nije pronađen');
        }
    }
    
    scheduleConsultation(type) {
        // Ovdje ide logika za zakazivanje konsultacije (npr. otvaranje novog prozora ili preusmeravanje na stranicu za zakazivanje)
        alert(`Zakazivanje konsultacije za tip: ${type}`);
    }
    
    replyToTicket(index) {
        const ticket = this.tickets[index];
        const answer = prompt('Unesite odgovor:', ticket.answer || '');
        
        if (answer !== null) {
            // Ažuriraj odgovor na tiketu
            this.tickets[index].answer = answer;
            this.saveTickets();
            this.renderTickets();
            
            // Prikaži odgovor u chat-u
            this.chatMessages.push({ type: 'bot', text: answer });
            this.renderChat();
        }
    }
    
    deleteTicket(index) {
        if (confirm('Da li ste sigurni da želite da obrišete ovaj tiket?')) {
            this.tickets.splice(index, 1);
            this.saveTickets();
            this.renderTickets();
        }
    }
    
    saveTickets() {
        localStorage.setItem('supportTickets', JSON.stringify(this.tickets));
    }
}

// Inicijalizuj podršku
const support = new TechnicalSupport();

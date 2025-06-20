// Tehnička podrška - support.js
class TechnicalSupport {
    constructor() {
        this.tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
        this.chatMessages = [];
        this.isTyping = false;
        this.knowledgeBase = this.initKnowledgeBase();
        this.init();
    }    initKnowledgeBase() {
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

**📞 Problemi sa dugovima?** Kontaktirajte me za personalizovanu strategiju.`,                    action: 'consultation',
                    consultationType: 'debt'
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
• **50/30/20 pravilo** - 50% potrebe, 30% želje, 20% štednja
• **Zero-based budgeting** - Svaki dinar ima svrhu
• **Envelope metod** - Fizički ili digitalni "koverat" za kategorije

**📱 Alati za budžetiranje:**
- Naš budžet tracker u aplikaciji
- Excel/Google Sheets tabele
- Mobilne aplikacije (YNAB, Mint)
- Envelope sistem sa gotovinom`,
                    action: 'general_info'
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
                },
                
                'default': {
                    message: `🤖 **Dobrodošli u Golden Balance podršku!**
                    
Mogu da vam pomognem sa:
                    
**💰 Finansijskim pitanjima:**
• Investiranje i portfolio strategije
• Štednja i budžetiranje  
• Penziono planiranje
• Upravljanje dugovima
• Poreska pitanja
• Osiguranje i zaštita

**🔧 Tehničkim pitanjima:**
• Korišćenje platforme
• Problemi sa nalogom
• Funkcionalnosti aplikacije

**💬 Kako mogu da pomognem?**
Opišite vaše pitanje ili problem, a ja ću vam dati detaljno objašnjenje i usmeriti vas ka najboljoj soluciji.

**Za kompleksna finansijska pitanja, preporučujem zakazivanje besplatne konsultacije sa našim stručnjakom.**`,
                    action: 'general_info'
                }
            }
        };
    }

    init() {
        this.renderTickets();
        this.initChat();
        this.setupEventListeners();
    }

    // Support Ticket System
    createTicket(subject, description, priority = 'medium') {
        const ticket = {
            id: 'TIC-' + Date.now(),
            subject: subject,
            description: description,
            priority: priority,
            status: 'open',
            created: new Date().toISOString(),
            messages: []
        };

        this.tickets.unshift(ticket);
        this.saveTickets();
        this.renderTickets();
        return ticket;
    }

    renderTickets() {
        const container = document.getElementById('supportTickets');
        if (!container) return;

        if (this.tickets.length === 0) {
            container.innerHTML = `
                <div class="no-tickets">
                    <i class="fas fa-ticket-alt"></i>
                    <p>Nemate otvorene tikete</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.tickets.map(ticket => `
            <div class="support-ticket" data-id="${ticket.id}">
                <div class="ticket-header">
                    <div class="ticket-id">${ticket.id}</div>
                    <div class="ticket-status status-${ticket.status}">${this.getStatusText(ticket.status)}</div>
                </div>
                <div class="ticket-subject">${ticket.subject}</div>
                <div class="ticket-meta">
                    <span class="priority priority-${ticket.priority}">
                        <i class="fas fa-flag"></i> ${this.getPriorityText(ticket.priority)}
                    </span>
                    <span class="ticket-date">${this.formatDate(ticket.created)}</span>
                </div>
                <div class="ticket-actions">
                    <button class="btn-sm" onclick="support.viewTicket('${ticket.id}')">
                        <i class="fas fa-eye"></i> Prikaži
                    </button>
                    ${ticket.status === 'open' ? `
                        <button class="btn-sm btn-danger" onclick="support.closeTicket('${ticket.id}')">
                            <i class="fas fa-times"></i> Zatvori
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'open': 'Otvoren',
            'in-progress': 'U radu',
            'closed': 'Zatvoren',
            'resolved': 'Rešen'
        };
        return statusMap[status] || status;
    }

    getPriorityText(priority) {
        const priorityMap = {
            'low': 'Niska',
            'medium': 'Srednja',
            'high': 'Visoka',
            'urgent': 'Hitno'
        };
        return priorityMap[priority] || priority;
    }

    viewTicket(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const modal = this.createTicketModal(ticket);
        document.body.appendChild(modal);
    }

    createTicketModal(ticket) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal ticket-modal">
                <div class="modal-header">
                    <h3>Tiket ${ticket.id}</h3>
                    <button class="btn-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="ticket-details">
                        <div class="ticket-info">
                            <div class="info-row">
                                <label>Naslov:</label>
                                <span>${ticket.subject}</span>
                            </div>
                            <div class="info-row">
                                <label>Status:</label>
                                <span class="status-${ticket.status}">${this.getStatusText(ticket.status)}</span>
                            </div>
                            <div class="info-row">
                                <label>Prioritet:</label>
                                <span class="priority-${ticket.priority}">${this.getPriorityText(ticket.priority)}</span>
                            </div>
                            <div class="info-row">
                                <label>Kreiran:</label>
                                <span>${this.formatDate(ticket.created)}</span>
                            </div>
                        </div>
                        <div class="ticket-description">
                            <h4>Opis problema:</h4>
                            <p>${ticket.description}</p>
                        </div>
                        <div class="ticket-messages">
                            <h4>Poruke:</h4>
                            <div class="messages-list">
                                ${ticket.messages.length === 0 ? 
                                    '<p class="no-messages">Nema poruka</p>' :
                                    ticket.messages.map(msg => `
                                        <div class="message-item ${msg.isStaff ? 'staff-message' : 'user-message'}">
                                            <div class="message-header">
                                                <strong>${msg.isStaff ? 'Podrška' : 'Vi'}</strong>
                                                <span class="message-time">${this.formatDate(msg.timestamp)}</span>
                                            </div>
                                            <div class="message-content">${msg.content}</div>
                                        </div>
                                    `).join('')
                                }
                            </div>
                            ${ticket.status === 'open' ? `
                                <div class="message-form">
                                    <textarea 
                                        id="newMessage-${ticket.id}" 
                                        placeholder="Unesite vašu poruku..."
                                        rows="3"
                                    ></textarea>
                                    <button class="btn" onclick="support.addMessage('${ticket.id}')">
                                        Pošalji poruku
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    addMessage(ticketId) {
        const textarea = document.getElementById(`newMessage-${ticketId}`);
        const content = textarea.value.trim();
        
        if (!content) return;

        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const message = {
            id: Date.now(),
            content: content,
            timestamp: new Date().toISOString(),
            isStaff: false
        };

        ticket.messages.push(message);
        this.saveTickets();

        // Simulate staff response after 2 seconds
        setTimeout(() => {
            const staffResponse = {
                id: Date.now() + 1,
                content: "Hvala vam na poruci. Naš tim će preuzeti slučaj i kontaktirati vas uskoro.",
                timestamp: new Date().toISOString(),
                isStaff: true
            };
            ticket.messages.push(staffResponse);
            this.saveTickets();
        }, 2000);

        // Close modal and refresh
        document.querySelector('.modal-overlay').remove();
        this.viewTicket(ticketId);
    }

    closeTicket(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.status = 'closed';
            this.saveTickets();
            this.renderTickets();
        }
    }

    // Live Chat System
    initChat() {
        this.chatMessages = [
            {
                id: 1,
                content: "Dobrodošli u tehničku podršku! Kako vam možemo pomoći danas?",
                isStaff: true,
                timestamp: new Date().toISOString()
            }
        ];
        this.renderChatMessages();
    }

    renderChatMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = this.chatMessages.map(msg => `
            <div class="chat-message ${msg.isStaff ? 'staff-message' : 'user-message'}">
                <div class="message-avatar">
                    <i class="fas ${msg.isStaff ? 'fa-headset' : 'fa-user'}"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${msg.content}</div>
                    <div class="message-time">${this.formatTime(msg.timestamp)}</div>
                </div>
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const content = input.value.trim();
        
        if (!content) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            content: content,
            isStaff: false,
            timestamp: new Date().toISOString()
        };

        this.chatMessages.push(userMessage);
        input.value = '';
        this.renderChatMessages();

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate staff response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(content);
            const staffMessage = {
                id: Date.now() + 1,
                content: response,
                isStaff: true,
                timestamp: new Date().toISOString()
            };
            this.chatMessages.push(staffMessage);
            this.renderChatMessages();
        }, Math.random() * 2000 + 1000);
    }

    showTypingIndicator() {
        const container = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'chat-message staff-message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-headset"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Analiza ključnih reči za finansijska pitanja
        const detectedCategory = this.analyzeMessage(message);
        const response = this.knowledgeBase.responses[detectedCategory] || this.knowledgeBase.responses.default;
        
        // Formatiraj odgovor
        let formattedResponse = response.message;
        
        // Dodaj akcije na osnovu kategorije
        if (response.action === 'consultation') {
            formattedResponse += `\n\n🗓️ **Preporučujem zakazivanje besplatne konsultacije**\n[Zakažite konsultaciju](javascript:openModal('consultationModal')) za detaljno razmotravanje vaše situacije.`;
        } else if (response.action === 'budgeting') {
            formattedResponse += `\n\n📊 **Koristite naš budžet tracker**\nProbajte naš [budžet alat](profile.html#budget) za lakše upravljanje troškovima.`;
        }
        
        return formattedResponse;    }

    generateResponse(userMessage) {
        var message = userMessage.toLowerCase();
        
        // Prvo proveravamo da li je potrebna konsultacija
        if (this.requiresConsultation(message)) {
            return this.knowledgeBase.responses.consultation_required.message;
        }
        
        // Analiza ključnih reči za finansijska pitanja
        var detectedCategory = this.analyzeMessage(message);
        var response = this.knowledgeBase.responses[detectedCategory] || this.knowledgeBase.responses.default;
        
        // Formatiraj odgovor
        var formattedResponse = response.message;
        
        // Dodaj akcije na osnovu kategorije
        if (response.action === 'consultation') {
            formattedResponse += '\n\n🗓️ **Za personalizovane savete**\n[Zakažite besplatnu konsultaciju](javascript:showPage(\'consultation\')) sa našim stručnjakom.';
        } else if (response.action === 'budgeting') {
            formattedResponse += '\n\n📊 **Koristite naš budžet alat**\nProbajte naš [budžet tracker](javascript:showPage(\'profile\')) za lakše upravljanje troškovima.';
        }
        
        return formattedResponse;
    }

    analyzeMessage(message) {
        // Analiza ključnih reči
        for (var category in this.knowledgeBase.keywords) {
            var keywords = this.knowledgeBase.keywords[category];
            for (var i = 0; i < keywords.length; i++) {
                if (message.includes(keywords[i].toLowerCase())) {
                    return category;
                }
            }
        }
        
        // Specifična prepoznavanja
        if (message.includes('ne radi') || message.includes('greška') || message.includes('problem')) {
            return 'tehnicka';
        }
        
        if (message.includes('lozinka') || message.includes('login') || message.includes('prijava')) {
            return 'login';
        }
        
        if (message.includes('sporo') || message.includes('ne učitava') || message.includes('aplikacija')) {
            return 'aplikacija';
        }
        
        // Ako nema poklapanja, vrati default
        return 'default';}

    // Nova funkcija za prepoznavanje kada je potrebna konsultacija
    requiresConsultation(message) {
        // Proveravamo da li poruka sadrži ključne reči koje zahtevaju konsultaciju
        for (var i = 0; i < this.knowledgeBase.investmentKeywords.length; i++) {
            if (message.includes(this.knowledgeBase.investmentKeywords[i])) {
                return true;
            }
        }
        return false;
    }

    // FAQ System
    renderFAQ() {
        const faqData = [
            {
                question: "Kako da resetujem lozinku?",
                answer: "Kliknite na 'Zaboravili ste lozinku?' na stranici za prijavu i sledite instrukcije."
            },
            {
                question: "Kako da promenim svoju email adresu?",
                answer: "Idite u Profil → Podešavanja → Lične informacije i ažurirajte vašu email adresu."
            },
            {
                question: "Da li je moj novac siguran?",
                answer: "Da, koristimo bank-level enkripciju i partneri smo sa licenciranim finansijskim institucijama."
            },
            {
                question: "Kako da kontaktiram podršku?",
                answer: "Možete nas kontaktirati preko live chat-a, email-a ili kreiranjem support tiketa."
            },
            {
                question: "Koliko košta korišćenje aplikacije?",
                answer: "Osnovno korišćenje je besplatno. Premium funkcije su dostupne za 9.99€ mesečno."
            }
        ];

        const container = document.getElementById('faqContainer');
        if (!container) return;

        container.innerHTML = faqData.map((item, index) => `
            <div class="faq-item">
                <div class="faq-question" onclick="support.toggleFAQ(${index})">
                    <span>${item.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="faq-${index}">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }

    toggleFAQ(index) {
        const answer = document.getElementById(`faq-${index}`);
        const question = answer.previousElementSibling;
        const icon = question.querySelector('i');
        
        answer.classList.toggle('active');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }

    // Utility methods
    saveTickets() {
        localStorage.setItem('supportTickets', JSON.stringify(this.tickets));
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('sr-RS', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatTime(dateString) {
        return new Date(dateString).toLocaleTimeString('sr-RS', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    setupEventListeners() {
        // Chat input enter key
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }

        // Support form submission
        const supportForm = document.getElementById('supportForm');
        if (supportForm) {
            supportForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const subject = document.getElementById('ticketSubject').value;
                const description = document.getElementById('ticketDescription').value;
                const priority = document.getElementById('ticketPriority').value;
                
                if (subject && description) {
                    this.createTicket(subject, description, priority);
                    supportForm.reset();
                    alert('Tiket je uspešno kreiran!');
                }
            });
        }
    }
}

// Initialize support system
const support = new TechnicalSupport();

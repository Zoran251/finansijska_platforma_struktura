/**
 * Golden Balance - Support Chat System
 * Kompletno prepisan sistem sa proper event handling i integracijom baze znanja
 */

// IMMEDIATE BACKUP EVENT LISTENERS - pokretaju se čim se fajl učita
console.log('🚀 BACKUP: Vezujem immediate support button listeners...');

// Funkcija koja će se pokretati kad god korisnik klikne na support dugme
function triggerSupportChat(e) {
    console.log('🔥 BACKUP: Support dugme kliknuto!', e.target);
    e.preventDefault();
    e.stopPropagation();
    
    // Kreiraj chat UI direktno ako ne postoji
    let chatContainer = document.getElementById('support-chat-container');
    if (!chatContainer) {
        console.log('🔥 BACKUP: Kreiram chat UI jer ne postoji...');
        createBasicSupportChat();
    }
    
    // Prikaži chat
    chatContainer = document.getElementById('support-chat-container');
    if (chatContainer) {
        chatContainer.style.display = 'block';
        console.log('🔥 BACKUP: Chat prikazan!');
    }
}

// Osnovni chat UI kreator kao backup
function createBasicSupportChat() {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'support-chat-container';
    chatContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: #1a1a1a;
        border: 2px solid #D4AF37;
        border-radius: 15px;
        z-index: 10000;
        display: none;
        flex-direction: column;
    `;
    
    chatContainer.innerHTML = `
        <div style="background: linear-gradient(45deg, #D4AF37, #B8860B); padding: 15px; border-radius: 13px 13px 0 0; color: #000; font-weight: bold;">
            💬 Golden Balance Podrška
            <button onclick="document.getElementById('support-chat-container').style.display='none'" style="float: right; background: transparent; border: none; color: #000; font-size: 18px; cursor: pointer;">✕</button>
        </div>
        <div style="flex: 1; padding: 20px; overflow-y: auto; background: #0a0a0a; color: #fff;">
            <div style="margin-bottom: 15px; padding: 10px; background: #333; border-radius: 8px;">
                🤖 Zdravo! Dobrodošli u Golden Balance podršku!<br><br>
                Kako mogu da vam pomognem danas?
            </div>
        </div>
        <div style="padding: 15px; background: #111;">
            <input type="text" placeholder="Unesite vaše pitanje..." style="width: 100%; padding: 10px; border: 1px solid #D4AF37; border-radius: 5px; background: #222; color: #fff;">
            <button style="width: 100%; margin-top: 10px; padding: 10px; background: #D4AF37; color: #000; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">Pošalji</button>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    console.log('🔥 BACKUP: Osnovni chat UI kreiran!');
}

// Immediate binding - vezuje se čim se fajl učita
setTimeout(() => {
    console.log('🔥 BACKUP: Vezujem event listenere...');
    
    // Handler function za sve support dugmad
    function handleSupportClick(e) {
        console.log('🔥 BACKUP: Klik detektovan na:', e.target);
        triggerSupportChat(e);
    }
    
    // Vezuj za postojeća dugmad
    const supportButtons = document.querySelectorAll('#openSupport, .support-btn, .floating-support-btn');
    console.log('🔥 BACKUP: Našao support dugmad:', supportButtons.length);
    
    supportButtons.forEach((btn, index) => {
        console.log(`🔥 BACKUP: Vezujem listener za dugme ${index}:`, btn.id, btn.className);
        btn.addEventListener('click', handleSupportClick);
    });
    
    // Universal click listener kao fallback
    document.addEventListener('click', (e) => {
        if (e.target.closest('#openSupport') || 
            e.target.closest('.support-btn') || 
            e.target.closest('.floating-support-btn') ||
            e.target.id === 'openSupport' ||
            e.target.classList.contains('support-btn')) {
            console.log('🔥 BACKUP: Universal click listener aktiviran!');
            handleSupportClick(e);
        }
    });
    
    console.log('🔥 BACKUP: Event listeneri vezani!');
}, 100);

// Provjeri da li je već inicijalizovano da se izbegne duplo učitavanje
if (typeof window.GoldenBalanceSupportChat === 'undefined') {

// Ukloni postojeće stare chat sisteme ako postoje
if (typeof window.chatInstance !== 'undefined') {
    console.log('🗑️ Uklanjam stari chat sistem...');
    delete window.chatInstance;
}

// Ukloni stare event listenere
document.removeEventListener('click', window.oldChatClickHandler);
document.removeEventListener('keydown', window.oldChatKeyHandler);

// Ukloni stare chat elemente
const oldChats = document.querySelectorAll('.support-chat, #support-chat, .chat-container');
oldChats.forEach(el => {
    console.log('🗑️ Uklanjam stari chat element:', el);
    el.remove();
});

console.log('🧹 Stari chat sistem očišćen');

class SupportChat {
    constructor() {
        console.log('🚀 NOVI SupportChat konstruktor pozvan - Golden Balance System');
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = null;
        this.chatContainer = null;
        this.isTyping = false;
        
        console.log('🚀 SupportChat konstruktor pozvan');
        this.init();
    }

    async init() {
        console.log('🔧 Inicijalizujem support chat...');
        
        // Sačekaj da se učita baza znanja
        await this.waitForKnowledgeBase();
        
        // Kreiraj UI
        this.createChatUI();
        
        // Bind eventi
        this.bindEvents();
        
        console.log('✅ Support chat uspešno inicijalizovan', {
            knowledgeBaseLoaded: !!this.knowledgeBase,
            messagesCount: this.messages.length,
            chatUICreated: !!this.chatContainer
        });
    }    async waitForKnowledgeBase() {
        let attempts = 0;
        const maxAttempts = 50; // 5 sekundi
        
        while (!window.supportKB && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
            console.log(`⏳ Čekam supportKB bazu znanja... pokušaj ${attempts}/${maxAttempts}`);
        }
        
        if (window.supportKB) {
            this.knowledgeBase = window.supportKB;
            console.log('✅ SupportKB baza znanja učitana:', Object.keys(this.knowledgeBase));
        } else {
            console.warn('⚠️ SupportKB baza znanja nije učitana');
        }        // Provjeri da li je dostupan i knowledgeBase iz chat.js
        if (typeof window.knowledgeBase !== 'undefined') {
            console.log('✅ knowledgeBase (finansijska pitanja) je takođe dostupan:', Object.keys(window.knowledgeBase).length, 'kategorija');
        } else {
            console.log('ℹ️ knowledgeBase (finansijska pitanja) još nije učitan - biće proveravan dinamički');
        }
    }

    createChatUI() {
        console.log('🎨 Kreiram chat UI...');
        
        // Ukloni postojeći chat ako postoji
        const existingChat = document.getElementById('support-chat-container');
        if (existingChat) {
            existingChat.remove();
            console.log('🗑️ Uklonjen postojeći chat');
        }

        // Kreiraj novi chat container
        this.chatContainer = document.createElement('div');
        this.chatContainer.id = 'support-chat-container';
        this.chatContainer.className = 'support-chat-container';
        this.chatContainer.style.display = 'none';
        
        this.chatContainer.innerHTML = `
            <div class="chat-header">
                <h3>💬 Tehnička Podrška</h3>
                <button class="chat-close-btn" data-action="close-chat">✕</button>
            </div>
            <div class="chat-messages" id="chat-messages-container">
                <!-- Poruke će se dodavati dinamički -->
            </div>
            <div class="typing-indicator" id="typing-indicator" style="display: none;">
                <span></span><span></span><span></span>
                Asistent kuca...
            </div>
            <div class="chat-input-container">
                <input type="text" id="chat-input-field" placeholder="Ukucajte vaše pitanje..." maxlength="500">
                <button id="chat-send-button" data-action="send-message">📤</button>
            </div>
        `;

        document.body.appendChild(this.chatContainer);
        
        // Dodaj welcome poruku
        this.addWelcomeMessage();
        
        console.log('✅ Chat UI kreiran');
    }    bindEvents() {
        console.log('🔗 Vezujem event listenere...');
        
        // Event delegation za chat kontrole
        document.addEventListener('click', (e) => {
            const action = e.target.getAttribute('data-action');
            const classList = e.target.classList;
            const closest = e.target.closest('.support-btn');
            
            console.log('🖱️ Click event:', {
                tagName: e.target.tagName,
                id: e.target.id,
                classes: Array.from(e.target.classList),
                action: action,
                hasClosest: !!closest
            });
            
            // Support button click - proveri više načina
            if (classList.contains('support-btn') || 
                closest ||
                e.target.id === 'openSupport' ||
                e.target.closest('#openSupport')) {
                e.preventDefault();
                console.log('🔵 Support button detected and clicked!');
                this.openChat();
            }
            
            // Close chat button
            else if (action === 'close-chat') {
                e.preventDefault();
                console.log('🔵 Close chat clicked');
                this.closeChat();
            }
              // Send message button
            else if (action === 'send-message') {
                e.preventDefault();
                console.log('🔵 Send button clicked');
                this.sendMessage();
            }
            
            // Takođe provjeri ID za send button kao backup
            else if (e.target.id === 'chat-send-button') {
                e.preventDefault();
                console.log('🔵 Send button clicked by ID');
                this.sendMessage();
            }
        });        // Enter key za slanje poruke
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.isOpen) {
                const input = document.getElementById('chat-input-field');
                if (input && input === document.activeElement) {
                    e.preventDefault();
                    console.log('🔵 Enter key pressed, input value:', input.value);
                    this.sendMessage();
                }
            }
            
            // ESC za zatvaranje chata
            if (e.key === 'Escape' && this.isOpen) {
                console.log('🔵 Escape key pressed');
                this.closeChat();
            }
        });

        // Dodatni event listener za input field
        document.addEventListener('input', (e) => {
            if (e.target.id === 'chat-input-field') {
                console.log('📝 Input changed:', e.target.value);
            }
        });

        console.log('✅ Event listeneri vezani');
    }    openChat() {
        console.log('📂 openChat() pozvana');
        
        if (!this.chatContainer) {
            console.error('❌ Chat container ne postoji, kreiram novi...');
            this.createChatUI();
        }
        
        console.log('📂 Chat container status:', {
            exists: !!this.chatContainer,
            id: this.chatContainer?.id,
            display: this.chatContainer?.style?.display
        });
        
        console.log('📂 Otvaram chat...');
        this.chatContainer.style.display = 'flex';
        this.isOpen = true;
        
        // Provjeri da li su svi potrebni elementi tu
        const input = document.getElementById('chat-input-field');
        const button = document.getElementById('chat-send-button');
        const messages = document.getElementById('chat-messages-container');
        
        console.log('🔍 Elementi proverjeni:', {
            input: !!input,
            button: !!button,
            messages: !!messages,
            inputPlaceholder: input?.placeholder,
            buttonText: button?.textContent
        });
        
        // Focus na input nakon kratke pauze
        setTimeout(() => {
            const input = document.getElementById('chat-input-field');
            if (input) {
                input.focus();
                console.log('🎯 Focus postavljen na input');
            } else {
                console.error('❌ Ne mogu da postavim focus, input ne postoji');
            }
        }, 300);
        
        // Scroll na dno
        this.scrollToBottom();
        
        console.log('✅ Chat otvoren');
    }

    closeChat() {
        if (!this.chatContainer) {
            console.error('❌ Chat container ne postoji');
            return;
        }
        
        console.log('📁 Zatvaramo chat...');
        this.chatContainer.style.display = 'none';
        this.isOpen = false;
        console.log('✅ Chat zatvoren');
    }

    addWelcomeMessage() {
        const welcomeMessage = `
            🌟 <strong>Dobrodošli u Golden Balance podršku!</strong><br><br>
            Ja sam vaš virtuelni asistent i tu sam da vam pomognem sa:<br>
            • 📝 Pitanjima o registraciji i nalogu<br>
            • 💰 Planiranjem budžeta i finansijama<br>
            • 🎯 Štednjom i finansijskim ciljevima<br>
            • 🔧 Tehničkim problemima<br><br>
            Kako vam mogu pomoći danas?
        `;
        
        this.addMessage('bot', welcomeMessage);
        console.log('👋 Welcome poruka dodana');
    }    async sendMessage() {
        console.log('🚀 sendMessage() funkcija pozvana');
        
        const input = document.getElementById('chat-input-field');
        if (!input) {
            console.error('❌ Chat input nije pronađen');
            // Pokušaj alternativne pretrage
            const allInputs = document.querySelectorAll('input[type="text"], input[placeholder*="pitanje"], input[id*="chat"]');
            console.log('🔍 Pronađeni input elementi:', allInputs);
            return;
        }

        console.log('✅ Input element pronađen:', input);

        const message = input.value.trim();
        console.log('📤 Vrednost input polja:', message);
        
        if (!message) {
            console.log('⚠️ Prazna poruka, ne šalje se');
            return;
        }

        if (this.isTyping) {
            console.log('⚠️ Već se kuca odgovor, čekamo...');
            return;
        }

        console.log('📤 Šalje se poruka:', message);

        try {
            // Dodaj korisničku poruku
            this.addMessage('user', message);
            
            // Obriši input
            input.value = '';
            
            // Prikaži typing indicator
            this.showTyping();
            this.isTyping = true;

            // Simuliraj delay za bolji UX
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
            
            // Generiši odgovor
            const response = this.generateResponse(message);
            
            // Sakrij typing i dodaj odgovor
            this.hideTyping();
            this.addMessage('bot', response);
            
            console.log('✅ Odgovor generisan i dodat');
            
        } catch (error) {
            console.error('❌ Greška pri slanju poruke:', error);
            this.hideTyping();
            this.addMessage('bot', '😔 Izvinjavam se, dogodila se greška. Molimo pokušajte ponovo.');
        } finally {
            this.isTyping = false;
        }
    }    addMessage(type, content) {
        console.log('📝 addMessage pozvan:', { type, content });
        
        const messagesContainer = document.getElementById('chat-messages-container');
        if (!messagesContainer) {
            console.error('❌ Messages container nije pronađen');
            // Pokušaj da pronađe alternative
            const alternatives = document.querySelectorAll('.chat-messages, [class*="message"], [id*="message"]');
            console.log('🔍 Pronađeni elementi koji sadrže "message":', alternatives);
            return;
        }

        console.log('✅ Messages container pronađen:', messagesContainer);

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        console.log('📌 Poruka dodana u DOM');
        
        // Sačuvaj poruku u array
        const messageObj = {
            type: type,
            content: content,
            timestamp: new Date(),
            id: Date.now() + Math.random()
        };
        
        this.messages.push(messageObj);
        console.log('💾 Poruka sačuvana u array, ukupno poruka:', this.messages.length);
        
        // Scroll na dno
        this.scrollToBottom();
        
        console.log(`💬 ${type} poruka dodana:`, {
            content: content.substring(0, 50) + '...',
            totalMessages: this.messages.length,
            messageId: messageObj.id
        });
    }    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        console.log('🧠 Generiram odgovor za:', message);
        
        let bestMatch = null;
        let highestScore = 0;
        let matchCategory = '';

        try {
            // 1. Prvo pretraži supportKB (tehnička podrška)
            if (this.knowledgeBase) {
                console.log('🔍 Pretražujem supportKB...');
                for (const [categoryName, categoryItems] of Object.entries(this.knowledgeBase)) {
                    console.log(`🔍 Pretražujem kategoriju: ${categoryName} (${categoryItems.length} stavki)`);
                    
                    for (const item of categoryItems) {
                        if (!item.keywords || !item.response) {
                            console.warn('⚠️ Neispravna stavka u bazi znanja:', item);
                            continue;
                        }
                        
                        const score = this.calculateMatchScore(message, item.keywords);
                        
                        if (score > highestScore && score > 0.3) {
                            highestScore = score;
                            bestMatch = item;
                            matchCategory = `supportKB-${categoryName}`;
                            console.log(`✨ Novo najbolje poklapanje (supportKB): kategorija=${categoryName}, skor=${score}`);
                        }
                    }
                }
            }

            // 2. Zatim pretraži knowledgeBase iz chat.js (finansijska pitanja)
            if (typeof window.knowledgeBase !== 'undefined') {
                console.log('🔍 Pretražujem knowledgeBase (finansijska pitanja)...');
                for (const [categoryName, categoryData] of Object.entries(window.knowledgeBase)) {
                    if (!categoryData.keywords || !categoryData.responses) {
                        continue;
                    }
                    
                    const score = this.calculateMatchScore(message, categoryData.keywords);
                    
                    if (score > highestScore && score > 0.3) {
                        highestScore = score;
                        // Uzmi random odgovor iz responses niza
                        const randomResponse = categoryData.responses[Math.floor(Math.random() * categoryData.responses.length)];
                        bestMatch = { response: randomResponse };
                        matchCategory = `knowledgeBase-${categoryName}`;
                        console.log(`✨ Novo najbolje poklapanje (knowledgeBase): kategorija=${categoryName}, skor=${score}`);
                    }
                }
            }

            if (bestMatch) {
                console.log('🎯 Pronađeno poklapanje:', {
                    category: matchCategory,
                    score: highestScore
                });
                return `🤖 <strong>Golden Balance podrška:</strong><br><br>${bestMatch.response}`;
            } else {
                console.log('🤷 Nema poklapanja, koristim fallback');
                return this.getFallbackResponse(message);
            }
            
        } catch (error) {
            console.error('❌ Greška pri generisanju odgovora:', error);
            return this.getFallbackResponse(message);
        }
    }    calculateMatchScore(message, keywords) {
        if (!keywords || keywords.length === 0) return 0;
        
        let score = 0;
        const messageWords = message.toLowerCase().split(/\s+/);
        const messageText = message.toLowerCase();
        
        // 1. Semantička analiza - prepoznavanje konteksta
        const context = this.analyzeContext(messageText);
        
        for (const keyword of keywords) {
            const keywordLower = keyword.toLowerCase();
            
            // 2. Exact match - najviši skor
            if (messageText.includes(keywordLower)) {
                score += 3;
                continue;
            }
            
            // 3. Sinonimi i varijacije
            const synonymScore = this.checkSynonyms(messageText, keywordLower);
            if (synonymScore > 0) {
                score += synonymScore;
                continue;
            }
            
            // 4. Stem matching (osnovne forme reči)
            const stemScore = this.checkWordStems(messageWords, keywordLower);
            if (stemScore > 0) {
                score += stemScore;
                continue;
            }
            
            // 5. Fuzzy matching za slova i greške u kucanju
            const fuzzyScore = this.fuzzyMatch(messageText, keywordLower);
            if (fuzzyScore > 0.7) {
                score += fuzzyScore;
            }
            
            // 6. Kontekstualni bonus
            if (context.length > 0) {
                for (const ctx of context) {
                    if (keywordLower.includes(ctx) || ctx.includes(keywordLower)) {
                        score += 0.5;
                    }
                }
            }
        }
        
        // 7. Intent detection bonus
        const intentBonus = this.detectIntent(messageText, keywords);
        score += intentBonus;
        
        // Normalizuj skor
        return Math.min(score / keywords.length, 5);
    }

    // Analiza konteksta poruke
    analyzeContext(message) {
        const contexts = [];
        
        // Finansijski kontekst
        if (/novac|para|financij|ekonom|bogatst|siromašt|zaradit|potroš|kupit|prodat/.test(message)) {
            contexts.push('finansije');
        }
        
        // Tehnički kontekst  
        if (/aplikacij|sajt|web|mobil|telefon|kompjuter|bug|greška|problem|ne radi/.test(message)) {
            contexts.push('tehnicki');
        }
        
        // Investicioni kontekst
        if (/ulag|investir|akcij|berz|portfolio|portfelj|fond|kripto|bitcoin/.test(message)) {
            contexts.push('investicije');
        }
        
        // Štednja kontekst
        if (/šted|štedi|čuva|sačuva|rezerv|fond/.test(message)) {
            contexts.push('stednja');
        }
        
        // Kredit/dugovi kontekst
        if (/kredit|zajam|dug|pozajm|kamata|rata|otplat/.test(message)) {
            contexts.push('krediti');
        }
        
        return contexts;
    }

    // Provera sinonima i srodnih reči
    checkSynonyms(message, keyword) {
        const synonymGroups = {
            'novac': ['para', 'lova', 'kesh', 'cash', 'sredstva', 'kapital', 'fond'],
            'stednja': ['štednja', 'ušteda', 'čuvanje', 'rezerva', 'akumulacija'],
            'investicije': ['ulaganje', 'investiranje', 'plasiranje', 'ulog'],
            'problem': ['greška', 'bag', 'issue', 'kvar', 'poteškoća', 'teškoća'],
            'aplikacija': ['app', 'program', 'softver', 'platforma', 'sistem'],
            'registracija': ['prijava', 'kreiranje naloga', 'otvaranje računa', 'signup'],
            'lozinka': ['password', 'šifra', 'pin', 'pristupni kod'],
            'budžet': ['plan', 'planiranje', 'raspored', 'organizacija'],
            'troškovi': ['rashodi', 'potrošnja', 'izdaci', 'trošenje']
        };

        for (const [baseWord, synonyms] of Object.entries(synonymGroups)) {
            if (keyword.includes(baseWord)) {
                for (const synonym of synonyms) {
                    if (message.includes(synonym)) {
                        return 2; // Visok skor za sinonime
                    }
                }
            }
        }
        
        return 0;
    }

    // Provera osnovnih oblika reči (stemming)
    checkWordStems(messageWords, keyword) {
        const keywordStem = this.getStem(keyword);
        
        for (const word of messageWords) {
            const wordStem = this.getStem(word);
            if (wordStem.length > 3 && keywordStem.includes(wordStem)) {
                return 1.5;
            }
        }
        
        return 0;
    }

    // Jednostavan stemmer za srpski jezik
    getStem(word) {
        if (word.length < 4) return word;
        
        // Ukloni česte sufikse
        const suffixes = ['anje', 'enje', 'ost', 'iti', 'ati', 'eti', 'uje', 'ava', 'eva', 'ira', 'amo', 'emo', 'ete', 'ate'];
        
        for (const suffix of suffixes) {
            if (word.endsWith(suffix)) {
                return word.slice(0, -suffix.length);
            }
        }
        
        return word;
    }

    // Fuzzy matching za tipfehler
    fuzzyMatch(str1, str2) {
        const matrix = [];
        const len1 = str1.length;
        const len2 = str2.length;
        
        if (len1 === 0) return len2 === 0 ? 1 : 0;
        if (len2 === 0) return 0;
        
        // Levenshtein distance
        for (let i = 0; i <= len1; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        
        const maxLen = Math.max(len1, len2);
        return 1 - (matrix[len1][len2] / maxLen);
    }

    // Detekcija namere (intent detection)
    detectIntent(message, keywords) {
        let intentBonus = 0;
        
        // Pitanja
        if (/kako|šta|kada|gde|zašto|koji|koja|koje|da li|može li|trebam|trebalo bi/.test(message)) {
            intentBonus += 0.5;
        }
        
        // Problemi
        if (/ne radi|ne mogu|problem|greška|pomaž|pomoc|help/.test(message)) {
            intentBonus += 0.8;
        }
        
        // Želje/potrebe
        if (/želim|hoću|trebam|potrebno|want|need/.test(message)) {
            intentBonus += 0.6;
        }
        
        // Emotivni kontekst
        if (/hvala|thanks|super|odlično|loše|grozno|frustriran/.test(message)) {
            intentBonus += 0.3;
        }
        
        return intentBonus;
    }    getFallbackResponse(message) {
        console.log('🔄 Generiram pametan fallback odgovor za:', message);
        
        const messageLC = message.toLowerCase();
        
        // 1. Semantička analiza poruke
        const context = this.analyzeContext(messageLC);
        
        // 2. Osnovno pozdravljanje
        if (/zdravo|pozdrav|dobro|ćao|cao|hej|hey|hi|hello/i.test(message)) {
            return "👋 <strong>Zdravo!</strong><br><br>Dobrodošli u Golden Balance podršku! Kako mogu da vam pomognem danas?";
        }
        
        // 3. Zahvaljivanje
        if (/hvala|zahvaljujem|thanks|thank you/i.test(message)) {
            return "😊 <strong>Nema na čemu!</strong><br><br>Tu sam da pomognem. Imate li još pitanja?";
        }
        
        // 4. Oproštavanje
        if (/doviđenja|zbogom|cao|bye|goodbye/i.test(message)) {
            return "👋 <strong>Doviđenja!</strong><br><br>Bilo je drago pomoći vam. Možete se uvek vratiti ako imate pitanja!";
        }

        // 5. Kontekstualni odgovori na osnovu analize
        if (context.includes('finansije')) {
            return `💰 <strong>Finansijska pitanja:</strong><br><br>
                   Vidim da pitate o finansijskim temama. Mogu vam pomoći sa:<br>
                   • Budžetiranjem i planiranjem troškova<br>
                   • Savetima o štednji i investicijama<br>
                   • Upravljanjem finansijama<br>
                   • Korišćenjem Golden Balance aplikacije<br><br>
                   Možete biti specifičniji sa vašim pitanjem?`;
        }
        
        if (context.includes('tehnicki')) {
            return `🔧 <strong>Tehnička podrška:</strong><br><br>
                   Žao mi je zbog tehničkih problema. Prvo pokušajte:<br>
                   • Osvežite stranicu (F5 ili Ctrl+R)<br>
                   • Obrisite cache preglendača<br>
                   • Proverite internet konekciju<br>
                   • Restartujte aplikaciju<br><br>
                   Ako problem i dalje postoji, opišite ga detaljnije.`;
        }
        
        if (context.includes('investicije')) {
            return `📈 <strong>Investicije i ulaganja:</strong><br><br>
                   Za investicione savete mogu vam pomoći sa:<br>
                   • Osnovama investiranja<br>
                   • Diverzifikacijom portfolija<br>
                   • Analizom rizika<br>
                   • Praćenjem investicija kroz Golden Balance<br><br>
                   O čemu konkretno želite da saznate više?`;
        }
        
        if (context.includes('stednja')) {
            return `� <strong>Štednja i planiranje:</strong><br><br>
                   Za štednju mogu vam predložiti:<br>
                   • Automatske planove štednje<br>
                   • Ciljeve i strategije štednje<br>
                   • Fond za hitne slučajeve<br>
                   • Praćenje napretka kroz aplikaciju<br><br>
                   Kakav je vaš konkretni cilj štednje?`;
        }

        // 6. Prepoznavanje tipova pitanja
        if (/kako|šta|kada|gde|zašto|koji/i.test(message)) {
            return `❓ <strong>Odličo pitanje!</strong><br><br>
                   Vidim da tražite informacije. Golden Balance može vam pomoći sa:<br>
                   • Finansijskim planiranjem i budžetiranjem<br>
                   • Praćenjem troškova i prihoda<br>
                   • Investicionim savetima<br>
                   • Tehničkoj podršci aplikacije<br><br>
                   Možete li biti specifičniji sa vašim pitanjem?`;
        }
        
        if (/ne radi|problem|greška|bag|bug|kvar/i.test(message)) {
            return `🔧 <strong>Tehnička podrška:</strong><br><br>
                   Žao mi je zbog problema! Pokušajte sledeće korake:<br>
                   1. Osvežite stranicu (F5)<br>
                   2. Odjavite se i ponovo se prijavite<br>
                   3. Obrisite cookies i cache<br>
                   4. Probajte drugi pregledač<br><br>
                   Ako problem i dalje postoji, opišite detaljnije šta se dešava.`;
        }
        
        if (/želim|hoću|trebam|potrebno|want|need/i.test(message)) {
            return `🎯 <strong>Razumem vaše potrebe!</strong><br><br>
                   Golden Balance vam može omogućiti:<br>
                   • Kompletno upravljanje finansijama<br>
                   • Automatsko praćenje troškova<br>
                   • Personalizovane finansijske savete<br>
                   • Analizu vaših finansijskih navika<br><br>
                   Objasnite mi konkretno šta želite da postignete?`;
        }

        // 7. Emocionalni odgovor
        if (/frustriran|ljut|nervozan|besan|grozno|loše/i.test(message)) {
            return `😔 <strong>Razumem vašu frustraciju.</strong><br><br>
                   Žao mi je što imate problema. Ovde sam da vam pomognem i rešimo 
                   svaki problem korak po korak. <br><br>
                   Opišite mi detaljnije šta vas muči, pa ću dati najbolji mogući savet.`;
        }
        
        if (/super|odlično|sjajno|fantastično|amazing|great/i.test(message)) {
            return `🎉 <strong>Sjajno!</strong><br><br>
                   Drago mi je što ste zadovoljni! Ako imate još pitanja ili 
                   trebate dodatnu pomoć, slobodno pišite.`;
        }

        // 8. Default odgovor sa predlozima
        const suggestions = [
            "• Kako da napravim budžet?",
            "• Kako da pratim svoje troškove?", 
            "• Kakvi su vaši saveti za štednju?",
            "• Kako da počnem sa investiranjem?",
            "• Kako da se registrujem?",
            "• Imam problem sa aplikacijom"
        ];
        
        return `🤖 <strong>Golden Balance Asistent:</strong><br><br>
               Nisam potpuno razumeo vaše pitanje, ali mogu vam pomoći sa bilo čim vezanim za:<br>
               • Finansijsko planiranje i budžetiranje<br>
               • Štednju i investicije<br>
               • Tehnički problemi sa aplikacijom<br>
               • Registraciju i korišćenje naloga<br><br>
               <strong>Evo nekih primera pitanja:</strong><br>
               ${suggestions.join('<br>')}<br><br>
               Kontakt za dodatnu pomoć: <a href="mailto:zorandostica2@gmail.com">zorandostica2@gmail.com</a>`;
    }
        
        if (message.includes('hvala') || message.includes('zahvaljujem')) {
            return "😊 <strong>Nema na čemu!</strong><br><br>Tu sam da pomognem. Imate li još pitanja?";
        }
        
        if (message.includes('doviđenja') || message.includes('cao') || message.includes('zbogom')) {
            return "👋 <strong>Doviđenja!</strong><br><br>Bilo je drago pomoći vam. Možete se uvijek vratiti ako imate pitanja!";
        }

        // Prepoznavanje problema
        if (message.includes('problem') || message.includes('greška') || message.includes('ne radi')) {
            return `🔧 <strong>Tehnička podrška:</strong><br><br>
                   Žao mi je zbog problema. Pokušajte ove korake:<br>
                   • Osvježite stranicu (F5)<br>
                   • Obrisite cache pregledača<br>
                   • Proverite internet konekciju<br><br>
                   Ako problem i dalje postoji, kontaktirajte nas na <a href="mailto:zorandostica2@gmail.com">zorandostica2@gmail.com</a>`;
        }

        // Default fallback
        const fallbacks = [
            `🤔 <strong>Nisam siguran kako da odgovorim na to pitanje.</strong><br><br>
             Možete pokušati sa pitanjima o:<br>
             • Registraciji i prijavljivanju<br>
             • Planiranju budžeta<br>
             • Štednji i investicijama<br>
             • Tehničkim problemima`,
            
            `💡 <strong>Za specifična pitanja preporučujem direktan kontakt:</strong><br><br>
             📧 E-mail: <a href="mailto:zorandostica2@gmail.com">zorandostica2@gmail.com</a><br>
             📞 Telefon: <a href="tel:+38765827710">+387 65 827 710</a><br>
             🕐 Radno vrijeme: Radnim danima 9-17h`,
             
            `🔍 <strong>Pokušajte da preformulišete vaše pitanje</strong><br><br>
             Ili kontaktirajte našu podršku za detaljnu pomoć na 
             <a href="mailto:zorandostica2@gmail.com">zorandostica2@gmail.com</a>`
        ];
        
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    showTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
            this.scrollToBottom();
            console.log('⌨️ Typing indicator prikazan');
        }
    }

    hideTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'none';
            console.log('⌨️ Typing indicator sakriven');
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages-container');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 50);
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('sr-RS', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // Debug i admin metode
    getStatus() {
        return {
            isOpen: this.isOpen,
            isTyping: this.isTyping,
            messagesCount: this.messages.length,
            knowledgeBaseLoaded: !!this.knowledgeBase,
            knowledgeBaseCategories: this.knowledgeBase ? Object.keys(this.knowledgeBase) : [],
            chatExists: !!this.chatContainer,
            containerVisible: this.chatContainer ? this.chatContainer.style.display !== 'none' : false
        };
    }

    clearMessages() {
        const messagesContainer = document.getElementById('chat-messages-container');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
            this.messages = [];
            this.addWelcomeMessage();
            console.log('🗑️ Poruke obrisane i welcome poruka dodana');
        }
    }

    exportMessages() {
        const exportData = {
            timestamp: new Date().toISOString(),
            messagesCount: this.messages.length,
            messages: this.messages
        };
        
        console.log('📁 Export poruka:', exportData);
        return exportData;
    }

    // Test metoda za debugging
    testResponse(testMessage) {
        console.log('🧪 Test odgovora za:', testMessage);
        const response = this.generateResponse(testMessage);
        console.log('🧪 Generisan odgovor:', response);
        return response;
    }
}

// Globalne funkcije za kompatibilnost
let supportChatInstance = null;

// Inicijalizuj kad se DOM učita
document.addEventListener('DOMContentLoaded', async function() {
    console.log('📄 DOM učitan, kreiram SupportChat...');
    
    try {
        supportChatInstance = new SupportChat();
        
        // Dodaj u window za globalni pristup
        window.supportChat = supportChatInstance;
        window.toggleSupportChat = () => {
            if (supportChatInstance.isOpen) {
                supportChatInstance.closeChat();
            } else {
                supportChatInstance.openChat();
            }
        };
        window.sendSupportMessage = () => supportChatInstance.sendMessage();
        
        // Dodaj eksplicitni listener za staro dugme
        const oldSupportBtn = document.getElementById('openSupport');
        if (oldSupportBtn) {
            console.log('🔧 Našao sam staro openSupport dugme, dodajem listener');
            oldSupportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔵 Staro openSupport dugme kliknuto');
                supportChatInstance.openChat();
            });
        }
        
        console.log('✅ SupportChat kreiran i dostupan globalno');
        
    } catch (error) {
        console.error('❌ Greška pri kreiranju SupportChat:', error);
    }
});

// DODATNI DEBUG I UNIVERSAL HANDLER
console.log('🔍 DEBUG: Dodavanje dodatnih event listenera za support dugmad...');

// Sačekaj da se DOM potpuno učita
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSupportButtons);
} else {
    initializeSupportButtons();
}

function initializeSupportButtons() {
    console.log('🔍 DEBUG: Inicijalizujem support dugmad...');
    
    // Dodaj event listenere za sva moguća dugmad
    const selectors = [
        '#openSupport',
        '.support-btn', 
        '.floating-support-btn',
        'button[title*="Tehnička"]',
        'button[title*="Podrška"]'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        console.log(`🔍 DEBUG: Našao ${elements.length} elemenata za selektor: ${selector}`);
        
        elements.forEach((element, index) => {
            console.log(`🔍 DEBUG: Dodajem listener na element ${index}:`, element);
            
            // Ukloni postojeće listenere da ne bi bilo duplikovanja
            element.removeEventListener('click', handleSupportButtonClick);
            
            // Dodaj novi listener
            element.addEventListener('click', handleSupportButtonClick);
            
            // Dodaj i mousedown kao backup
            element.addEventListener('mousedown', (e) => {
                console.log('🔍 DEBUG: Mousedown na support dugme:', e.target);
            });
        });
    });
}

function handleSupportButtonClick(e) {
    console.log('🎯 GLAVNI HANDLER: Support dugme kliknuto!', {
        target: e.target,
        id: e.target.id,
        className: e.target.className,
        tagName: e.target.tagName
    });
    
    e.preventDefault();
    e.stopPropagation();
    
    // Pozovi funkciju za otvaranje chata
    if (typeof triggerSupportChat === 'function') {
        triggerSupportChat(e);
    } else {
        console.log('🎯 FALLBACK: triggerSupportChat nije dostupan, kreiram direktno...');
        createBasicSupportChat();
        const chatContainer = document.getElementById('support-chat-container');
        if (chatContainer) {
            chatContainer.style.display = 'block';
        }
    }
}

// Mutation observer za dinamicki dodana dugmad
const observer = new MutationObserver(() => {
    console.log('🔍 DEBUG: DOM promena detektovana, proveravam nova dugmad...');
    initializeSupportButtons();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// ...existing code...

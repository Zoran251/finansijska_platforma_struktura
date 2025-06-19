/**
 * Golden Balance - Chat Support System  
 * Enhanced version with more robust error handling
 */

// Global chat state
let chatInitialized = false;

// Chat funkcionalnost
let chatVisible = false;

// Baza znanja sa proširenim ključnim riječima
const knowledgeBase = {
    greeting: {
        keywords: ['pozdrav', 'zdravo', 'dobar dan', 'dobro jutro', 'dobro veče', 'ćao', 'cao', 'hej', 'hey', 'hi', 'hello'],
        responses: [
            "Zdravo! Dobrodošli u našu finansijsku platformu. Kako mogu da vam pomognem?",
            "Pozdrav! Tu sam da odgovorim na vaša pitanja o našim uslugama.",
            "Zdravo! Čime mogu da vam budem od pomoći danas?"
        ]
    },
    investing: {
        keywords: ['investiranje', 'investicije', 'ulaganje', 'portfolio', 'portfelj', 'dionice', 'akcije', 'obveznice', 'fondovi', 'etf', 'kripto', 'bitcoin'],
        responses: [
            "Naša platforma nudi širok spektar investicionih mogućnosti uključujući dionice, obveznice, ETF fondove i kriptovalute. Želite li da saznate više o određenoj vrsti investicije?",
            "Možemo vam pomoći da izgradite diversifikovani portfolio prema vašim ciljevima. Kontaktirajte naše savjetnike za personalizovane preporuke.",
            "Investiranje je ključ finansijske budućnosti. Nudimo alate za analizu tržišta i upravljanje rizikom."
        ]
    },
    banking: {
        keywords: ['bankarstvo', 'račun', 'tekući račun', 'štedni račun', 'kredit', 'zajam', 'hipoteka', 'kartica', 'prenos', 'transfer'],
        responses: [
            "Naše bankarsko odeljenje nudi kompletne usluge: tekuće i štedne račune, kredite, hipoteke i platne kartice.",
            "Možete otvoriti račun online za samo nekoliko minuta. Trebate li pomoć oko dokumentacije?",
            "Nudimo konkurentne kamate na štedne račune i povoljne uslove za kredite."
        ]
    },
    insurance: {
        keywords: ['osiguranje', 'životno osiguranje', 'zdravstveno osiguranje', 'auto osiguranje', 'imovina', 'polisa'],
        responses: [
            "Naše osiguravajuće usluge pokrivaju život, zdravlje, vozila i imovinu. Koji tip osiguranja vas zanima?",
            "Možemo kreirati prilagođen paket osiguranja prema vašim potrebama i budžetu.",
            "Osiguranje je važna zaštita za vas i vašu porodicu. Kontaktirajte nas za besplatnu procenu."
        ]
    },
    consultation: {
        keywords: ['konsultacije', 'savjetovanje', 'savet', 'savjet', 'finansijski savjetnik', 'planiranje', 'strategija'],
        responses: [
            "Nudimo besplatne početne konsultacije sa našim finansijskim savjetnicima. Želite li da zakažete termin?",
            "Naši stručnjaci mogu vam pomoći sa finansijskim planiranjem i strategijama investiranja.",
            "Personalizovano savjetovanje je temelj uspješnog finansijskog planiranja. Kontaktirajte nas!"
        ]
    },
    fees: {
        keywords: ['naknada', 'provizija', 'cena', 'cijena', 'troškovi', 'tarife', 'fee'],
        responses: [
            "Naša struktura naknada je transparentna i konkurentna. Možete pronaći detaljan cenovnik na našoj web stranici.",
            "Nudimo različite pakete usluga sa različitim nivoima naknada. Koji paket vas zanima?",
            "Bez skrivenih troškova - sve naše naknade su jasno navedene unapred."
        ]
    },    security: {
        keywords: ['sigurnost', 'bezbednost', 'bezbjednost', 'zaštita', 'enkripcija', 'privatnost'],
        responses: [
            "Vaša sigurnost je naš prioritet. Koristimo najnovije tehnologije enkripcije i zaštite podataka.",
            "Svi transakcije su zaštićene višeslojnim sistemima bezbednosti i 2FA autentifikacijom.",
            "Vaši podaci su sigurni kod nas - poštujemo najviše standarde privatnosti i zaštite."
        ]
    },
    portfolio_diversification: {
        keywords: ['diverzifikacija', 'diversifikacija', 'portfolio', 'portfelj', 'raspoređivanje', 'različite investicije', 'kombinovanje'],
        responses: [
            "Diverzifikacija se postiže kombinovanjem različitih vrsta investicija (akcije, obveznice, nekretnine, investicioni fondovi) kako bi se smanjio rizik.",
            "Naša Golden Balance platforma vam pomaže da analizirate i optimizujete diverzifikaciju vašeg portfolija.",
            "Preporučujemo kombinovanje 60% akcija, 30% obveznica i 10% alternativnih investicija, ali prilagođavamo prema vašem profilu rizika."
        ]
    },
    real_estate_investing: {
        keywords: ['nekretnine', 'investiranje u nekretnine', 'stanovi', 'kuće', 'izdavanje', 'kirija', 'renta'],
        responses: [
            "Investiranje u nekretnine može doneti pasivni prihod kroz izdavanje ili dugoročni rast vrednosti, ali zahteva pažljivu analizu tržišta.",
            "Naši stručnjaci mogu vam pomoći da analizirate tržište nekretnina i procenite potencijalne prinose.",
            "Nekretnine su odličan način diverzifikacije portfolija i zaštite od inflacije."
        ]
    },
    cryptocurrency: {
        keywords: ['kriptovalute', 'kripto', 'bitcoin', 'ethereum', 'blockchain', 'digitalne valute'],
        responses: [
            "Za početak ulaganja u kriptovalute istražite različite valute, koristite sigurnu platformu za trgovinu, počnite s malim iznosima i obratite pažnju na volatilnost tržišta.",
            "Kriptovalute su visokorizične investicije - preporučujemo da ne uložite više od 5-10% vašeg portfolija.",
            "Golden Balance platforma prati i kriptotržište - možete analizirati trendove i pratiti performanse."
        ]
    },
    tax_planning: {
        keywords: ['porezi', 'porez na dohodak', 'poreska optimizacija', 'poreske olakšice', 'kapitalne dobitke', 'poreska uprava'],
        responses: [
            "Porez na dohodak se obračunava na osnovu godišnjih prihoda i plaća se državi prema važećim stopama. Možemo vam pomoći da optimizujete vaše poreske obaveze.",
            "Koristite poreske olakšice, investirajte pametno i pratite relevantne zakonske regulative za legalnu optimizaciju poreza.",
            "Kapitalne dobitke nastaju kada investicija raste u vrednosti i mogu biti oporezovane prema važećim propisima."
        ]
    },
    pension_planning: {
        keywords: ['penzija', 'penzioni fond', 'privatna penzija', 'indeksacija', 'penzionerske godine'],
        responses: [
            "Pri izboru penzionog fonda uporedite prinose, troškove upravljanja, fleksibilnost isplate i reputaciju fonda.",
            "Privatna penzija nudi veću fleksibilnost, mogućnost viših prinosa i dodatnu sigurnost u penzionerskim godinama.",
            "Kombinacija štednje i investiranja donosi najbolje rezultate za penziju - štednja daje sigurnost, investicije povećavaju vrednost kapitala."
        ]
    },
    emergency_fund: {
        keywords: ['fond za hitne slučajeve', 'rezerve', 'krizni fond', 'nepredviđeni troškovi'],
        responses: [
            "Trebalo bi da imate najmanje 3-6 meseci osnovnih troškova kao fond za hitne slučajeve, ali više ako imate nestabilan prihod.",
            "Golden Balance vam pomaže da automatski odvojite deo prihoda za fond za hitne slučajeve.",
            "U finansijskim krizama smanjite nepotrebne troškove, prilagodite budžet i pronađite nove izvore prihoda ako je potrebno."
        ]
    },
    budgeting_methods: {
        keywords: ['budžet', 'budžetiranje', '50/30/20', 'raspoređivanje prihoda', 'troškovi', 'planiranje'],
        responses: [
            "Koristite metodu 50/30/20: 50% neophodni troškovi, 30% želje, 20% štednja/investicije za efikasno upravljanje budžetom.",
            "Golden Balance aplikacija automatski kategoriše vaše troškove i pomaže vam da pratite 50/30/20 pravilo.",
            "Pravite spisak pre kupovine, koristite '24-časovno pravilo' za veće kupovine i analizirajte svoje troškove redovno."
        ]
    },
    passive_income: {
        keywords: ['pasivni prihod', 'pasivni izvori', 'dividende', 'kirija', 'automatski prihod'],
        responses: [
            "Pasivne izvore prihoda možete izgraditi kroz investicije u nekretnine, dividende, digitalne proizvode, honorarni biznis i automatizovane online prihode.",
            "Investicije koje donose dividende su odličan način za stvaranje redovnog pasivnog prihoda.",
            "Naša platforma vam pomaže da analizirate i pratite vaše pasivne izvore prihoda."
        ]
    },
    financial_literacy: {
        keywords: ['finansijska pismenost', 'edukacija', 'osnove finansija', 'finansijski pojmovi'],
        responses: [
            "Finansijska pismenost se poboljšava kroz edukaciju - čitajte knjige, pratite pouzdane finansijske blogove, učite o budžetiranju i investicijama.",
            "Ključni finansijski pojmovi uključuju prihod, rashod, budžet, štednju, investicije, pasivne prihode, kamatnu stopu, inflaciju i rizik ulaganja.",
            "Golden Balance aplikacija vam pruža edukacione materijale i alate za poboljšanje finansijske pismenosti."
        ]
    },
    risk_management: {
        keywords: ['upravljanje rizikom', 'rizik investicije', 'procena rizika', 'gubici', 'strategija'],
        responses: [
            "Postavite strategiju upravljanja rizikom, analizirajte uzroke gubitka i prilagodite buduće investicione odluke.",
            "Rizik investicije procenjujte praćenjem istorijskih podataka, diverzifikovanjem i analiziranjem ekonomskih faktora.",
            "Glavni pokazatelji dobrog ulaganja su stabilan prinos, nizak rizik, dobra likvidnost i dugoročni potencijal rasta."
        ]
    },
    investment_timing: {
        keywords: ['kada prodati', 'timing', 'trenutak za prodaju', 'tržišne prilike'],
        responses: [
            "Prodaja investicije se obično vrši kada dostigne ciljani prinos, kada postoji ekonomska nestabilnost ili kada se bolja prilika pojavi.",
            "Razlika između kratkoročnih i dugoročnih investicija: kratkoročne su za brzu dobit (dani/godine), dugoročne su stabilne (više godina).",
            "Naša platforma vam pomaže da analizirate tržišne trendove i donosite informisane odluke o timingu."
        ]
    },
    insurance_types: {
        keywords: ['vrste osiguranja', 'životno osiguranje', 'zdravstveno osiguranje', 'osiguranje vozila', 'osiguranje imovine'],
        responses: [
            "Glavne vrste osiguranja koje treba razmotriti su: životno osiguranje, zdravstveno osiguranje, osiguranje imovine, osiguranje od nezgoda i osiguranje vozila.",
            "Životno osiguranje funkcioniše tako što plaćate mesečne premije, a osiguravajuća kuća isplaćuje određenu sumu u slučaju vaše smrti ili pod određenim uslovima.",
            "Privatno zdravstveno osiguranje je dobro ako želite dodatne pogodnosti, kraće liste čekanja i bolju zdravstvenu zaštitu."
        ]
    },
    long_term_stability: {
        keywords: ['dugoročna stabilnost', 'finansijska stabilnost', 'porodica', 'sigurnost'],
        responses: [
            "Finansijsku stabilnost porodici osiguravate kreiranjem fonda za hitne slučajeve, pametnim investiranjem, osiguranjem života i imovine.",
            "Indeksacija penzije omogućava prilagođavanje inflaciji kako bi zadržala svoju realnu vrednost tokom vremena.",
            "Golden Balance vam pomaže da planirate dugoročnu finansijsku stabilnost kroz personalizovane strategije štednje i investiranja."
        ]
    },
    savings_strategies: {
        keywords: ['štednja', 'štedni račun', 'automatska štednja', 'kako štedeti', 'strategije štednje'],
        responses: [
            "Najbolje strategije štednje uključuju automatsku štednju, 'pay yourself first' metodu i odvajanje određenog procenta svakog prihoda u zaseban fond.",
            "Počnite štednju s malim iznosima, automatizujte proces, smanjite nepotrebne troškove i postavite jasne ciljeve.",
            "Golden Balance automatski odvaja deo vašeg prihoda za štednju prema vašim ciljevima i preferencijama."
        ]
    },
    spending_habits: {
        keywords: ['trošenje', 'navike trošenja', 'impulsivne kupovine', 'kontrola troškova'],
        responses: [
            "Izbegavajte finansijske greške: impulsivne kupovine, dugove s visokim kamatama, ulaganje bez istraživanja i zanemarivanje štednje.",
            "Osnovi principi pametnog trošenja: kupujte kvalitet umesto kvantiteta, pravite budžet, izbegavajte nepotrebne troškove.",
            "Najbolji načini smanjenja nepotrebnih troškova: izbacite neiskorišćene pretplate, kupujte sezonski, smanjite impulsivne kupovine."
        ]
    },
    interest_rates: {
        keywords: ['kamata', 'kamatna stopa', 'fiksna kamata', 'promenljiva kamata', 'prinos'],
        responses: [
            "Kamata je naknada koju banka naplaćuje za pozajmicu ili prinos koji ostvarujete na štednju/investicije. Može biti fiksna ili promenljiva.",
            "Naša platforma prati trenutne kamatne stope i pomaže vam da pronađete najbolje opcije za štednju i kredite.",
            "Kada birate između fiksne i promenljive kamate, razmotriti tržišne uslove i vaš rizik toleranciju."
        ]
    }
};

// Function to initialize chat system with extensive debugging
function initializeChat() {
    if (chatInitialized) {
        console.log('🔄 Chat already initialized, skipping...');
        return;
    }
    
    console.log('🔍 Checking for chat elements...');
    
    const supportChat = document.getElementById('supportChat');
    const openSupport = document.getElementById('openSupport');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.querySelector('.send-message');
    
    console.log('Elements found:', {
        supportChat: !!supportChat,
        openSupport: !!openSupport,
        chatMessages: !!chatMessages,
        chatInput: !!chatInput,
        sendButton: !!sendButton
    });
    
    // Log element details for debugging
    if (supportChat) console.log('✅ supportChat element found:', supportChat.className);
    if (chatMessages) console.log('✅ chatMessages element found:', chatMessages.parentElement);
    if (chatInput) console.log('✅ chatInput element found:', chatInput.placeholder);
    if (sendButton) console.log('✅ sendButton element found:', sendButton.innerHTML);
    
    if (!supportChat || !chatMessages || !chatInput || !sendButton) {
        console.log('❌ Missing critical chat elements, retrying in 500ms...');
        setTimeout(initializeChat, 500);
        return;
    }
    
    console.log('✅ Chat system initializing...');
    chatInitialized = true;
      // Find all possible support buttons with more selectors
    const allSupportButtons = document.querySelectorAll(`
        [id="openSupport"], 
        .tehnička-podrška, 
        [onclick*="openSupport"], 
        a[href*="podrška"], 
        button[onclick*="podrška"], 
        [data-action="support"]
    `);
    console.log('Found support buttons:', allSupportButtons.length);
    
    allSupportButtons.forEach((btn, index) => {
        console.log(`Adding listener to button ${index}:`, btn.tagName, btn.className, btn.id);
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔵 Support button clicked!', btn);
            openChat();
        });
    });
    
    // Also handle specific openSupport click
    if (openSupport) {
        openSupport.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔵 Main openSupport clicked!');
            openChat();
        });
    }
    
    // Close chat events - handle both structures
    const closeButtons = document.querySelectorAll('.chat-actions .btn, .chat-actions button, .close-chat, .minimize-chat');
    console.log('Found close buttons:', closeButtons.length);
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeChat();
        });
    });
    
    // Send message events with better error handling
    if (sendButton) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔵 Send button clicked!');
            sendMessage();
        });
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔵 Enter key pressed!');
                sendMessage();
            }
        });
    }
    
    console.log('✅ Chat system ready!');
}

// Function to open chat with enhanced debugging
function openChat() {
    console.log('🔵 openChat() called');
    const supportChat = document.getElementById('supportChat');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!supportChat) {
        console.error('❌ supportChat element not found!');
        return;
    }
    
    console.log('🔵 Current chat classes:', supportChat.className);
    supportChat.classList.remove('collapsed');
    console.log('🔵 Chat opened, classes after removal:', supportChat.className);
    
    // Check chat dimensions
    setTimeout(() => {
        const chatRect = supportChat.getBoundingClientRect();
        const messagesRect = chatMessages ? chatMessages.getBoundingClientRect() : null;
        
        console.log('🔵 Chat dimensions:', {
            width: chatRect.width,
            height: chatRect.height,
            visible: chatRect.width > 0 && chatRect.height > 0,
            top: chatRect.top,
            left: chatRect.left
        });
        
        if (messagesRect) {
            console.log('🔵 Messages area dimensions:', {
                width: messagesRect.width,
                height: messagesRect.height,
                visible: messagesRect.width > 0 && messagesRect.height > 0
            });
        }
        
        // Check computed styles
        const computedStyle = window.getComputedStyle(supportChat);
        console.log('🔵 Chat computed styles:', {
            display: computedStyle.display,
            position: computedStyle.position,
            transform: computedStyle.transform,
            opacity: computedStyle.opacity,
            zIndex: computedStyle.zIndex
        });
    }, 300);
    
    if (chatInput) {
        setTimeout(() => chatInput.focus(), 200);
    }
    
    // Add welcome message if chat is empty
    addWelcomeMessage();
    scrollToBottom();
}

// Function to close chat
function closeChat() {
    console.log('🔵 closeChat() called');
    const supportChat = document.getElementById('supportChat');
    if (supportChat) {
        supportChat.classList.add('collapsed');
        console.log('🔵 Chat closed, classes:', supportChat.className);
    }
}

// Function to add welcome message with debugging
function addWelcomeMessage() {
    console.log('🔵 addWelcomeMessage() called');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) {
        console.error('❌ chatMessages element not found!');
        return;
    }
    
    console.log('🔵 Current messages count:', chatMessages.children.length);
    
    // Check if welcome message already exists
    if (chatMessages.querySelector('.welcome-message')) {
        console.log('🔵 Welcome message already exists');
        return;
    }
    
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'chat-message bot-message welcome-message';
    welcomeDiv.innerHTML = `
        🌟 <strong>Dobrodošli u Golden Balance podršku!</strong><br><br>
        Ja sam vaš virtuelni asistent i tu sam da vam pomognem sa:<br>
        • 📝 Pitanjima o registraciji i nalogu<br>
        • 💰 Planiranjem budžeta i finansijama<br>
        • 🎯 Štednjom i finansijskim ciljevima<br>
        • 🔧 Tehničkim problemima<br><br>
        Kako vam mogu pomoći danas?
    `;
      chatMessages.appendChild(welcomeDiv);
    console.log('🔵 Welcome message added, new count:', chatMessages.children.length);
    console.log('🔵 Welcome div classes:', welcomeDiv.className);
    console.log('🔵 Welcome div content length:', welcomeDiv.innerHTML.length);
    
    // Check if the message is actually visible
    setTimeout(() => {
        const rect = welcomeDiv.getBoundingClientRect();
        console.log('🔵 Welcome message dimensions:', {
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0,
            top: rect.top,
            left: rect.left
        });
        
        // Check if message container has proper height
        const containerRect = chatMessages.getBoundingClientRect();
        console.log('🔵 Messages container:', {
            containerHeight: containerRect.height,
            scrollHeight: chatMessages.scrollHeight,
            scrollTop: chatMessages.scrollTop
        });
    }, 200);
    
    scrollToBottom();
}

// Function to send message with comprehensive debugging
function sendMessage() {
    console.log('🔵 sendMessage() called');
    const chatInput = document.getElementById('chatInput');
    
    if (!chatInput) {
        console.error('❌ chatInput not found in sendMessage!');
        return;
    }
    
    const message = chatInput.value.trim();
    console.log('Message to send:', `"${message}"`);
    
    if (!message) {
        console.log('❌ Empty message, not sending');
        return;
    }
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    chatInput.value = '';
    setTimeout(() => chatInput.focus(), 100);
    
    // Get bot response with delay
    setTimeout(() => {
        addBotMessage(message);
    }, 1000);
}

// Function to add user message with debugging
function addUserMessage(message) {
    console.log('🔵 addUserMessage() called with:', `"${message}"`);
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) {
        console.error('❌ chatMessages element not found in addUserMessage!');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.textContent = message;
    
    console.log('🔵 Created user message div:', messageDiv.className);
    console.log('🔵 Message content:', messageDiv.textContent);
    
    chatMessages.appendChild(messageDiv);
    console.log('🔵 User message added, total messages:', chatMessages.children.length);
    
    // Force visibility check
    setTimeout(() => {
        const rect = messageDiv.getBoundingClientRect();
        console.log('🔵 User message position:', {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0
        });
    }, 100);
    
    scrollToBottom();
}

// Function to add bot message with debugging
function addBotMessage(userMessage) {
    console.log('🔵 addBotMessage() called for:', `"${userMessage}"`);
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) {
        console.error('❌ chatMessages element not found in addBotMessage!');
        return;
    }
    
    const response = getBotResponse(userMessage);
    console.log('Bot response length:', response.length);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.innerHTML = response;
    
    console.log('🔵 Created bot message div:', messageDiv.className);
    
    chatMessages.appendChild(messageDiv);
    console.log('🔵 Bot message added, total messages:', chatMessages.children.length);
    
    // Force visibility check
    setTimeout(() => {
        const rect = messageDiv.getBoundingClientRect();
        console.log('🔵 Bot message position:', {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0
        });
    }, 100);
    
    scrollToBottom();
}

// Function to get bot response from knowledge base with debugging
function getBotResponse(userMessage) {
    console.log('🔵 getBotResponse() called with:', `"${userMessage}"`);
    
    // Check if knowledge base is available
    if (typeof supportKB === 'undefined') {
        console.error('❌ supportKB is not defined!');
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Sistem se učitava, molimo pokušajte ponovo za nekoliko sekundi.`;
    }
    
    console.log('✅ supportKB is available with categories:', Object.keys(supportKB));
    
    const message = userMessage.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    // Search through all categories in supportKB
    for (const category in supportKB) {
        console.log(`Checking category: ${category} (${supportKB[category].length} items)`);
        for (const item of supportKB[category]) {
            let score = 0;
            
            // Check how many keywords match
            for (const keyword of item.keywords) {
                if (message.includes(keyword.toLowerCase())) {
                    score += 1;
                    console.log(`Keyword match: "${keyword}" (score: ${score})`);
                }
            }
            
            // Update best match if this is better
            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
                console.log(`New best match with score: ${score}`);
            }
        }
    }
    
    // Return best match or default response
    if (bestMatch && bestScore > 0) {
        console.log('✅ Returning matched response');
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>${bestMatch.response}`;
    } else {
        console.log('🔵 No match found, returning default response');
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Hvala vam za vaše pitanje. Trenutno nemam specifičan odgovor na vaš upit, ali možete me kontaktirati direktno putem e-maila na <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a> ili pozivom na <a href="tel:+38765827710" style="color: #D4AF37;">+387 65 827 710</a>.<br><br>Možete pokušati sa pitanjima o:<br>• Registraciji i prijavljivanju<br>• Planiranju budžeta<br>• Štednji i investicijama<br>• Tehničkim problemima`;
    }
}

// Function to scroll chat to bottom with debugging
function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        setTimeout(() => {
            const scrollHeight = chatMessages.scrollHeight;
            const clientHeight = chatMessages.clientHeight;
            chatMessages.scrollTop = scrollHeight;
            console.log('🔵 Scroll info:', {
                scrollHeight,
                clientHeight,
                scrollTop: chatMessages.scrollTop,
                needsScroll: scrollHeight > clientHeight
            });
        }, 100);
    } else {
        console.error('❌ Cannot scroll - chatMessages not found');
    }
}

// Enhanced initialization with multiple attempts
function enhancedInit() {
    console.log('📱 Enhanced initialization starting...');
    
    // Try immediate init
    initializeChat();
    
    // Try after short delay
    setTimeout(() => {
        if (!chatInitialized) {
            console.log('📱 Retry 1: 500ms delay');
            initializeChat();
        }
    }, 500);
    
    // Try after medium delay
    setTimeout(() => {
        if (!chatInitialized) {
            console.log('📱 Retry 2: 1000ms delay');
            initializeChat();
        }
    }, 1000);
    
    // Try after long delay
    setTimeout(() => {
        if (!chatInitialized) {
            console.log('📱 Retry 3: 2000ms delay');
            initializeChat();
        }
    }, 2000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM Content Loaded, starting enhanced initialization...');
    enhancedInit();
});

// Try again after window loads
window.addEventListener('load', () => {
    console.log('📱 Window loaded, final initialization attempt...');
    setTimeout(() => {
        if (!chatInitialized) {
            console.log('📱 Final retry after window load');
            initializeChat();
        }
    }, 500);
});

console.log('📱 Enhanced chat support script loaded');

// Global functions for debugging from console
window.debugChat = {
    openChat: () => openChat(),
    closeChat: () => closeChat(),    sendTestMessage: () => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = 'test poruka';
            sendMessage();
        } else {
            console.error('❌ Chat input not found!');
        }
    },    addTestMessage: () => {
        console.log('🧪 Adding test message directly...');
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            const testDiv = document.createElement('div');
            testDiv.className = 'chat-message bot-message';
            testDiv.innerHTML = '🧪 <strong>Test poruka:</strong> Ovo je test da vidimo da li se poruke prikazuju!';
            testDiv.style.background = 'red !important'; // Crvena pozadina za lako uočavanje
            testDiv.style.color = 'white !important';
            testDiv.style.padding = '15px !important';
            testDiv.style.margin = '10px 0 !important';
            testDiv.style.border = '3px solid yellow !important';
            testDiv.style.display = 'block !important';
            testDiv.style.visibility = 'visible !important';
            testDiv.style.height = 'auto !important';
            testDiv.style.minHeight = '50px !important';
            
            chatMessages.appendChild(testDiv);
            console.log('🧪 Test message added');
            
            // Force scroll
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            setTimeout(() => {
                const rect = testDiv.getBoundingClientRect();
                console.log('🧪 Test message position:', {
                    width: rect.width,
                    height: rect.height,
                    visible: rect.width > 0 && rect.height > 0,
                    top: rect.top,
                    left: rect.left
                });
                
                // Check if it's in the viewport
                const inViewport = rect.top >= 0 && rect.left >= 0 && 
                                 rect.bottom <= window.innerHeight && 
                                 rect.right <= window.innerWidth;
                console.log('🧪 In viewport:', inViewport);
            }, 100);
        } else {
            console.error('❌ Chat messages container not found!');
        }
    },
    forceOpenChat: () => {
        console.log('🔧 Force opening chat...');
        const supportChat = document.getElementById('supportChat');
        if (supportChat) {
            supportChat.classList.remove('collapsed');
            supportChat.style.display = 'flex';
            supportChat.style.opacity = '1';
            supportChat.style.transform = 'none';
            supportChat.style.visibility = 'visible';
            console.log('🔧 Chat force opened');
        }
    },
    checkElements: () => {
        console.log('=== CHAT DEBUG ===');
        console.log('supportChat:', document.getElementById('supportChat'));
        console.log('chatMessages:', document.querySelector('.chat-messages'));
        console.log('chatInput:', document.getElementById('chatInput'));
        console.log('sendButton:', document.querySelector('.send-message'));
        console.log('initialized:', chatInitialized);
        console.log('=================');
    }
};

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) {
        console.error('Chat container not found');
        return;
    }
    
    chatVisible = !chatVisible;
    chatContainer.style.display = chatVisible ? 'flex' : 'none';
    
    // Dodaj početnu poruku ako chat nema poruke
    if (chatVisible) {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer && messagesContainer.children.length === 0) {
            addMessage("Zdravo! Ja sam vaš virtuelni asistent. Kako mogu da vam pomognem danas?", 'bot');
        }
        
        // Focus na input polje
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 100);
        }
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) {
        console.error('Chat input not found');
        return;
    }
    
    const message = input.value.trim();
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulacija "typing" indikatora
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) {
        console.error('Chat messages container not found');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = message;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Kombinuj ključne riječi iz različitih kategorija
    let bestMatch = null;
    let maxScore = 0;
    
    // Provjeri svaku kategoriju u bazi znanja
    for (const [category, data] of Object.entries(knowledgeBase)) {
        let score = 0;
        
        // Brojanje poklapanja ključnih riječi
        for (const keyword of data.keywords) {
            if (message.includes(keyword.toLowerCase())) {
                score += keyword.length; // Duže ključne riječi imaju veći skor
            }
        }
        
        // Provjeri i djelomična poklapanja
        for (const keyword of data.keywords) {
            const words = keyword.toLowerCase().split(' ');
            for (const word of words) {
                if (word.length > 3 && message.includes(word)) {
                    score += word.length * 0.5; // Polovični skor za djelomična poklapanja
                }
            }
        }
        
        if (score > maxScore) {
            maxScore = score;
            bestMatch = data;
        }
    }
    
    // Ako je pronađeno poklapanje, vrati odgovor
    if (bestMatch && maxScore > 0) {
        const responses = bestMatch.responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Provjeri kontekst pitanja
    if (message.includes('?') || message.includes('kako') || message.includes('šta') || message.includes('što') || message.includes('kada') || message.includes('gdje') || message.includes('gde')) {
        return "To je odličo pitanje! Nažalost, nemam specifičan odgovor na to trenutno. Da li biste željeli da zakažete besplatne konsultacije sa našim stručnjakom koji će vam dati detaljne informacije? Možete nas kontaktirati na info@finansijskaplat forma.com ili pozovite +387 33 123 456.";
    }
    
    // Fallback odgovori
    const fallbackResponses = [
        "Izvinjavam se, nisam siguran kako da odgovorim na to pitanje. Da li biste željeli da razgovarate sa našim stručnjakom? Možete zakazati besplatne konsultacije pozivom na +387 33 123 456.",
        "To je interesantno pitanje! Preporučujem vam da kontaktirate naš tim za detaljnije informacije. Email: info@finansijskaplat forma.com ili telefon: +387 33 123 456.",
        "Za specifična pitanja kao što je ovo, najbolje je da se konsultujete direktno sa našim savjetnicima. Možemo zakazati besplatni poziv - kontaktirajte nas na info@finansijskaplatforma.com",
        "Hmm, možda vam naši stručnjaci mogu bolje objasniti. Želite li da zakažemo kratku konsultaciju? Potpuno je besplatna! Pozovite +387 33 123 456."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Event listener za Enter key
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

// Export funkcija za globalno korišćenje
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;

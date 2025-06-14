/**
 * Golden Balance - Support Chat System (Fixed Version)
 * Kompletno prepisan sistem bez grešaka
 */

console.log('🚀 SUPPORT CHAT: Početak učitavanja...');

// IMMEDIATE BACKUP EVENT LISTENERS
function createBasicSupportChat() {
    console.log('🔧 Kreiram osnovni chat UI...');
    
    // Ukloni postojeći chat ako postoji
    const existingChat = document.getElementById('support-chat-container');
    if (existingChat) {
        existingChat.remove();
    }
    
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
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    `;
    
    chatContainer.innerHTML = `
        <div style="background: linear-gradient(45deg, #D4AF37, #B8860B); padding: 15px; border-radius: 13px 13px 0 0; color: #000; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
            <span>💬 Golden Balance Podrška</span>
            <button onclick="closeSupportChat()" style="background: transparent; border: none; color: #000; font-size: 18px; cursor: pointer; padding: 5px;">✕</button>
        </div>        <div id="chat-messages-area" style="flex: 1; padding: 20px; overflow-y: auto; background: #0a0a0a; color: #fff; display: flex; flex-direction: column; scroll-behavior: smooth;">
            <div style="margin-bottom: 15px; padding: 15px; background: #333; border-radius: 8px; border-left: 4px solid #D4AF37;">
                <strong>🤖 Golden Balance Asistent</strong><br><br>
                Zdravo! Dobrodošli u Golden Balance podršku!<br><br>
                Mogu vam pomoći sa:<br>
                • Finansijskim pitanjima i savetima<br>
                • Tehničkim problemima<br>
                • Korišćenjem aplikacije<br>
                • Registracijom i nalogom<br><br>
                <em>Kako mogu da vam pomognem danas?</em>
            </div>
        </div>
        <div style="padding: 15px; background: #111; border-radius: 0 0 13px 13px;">
            <input id="support-chat-input" type="text" placeholder="Unesite vaše pitanje..." style="width: 100%; padding: 12px; border: 1px solid #D4AF37; border-radius: 8px; background: #222; color: #fff; font-size: 14px;">
            <button onclick="sendSupportMessage()" style="width: 100%; margin-top: 10px; padding: 12px; background: linear-gradient(45deg, #D4AF37, #B8860B); color: #000; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px;">📤 Pošalji poruku</button>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    
    // Dodaj Enter key listener za input
    const input = document.getElementById('support-chat-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendSupportMessage();
            }
        });
        
        // Focus na input kad se otvori chat
        setTimeout(() => input.focus(), 100);
    }
    
    console.log('✅ Osnovni chat UI kreiran!');
    return chatContainer;
}

// Funkcija za zatvaranje chata
function closeSupportChat() {
    console.log('🔒 Zatvaranje support chata...');
    const chatContainer = document.getElementById('support-chat-container');
    if (chatContainer) {
        chatContainer.style.display = 'none';
    }
}

// Glavna funkcija za otvaranje chata
function openSupportChat() {
    console.log('📂 Otvaranje support chata...');
    
    let chatContainer = document.getElementById('support-chat-container');
    if (!chatContainer) {
        chatContainer = createBasicSupportChat();
    }
    
    chatContainer.style.display = 'flex';
    
    // Osiguraj da se poruke prikazuju pravilno (dno kontejnera)
    const messagesArea = document.getElementById('chat-messages-area');
    if (messagesArea) {
        // Osiguraj da je scroll na dnu
        setTimeout(() => {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }, 100);
    }
    
    // Focus na input
    const input = document.getElementById('support-chat-input');
    if (input) {
        setTimeout(() => input.focus(), 100);
    }
}

// Funkcija za slanje poruke
function sendSupportMessage() {    console.log('📤 Slanje support poruke...');
    
    const input = document.getElementById('support-chat-input');
    const messagesArea = document.getElementById('chat-messages-area');
    
    if (!input || !messagesArea) {
        console.error('❌ Ne mogu da pronađem input ili messages area');
        return;
    }
    
    const message = input.value.trim();
    if (!message) {
        console.log('⚠️ Prazna poruka');
        return;
    }
    
    console.log('💬 Poruka:', message);
    
    // Dodaj korisničku poruku NA DNO kontejnera
    const userMessageDiv = document.createElement('div');
    userMessageDiv.style.cssText = `
        margin-bottom: 15px;
        padding: 12px;
        background: #D4AF37;
        color: #000;
        border-radius: 8px;
        text-align: right;
        margin-left: 50px;
        font-weight: bold;
    `;
    userMessageDiv.innerHTML = `<strong>Vi:</strong><br>${message}`;
    messagesArea.appendChild(userMessageDiv);
    
    // Scroll na dno - poboljšana verzija
    setTimeout(() => {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }, 100);
    
    // Obriši input
    input.value = '';
    
    // Dodaj typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.style.cssText = `
        margin-bottom: 15px;
        padding: 12px;
        background: #333;
        color: #D4AF37;
        border-radius: 8px;
        margin-right: 50px;
        font-style: italic;
    `;
    typingDiv.innerHTML = '🤖 Golden Balance piše...';    messagesArea.appendChild(typingDiv);
    
    // Scroll na dno kada se doda typing indicator
    setTimeout(() => {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }, 100);
    
    // Generiši odgovor nakon kratke pauze
    setTimeout(() => {
        const response = generateResponse(message.toLowerCase());
        
        // Ukloni typing indicator
        const typing = document.getElementById('typing-indicator');
        if (typing) {
            typing.remove();
        }
        
        // Dodaj bot odgovor
        const botMessageDiv = document.createElement('div');
        botMessageDiv.style.cssText = `
            margin-bottom: 15px;
            padding: 15px;
            background: #333;
            color: #fff;
            border-radius: 8px;
            margin-right: 50px;
            border-left: 4px solid #D4AF37;
        `;
        botMessageDiv.innerHTML = response;        messagesArea.appendChild(botMessageDiv);
        
        // Scroll na dno nakon dodavanja bot poruke - poboljšana verzija
        setTimeout(() => {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }, 100);
        
        // Focus nazad na input
        input.focus();
        
    }, 1000 + Math.random() * 1000);
}

// Napredna funkcija za generisanje odgovora sa detaljnom bazom znanja
function generateResponse(message) {
    console.log('🧠 Generiram odgovor za:', message);
    
    // NAMERE ZA INVESTIRANJE - direktno usmeravanje na konsultacije
    if (/želim.*investir|hoću.*investir|trebam.*investir|planira.*investir|mislim.*investir|počet.*investir|kren.*investir/i.test(message)) {
        return `🎯 <strong>Odličo! Želite da počnete sa investiranjem!</strong><br><br>
               <strong>⚠️ VAŽNO:</strong> Investiranje bez profesionalne konsultacije može biti rizično.<br><br>
               
               <strong>🏆 Golden Balance vam nudi BESPLATNU početnu konsultaciju:</strong><br>
               • <em>Analiza vaše finansijske situacije</em><br>
               • <em>Kreiranje personalizovane investicione strategije</em><br>
               • <em>Procena vašeg profila rizika</em><br>
               • <em>Preporuke za najbolje investicione opcije</em><br><br>
               
               <strong>📞 Zakažite konsultaciju:</strong><br>
               📧 Email: <a href="mailto:zorandostica2@gmail.com?subject=Zahtev za investicionu konsultaciju" style="color: #D4AF37;">zorandostica2@gmail.com</a><br>
               📱 Telefon: +387 65 827 710<br>
               🕐 Dostupno: Pon-Pet 9:00-17:00<br><br>
               
               <strong>💡 Zašto konsultacija?</strong><br>
               • Izbegavate skuplje greške početnika<br>
               • Dobijate strategiju prilagođenu baš vama<br>
               • Siguran i kontrolisan početak<br><br>
               
               <strong>🎁 Bonus:</strong> Prvi mesec praćenja investicija BESPLATNO!`;
    }
    
    // OPŠTI INVESTICIONI UPITI - edukativni sadržaj + konsultacije
    if (/investir|investic|ulaganje|ulog|portfolio|portfelj|akcije|fondovi/i.test(message)) {
        return `📈 <strong>Investiranje - osnovne informacije:</strong><br><br>
               <strong>🎯 Osnove investiranja (SAMO EDUKATIVNO):</strong><br>
               • <em>Diverzifikacija</em> - Širenje rizika kroz različite investicije<br>
               • <em>Dugoročno planiranje</em> - Investirajte za 5+ godina<br>
               • <em>Rizik vs prinos</em> - Veći rizik može značiti veći prinos, ali i veće gubitke<br><br>
               
               <strong>⚠️ OBAVEZNO PROČITAJTE:</strong><br>
               • Investiranje UVEK nosi rizik gubitka kapitala<br>
               • Nikad ne investirajte novac koji će vam trebati<br>
               • Prošli rezultati ne garantuju buduće performanse<br>
               • Konsultujte se UVEK sa licenciranim finansijskim savetnikom<br><br>
               
               <strong>🏆 Golden Balance preporučuje:</strong><br>
               📞 <em>Zakažite BESPLATNU konsultaciju sa našim stručnjacima</em><br>
               📧 <a href="mailto:zorandostica2@gmail.com?subject=Investiciona konsultacija" style="color: #D4AF37;">zorandostica2@gmail.com</a><br><br>
               
               <strong>💼 Naši stručnjaci će vam pomoći da:</strong><br>
               • Napravite siguran plan investiranja<br>
               • Izaberete odgovarajuće investicije<br>
               • Minimizirate rizike<br>
               • Ostvarite vaše finansijske ciljeve`;
    }
    
    // ŠTEDNJA - konkretni saveti
    if (/kako.*štedim|štednja|štedi|sačuvam|rezerve/i.test(message)) {
        return `💰 <strong>Saveti za štednju:</strong><br><br>
               <strong>🎯 Pravilo 50/30/20:</strong><br>
               • 50% prihoda - osnovne potrebe (kirija, hrana, računi)<br>
               • 30% prihoda - želje i zabava<br>
               • 20% prihoda - štednja i investicije<br><br>
               
               <strong>🔧 Praktični koraci:</strong><br>
               1. <em>Automatska štednja</em> - odmah kad primite platu, odvojite 10-20%<br>
               2. <em>Fond za hitne slučajeve</em> - štedite 3-6 meseci osnovnih troškova<br>
               3. <em>Smanjite nepotrebne troškove</em> - pretplate koje ne koristite<br>
               4. <em>Kupujte pametno</em> - poredite cene, čekajte sniženja<br><br>
               
               <strong>💡 Golden Balance tip:</strong> Koristite našu aplikaciju da automatski pratite troškove i postavite ciljeve štednje!<br><br>
               
               <strong>📞 Za personalizovan plan štednje, zakažite konsultaciju:</strong><br>
               📧 <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a>`;
    }
    
    // BUDŽETIRANJE - konkretni saveti
    if (/budžet|plan|organizacija|planiranje|troškovi|rashodi/i.test(message)) {
        return `� <strong>Kako napraviti efikasan budžet:</strong><br><br>
               <strong>📋 Korak 1 - Analizirajte prihode:</strong><br>
               • Sabrite sve izvore prihoda (plata, honorari, ostalo)<br>
               • Računajte na neto iznos (nakon poreza)<br><br>
               
               <strong>📋 Korak 2 - Kategorizujte troškove:</strong><br>
               • <em>Fiksni troškovi</em>: kirija, kredit, osiguranje (40-50%)<br>
               • <em>Varijabilni troškovi</em>: hrana, transport, odeća (20-30%)<br>
               • <em>Zabava i želje</em>: restorani, putovanja (10-20%)<br>
               • <em>Štednja</em>: emergency fond, investicije (10-20%)<br><br>
               
               <strong>📱 Golden Balance aplikacija vam pomaže:</strong><br>
               • Automatsko kategorisanje troškova<br>
               • Praćenje budžeta u realnom vremenu<br>
               • Alarmiranje kad premagate limit<br>
               • Mesečni izveštaji i analize<br><br>
               
               <strong>💡 Pro tip:</strong> Revizija budžeta svaka 3 meseca!<br><br>
               
               <strong>📞 Za detaljnu analizu vašeg budžeta:</strong><br>
               📧 <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a>`;
    }
    
    // DUGOVI I KREDITI
    if (/dug|kredit|zajam|otplata|kamata|rata/i.test(message)) {
        return `💳 <strong>Upravljanje dugovima:</strong><br><br>
               <strong>🎯 Strategija otplate:</strong><br>
               • <em>Snowball metoda</em> - Prvo platite najmanji dug (motivacija)<br>
               • <em>Avalanche metoda</em> - Prvo platite dug sa najvišom kamatom (ušteda)<br><br>
               
               <strong>📋 Plan akcije:</strong><br>
               1. Napravite listu svih dugova (iznos, kamata, minimum)<br>
               2. Platite minimume na sve dugove<br>
               3. Dodatni novac usmerite na prioritetni dug<br>
               4. Kad isplatite jedan, prebacite na sledeći<br><br>
               
               <strong>🚫 Izbegavajte nova dugovanja:</strong><br>
               • Koristite kreditne kartice samo ako možete da isplatite<br>
               • Imajte emergency fond pre većih kupovina<br>
               • Razmislite 24h pre veće kupovine<br><br>
               
               <strong>� Za plan rešavanja dugova kontaktirajte finansijskog savetnika:</strong><br>
               📧 <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a>`;
    }
    
    // PENZIJA I DUGOROČNO PLANIRANJE
    if (/penzija|penzioni|privatna|stara.*godina|dugoročno/i.test(message)) {
        return `👴 <strong>Planiranje za penziju:</strong><br><br>
               <strong>⏰ Zlatno pravilo:</strong> Što ranije počnete, manje treba da uplaćujete!<br><br>
               
               <strong>💼 Kombinacija pristupa:</strong><br>
               • <em>Obavezni penzioni fond</em> (državni)<br>
               • <em>Dobrovoljni penzioni fond</em> (poreske olakšice)<br>
               • <em>Lična štednja i investicije</em><br><br>
               
               <strong>⚠️ VAŽNO:</strong> Planiranje penzije zahteva profesionalnu konsultaciju!<br><br>
               
               <strong>� Golden Balance penzioni stručnjaci će vam pomoći:</strong><br>
               • Izračunati koliko vam treba za penziju<br>
               • Napraviti optimalan plan štednje<br>
               • Izabrati najbolje penzijske fondove<br>
               • Iskoristiti poreske olakšice<br><br>
               
               📧 <a href="mailto:zorandostica2@gmail.com?subject=Penzione konsultacije" style="color: #D4AF37;">zorandostica2@gmail.com</a><br>
               🎁 <em>Prva konsultacija BESPLATNA!</em>`;
    }
    
    // KONSULTACIJE - direktni zahtevi
    if (/konsultac|savet|pomoc|pomoć|stručnjak|ekspert|razgovor/i.test(message)) {
        return `🏆 <strong>Golden Balance Konsultacije</strong><br><br>
               <strong>🎯 Naši stručnjaci vam mogu pomoći sa:</strong><br>
               • Finansijskim planiranjem i budžetiranjem<br>
               • Investicionim strategijama (prema vašem profilu rizika)<br>
               • Planiranjem štednje i penzije<br>
               • Rešavanjem dugova i kredita<br>
               • Analizom vaše finansijske situacije<br><br>
               
               <strong>💰 Cenovnik konsultacija:</strong><br>
               • <em>Prva konsultacija (60 min)</em> - BESPLATNO! 🎁<br>
               • <em>Standardna konsultacija (45 min)</em> - 50€<br>
               • <em>Detaljna finansijska analiza</em> - 100€<br>
               • <em>Mesečno praćenje</em> - 30€/mesec<br><br>
               
               <strong>📅 Kako zakazati:</strong><br>
               📧 Email: <a href="mailto:zorandostica2@gmail.com?subject=Zahtev za konsultaciju" style="color: #D4AF37;">zorandostica2@gmail.com</a><br>
               📱 Telefon: +387 65 827 710<br>
               🕐 Radno vreme: Pon-Pet 9:00-17:00<br><br>
               
               <strong>📞 POZOVITE SADA - prva konsultacija je na naš račun!</strong>`;
    }
    
    // BUDŽETIRANJE - konkretni saveti
    if (/budžet|plan|organizacija|planiranje|troškovi|rashodi/i.test(message)) {
        return `📊 <strong>Kako napraviti efikasan budžet:</strong><br><br>
               <strong>📋 Korak 1 - Analizirajte prihode:</strong><br>
               • Sabrite sve izvore prihoda (plata, honorari, ostalo)<br>
               • Računajte na neto iznos (nakon poreza)<br><br>
               
               <strong>📋 Korak 2 - Kategorizujte troškove:</strong><br>
               • <em>Fiksni troškovi</em>: kirija, kredit, osiguranje (40-50%)<br>
               • <em>Varijabilni troškovi</em>: hrana, transport, odeća (20-30%)<br>
               • <em>Zabava i želje</em>: restorani, putovanja (10-20%)<br>
               • <em>Štednja</em>: emergency fond, investicije (10-20%)<br><br>
               
               <strong>📱 Golden Balance aplikacija vam pomaže:</strong><br>
               • Automatsko kategorisanje troškova<br>
               • Praćenje budžeta u realnom vremenu<br>
               • Alarmiranje kad premagate limit<br>
               • Mesečni izveštaji i analize<br><br>
               
               <strong>💡 Pro tip:</strong> Revizija budžeta svaka 3 meseca!`;
    }
    
    // DUGOVI I KREDITI
    if (/dug|kredit|zajam|otplata|kamata|rata/i.test(message)) {
        return `💳 <strong>Upravljanje dugovima:</strong><br><br>
               <strong>🎯 Strategija otplate:</strong><br>
               • <em>Snowball metoda</em> - Prvo platite najmanji dug (motivacija)<br>
               • <em>Avalanche metoda</em> - Prvo platite dug sa najvišom kamatom (ušteda)<br><br>
               
               <strong>📋 Plan akcije:</strong><br>
               1. Napravite listu svih dugova (iznos, kamata, minimum)<br>
               2. Platite minimume na sve dugove<br>
               3. Dodatni novac usmerite na prioritetni dug<br>
               4. Kad isplatite jedan, prebacite na sledeći<br><br>
               
               <strong>🚫 Izbegavajte nova dugovanja:</strong><br>
               • Koristite kreditne kartice samo ako možete da isplatite<br>
               • Imajte emergency fond pre većih kupovina<br>
               • Razmislite 24h pre veće kupovine<br><br>
               
               <strong>📞 Trebate pomoć?</strong> Kontaktirajte finansijskog savetnika!`;
    }
    
    // PENZIJA I DUGOROČNO PLANIRANJE
    if (/penzija|penzioni|privatna|stara.*godina|dugoročno/i.test(message)) {
        return `👴 <strong>Planiranje za penziju:</strong><br><br>
               <strong>⏰ Zlatno pravilo:</strong> Što ranije počnete, manje treba da uplaćujete!<br><br>
               
               <strong>💼 Kombinacija pristupa:</strong><br>
               • <em>Obavezni penzioni fond</em> (državni)<br>
               • <em>Dobrovoljni penzioni fond</em> (poreske olakšice)<br>
               • <em>Lična štednja i investicije</em><br><br>
               
               <strong>🧮 Praktičan primer:</strong><br>
               Ako imate 30 godina i štedite 200€ mesečno sa 7% godišnjim prinosom:<br>
               • Za 35 godina = oko 650.000€!<br><br>
               
               <strong>📈 Investiciona strategija za penziju:</strong><br>
               • <em>20-40 godina</em>: 80% akcije, 20% obveznice<br>
               • <em>40-55 godina</em>: 60% akcije, 40% obveznice<br>
               • <em>55+ godina</em>: 40% akcije, 60% obveznice<br><br>
               
               <strong>💡 Početak danas je bolji od savršenog plana sutra!</strong>`;
    }
    
    // KRIPTOVALUTE
    if (/kripto|bitcoin|ethereum|blockchain|digitalne.*valute/i.test(message)) {
        return `₿ <strong>Investiranje u kriptovalute:</strong><br><br>
               <strong>⚠️ Prvo i najvažnije:</strong><br>
               • Kriptovalute su VISOKORIZIČNE investicije<br>
               • Investirajte maksimalno 5-10% vašeg portfolija<br>
               • Nikad ne investirajte više nego što možete da izgubite<br><br>
               
               <strong>🎯 Za početnike:</strong><br>
               1. Počnite sa Bitcoin-om i Ethereum-om (najstabilniji)<br>
               2. Koristite renomirane menjačnice (Binance, Coinbase)<br>
               3. Učite o "HODL" strategiji - kupujte i držite dugoročno<br>
               4. Ne pokušavajte da "time-ujete" tržište<br><br>
               
               <strong>🔐 Sigurnost:</strong><br>
               • Koristite dvostruku autentifikaciju (2FA)<br>
               • Za veće sume koristite hardware wallet<br>
               • Nikad ne delite privatne ključeve<br><br>
               
               <strong>💡 DCA strategija:</strong> Kupujte malo svake nedelje/mesec umesto sve odjednom!`;
    }
    
    // NEKRETNINE
    if (/nekretnine|stan|kuća|apartman|izdavanje|kirija|rent/i.test(message)) {
        return `🏠 <strong>Investiranje u nekretnine:</strong><br><br>
               <strong>💰 Načini zarade:</strong><br>
               • <em>Rental yield</em> - Prihod od izdavanja (5-8% godišnje)<br>
               • <em>Capital appreciation</em> - Rast vrednosti nekretnine<br><br>
               
               <strong>🔍 Ključni faktori:</strong><br>
               1. <em>Lokacija</em> - Blizina centra, prevoz, škole, trgovine<br>
               2. <em>Stanje objekta</em> - Potrebne renovacije?<br>
               3. <em>Tržišna vrednost</em> - Poredite sa sličnim objektima<br>
               4. <em>Potencijal rasta</em> - Planovi razvoja kraja<br><br>
               
               <strong>📊 Finansijska analiza:</strong><br>
               • ROI = (Godišnja kirija - troškovi) / Investicija × 100<br>
               • Računjate: porez, održavanje, upravljanje, prazan period<br><br>
               
               <strong>🏆 Prednosti:</strong> Stabilan prihod, zaštita od inflacije<br>
               <strong>⚠️ Rizici:</strong> Illiquidnost, veliki početni kapital, problem stanara`;
    }
    
    // POČETAK KARIJERE / MLADI
    if (/mlad|početnik|student|prva.*plata|karijera|početak/i.test(message)) {
        return `🚀 <strong>Finansije za mlade:</strong><br><br>
               <strong>🎯 Prioriteti po redosledu:</strong><br>
               1. <em>Emergency fond</em> - 1000€ za početak<br>
               2. <em>Otplatite dugove</em> - posebno kreditne kartice<br>
               3. <em>Employer matching</em> - maksimalno iskoristite benefit<br>
               4. <em>Počnite da investirajte</em> - čak i 50€ mesečno!<br><br>
               
               <strong>💡 Navike koje menjaju život:</strong><br>
               • <em>Automatska štednja</em> - 10% od svake plate<br>
               • <em>Živite ispod mogućnosti</em> - ne povećavajte lifestyle sa platom<br>
               • <em>Investirajte u sebe</em> - kursevi, knjige, mentori<br>
               • <em>Pratite net worth</em> - imovina minus dugovi<br><br>
               
               <strong>📱 Aplikacije za mlade:</strong><br>
               • <em>Golden Balance</em> - budžetiranje i praćenje<br>
               • <em>Revolut/N26</em> - savremeno bankarstvo<br>
               • <em>Trading212/eToro</em> - investiranje sa malim sumama<br><br>
               
               <strong>⏰ Vreme je vaš najbolji saveznik - počnite DANAS!</strong>`;
    }
    
    // POZDRAVI
    if (/zdravo|pozdrav|dobro|ćao|cao|hej|hey|hi|hello/i.test(message)) {
        return "👋 <strong>Zdravo!</strong><br><br>Dobrodošli u Golden Balance podršku! Kako mogu da vam pomognem danas?";
    }
    
    // HVALA
    if (/hvala|zahvaljujem|thanks|thank you/i.test(message)) {
        return "😊 <strong>Nema na čemu!</strong><br><br>Tu sam da pomognem. Imate li još pitanja o finansijama, investiranju ili štednji?";
    }
    
    // TEHNIČKI PROBLEMI
    if (/problem|greška|ne radi|bug|kvar/i.test(message)) {
        return `🔧 <strong>Tehnička podrška:</strong><br><br>
               Žao mi je zbog problema! Pokušajte sledeće korake:<br>
               1. Osvežite stranicu (F5)<br>
               2. Odjavite se i ponovo se prijavite<br>
               3. Obrisite cookies i cache<br>
               4. Probajte drugi pregledač<br><br>
               Ako problem i dalje postoji, opišite detaljnije šta se dešava.`;
    }
    
    // DEFAULT ODGOVOR - sada sa konkretnim pitanjima
    return `🤖 <strong>Golden Balance Asistent:</strong><br><br>
           Izvinjavam se, nisam potpuno razumeo vaše pitanje. Evo načina kako mogu da vam pomognem:<br><br>
           
           <strong>💰 Finansijska pitanja (kliknite za brže odgovore):</strong><br>
           • <em>"Kako da štedim novac?"</em><br>
           • <em>"Saveti za investiranje"</em><br>
           • <em>"Kako napraviti budžet?"</em><br>
           • <em>"Investiranje u nekretnine"</em><br>
           • <em>"Kriptovalute za početnike"</em><br>
           • <em>"Planiranje penzije"</em><br><br>
           
           <strong>🔧 Tehnička podrška:</strong><br>
           • Problemi sa aplikacijom<br>
           • Registracija i prijava<br>
           • Resetovanje lozinke<br><br>
           
           📧 <em>Direktan kontakt:</em> <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a><br><br>
           
           <strong>Molim vas postavite konkretno pitanje!</strong> 😊`;
}

// Event listener funkcija
function handleSupportButtonClick(e) {
    console.log('🎯 Support dugme kliknuto!', e.target);
    e.preventDefault();
    e.stopPropagation();
    openSupportChat();
}

// Inicijalizacija kad se DOM učita
function initializeSupportSystem() {
    console.log('🔧 Inicijalizujem support sistem...');
    
    // Pronađi sva support dugmad
    const selectors = [
        '#openSupport',
        '.support-btn', 
        '.floating-support-btn',
        'button[title*="Tehnička"]',
        'button[title*="Podrška"]'
    ];
    
    let totalButtons = 0;
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        console.log(`🔍 Našao ${elements.length} elemenata za: ${selector}`);
        totalButtons += elements.length;
        
        elements.forEach((element, index) => {
            console.log(`🔗 Vezujem listener za element ${index}:`, element.tagName, element.id, element.className);
            
            // Ukloni postojeće listenere
            element.removeEventListener('click', handleSupportButtonClick);
            
            // Dodaj novi listener
            element.addEventListener('click', handleSupportButtonClick);
        });
    });
    
    console.log(`✅ Ukupno vezano ${totalButtons} support dugmad`);
    
    // Dodaj i univerzalni click listener kao backup
    document.addEventListener('click', (e) => {
        if (e.target.closest('#openSupport') || 
            e.target.closest('.support-btn') || 
            e.target.closest('.floating-support-btn') ||
            e.target.id === 'openSupport' ||
            e.target.classList.contains('support-btn')) {
            console.log('🔥 Universal click listener aktiviran!');
            handleSupportButtonClick(e);
        }
    });
    
    // Dodaj u window za globalni pristup
    window.openSupportChat = openSupportChat;
    window.closeSupportChat = closeSupportChat;
    window.sendSupportMessage = sendSupportMessage;
    
    console.log('✅ Support sistem inicijalizovan!');
}

// Pokretanje kad se DOM učita
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSupportSystem);
} else {
    initializeSupportSystem();
}

// Dodatno pokretanje nakon kratke pauze za slučaj da se neki elementi dodaju dinamički
setTimeout(initializeSupportSystem, 1000);

console.log('🎧 Support Chat sistem učitan!');

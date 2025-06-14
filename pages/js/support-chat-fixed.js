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
        </div>
        <div id="chat-messages-area" style="flex: 1; padding: 20px; overflow-y: auto; background: #0a0a0a; color: #fff;">
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
    
    // Focus na input
    const input = document.getElementById('support-chat-input');
    if (input) {
        setTimeout(() => input.focus(), 100);
    }
}

// Funkcija za slanje poruke
function sendSupportMessage() {
    console.log('📤 Slanje support poruke...');
    
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
    
    // Dodaj korisničku poruku
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
    typingDiv.innerHTML = '🤖 Golden Balance piše...';
    messagesArea.appendChild(typingDiv);
    
    // Scroll na dno
    messagesArea.scrollTop = messagesArea.scrollHeight;
    
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
        botMessageDiv.innerHTML = response;
        messagesArea.appendChild(botMessageDiv);
        
        // Scroll na dno
        messagesArea.scrollTop = messagesArea.scrollHeight;
        
        // Focus nazad na input
        input.focus();
        
    }, 1000 + Math.random() * 1000);
}

// Jednostavna funkcija za generisanje odgovora
function generateResponse(message) {
    console.log('🧠 Generiram odgovor za:', message);
    
    // Pozdravi
    if (/zdravo|pozdrav|dobro|ćao|cao|hej|hey|hi|hello/i.test(message)) {
        return "👋 <strong>Zdravo!</strong><br><br>Dobrodošli u Golden Balance podršku! Kako mogu da vam pomognem danas?";
    }
    
    // Hvala
    if (/hvala|zahvaljujem|thanks|thank you/i.test(message)) {
        return "😊 <strong>Nema na čemu!</strong><br><br>Tu sam da pomognem. Imate li još pitanja?";
    }
    
    // Problemi
    if (/problem|greška|ne radi|bug|kvar/i.test(message)) {
        return `🔧 <strong>Tehnička podrška:</strong><br><br>
               Žao mi je zbog problema! Pokušajte sledeće korake:<br>
               1. Osvežite stranicu (F5)<br>
               2. Odjavite se i ponovo se prijavite<br>
               3. Obrisite cookies i cache<br>
               4. Probajte drugi pregledač<br><br>
               Ako problem i dalje postoji, opišite detaljnije šta se dešava.`;
    }
    
    // Registracija
    if (/registrac|nalog|račun|signup|kreir/i.test(message)) {
        return `📝 <strong>Registracija:</strong><br><br>
               Da biste se registrovali:<br>
               1. Kliknite na "Registracija" dugme<br>
               2. Unesite vaš email i lozinku<br>
               3. Potvrdite email adresu<br>
               4. Počnite da koristite Golden Balance!<br><br>
               Imate li problema sa registracijom?`;
    }
    
    // Lozinka
    if (/lozinka|password|zaborav|reset/i.test(message)) {
        return `🔑 <strong>Lozinka:</strong><br><br>
               Ako ste zaboravili lozinku:<br>
               1. Kliknite "Zaboravili ste lozinku?" na stranici za prijavu<br>
               2. Unesite vaš email<br>
               3. Proverite email za link za resetovanje<br>
               4. Kreirajte novu lozinku<br><br>
               Trebam li vam dodatnu pomoć?`;
    }
    
    // Finansije
    if (/novac|para|financij|budžet|štednja|investic/i.test(message)) {
        return `💰 <strong>Finansijska pitanja:</strong><br><br>
               Golden Balance vam može pomoći sa:<br>
               • Budžetiranjem i planiranjem troškova<br>
               • Savetima o štednji i investicijama<br>
               • Praćenjem finansijskih ciljeva<br>
               • Analizom vaših finansijskih navika<br><br>
               O čemu konkretno želite da saznate više?`;
    }
    
    // Pitanja
    if (/kako|šta|kada|gde|zašto|koji/i.test(message)) {
        return `❓ <strong>Odličo pitanje!</strong><br><br>
               Golden Balance može vam pomoći sa:<br>
               • Finansijskim planiranjem i budžetiranjem<br>
               • Praćenjem troškova i prihoda<br>
               • Investicionim savetima<br>
               • Tehničkoj podršci aplikacije<br><br>
               Možete li biti specifičniji sa vašim pitanjem?`;
    }
    
    // Default odgovor
    return `🤖 <strong>Golden Balance Asistent:</strong><br><br>
           Hvala na vašem pitanju! Mogu vam pomoći sa:<br><br>
           💰 <strong>Finansijska pitanja:</strong><br>
           • Budžetiranje i planiranje<br>
           • Štednja i investicije<br>
           • Upravljanje troškovima<br><br>
           🔧 <strong>Tehnička podrška:</strong><br>
           • Problemi sa aplikacijom<br>
           • Registracija i prijava<br>
           • Resetovanje lozinke<br><br>
           📧 Kontakt: <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a><br><br>
           Možete li biti konkretniji sa vašim pitanjem?`;
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

/**
 * Golden Balance - Chat Support System
 * Clean implementation for technical support chat
 */

// Global chat state
let chatInitialized = false;

// Function to initialize chat system
function initializeChat() {
    if (chatInitialized) return;
    
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
    
    if (!supportChat || !chatMessages || !chatInput || !sendButton) {
        console.log('❌ Missing critical chat elements, retrying...');
        setTimeout(initializeChat, 500);
        return;
    }
    
    console.log('✅ Chat system initializing...');
    chatInitialized = true;
    
    // Find all "tehnička podrška" buttons and make them open chat
    const allSupportButtons = document.querySelectorAll('[id="openSupport"], .tehnička-podrška, [onclick*="openSupport"], a[href*="podrška"], button[onclick*="podrška"], [data-action="support"]');
    console.log('Found support buttons:', allSupportButtons.length);
    
    allSupportButtons.forEach((btn, index) => {
        console.log(`Adding listener to button ${index}:`, btn);
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔵 Support button clicked!');
            openChat();
        });
    });
    
    // Also handle specific openSupport click
    if (openSupport) {
        openSupport.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔵 Main openSupport clicked!');
            openChat();
        });
    }
    
    // Close chat events - handle both structures
    const closeButtons = document.querySelectorAll('.chat-actions .btn, .chat-actions button, .close-chat, .minimize-chat');
    console.log('Found close buttons:', closeButtons.length);
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeChat);
    });
    
    // Send message events
    sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔵 Send button clicked!');
        sendMessage();
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('🔵 Enter key pressed!');
            sendMessage();
        }
    });
    
    console.log('✅ Chat system ready!');
}

// Function to open chat
function openChat() {
    console.log('🔵 openChat() called');
    const supportChat = document.getElementById('supportChat');
    const chatInput = document.getElementById('chatInput');
    
    if (!supportChat) {
        console.error('❌ supportChat element not found!');
        return;
    }
    
    supportChat.classList.remove('collapsed');
    console.log('🔵 Chat opened, collapsed class removed');
    
    if (chatInput) {
        chatInput.focus();
    }
    
    // Add welcome message if chat is empty
    addWelcomeMessage();
    scrollToBottom();
}

// Function to close chat
function closeChat() {
    const supportChat = document.getElementById('supportChat');
    supportChat.classList.add('collapsed');
}

// Function to add welcome message
function addWelcomeMessage() {
    console.log('🔵 addWelcomeMessage() called');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) {
        console.error('❌ chatMessages element not found!');
        return;
    }
    
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
    console.log('🔵 Welcome message added');
    scrollToBottom();
}

// Function to send message
function sendMessage() {
    console.log('🔵 sendMessage() called');
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    console.log('Message to send:', message);
    
    if (!message) {
        console.log('❌ Empty message, not sending');
        return;
    }
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    chatInput.value = '';
    chatInput.focus();
    
    // Get bot response
    setTimeout(() => {
        addBotMessage(message);
    }, 1000);
}

// Function to add user message
function addUserMessage(message) {
    console.log('🔵 addUserMessage() called with:', message);
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) {
        console.error('❌ chatMessages element not found in addUserMessage!');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.textContent = message;
    
    chatMessages.appendChild(messageDiv);
    console.log('🔵 User message added to chat');
    scrollToBottom();
}

// Function to add bot message
function addBotMessage(userMessage) {
    console.log('🔵 addBotMessage() called for:', userMessage);
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) {
        console.error('❌ chatMessages element not found in addBotMessage!');
        return;
    }
    
    const response = getBotResponse(userMessage);
    console.log('Bot response:', response);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.innerHTML = response;
    
    chatMessages.appendChild(messageDiv);
    console.log('🔵 Bot message added to chat');
    scrollToBottom();
}

// Function to get bot response from knowledge base
function getBotResponse(userMessage) {
    console.log('🔵 getBotResponse() called with:', userMessage);
    
    // Check if knowledge base is available
    if (typeof supportKB === 'undefined') {
        console.error('❌ supportKB is not defined!');
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Sistem se učitava, molimo pokušajte ponovo za nekoliko sekundi.`;
    }
    
    console.log('✅ supportKB is available');
    
    const message = userMessage.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    // Search through all categories in supportKB
    for (const category in supportKB) {
        console.log(`Checking category: ${category}`);
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

// Function to scroll chat to bottom
function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            console.log('🔵 Scrolled to bottom');
        }, 100);
    } else {
        console.error('❌ Cannot scroll - chatMessages not found');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM Content Loaded, initializing chat...');
    initializeChat();
});

// Also try to initialize after a delay in case DOM takes time
setTimeout(() => {
    console.log('📱 Timeout initialization attempt...');
    initializeChat();
}, 1000);

// Try again after window loads
window.addEventListener('load', () => {
    console.log('📱 Window loaded, final initialization attempt...');
    setTimeout(initializeChat, 500);
});

console.log('📱 Chat support script loaded');

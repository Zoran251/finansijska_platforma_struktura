/**
 * Golden Balance - Chat Support System  
 * Enhanced version with more robust error handling
 */

// Global chat state
let chatInitialized = false;

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
        [data-action="support"],
        .ai-chat-button
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
    
    if (!supportChat) {
        console.error('❌ supportChat element not found!');
        return;
    }
    
    console.log('🔵 Current chat classes:', supportChat.className);
    supportChat.classList.remove('collapsed');
    console.log('🔵 Chat opened, classes after removal:', supportChat.className);
    
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
    closeChat: () => closeChat(),
    sendTestMessage: () => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = 'test poruka';
            sendMessage();
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

// Chat state and initialization
let chatInitialized = false;

// Verifikacija da je ChatBotKB API dostupan
async function loadKnowledgeBase() {
    try {
        if (typeof ChatBotKB === 'undefined') {
            throw new Error('ChatBotKB API is not available');
        }
        console.log('✅ ChatBot API loaded successfully');
        
        // Expose testing functions in console (only in development)
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            window.testKB = {
                testDetection: function() {
                    return ChatBotKB._testDetection();
                },
                testResponses: function() {
                    return ChatBotKB._testResponses();
                },
                ask: function(query) {
                    console.log('Category:', ChatBotKB.identifyTopic(query));
                    console.log('Response:', ChatBotKB.getResponse(query));
                    return true;
                },
                isLongTermGoal: function(query) {
                    return ChatBotKB.isLongTermGoalQuestion(query);
                }
            };
            console.log('🧪 Test functions available in console. Try window.testKB.testDetection() or window.testKB.ask("your question")');
        }
        
        return true;
    } catch (e) {
        console.error('❌ Error initializing ChatBot:', e);
        return false;
    }
}

// Function to get bot response from knowledge base with debugging
function getBotResponse(userMessage) {
    console.log('🔵 getBotResponse() called with:', `"${userMessage}"`);
    
    // Check if ChatBotKB API is available
    if (typeof ChatBotKB === 'undefined') {
        console.error('❌ ChatBotKB API is not available!');
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Sistem se učitava, molimo pokušajte ponovo za nekoliko sekundi.`;
    }
    
    try {
        // Get response using the ChatBotKB API
        const response = ChatBotKB.getResponse(userMessage);
        
        if (!response) {
            console.warn('⚠️ No response from ChatBotKB API');
            return `🤖 <strong>Golden Balance podrška:</strong><br><br>Izvinite, trenutno ne mogu da pronađem odgovor na vaše pitanje. Molimo kontaktirajte našu podršku za više informacija.`;
        }
        
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>${response}`;
    } catch (error) {
        console.error('❌ Error getting response from ChatBotKB:', error);
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Došlo je do greške u sistemu. Molimo pokušajte ponovo za nekoliko trenutaka.`;
    }
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
    
    chatMessages.appendChild(messageDiv);
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
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.innerHTML = response;
    
    chatMessages.appendChild(messageDiv);
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

// Function to scroll chat to bottom with debugging
function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📱 DOM Content Loaded, loading knowledge base...');
    await loadKnowledgeBase();
});

// Export functions for Reflex state integration
window.chatFunctions = {
    sendMessage: sendMessage,
    scrollToBottom: scrollToBottom,
    loadKnowledgeBase: loadKnowledgeBase
};

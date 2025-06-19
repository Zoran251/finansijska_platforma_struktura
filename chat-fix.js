// Chat related variables
let chatContainer, closeChat, userInput, sendButton, chatMessages, supportBtn;

// Knowledge base for chat responses
const knowledgeBase = {
    default: {
        response: '<p>Dobrodošli u Golden Balance podršku! Kako vam mogu pomoći danas?</p>'
    },
    // Add more responses as needed
};

// Initialize chat functionality
function initChat() {
    chatContainer = document.getElementById('chatContainer');
    closeChat = document.getElementById('closeChat');
    userInput = document.getElementById('userInput');
    sendButton = document.getElementById('sendMessage');
    chatMessages = document.getElementById('chatMessages');
    supportBtn = document.getElementById('supportBtn');
    
    if (!chatContainer || !closeChat || !userInput || !sendButton || !chatMessages || !supportBtn) return;
    
    // Show chat with animation on support button click
    supportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle chat visibility
        if (chatContainer.style.display === 'block') {
            closeChatFunction();
            return;
        }
        
        chatContainer.style.display = 'block';
        setTimeout(() => {
            chatContainer.style.opacity = '1';
            chatContainer.style.transform = 'translateY(0)';
            
            // Show suggested questions when chat opens
            showSuggestedQuestions();
            
            // Focus input field when chat opens
            if (userInput) userInput.focus();
        }, 10);
    });
    
    // Close chat with animation on close button click
    closeChat.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChatFunction();
    });
    
    // Close chat on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatContainer.style.display === 'block') {
            closeChatFunction();
        }
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (chatContainer.style.display === 'block' && 
            !chatContainer.contains(e.target) && 
            e.target !== supportBtn) {
            closeChatFunction();
        }
    });
    
    // Prevent closing when clicking inside chat
    chatContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Send message on button click
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
            userInput.value = '';
        }
    });
    
    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                sendMessage(message);
                userInput.value = '';
            }
        }
    });
}

// Function to show suggested questions
function showSuggestedQuestions() {
    if (!chatMessages) return;
    
    // Clear previous messages
    chatMessages.innerHTML = '';
    
    // Add welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('message', 'bot-message');
    welcomeMessage.innerHTML = knowledgeBase.default.response;
    chatMessages.appendChild(welcomeMessage);
    
    // Add suggested questions
    const suggestions = [
        'Kako da postavim budžet?',
        'Imam problem sa prijavom',
        'Saveti za investiranje'
    ];
    
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('suggestions-container');
    
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = suggestion;
        suggestionElement.onclick = () => sendMessage(suggestion);
        suggestionsContainer.appendChild(suggestionElement);
    });
    
    chatMessages.appendChild(suggestionsContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to close chat
function closeChatFunction() {
    if (!chatContainer) return;
    
    chatContainer.style.opacity = '0';
    chatContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        chatContainer.style.display = 'none';
        // Reset transform after hiding
        setTimeout(() => {
            chatContainer.style.transform = 'translateY(0)';
        }, 300);
    }, 300);
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChat();
});

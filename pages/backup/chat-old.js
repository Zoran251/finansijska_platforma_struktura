// Function to get response from knowledge base
function getKnowledgeBaseResponse(userMessage) {
    // Check if knowledge base is available
    if (typeof supportKB === 'undefined') {
        console.error('Support knowledge base not loaded!');
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Izvinjavam se, trenutno se sistem učitava. Molimo pokušajte ponovo za par sekundi ili nas kontaktirajte direktno putem e-maila na <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a>.`;
    }
      const message = userMessage.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    // Search through all categories in supportKB
    for (const category in supportKB) {
        for (const item of supportKB[category]) {
            let score = 0;
            
            // Check how many keywords match
            for (const keyword of item.keywords) {
                if (message.includes(keyword.toLowerCase())) {
                    score += 1;
                }
            }
            
            // Update best match if this is better
            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
        }
    }
    
    // Return best match or default response
    if (bestMatch && bestScore > 0) {
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>${bestMatch.response}`;
    } else {
        return `🤖 <strong>Golden Balance podrška:</strong><br><br>Hvala vam za vaše pitanje. Trenutno nemam specifičan odgovor na vaš upit, ali možete me kontaktirati direktno putem e-maila na <a href="mailto:zorandostica2@gmail.com" style="color: #D4AF37;">zorandostica2@gmail.com</a> ili pozivom na <a href="tel:+38765827710" style="color: #D4AF37;">+387 65 827 710</a>.<br><br>Možete pokušati sa pitanjima o:<br>• Registraciji i prijavljivanju<br>• Planiranju budžeta<br>• Štednji i investicijama<br>• Tehničkim problemima`;
    }
}

// Function to add welcome message when chat opens
function addWelcomeMessage() {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) {
        console.error('Chat messages container not found!');
        return;
    }
    
    // Check if welcome message already exists
    const existingWelcome = chatMessages.querySelector('.welcome-message');
    if (existingWelcome) {
        return; // Don't add duplicate welcome message
    }
    
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('chat-message', 'bot-message', 'welcome-message');
    welcomeMessage.innerHTML = `
        🌟 <strong>Dobrodošli u Golden Balance podršku!</strong><br><br>
        Ja sam vaš virtuelni asistent i tu sam da vam pomognem sa:<br>
        • 📝 Pitanjima o registraciji i nalogu<br>
        • 💰 Planiranjem budžeta i finansijama<br>
        • 🎯 Štednjom i finansijskim ciljevima<br>
        • 🔧 Tehničkim problemima<br><br>
        Kako vam mogu pomoći danas?
    `;
    
    // Add at the beginning of chat
    chatMessages.appendChild(welcomeMessage);
    
    // Scroll to bottom after adding welcome message
    setTimeout(() => {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const supportChat = document.getElementById('supportChat');
    const openSupport = document.getElementById('openSupport');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.querySelector('.send-message');
    // Updated selectors for preview.html structure
    const closeButton = document.querySelector('.chat-actions .btn:last-child');
    const minimizeButton = document.querySelector('.chat-actions .btn:first-child');

    // Function to scroll chat to bottom
    function scrollToBottom() {
        if (chatMessages) {
            // Use requestAnimationFrame for smoother scrolling
            requestAnimationFrame(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }
    }    // Toggle chat visibility
    if (openSupport) {
        console.log('Chat support button found, adding event listener');
        openSupport.addEventListener('click', () => {
            console.log('Chat support button clicked!');
            supportChat.classList.remove('collapsed');
            chatInput.focus();
            // Add welcome message when chat opens
            setTimeout(() => {
                console.log('Calling addWelcomeMessage...');
                addWelcomeMessage();
            }, 100);
            scrollToBottom(); // Scroll when opening chat
        });    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            supportChat.classList.add('collapsed');
        });
    }

    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            supportChat.classList.add('collapsed');
        });
    }

    // Handle sending messages
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessageElement = document.createElement('div');
            userMessageElement.classList.add('chat-message', 'user-message');
            userMessageElement.textContent = message;
            chatMessages.appendChild(userMessageElement);

            // Clear input and focus
            chatInput.value = '';
            chatInput.focus();            // Auto scroll to bottom
            scrollToBottom();

            // Get response from knowledge base
            setTimeout(() => {
                const botMessageElement = document.createElement('div');
                botMessageElement.classList.add('chat-message', 'bot-message');
                
                // Use knowledge base response function
                const botResponse = getKnowledgeBaseResponse(message);
                botMessageElement.innerHTML = botResponse; // Use innerHTML to support HTML formatting
                chatMessages.appendChild(botMessageElement);
                scrollToBottom();
            }, 1000);
        }
    }

    // Send message on button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Create a MutationObserver to watch for new messages and scroll to bottom
    const observer = new MutationObserver(() => {
        scrollToBottom();
    });

    // Start observing the chat messages container for changes
    if (chatMessages) {
        observer.observe(chatMessages, {            childList: true,
            subtree: true
        });
    }
    
    // Initial scroll to bottom
    scrollToBottom();
});

/**
 * AI Asistent - Pomoćne funkcije za integraciju
 * 
 * Ovaj modul obezbeđuje funkcije za lakšu integraciju AI asistenta
 * u druge stranice finansijske platforme.
 */

// Globalni objekat za integracione funkcije
const AIAssistantIntegration = (function() {
    "use strict";
    
    // Konfiguracija za integraciju
    const config = {
        scriptPath: '/AI_asistent/kb.js',
        chatScriptPath: '/AI_asistent/chat.js',
        cssPath: '/AI_asistent/chat.css',
        defaultContainerId: 'ai-assistant-container',
        baseUrl: './'
    };
    
    // Privatna funkcija za učitavanje skripti
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = function() {
            console.error('Greška prilikom učitavanja skripte:', src);
        };
        document.head.appendChild(script);
    }
    
    // Privatna funkcija za učitavanje CSS-a
    function loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    }
    
    // Privatna funkcija za kreiranje HTML strukture chat-a
    function createChatHTML(containerId) {
        const container = document.getElementById(containerId || config.defaultContainerId);
        if (!container) {
            console.error('Container element nije pronađen:', containerId || config.defaultContainerId);
            return false;
        }
        
        container.innerHTML = `
            <div class="chat-container">
                <div class="chat-header">
                    <img src="${config.baseUrl}assets/images/logo.png" alt="Logo" class="logo">
                    Golden Balance Finansijski Asistent
                </div>
                <div class="chat-messages">
                    <!-- Poruke će biti dinamički dodavane ovde -->
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" class="chat-input" placeholder="Postavite pitanje..." onkeypress="if(event.key === 'Enter') AIAssistantIntegration.sendMessage()">
                    <button class="chat-send-btn" onclick="AIAssistantIntegration.sendMessage()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        return true;
    }
    
    // Javni API
    return {
        // Inicijalizacija AI asistenta
        init: function(options = {}) {
            // Opcije za podešavanje
            if (options.baseUrl) config.baseUrl = options.baseUrl;
            if (options.containerId) config.defaultContainerId = options.containerId;
            
            // Učitaj CSS
            loadCSS(config.baseUrl + config.cssPath);
            
            // Učitaj KB.js
            loadScript(config.baseUrl + config.scriptPath, function() {
                console.log('KB script loaded successfully');
                
                // Učitaj chat.js
                loadScript(config.baseUrl + config.chatScriptPath, function() {
                    console.log('Chat script loaded successfully');
                    
                    // Kreiraj HTML za chat
                    if (createChatHTML(options.containerId)) {
                        // Inicijalizuj chat i dodaj pozdravnu poruku
                        window.chatFunctions.loadKnowledgeBase().then(function() {
                            setTimeout(function() {
                                const chatMessages = document.querySelector('.chat-messages');
                                if (chatMessages) {
                                    const messageDiv = document.createElement('div');
                                    messageDiv.className = 'chat-message bot-message';
                                    messageDiv.innerHTML = `🤖 <strong>Golden Balance podrška:</strong><br><br>${ChatBotKB.getGreeting()}`;
                                    chatMessages.appendChild(messageDiv);
                                }
                            }, 500);
                        });
                    }
                });
            });
        },
        
        // Funkcija za slanje poruke - wrapper za chatFunctions.sendMessage
        sendMessage: function() {
            if (window.chatFunctions && window.chatFunctions.sendMessage) {
                window.chatFunctions.sendMessage();
            } else {
                console.error('Chat funkcije nisu još učitane');
            }
        },
        
        // Funkcija za programsko slanje poruke
        sendProgrammaticMessage: function(message) {
            if (!message || typeof message !== 'string') {
                console.error('Invalid message format');
                return;
            }
            
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = message;
                this.sendMessage();
            }
        },
        
        // Funkcija za programsko dobijanje odgovora bez prikazivanja u chat-u
        getResponseOnly: function(message) {
            if (typeof ChatBotKB === 'undefined') {
                console.error('ChatBotKB API is not available');
                return null;
            }
            
            try {
                return ChatBotKB.getResponse(message);
            } catch (error) {
                console.error('Error getting response:', error);
                return null;
            }
        },
        
        // Funkcija za identifikaciju teme upita
        identifyTopic: function(message) {
            if (typeof ChatBotKB === 'undefined') {
                console.error('ChatBotKB API is not available');
                return null;
            }
            
            try {
                return ChatBotKB.identifyTopic(message);
            } catch (error) {
                console.error('Error identifying topic:', error);
                return null;
            }
        }
    };
})();

// Expose the API globally
window.AIAssistantIntegration = AIAssistantIntegration;

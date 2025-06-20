// Tehnička podrška - support.js
class TechnicalSupport {
    constructor() {
        this.tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
        this.chatMessages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.renderTickets();
        this.initChat();
        this.setupEventListeners();
    }

    // Support Ticket System
    createTicket(subject, description, priority = 'medium') {
        const ticket = {
            id: 'TIC-' + Date.now(),
            subject: subject,
            description: description,
            priority: priority,
            status: 'open',
            created: new Date().toISOString(),
            messages: []
        };

        this.tickets.unshift(ticket);
        this.saveTickets();
        this.renderTickets();
        return ticket;
    }

    renderTickets() {
        const container = document.getElementById('supportTickets');
        if (!container) return;

        if (this.tickets.length === 0) {
            container.innerHTML = `
                <div class="no-tickets">
                    <i class="fas fa-ticket-alt"></i>
                    <p>Nemate otvorene tikete</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.tickets.map(ticket => `
            <div class="support-ticket" data-id="${ticket.id}">
                <div class="ticket-header">
                    <div class="ticket-id">${ticket.id}</div>
                    <div class="ticket-status status-${ticket.status}">${this.getStatusText(ticket.status)}</div>
                </div>
                <div class="ticket-subject">${ticket.subject}</div>
                <div class="ticket-meta">
                    <span class="priority priority-${ticket.priority}">
                        <i class="fas fa-flag"></i> ${this.getPriorityText(ticket.priority)}
                    </span>
                    <span class="ticket-date">${this.formatDate(ticket.created)}</span>
                </div>
                <div class="ticket-actions">
                    <button class="btn-sm" onclick="support.viewTicket('${ticket.id}')">
                        <i class="fas fa-eye"></i> Prikaži
                    </button>
                    ${ticket.status === 'open' ? `
                        <button class="btn-sm btn-danger" onclick="support.closeTicket('${ticket.id}')">
                            <i class="fas fa-times"></i> Zatvori
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'open': 'Otvoren',
            'in-progress': 'U radu',
            'closed': 'Zatvoren',
            'resolved': 'Rešen'
        };
        return statusMap[status] || status;
    }

    getPriorityText(priority) {
        const priorityMap = {
            'low': 'Niska',
            'medium': 'Srednja',
            'high': 'Visoka',
            'urgent': 'Hitno'
        };
        return priorityMap[priority] || priority;
    }

    viewTicket(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const modal = this.createTicketModal(ticket);
        document.body.appendChild(modal);
    }

    createTicketModal(ticket) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal ticket-modal">
                <div class="modal-header">
                    <h3>Tiket ${ticket.id}</h3>
                    <button class="btn-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="ticket-details">
                        <div class="ticket-info">
                            <div class="info-row">
                                <label>Naslov:</label>
                                <span>${ticket.subject}</span>
                            </div>
                            <div class="info-row">
                                <label>Status:</label>
                                <span class="status-${ticket.status}">${this.getStatusText(ticket.status)}</span>
                            </div>
                            <div class="info-row">
                                <label>Prioritet:</label>
                                <span class="priority-${ticket.priority}">${this.getPriorityText(ticket.priority)}</span>
                            </div>
                            <div class="info-row">
                                <label>Kreiran:</label>
                                <span>${this.formatDate(ticket.created)}</span>
                            </div>
                        </div>
                        <div class="ticket-description">
                            <h4>Opis problema:</h4>
                            <p>${ticket.description}</p>
                        </div>
                        <div class="ticket-messages">
                            <h4>Poruke:</h4>
                            <div class="messages-list">
                                ${ticket.messages.length === 0 ? 
                                    '<p class="no-messages">Nema poruka</p>' :
                                    ticket.messages.map(msg => `
                                        <div class="message-item ${msg.isStaff ? 'staff-message' : 'user-message'}">
                                            <div class="message-header">
                                                <strong>${msg.isStaff ? 'Podrška' : 'Vi'}</strong>
                                                <span class="message-time">${this.formatDate(msg.timestamp)}</span>
                                            </div>
                                            <div class="message-content">${msg.content}</div>
                                        </div>
                                    `).join('')
                                }
                            </div>
                            ${ticket.status === 'open' ? `
                                <div class="message-form">
                                    <textarea 
                                        id="newMessage-${ticket.id}" 
                                        placeholder="Unesite vašu poruku..."
                                        rows="3"
                                    ></textarea>
                                    <button class="btn" onclick="support.addMessage('${ticket.id}')">
                                        Pošalji poruku
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    addMessage(ticketId) {
        const textarea = document.getElementById(`newMessage-${ticketId}`);
        const content = textarea.value.trim();
        
        if (!content) return;

        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const message = {
            id: Date.now(),
            content: content,
            timestamp: new Date().toISOString(),
            isStaff: false
        };

        ticket.messages.push(message);
        this.saveTickets();

        // Simulate staff response after 2 seconds
        setTimeout(() => {
            const staffResponse = {
                id: Date.now() + 1,
                content: "Hvala vam na poruci. Naš tim će preuzeti slučaj i kontaktirati vas uskoro.",
                timestamp: new Date().toISOString(),
                isStaff: true
            };
            ticket.messages.push(staffResponse);
            this.saveTickets();
        }, 2000);

        // Close modal and refresh
        document.querySelector('.modal-overlay').remove();
        this.viewTicket(ticketId);
    }

    closeTicket(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.status = 'closed';
            this.saveTickets();
            this.renderTickets();
        }
    }

    // Live Chat System
    initChat() {
        this.chatMessages = [
            {
                id: 1,
                content: "Dobrodošli u tehničku podršku! Kako vam možemo pomoći danas?",
                isStaff: true,
                timestamp: new Date().toISOString()
            }
        ];
        this.renderChatMessages();
    }

    renderChatMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = this.chatMessages.map(msg => `
            <div class="chat-message ${msg.isStaff ? 'staff-message' : 'user-message'}">
                <div class="message-avatar">
                    <i class="fas ${msg.isStaff ? 'fa-headset' : 'fa-user'}"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${msg.content}</div>
                    <div class="message-time">${this.formatTime(msg.timestamp)}</div>
                </div>
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const content = input.value.trim();
        
        if (!content) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            content: content,
            isStaff: false,
            timestamp: new Date().toISOString()
        };

        this.chatMessages.push(userMessage);
        input.value = '';
        this.renderChatMessages();

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate staff response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(content);
            const staffMessage = {
                id: Date.now() + 1,
                content: response,
                isStaff: true,
                timestamp: new Date().toISOString()
            };
            this.chatMessages.push(staffMessage);
            this.renderChatMessages();
        }, Math.random() * 2000 + 1000);
    }

    showTypingIndicator() {
        const container = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'chat-message staff-message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-headset"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    generateResponse(userMessage) {
        const responses = {
            'login': 'Za probleme sa prijavom, molimo resetujte vašu lozinku kroz link "Zaboravili ste lozinku?"',
            'password': 'Za resetovanje lozinke, kliknite na "Zaboravili ste lozinku?" na stranici za prijavu.',
            'error': 'Molimo vas da opišete grešku detaljnije. Možete mi poslati i screenshot ako je moguće.',
            'account': 'Za probleme sa nalogom, molimo kontaktirajte nas preko support@goldenbalance.rs',
            'payment': 'Za pitanja o plaćanju, molimo proverite sekciju "Billing" u vašem profilu.',
            'default': 'Hvala vam na pitanju. Naš tim će vam odgovoriti uskoro. Da li možete da opišete problem detaljnije?'
        };

        const message = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    // FAQ System
    renderFAQ() {
        const faqData = [
            {
                question: "Kako da resetujem lozinku?",
                answer: "Kliknite na 'Zaboravili ste lozinku?' na stranici za prijavu i sledite instrukcije."
            },
            {
                question: "Kako da promenim svoju email adresu?",
                answer: "Idite u Profil → Podešavanja → Lične informacije i ažurirajte vašu email adresu."
            },
            {
                question: "Da li je moj novac siguran?",
                answer: "Da, koristimo bank-level enkripciju i partneri smo sa licenciranim finansijskim institucijama."
            },
            {
                question: "Kako da kontaktiram podršku?",
                answer: "Možete nas kontaktirati preko live chat-a, email-a ili kreiranjem support tiketa."
            },
            {
                question: "Koliko košta korišćenje aplikacije?",
                answer: "Osnovno korišćenje je besplatno. Premium funkcije su dostupne za 9.99€ mesečno."
            }
        ];

        const container = document.getElementById('faqContainer');
        if (!container) return;

        container.innerHTML = faqData.map((item, index) => `
            <div class="faq-item">
                <div class="faq-question" onclick="support.toggleFAQ(${index})">
                    <span>${item.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="faq-${index}">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }

    toggleFAQ(index) {
        const answer = document.getElementById(`faq-${index}`);
        const question = answer.previousElementSibling;
        const icon = question.querySelector('i');
        
        answer.classList.toggle('active');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }

    // Utility methods
    saveTickets() {
        localStorage.setItem('supportTickets', JSON.stringify(this.tickets));
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('sr-RS', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatTime(dateString) {
        return new Date(dateString).toLocaleTimeString('sr-RS', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    setupEventListeners() {
        // Chat input enter key
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }

        // Support form submission
        const supportForm = document.getElementById('supportForm');
        if (supportForm) {
            supportForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const subject = document.getElementById('ticketSubject').value;
                const description = document.getElementById('ticketDescription').value;
                const priority = document.getElementById('ticketPriority').value;
                
                if (subject && description) {
                    this.createTicket(subject, description, priority);
                    supportForm.reset();
                    alert('Tiket je uspešno kreiran!');
                }
            });
        }
    }
}

// Initialize support system
const support = new TechnicalSupport();

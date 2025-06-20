// Zakazivanje konsultacija - booking.js
class ConsultationBooking {
    constructor() {        this.consultant = {
            id: 1,
            name: "Zoran Dostić",
            title: "Certificirani finansijski konsultant",
            specialty: "Besplatne finansijske konsultacije",
            description: "Stručni savet za upravljanje ličnim finansijama, investicije, štednju i finansijsko planiranje",
            experience: "10+ godina iskustva u finansijskom savetovanju",
            avatar: "https://via.placeholder.com/100/D4AF37/FFFFFF?text=ZD",
            zoomLink: "https://us05web.zoom.us/j/5031740065?pwd=VYHmLjM3CGXI4WxXgD8TOdC4mNuDLX.1",
            email: "zorandostica2@gmail.com",
            phone: "+381 XX XXX XXXX",
            availability: this.generateAvailability()
        };this.selectedConsultant = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.userInfo = {};
        this.init();
    }

    generateAvailability() {
        const availability = {};
        const today = new Date();
        
        // Generiši dostupnost za narednih 14 dana
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            
            // Preskoči vikende
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                const dateStr = date.toISOString().split('T')[0];
                availability[dateStr] = [
                    "09:00", "10:00", "11:00", "12:00", 
                    "14:00", "15:00", "16:00", "17:00"
                ];
            }
        }
        
        return availability;
    }

    init() {
        this.renderConsultants();
        this.setupEventListeners();
    }    renderConsultants() {
        const container = document.getElementById('consultantsContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="consultant-profile">
                <div class="consultant-header">
                    <div class="consultant-avatar">
                        <img src="${this.consultant.avatar}" alt="${this.consultant.name}" />
                    </div>
                    <div class="consultant-details">
                        <h2>${this.consultant.name}</h2>
                        <p class="title">${this.consultant.title}</p>
                        <p class="specialty">${this.consultant.specialty}</p>
                        <p class="description">${this.consultant.description}</p>
                        <p class="experience"><i class="fas fa-medal"></i> ${this.consultant.experience}</p>
                    </div>
                </div>
                
                <div class="consultation-info">
                    <div class="info-card">
                        <i class="fas fa-video"></i>
                        <h3>Video konsultacije</h3>
                        <p>Bezbedne online konsultacije putem Zoom platforme</p>
                    </div>
                    <div class="info-card">
                        <i class="fas fa-clock"></i>
                        <h3>Fleksibilno vreme</h3>
                        <p>Termini dostupni radnim danima od 9:00 do 17:00</p>
                    </div>
                    <div class="info-card">
                        <i class="fas fa-gift"></i>
                        <h3>Potpuno besplatno</h3>
                        <p>Sve konsultacije su besplatne za korisnike platforme</p>
                    </div>
                </div>
                
                <div class="booking-form">
                    <h3>Zakažite vašu besplatnu konsultaciju</h3>
                    <form id="consultationForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="userName">Ime i prezime *</label>
                                <input type="text" id="userName" required>
                            </div>
                            <div class="form-group">
                                <label for="userEmail">Email adresa *</label>
                                <input type="email" id="userEmail" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="userPhone">Broj telefona</label>
                                <input type="tel" id="userPhone">
                            </div>
                            <div class="form-group">
                                <label for="consultationType">Tip konsultacije *</label>
                                <select id="consultationType" required>
                                    <option value="">Izaberite tip konsultacije</option>
                                    <option value="general">Opšte finansijsko savetovanje</option>
                                    <option value="budgeting">Upravljanje budžetom</option>
                                    <option value="savings">Planiranje štednje</option>
                                    <option value="investments">Investicije i portfolio</option>
                                    <option value="debt">Upravljanje dugovima</option>
                                    <option value="retirement">Penziono planiranje</option>
                                    <option value="taxes">Poresko savetovanje</option>
                                    <option value="insurance">Osiguranje</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="consultationMessage">Opišite vašu situaciju i pitanja</label>
                            <textarea id="consultationMessage" rows="4" placeholder="Ukratko opišite vašu finansijsku situaciju i na čemu biste želeli da radite tokom konsultacije..."></textarea>
                        </div>
                        
                        <button type="button" class="btn btn-primary btn-large" onclick="booking.proceedToScheduling()">
                            <i class="fas fa-calendar-plus"></i>
                            Nastavi na izbor termina
                        </button>
                    </form>
                </div>
            </div>
        `;
    }    proceedToScheduling() {
        // Validacija forme
        const form = document.getElementById('consultationForm');
        const formData = new FormData(form);
        
        const userName = document.getElementById('userName').value.trim();
        const userEmail = document.getElementById('userEmail').value.trim();
        const consultationType = document.getElementById('consultationType').value;
        
        if (!userName || !userEmail || !consultationType) {
            alert('Molimo unesite sva obavezna polja označena sa *');
            return;
        }
        
        // Email validacija
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            alert('Molimo unesite validnu email adresu');
            return;
        }
        
        // Sačuvaj korisničke podatke
        this.userInfo = {
            name: userName,
            email: userEmail,
            phone: document.getElementById('userPhone').value.trim(),
            consultationType: consultationType,
            message: document.getElementById('consultationMessage').value.trim(),
            submittedAt: new Date().toISOString()
        };
          // Prikaži kalendar
        this.showCalendarStep();
    }

    renderStars(rating) {
        // Ova metoda više nije potrebna, ali je ostavljam za kompatibilnost
        return '';
    }

    selectConsultant(consultantId) {
        // Ova metoda više nije potrebna jer imamo samo jednog konsultanta
        this.selectedConsultant = this.consultant;
        this.showCalendarStep();
    }

    // Utility method for smooth scrolling
    smoothScrollToElement(element, offset = 0) {
        if (!element) return;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }showCalendarStep() {
        const calendarContainer = document.getElementById('calendarContainer');
        if (!calendarContainer) return;

        const availability = this.consultant.availability;
        const dates = Object.keys(availability);

        calendarContainer.innerHTML = `
            <div class="scheduling-header">
                <h3><i class="fas fa-calendar-alt"></i> Izaberite datum i vreme</h3>
                <p>Konsultant: <strong>${this.consultant.name}</strong></p>
                <p>Tip: <strong>${this.getConsultationTypeText(this.userInfo.consultationType)}</strong></p>
            </div>
            
            <div class="calendar-dates">
                ${dates.map(date => `
                    <div class="date-option" data-date="${date}" onclick="booking.selectDate('${date}')">
                        <div class="date-day">${this.formatDate(date)}</div>
                        <div class="available-slots">${availability[date].length} termina dostupno</div>
                    </div>
                `).join('')}
            </div>
            
            <div id="timeContainer" class="time-container" style="display: none;">
                <h4>Dostupni termini</h4>
                <div id="timeSlots" class="time-slots"></div>
            </div>
            
            <div id="confirmContainer" class="confirm-container" style="display: none;">
                <div class="booking-summary">
                    <h3><i class="fas fa-check-circle"></i> Potvrda rezervacije</h3>
                    <div class="summary-details">
                        <div class="summary-section">
                            <h4>Podaci o konsultaciji</h4>
                            <p><strong>Konsultant:</strong> ${this.consultant.name}</p>
                            <p><strong>Tip konsultacije:</strong> ${this.getConsultationTypeText(this.userInfo.consultationType)}</p>
                            <p><strong>Datum:</strong> <span id="selectedDateText"></span></p>
                            <p><strong>Vreme:</strong> <span id="selectedTimeText"></span></p>
                            <p><strong>Trajanje:</strong> 45 minuta</p>
                            <p><strong>Cena:</strong> <span class="free-label">BESPLATNO</span></p>
                        </div>
                        
                        <div class="summary-section">
                            <h4>Vaši podaci</h4>
                            <p><strong>Ime:</strong> ${this.userInfo.name}</p>
                            <p><strong>Email:</strong> ${this.userInfo.email}</p>
                            ${this.userInfo.phone ? `<p><strong>Telefon:</strong> ${this.userInfo.phone}</p>` : ''}
                        </div>
                        
                        ${this.userInfo.message ? `
                        <div class="summary-section">
                            <h4>Vaša poruka</h4>
                            <p>${this.userInfo.message}</p>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="confirmation-actions">
                        <button class="btn btn-secondary" onclick="booking.resetForm()">
                            <i class="fas fa-arrow-left"></i> Nazad
                        </button>
                        <button class="btn btn-primary btn-large" onclick="booking.confirmBooking()">
                            <i class="fas fa-calendar-check"></i> Potvrdi rezervaciju
                        </button>
                    </div>
                </div>
            </div>
        `;        calendarContainer.style.display = 'block';
        
        // Smooth scroll to calendar with some delay to ensure rendering
        setTimeout(() => {
            this.smoothScrollToElement(calendarContainer, 100);
        }, 100);
    }

    getConsultationTypeText(type) {
        const types = {
            'general': 'Opšte finansijsko savetovanje',
            'budgeting': 'Upravljanje budžetom',
            'savings': 'Planiranje štednje',
            'investments': 'Investicije i portfolio',
            'debt': 'Upravljanje dugovima',
            'retirement': 'Penziono planiranje',
            'taxes': 'Poresko savetovanje',
            'insurance': 'Osiguranje'
        };
        return types[type] || type;
    }

    selectDate(date) {
        this.selectedDate = date;
        
        // Update UI
        document.querySelectorAll('.date-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-date="${date}"]`).classList.add('selected');
        
        // Show time slots
        this.showTimeSlots();
    }    showTimeSlots() {
        const timeContainer = document.getElementById('timeContainer');
        const timeSlots = document.getElementById('timeSlots');
        
        const availableTimes = this.consultant.availability[this.selectedDate];
        
        timeSlots.innerHTML = availableTimes.map(time => `
            <div class="time-slot" data-time="${time}" onclick="booking.selectTime('${time}')">
                <i class="fas fa-clock"></i>
                <span>${time}</span>
                <small>45 min</small>
            </div>
        `).join('');
          timeContainer.style.display = 'block';
        
        // Smooth scroll to time slots with some delay
        setTimeout(() => {
            this.smoothScrollToElement(timeContainer, 100);
        }, 100);
    }

    selectTime(time) {
        this.selectedTime = time;
        
        // Update UI
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        document.querySelector(`[data-time="${time}"]`).classList.add('selected');
        
        // Show confirmation
        this.showConfirmation();
    }    showConfirmation() {
        const confirmContainer = document.getElementById('confirmContainer');
        document.getElementById('selectedDateText').textContent = this.formatDate(this.selectedDate);
        document.getElementById('selectedTimeText').textContent = this.selectedTime;
          confirmContainer.style.display = 'block';
        
        // Smooth scroll to confirmation with some delay
        setTimeout(() => {
            this.smoothScrollToElement(confirmContainer, 100);
        }, 100);
    }    confirmBooking() {
        // Kreiraj potpunu rezervaciju sa svim podacima
        const bookingData = {
            id: 'CONS-' + Date.now(),
            consultant: this.consultant,
            userInfo: this.userInfo,
            date: this.selectedDate,
            time: this.selectedTime,
            status: 'pending', // pending, confirmed, cancelled
            zoomLink: this.consultant.zoomLink,
            createdAt: new Date().toISOString(),
            confirmedAt: null,
            notes: ''
        };

        // Sačuvaj rezervaciju u localStorage za admin panel
        const existingBookings = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        existingBookings.push(bookingData);
        localStorage.setItem('consultationBookings', JSON.stringify(existingBookings));

        // Kreiraj notifikaciju za korisnika
        this.createUserNotification(bookingData);

        // Prikaži poruku o uspešnoj rezervaciji
        this.showSuccessMessage(bookingData);
        
        // Reset form
        this.resetForm();
    }

    createUserNotification(bookingData) {
        const notifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
        
        const notification = {
            id: 'NOTIF-' + Date.now(),
            type: 'consultation_pending',
            title: 'Konsultacija zakazana',
            message: `Vaša konsultacija je uspešno zakazana za ${this.formatDate(bookingData.date)} u ${bookingData.time}. Čeka se potvrda od strane konsultanta.`,
            bookingId: bookingData.id,
            read: false,
            createdAt: new Date().toISOString()
        };
        
        notifications.unshift(notification);
        localStorage.setItem('userNotifications', JSON.stringify(notifications));
    }    showSuccessMessage(bookingData) {
        const successMessage = document.createElement('div');
        successMessage.className = 'booking-success-overlay';
        successMessage.innerHTML = `
            <div class="booking-success">
                <div class="success-content">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Konsultacija uspešno zakazana!</h2>
                    
                    <div class="success-details">
                        <div class="detail-row">
                            <span class="label">ID rezervacije:</span>
                            <span class="value">${bookingData.id}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Datum i vreme:</span>
                            <span class="value">${this.formatDate(bookingData.date)} u ${bookingData.time}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Konsultant:</span>
                            <span class="value">${bookingData.consultant.name}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Tip:</span>
                            <span class="value">${this.getConsultationTypeText(bookingData.userInfo.consultationType)}</span>
                        </div>
                    </div>
                    
                    <div class="success-info">
                        <div class="info-box">
                            <i class="fas fa-info-circle"></i>
                            <div>
                                <h4>Šta je sledeće?</h4>
                                <p>Konsultant će potvrditi vašu rezervaciju u roku od 24 sata. Nakon potvrde, dobićete email sa Zoom linkom za pristup konsultaciji.</p>
                            </div>
                        </div>
                        
                        <div class="info-box">
                            <i class="fas fa-bell"></i>
                            <div>
                                <h4>Notifikacije</h4>
                                <p>Proverite notifikacije u vašem profilu za ažuriranja o statusu konsultacije.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="success-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.booking-success-overlay').remove()">
                            <i class="fas fa-times"></i> Zatvori
                        </button>
                        <a href="profile.html#notifications" class="btn btn-primary">
                            <i class="fas fa-bell"></i> Vidi notifikacije
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 10000);
    }    resetForm() {
        this.selectedConsultant = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.userInfo = {};
        
        // Resetuj formu
        const form = document.getElementById('consultationForm');
        if (form) form.reset();
        
        // Sakrij kalendar
        const calendarContainer = document.getElementById('calendarContainer');
        if (calendarContainer) {
            calendarContainer.style.display = 'none';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    setupEventListeners() {
        // Add any additional event listeners here
    }
}

// Initialize booking system
const booking = new ConsultationBooking();

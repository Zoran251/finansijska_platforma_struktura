// Zakazivanje konsultacija - booking.js
class ConsultationBooking {
    constructor() {
        this.consultants = [
            {
                id: 1,
                name: "Dr. Ana Milić",
                specialty: "Investicioni savetnik",
                price: "50€/sat",
                rating: 4.9,
                avatar: "https://via.placeholder.com/64/D4AF37/FFFFFF?text=AM",
                availability: {
                    "2025-06-21": ["09:00", "10:00", "11:00", "14:00", "15:00"],
                    "2025-06-22": ["09:00", "10:00", "13:00", "14:00"],
                    "2025-06-23": ["10:00", "11:00", "15:00", "16:00"],
                }
            },
            {
                id: 2,
                name: "Prof. Marko Jovanović",
                specialty: "Finansijski planer",
                price: "60€/sat",
                rating: 4.8,
                avatar: "https://via.placeholder.com/64/D4AF37/FFFFFF?text=MJ",
                availability: {
                    "2025-06-21": ["11:00", "12:00", "15:00", "16:00"],
                    "2025-06-22": ["09:00", "10:00", "14:00", "15:00"],
                    "2025-06-23": ["09:00", "11:00", "13:00", "14:00"],
                }
            },
            {
                id: 3,
                name: "Jelena Nikolić",
                specialty: "Poresko savetovanje",
                price: "45€/sat",
                rating: 4.7,
                avatar: "https://via.placeholder.com/64/D4AF37/FFFFFF?text=JN",
                availability: {
                    "2025-06-21": ["10:00", "11:00", "13:00", "16:00"],
                    "2025-06-22": ["11:00", "12:00", "15:00", "16:00"],
                    "2025-06-23": ["09:00", "10:00", "14:00", "15:00"],
                }
            }
        ];
        this.selectedConsultant = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.init();
    }

    init() {
        this.renderConsultants();
        this.setupEventListeners();
    }

    renderConsultants() {
        const container = document.getElementById('consultantsContainer');
        if (!container) return;

        container.innerHTML = this.consultants.map(consultant => `
            <div class="consultant-card" data-id="${consultant.id}">
                <div class="consultant-avatar">
                    <img src="${consultant.avatar}" alt="${consultant.name}" />
                </div>
                <div class="consultant-info">
                    <h3>${consultant.name}</h3>
                    <p class="specialty">${consultant.specialty}</p>
                    <div class="rating">
                        ${this.renderStars(consultant.rating)}
                        <span>${consultant.rating}</span>
                    </div>
                    <div class="price">${consultant.price}</div>
                </div>
                <button class="btn-select" onclick="booking.selectConsultant(${consultant.id})">
                    Izaberi
                </button>
            </div>
        `).join('');
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    selectConsultant(consultantId) {
        this.selectedConsultant = this.consultants.find(c => c.id === consultantId);
        
        // Update UI
        document.querySelectorAll('.consultant-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-id="${consultantId}"]`).classList.add('selected');
        
        // Show calendar step
        this.showCalendarStep();
    }

    showCalendarStep() {
        const calendarContainer = document.getElementById('calendarContainer');
        if (!calendarContainer) return;

        const availability = this.selectedConsultant.availability;
        const dates = Object.keys(availability);

        calendarContainer.innerHTML = `
            <h3>Izaberite datum</h3>
            <div class="calendar-dates">
                ${dates.map(date => `
                    <div class="date-option" data-date="${date}" onclick="booking.selectDate('${date}')">
                        <div class="date-day">${this.formatDate(date)}</div>
                        <div class="available-slots">${availability[date].length} termina</div>
                    </div>
                `).join('')}
            </div>
            <div id="timeContainer" class="time-container" style="display: none;">
                <h3>Izaberite vreme</h3>
                <div id="timeSlots" class="time-slots"></div>
            </div>
            <div id="confirmContainer" class="confirm-container" style="display: none;">
                <div class="booking-summary">
                    <h3>Potvrda rezervacije</h3>
                    <div class="summary-details">
                        <p><strong>Konsultant:</strong> ${this.selectedConsultant.name}</p>
                        <p><strong>Datum:</strong> <span id="selectedDateText"></span></p>
                        <p><strong>Vreme:</strong> <span id="selectedTimeText"></span></p>
                        <p><strong>Cena:</strong> ${this.selectedConsultant.price}</p>
                    </div>
                    <button class="btn btn-primary" onclick="booking.confirmBooking()">
                        Potvrdi rezervaciju
                    </button>
                </div>
            </div>
        `;

        calendarContainer.style.display = 'block';
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
    }

    showTimeSlots() {
        const timeContainer = document.getElementById('timeContainer');
        const timeSlots = document.getElementById('timeSlots');
        
        const availableTimes = this.selectedConsultant.availability[this.selectedDate];
        
        timeSlots.innerHTML = availableTimes.map(time => `
            <div class="time-slot" data-time="${time}" onclick="booking.selectTime('${time}')">
                ${time}
            </div>
        `).join('');
        
        timeContainer.style.display = 'block';
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
    }

    showConfirmation() {
        const confirmContainer = document.getElementById('confirmContainer');
        document.getElementById('selectedDateText').textContent = this.formatDate(this.selectedDate);
        document.getElementById('selectedTimeText').textContent = this.selectedTime;
        
        confirmContainer.style.display = 'block';
    }

    confirmBooking() {
        // Simulate booking confirmation
        const bookingData = {
            consultant: this.selectedConsultant,
            date: this.selectedDate,
            time: this.selectedTime,
            id: 'BOOK-' + Date.now()
        };

        // Store booking (in real app, this would be sent to server)
        const existingBookings = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        existingBookings.push(bookingData);
        localStorage.setItem('consultationBookings', JSON.stringify(existingBookings));

        // Show success message
        this.showSuccessMessage(bookingData.id);
        
        // Reset form
        this.resetForm();
    }

    showSuccessMessage(bookingId) {
        const successMessage = document.createElement('div');
        successMessage.className = 'booking-success';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Rezervacija uspešna!</h3>
                <p>Vaš ID rezervacije: <strong>${bookingId}</strong></p>
                <p>Detalji su poslati na vašu email adresu.</p>
                <button class="btn" onclick="this.parentElement.parentElement.remove()">
                    U redu
                </button>
            </div>
        `;
        
        document.body.appendChild(successMessage);
    }

    resetForm() {
        this.selectedConsultant = null;
        this.selectedDate = null;
        this.selectedTime = null;
        
        document.getElementById('calendarContainer').style.display = 'none';
        document.querySelectorAll('.consultant-card').forEach(card => {
            card.classList.remove('selected');
        });
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

// Funkcija za proveru dostupnosti termina
function isTimeSlotAvailable(selectedDateTime) {
    // Učitaj zakazane sastanke iz localStorage
    const appointments = JSON.parse(localStorage.getItem('consultationAppointments') || '[]');
    
    // Proveri da li već postoji termin u istom vremenskom slotu
    return !appointments.some(appointment => {
        const appointmentTime = new Date(appointment.dateTime).getTime();
        const selectedTime = new Date(selectedDateTime).getTime();
        const timeDiff = Math.abs(selectedTime - appointmentTime);
        const diffHours = timeDiff / (1000 * 60 * 60);
        
        // Ako je razlaka manja od 1.5 sata, smatra se da je termin zauzet
        return diffHours < 1.5;
    });
}

// Funkcija za slanje obaveštenja na email
async function sendEmailNotification(formData) {
    // Ovo je samo simulacija - u stvarnoj implementaciji bi se koristio email servis
    console.log('Slanje email obaveštenja:', formData);
    
    // Simulacija uspešnog slanja
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email uspešno poslat na:', 'zorandostica2@gmail.com');
            resolve(true);
        }, 1000);
    });
}

// Funkcija za čuvanje podataka o konsultaciji
function saveConsultationData(formData) {
    // Učitaj postojeće podatke ili kreiraj novi niz ako ne postoje
    const appointments = JSON.parse(localStorage.getItem('consultationAppointments') || '[]');
    
    // Kreiraj ID za konsultaciju
    const consultationId = Date.now().toString();
    
    // Dodaj novu konsultaciju
    const newAppointment = {
        id: consultationId,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    
    // Sačuvaj u localStorage
    localStorage.setItem('consultationAppointments', JSON.stringify(appointments));
    
    // Dodaj notifikaciju za admina
    addAdminNotification(newAppointment);
    
    // Dodaj notifikaciju za korisnika
    addUserNotification(newAppointment);
    
    return true;
}

// Funkcija za dodavanje notifikacije za admina
function addAdminNotification(appointment) {
    const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    
    const notification = {
        id: `consultation_${appointment.id}`,
        type: 'consultation_request',
        title: 'Nova konsultacija zakazana',
        message: `${appointment.name} je zakazao konsultaciju za ${new Date(appointment.dateTime).toLocaleString('sr-RS')}`,
        timestamp: new Date().toISOString(),
        read: false,
        data: {
            consultationId: appointment.id,
            clientName: appointment.name,
            clientEmail: appointment.email,
            dateTime: appointment.dateTime,
            topic: appointment.topic
        }
    };
    
    notifications.unshift(notification);
    localStorage.setItem('admin_notifications', JSON.stringify(notifications));
}

// Funkcija za dodavanje notifikacije za korisnika
function addUserNotification(appointment) {
    const notifications = JSON.parse(localStorage.getItem('user_notifications') || '[]');
    
    const notification = {
        id: `consultation_user_${appointment.id}`,
        type: 'consultation_pending',
        title: 'Konsultacija zakazana',
        message: `Vaša konsultacija je zakazana za ${new Date(appointment.dateTime).toLocaleString('sr-RS')}. Čeka se potvrda admina.`,
        timestamp: new Date().toISOString(),
        read: false,
        data: {
            consultationId: appointment.id,
            dateTime: appointment.dateTime,
            status: 'pending'
        }
    };
    
    notifications.unshift(notification);
    localStorage.setItem('user_notifications', JSON.stringify(notifications));
}
    
    // Vraćamo true ako je uspešno sačuvano
    return true;
}

// Funkcija za validaciju i slanje forme
async function submitConsultationForm(event) {
    event.preventDefault();
    
    // Referenca na elemente forme
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    // Resetuj poruke
    formSuccess.classList.add('d-none');
    formError.classList.add('d-none');
    
    // Prikazi loader na dugmetu
    const submitBtn = document.querySelector('#consultationForm button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obrađujem zahtev...';
    
    try {
        // Prikupi podatke iz forme
        const formData = {
            name: document.getElementById('clientName').value.trim(),
            email: document.getElementById('clientEmail').value.trim(),
            location: document.getElementById('location').value,
            topic: document.getElementById('consultationTopic').value,
            dateTime: document.getElementById('consultationDate').value,
            description: document.getElementById('description').value.trim(),
            status: 'pending'
        };
        
        // Proveri da li je datum u budućnosti
        const selectedDate = new Date(formData.dateTime);
        const now = new Date();
        if (selectedDate <= now) {
            throw new Error('Termin mora biti zakazan najmanje 1 sat unapred.');
        }
        
        // Proveri da li je radni dan (ponedeljak-petak)
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error('Termin mora biti zakazan u radnim danima (ponedeljak-petak).');
        }
        
        // Proveri da li je radno vreme (9:00-17:00)
        const hours = selectedDate.getHours();
        if (hours < 9 || hours >= 17) {
            throw new Error('Termin mora biti između 09:00 i 17:00 časova.');
        }
        
        // Proveri da li je obezbeđena država
        if (!formData.location) {
            throw new Error('Molimo izaberite državu.');
        }
        
        // Proveri da li je obezbeđena tema konsultacije
        if (!formData.topic) {
            throw new Error('Molimo izaberite temu konsultacije.');
        }
        
        // Sačuvaj podatke
        const saved = saveConsultationData(formData);
        if (!saved) {
            throw new Error('Došlo je do greške prilikom čuvanja podataka. Molimo pokušajte ponovo.');
        }
        
        // Pošalji email obaveštenje
        const emailSent = await sendEmailNotification(formData);
        
        if (emailSent) {
            // Obrišemo podatke forme iz localStorage
            document.querySelectorAll('#consultationForm input, #consultationForm select, #consultationForm textarea').forEach(input => {
                localStorage.removeItem('consultation_' + input.id);
            });
            
            // Prikaži poruku o uspehu
            const successDiv = formSuccess.querySelector('.success-message');
            if (successDiv) {
                successDiv.innerHTML = `
                    <p class="mb-1 fs-1-1rem fw-600">Konsultacija je uspešno zakazana!</p>
                    <p class="mb-1">📅 Termin: <strong>${new Date(formData.dateTime).toLocaleString('sr-RS', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</strong></p>
                    <p class="mb-1">📧 Potvrda je poslata na: <strong>${formData.email}</strong></p>
                    <p class="mb-0 color-666 fs-0-9rem">Kontaktiraćemo vas 24h unapred za potvrdu termina.</p>
                `;
            } else {
                formSuccess.innerHTML = `
                    <div class="success-message">
                        <p class="mb-1 fs-1-1rem fw-600">Konsultacija je uspešno zakazana!</p>
                        <p class="mb-1">📅 Termin: <strong>${new Date(formData.dateTime).toLocaleString('sr-RS')}</strong></p>
                        <p class="mb-1">📧 Potvrda je poslata na: <strong>${formData.email}</strong></p>
                        <p class="mb-0 color-666 fs-0-9rem">Kontaktiraćemo vas 24h unapred za potvrdu termina.</p>
                    </div>
                `;
            }
            formSuccess.classList.remove('d-none');
            
            // Resetuj formu nakon 5 sekundi
            setTimeout(() => {
                document.getElementById('consultationForm').reset();
                formSuccess.classList.add('d-none');
                closeModal();
            }, 5000);
        } else {
            throw new Error('Došlo je do greške prilikom slanja obaveštenja. Molimo kontaktirajte nas direktno.');
        }
    } catch (error) {
        // Prikaži grešku
        const errorDiv = formError.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.innerHTML = `<p class="mb-0">${error.message || 'Došlo je do greške prilikom slanja zahteva. Molimo pokušajte ponovo.'}</p>`;
        } else {
            formError.innerHTML = `
                <div class="error-message">
                    <p class="mb-0">${error.message || 'Došlo je do greške prilikom slanja zahteva. Molimo pokušajte ponovo.'}</p>
                </div>
            `;
        }
        formError.classList.remove('d-none');
    } finally {
        // Vrati dugme u prvobitno stanje
        submitBtn.innerHTML = originalBtnText;
    }
}

// ========================== ADMIN FUNKCIJE ZA KONSULTACIJE ==========================

// Funkcija za učitavanje svih zakazanih konsultacija iz localStorage-a
function loadAllConsultations() {
    try {
        const appointments = JSON.parse(localStorage.getItem('consultationAppointments') || '[]');
        return appointments.sort((a, b) => {
            // Sortiranje po datumu (najnoviji prvi)
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    } catch (error) {
        console.error('Greška pri učitavanju konsultacija:', error);
        return [];
    }
}

// Funkcija za filtriranje konsultacija po statusu
function filterConsultationsByStatus(status) {
    const appointments = loadAllConsultations();
    if (status === 'all') {
        return appointments;
    }
    return appointments.filter(appointment => appointment.status === status);
}

// Funkcija za promenu statusa konsultacije
function updateConsultationStatus(id, newStatus) {
    const appointments = loadAllConsultations();
    const updatedAppointments = appointments.map(appointment => {
        if (appointment.id === id) {
            return { ...appointment, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return appointment;
    });
    
    localStorage.setItem('consultationAppointments', JSON.stringify(updatedAppointments));
    return true;
}

// Funkcija za otkazivanje konsultacije
function cancelConsultation(id) {
    return updateConsultationStatus(id, 'canceled');
}

// Funkcija za potvrđivanje konsultacije
function confirmConsultation(id) {
    const appointments = JSON.parse(localStorage.getItem('consultationAppointments') || '[]');
    const appointment = appointments.find(app => app.id === id);
    
    if (!appointment) {
        return false;
    }
    
    // Generiši Calendly link (u realnoj aplikaciji bi se koristio pravi Calendly API)
    const calendlyLink = generateCalendlyLink(appointment);
    
    // Ažuriraj status i dodaj Calendly link
    const updatedAppointments = appointments.map(app => {
        if (app.id === id) {
            return { 
                ...app, 
                status: 'confirmed', 
                calendlyLink: calendlyLink,
                updatedAt: new Date().toISOString() 
            };
        }
        return app;
    });
    
    localStorage.setItem('consultationAppointments', JSON.stringify(updatedAppointments));
    
    // Pošalji email obaveštenje sa Calendly linkom
    sendConfirmationEmailWithCalendly(appointment, calendlyLink);
    
    // Ažuriraj obaveštenja
    updateConsultationNotifications();
    
    return true;
}

// Funkcija za označavanje konsultacije kao završene
function completeConsultation(id) {
    return updateConsultationStatus(id, 'completed');
}

// Funkcija za brisanje konsultacije
function deleteConsultation(id) {
    const appointments = loadAllConsultations();
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    
    localStorage.setItem('consultationAppointments', JSON.stringify(updatedAppointments));
    return true;
}

// Funkcija za formatiranje datuma u lokalni format
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return dateString || 'Nevažeći datum';
    }
}

// Funkcija za renderovanje liste konsultacija u admin panelu
function renderConsultationsTable(consultations, targetElement) {
    if (!targetElement) return;
    
    if (consultations.length === 0) {
        targetElement.innerHTML = '<div class="empty-state"><p>Nema zakazanih konsultacija.</p></div>';
        return;
    }
    
    // Prevod statusa na srpski
    const statusTranslation = {
        'pending': 'Na čekanju',
        'confirmed': 'Potvrđeno',
        'canceled': 'Otkazano',
        'completed': 'Završeno'
    };
    
    // Boje za različite statuse
    const statusColors = {
        'pending': '#f59e0b', // žuta
        'confirmed': '#10b981', // zelena
        'canceled': '#ef4444', // crvena
        'completed': '#6366f1' // ljubičasta
    };
    
    let tableHtml = `
        <table class="consultations-table">
            <thead>
                <tr>
                    <th>Datum zakazivanja</th>
                    <th>Ime i prezime</th>
                    <th>Email</th>
                    <th>Država</th>
                    <th>Tema</th>
                    <th>Termin</th>
                    <th>Status</th>
                    <th>Akcije</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    consultations.forEach(consultation => {
        const statusText = statusTranslation[consultation.status] || consultation.status;
        const statusColor = statusColors[consultation.status] || '#64748b'; // default siva
        
        tableHtml += `
            <tr data-id="${consultation.id}">
                <td>${formatDate(consultation.createdAt)}</td>
                <td>${consultation.name}</td>
                <td><a href="mailto:${consultation.email}" class="email-link">${consultation.email}</a></td>
                <td>${consultation.location}</td>
                <td>${consultation.topic}</td>
                <td>${formatDate(consultation.dateTime)}</td>
                <td><span class="status-badge" style="background-color: ${statusColor};">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
        `;
        
        // Dinamički prikaz dugmića u zavisnosti od statusa
        if (consultation.status === 'pending') {
            tableHtml += `
                        <button class="action-btn confirm-btn" data-id="${consultation.id}" title="Potvrdi">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="action-btn cancel-btn" data-id="${consultation.id}" title="Otkaži">
                            <i class="fas fa-times"></i>
                        </button>
            `;
        } else if (consultation.status === 'confirmed') {
            tableHtml += `
                        <button class="action-btn complete-btn" data-id="${consultation.id}" title="Označi kao završeno">
                            <i class="fas fa-check-double"></i>
                        </button>
                        <button class="action-btn cancel-btn" data-id="${consultation.id}" title="Otkaži">
                            <i class="fas fa-times"></i>
                        </button>
            `;
        }
        
        // Dugme za brisanje je uvek dostupno
        tableHtml += `
                        <button class="action-btn delete-btn" data-id="${consultation.id}" title="Obriši">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableHtml += `
            </tbody>
        </table>
    `;
    
    targetElement.innerHTML = tableHtml;
    
    // Dodaj event listenere za dugmiće
    attachConsultationActionListeners(targetElement);
}

// Funkcija za dodavanje event listenera na dugmiće za akcije
function attachConsultationActionListeners(container) {
    // Listener za potvrdu konsultacije
    container.querySelectorAll('.confirm-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Da li ste sigurni da želite da potvrdite ovu konsultaciju?')) {
                confirmConsultation(id);
                refreshConsultationsTable();
            }
        });
    });
    
    // Listener za otkazivanje konsultacije
    container.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Da li ste sigurni da želite da otkažete ovu konsultaciju?')) {
                cancelConsultation(id);
                refreshConsultationsTable();
            }
        });
    });
    
    // Listener za označavanje konsultacije kao završene
    container.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Da li ste sigurni da želite da označite ovu konsultaciju kao završenu?')) {
                completeConsultation(id);
                refreshConsultationsTable();
            }
        });
    });
    
    // Listener za brisanje konsultacije
    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Da li ste sigurni da želite da obrišete ovu konsultaciju? Ova akcija se ne može poništiti.')) {
                deleteConsultation(id);
                refreshConsultationsTable();
            }
        });
    });
}

// Funkcija za osvežavanje tabele konsultacija
function refreshConsultationsTable() {
    const consultationsContainer = document.getElementById('consultationsTable');
    if (!consultationsContainer) return;
    
    const filterValue = document.getElementById('consultationsFilter')?.value || 'all';
    const consultations = filterConsultationsByStatus(filterValue);
    
    renderConsultationsTable(consultations, consultationsContainer);
}

// Inicijalizacija admin panela za konsultacije
document.addEventListener('DOMContentLoaded', function() {
    // Provera da li smo na admin stranici
    if (window.location.pathname.includes('admin.html')) {
        // Inicijalizuj filter ako postoji
        const filterSelect = document.getElementById('consultationsFilter');
        if (filterSelect) {
            filterSelect.addEventListener('change', refreshConsultationsTable);
        }
        
        // Inicijalizuj dugme za osvežavanje
        const refreshBtn = document.getElementById('refreshConsultationsBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', refreshConsultationsTable);
        }
        
        // Inicijalno učitavanje tabele
        if (document.getElementById('consultationsTab')) {
            refreshConsultationsTable();
        }
    }
});

// Inicijalizacija datuma u formi
document.addEventListener('DOMContentLoaded', function() {
    // Postavi minimalni datum na danas u 9:00
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Formatiraj datum za input polje (YYYY-MM-DDTHH:MM)
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    // Postavi minimalni datum za sutra u 9:00
    const minDateTime = `${year}-${month}-${day}T09:00`;
    document.getElementById('consultationDate').min = minDateTime;
    
    // Postavi podrazumevani termin za sutra u 10:00
    const defaultDateTime = `${year}-${month}-${day}T10:00`;
    document.getElementById('consultationDate').value = defaultDateTime;
});

// Funkcija za inicijalizaciju sistema obaveštenja
function initializeNotificationSystem() {
    // Proveri da li korisnik ima konsultacije i ažuriraj obaveštenja
    updateConsultationNotifications();
    
    // Dodeli event listener za klik na notifikaciju
    const notificationBtn = document.getElementById('consultationNotification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotificationDropdown);
    }
    
    // Zatvori dropdown kada se klikne van njega
    document.addEventListener('click', function(event) {
        const notification = document.getElementById('consultationNotification');
        const dropdown = document.getElementById('notificationDropdown');
        
        if (notification && !notification.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// Funkcija za proveru da li trenutni korisnik ima konsultacije
function getCurrentUserConsultations() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const appointments = JSON.parse(localStorage.getItem('consultationAppointments') || '[]');
    
    if (!currentUser.email) {
        return [];
    }
    
    // Filtriraj konsultacije za trenutnog korisnika
    return appointments.filter(appointment => 
        appointment.email === currentUser.email || 
        appointment.clientEmail === currentUser.email
    );
}

// Funkcija za ažuriranje obaveštenja o konsultacijama
function updateConsultationNotifications() {
    const userConsultations = getCurrentUserConsultations();
    const notificationBtn = document.getElementById('consultationNotification');
    const notificationBadge = document.getElementById('notificationBadge');
    const notificationContent = document.getElementById('notificationContent');
    
    if (!notificationBtn || !notificationBadge || !notificationContent) {
        return;
    }
    
    // Filtriraj samo potvržene i zakazane konsultacije
    const relevantConsultations = userConsultations.filter(appointment => 
        appointment.status === 'confirmed' || appointment.status === 'pending'
    );
    
    // Uvek pokaži notifikacije (dodaj i zahvalnu poruku)
    notificationBtn.classList.remove('d-none');
    
    // Kreiraj dodatne notifikacije
    let additionalNotifications = '';
    
    // Zahvalna poruka za korišćenje usluga
    additionalNotifications += `
        <div class="notification-item confirmed">
            <div class="notification-header">
                <strong>Hvala što koristite naše usluge!</strong>
                <span class="notification-status confirmed">Aktivno</span>
            </div>
            <div class="notification-details">
                <div><i class="fas fa-heart"></i> Cenimo vaše poverenje</div>
                <div><i class="fas fa-star"></i> Golden Balance platforma</div>
                <div><i class="fas fa-handshake"></i> Vaš finansijski partner</div>
            </div>
            <div class="notification-content">
                Hvala vam što ste izabrali Golden Balance platformu.<br>
                Vaš uspeh je naš prioritet! Radimo svakodnevno<br>
                da vam pružimo najbolje finansijske savete.
            </div>
        </div>
    `;
    
    // Zoom sastanak notifikacija
    // Pronađi najbližu zakazanu konsultaciju za dinamično vreme
    const nextConsultation = relevantConsultations.length > 0 ? 
        relevantConsultations.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))[0] : null;
    
    const zoomTimeInfo = nextConsultation ? 
        `${new Date(nextConsultation.dateTime).toLocaleDateString('sr-RS')} u ${new Date(nextConsultation.dateTime).toLocaleTimeString('sr-RS', {hour: '2-digit', minute: '2-digit'})}` : 
        'Dostupno 24/7 za konsultacije';
    
    additionalNotifications += `
        <div class="notification-item confirmed">
            <div class="notification-header">
                <strong>Link za Zoom sastanak</strong>
                <span class="notification-status confirmed">Dostupno</span>
            </div>
            <div class="notification-details">
                <div><i class="fas fa-video"></i> Meeting ID: 503 174 0065</div>
                <div><i class="fas fa-key"></i> Passcode: 5Ss5wV</div>
                <div><i class="fas fa-clock"></i> ${zoomTimeInfo}</div>
            </div>
            <div class="calendly-link">
                <a href="https://us05web.zoom.us/j/5031740065?pwd=VYHmLjM3CGXI4WxXgD8TOdC4mNuDLX.1&omn=89132037816" target="_blank" class="btn btn-sm btn-primary">
                    <i class="fas fa-video"></i> Pridružite se Zoom pozivu
                </a>
            </div>
            <div class="notification-content" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--muted-text);">
                Kliknite na dugme da se pridružite Zoom sastanku.<br>
                Meeting ID i Passcode su prikazani iznad.<br>
                ${nextConsultation ? 'Vreme konsultacije: ' + zoomTimeInfo : 'Dostupno za hitne konsultacije.'}
            </div>
        </div>
    `;
    
    if (relevantConsultations.length > 0) {
        // Ažuriraj badge broj (konsultacije + dodatne notifikacije)
        notificationBadge.textContent = relevantConsultations.length + 2;
        
        // Ažuriraj sadržaj dropdown-a - dodaj konsultacije
        const consultationNotifications = relevantConsultations.map(appointment => {
            const date = new Date(appointment.dateTime);
            const formattedDate = date.toLocaleDateString('sr-RS');
            const formattedTime = date.toLocaleTimeString('sr-RS', {hour: '2-digit', minute: '2-digit'});
            
            const statusClass = appointment.status === 'confirmed' ? 'confirmed' : 'pending';
            const statusText = appointment.status === 'confirmed' ? 'Potvrđeno' : 'Na čekanju';
            
            const calendlyLink = appointment.calendlyLink ? 
                `<div class="calendly-link">
                    <a href="${appointment.calendlyLink}" target="_blank" class="btn btn-sm btn-primary">
                        <i class="fas fa-video"></i> Pristupite pozivu
                    </a>
                </div>` : '';
            
            return `
                <div class="notification-item ${statusClass}">
                    <div class="notification-header">
                        <strong>${appointment.consultationType || 'Finansijska konsultacija'}</strong>
                        <span class="notification-status ${statusClass}">${statusText}</span>
                    </div>
                    <div class="notification-details">
                        <div><i class="fas fa-calendar"></i> ${formattedDate}</div>
                        <div><i class="fas fa-clock"></i> ${formattedTime}</div>
                        <div><i class="fas fa-user"></i> ${appointment.consultantName || 'Finansijski savetnik'}</div>
                    </div>
                    ${calendlyLink}
                </div>
            `;
        }).join('');
        
        notificationContent.innerHTML = additionalNotifications + consultationNotifications;
    } else {
        // Ako nema konsultacija, prikaži samo dodatne notifikacije
        notificationBadge.textContent = '2';
        notificationContent.innerHTML = additionalNotifications;
    }
}

// Funkcija za toggle dropdown obaveštenja
function toggleNotificationDropdown() {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Funkcija za generisanje Calendly linka (simulacija)
function generateCalendlyLink(appointment) {
    const date = new Date(appointment.dateTime);
    const timestamp = date.getTime();
    
    // U realnoj implementaciji bi se koristio pravi Calendly API
    return `https://calendly.com/finansijski-savetnik/konsultacija?date=${date.toISOString().split('T')[0]}&time=${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}&id=${appointment.id}`;
}

// Funkcija za slanje potvrde sa Calendly linkom
async function sendConfirmationEmailWithCalendly(appointment, calendlyLink) {
    const emailData = {
        to: appointment.email || appointment.clientEmail,
        subject: 'Potvrda konsultacije - Finansijski savetnik',
        body: `
            Poštovani ${appointment.name || appointment.clientName},
            
            Vaša konsultacija je potvrđena!
            
            Detalji konsultacije:
            - Datum: ${new Date(appointment.dateTime).toLocaleDateString('sr-RS')}
            - Vreme: ${new Date(appointment.dateTime).toLocaleTimeString('sr-RS', {hour: '2-digit', minute: '2-digit'})}
            - Tip: ${appointment.consultationType || 'Finansijska konsultacija'}
            
            Pristupite video pozivu putem sledećeg linka:
            ${calendlyLink}
            
            Ukoliko imate pitanja, slobodno nas kontaktirajte.
            
            Srdačan pozdrav,
            Tim finansijskih savetnika
        `
    };
    
    // Simulacija slanja email-a
    console.log('Slanje potvrde na email:', emailData);
    
    // U realnoj implementaciji bi se koristio email servis poput SendGrid, Mailgun, itd.
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email potvrda uspešno poslata na:', emailData.to);
            resolve(true);
        }, 1000);
    });
}

// Inicijalizuj sistem obaveštenja kada se učita stranica
document.addEventListener('DOMContentLoaded', function() {
    initializeNotificationSystem();
    
    // Ažuriraj obaveštenja svake minute (za slučaj da se status promeni)
    setInterval(updateConsultationNotifications, 60000);
});

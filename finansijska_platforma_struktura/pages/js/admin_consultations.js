/**
 * Admin Consultations - Funkcije za upravljanje konsultacijama u admin panelu
 */

// Funkcija koja se poziva pri inicijalizaciji admin panela
function initAdminConsultations() {
    // Proveri da li postoje zahtevi za konsultacije koji nisu prebačeni u admin listu
    migrateConsultationRequests();
    
    // Učitaj konsultacije
    loadConsultations();
    
    // Dodaj event listenere za refresh i filter
    const refreshConsultationsBtn = document.getElementById('refreshConsultationsBtn');
    if (refreshConsultationsBtn) {
        refreshConsultationsBtn.addEventListener('click', function() {
            migrateConsultationRequests();
            loadConsultations();
        });
    }
    
    const consultationFilter = document.getElementById('consultationFilter');
    if (consultationFilter) {
        consultationFilter.addEventListener('change', loadConsultations);
    }
}

// Funkcija koja migrira zahteve za konsultacije u admin listu konsultacija
function migrateConsultationRequests() {
    // Dobavi zahteve za konsultacije iz localStorage
    const consultationRequests = JSON.parse(localStorage.getItem('consultationRequests') || '[]');
    
    // Proveri da li postoje i drugi formati konsultacija (iz druge forme)
    const oldFormatConsultations = JSON.parse(localStorage.getItem('consultations_old') || '[]');
    
    // Kombinovanje oba niza zahteva
    const allRequests = [...consultationRequests, ...oldFormatConsultations];
    
    // Ako nema zahteva, nema šta da se migrira
    if (allRequests.length === 0) return;
    
    // Dobavi postojeće konsultacije
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    
    // Proveri koje zahteve treba dodati (one koji još nisu u listi konsultacija)
    const newRequests = allRequests.filter(req => {
        // Proveri da li već postoji ova konsultacija u admin listi
        return !consultations.some(cons => cons.id === req.id);
    });
    
    // Ako nema novih zahteva, nema šta da se migrira
    if (newRequests.length === 0) return;
    
    // Konvertuj zahteve u format koji koristi admin panel
    const newConsultations = newRequests.map(req => {
        // Proveravam da li je zahtev poslat iz prve ili druge forme
        // Prva forma sadrži podatke u malo drugačijem formatu
        return {
            id: req.id,
            client: req.userName || req.name || 'Korisnik',
            email: req.userEmail || req.email || '',
            phone: req.phone || req.location || 'Nije navedeno',
            date: req.date || '',
            time: req.time || '',
            type: req.topic || 'Opšte konsultacije',
            note: req.note || req.description || '',
            status: 'pending',
            approval: 'pending',
            notified: false,
            zoomLink: req.zoomLink || '',
            userId: req.userId || '',
            createdAt: req.createdAt || new Date().toISOString()
        };
    });
    
    // Dodaj nove konsultacije u listu
    consultations.push(...newConsultations);
    
    // Sačuvaj ažuriranu listu
    localStorage.setItem('consultations', JSON.stringify(consultations));
    
    // Prikaži obaveštenje o broju novih konsultacija
    if (newConsultations.length > 0) {
        alert(`Učitano ${newConsultations.length} novih zahteva za konsultacije.`);
    }
}

// Funkcija za učitavanje i prikazivanje konsultacija
function loadConsultations() {
    const consultationsTableBody = document.getElementById('consultationsTableBody');
    if (!consultationsTableBody) return;
    
    // Proveri prvo da li ima novih zahteva
    migrateConsultationRequests();
    
    // Dobavljanje konsultacija iz localStorage
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    
    // Dobavljanje vrednosti filtera
    const filter = document.getElementById('consultationFilter')?.value || 'all';
    
    // Filtriranje konsultacija prema statusu - samo 'pending' i 'completed'
    let filteredConsultations = [...consultations];
    if (filter !== 'all') {
        filteredConsultations = consultations.filter(consult => consult.status === filter);
    }
    
    // Sortiranje konsultacija (nadolazeće prvo)
    filteredConsultations.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });
    
    // Provera da li ima konsultacija za prikaz
    if (filteredConsultations.length === 0) {
        consultationsTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 1rem;">Nema konsultacija za prikaz</td></tr>`;
        return;
    }
    
    // Generisanje HTML-a za svaku konsultaciju
    consultationsTableBody.innerHTML = '';
    filteredConsultations.forEach(consultation => {
        // Formatiranje datuma i vremena
        const consultDate = new Date(`${consultation.date}T${consultation.time}`);
        const formattedDate = consultDate.toLocaleDateString('sr-RS');
        const formattedTime = consultDate.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
        
        // Određivanje prikaza statusa
        let statusText, statusClass;
        switch(consultation.status) {
            case 'pending':
                statusText = 'Na čekanju';
                statusClass = 'color: #f59e0b;'; // žuta
                break;
            case 'approved':
                statusText = 'Odobrena';
                statusClass = 'color: #10b981;'; // zelena
                break;
            case 'rejected':
                statusText = 'Odbijena';
                statusClass = 'color: #ef4444;'; // crvena
                break;
            case 'completed':
                statusText = 'Završena';
                statusClass = 'color: #6366f1;'; // plava
                break;
            case 'cancelled':
                statusText = 'Otkazana';
                statusClass = 'color: #ef4444;'; // crvena
                break;
            default:
                statusText = consultation.status;
                statusClass = '';
        }
        
        // Dugmad za odobravanje/odbijanje se prikazuju samo ako je status "na čekanju"
        let approvalButtons = '';
        if (consultation.status === 'pending') {
            approvalButtons = `
                <button class="approve-consultation-btn" data-id="${consultation.id}" style="background: var(--dark-accent); color: #10b981; border: 1px solid #10b981; padding: 0.5rem; margin-right: 0.3rem; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;" title="Prihvati konsultaciju">
                    <i class="fas fa-check"></i>
                </button>
                <button class="reject-consultation-btn" data-id="${consultation.id}" style="background: var(--dark-accent); color: #ef4444; border: 1px solid #ef4444; padding: 0.5rem; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;" title="Odbij konsultaciju">
                    <i class="fas fa-times"></i>
                </button>
            `;
        } else if (consultation.status === 'completed') {
            approvalButtons = `<span style="color: #10b981;"><i class="fas fa-check-circle"></i> Odobreno</span>`;
        }
        
        // Kreiranje reda tabele
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid var(--border-light)';
        
        row.innerHTML = `
            <td style="padding: 0.75rem;">${formattedDate}<br>${formattedTime}</td>
            <td style="padding: 0.75rem;">${consultation.client || 'Korisnik'}</td>
            <td style="padding: 0.75rem;">${consultation.email || 'Nije navedeno'}<br>${consultation.phone || 'Nije naveden'}</td>
            <td style="padding: 0.75rem;">${consultation.type || 'Opšte konsultacije'}</td>
            <td style="padding: 0.75rem;">
                <select class="consultation-status" data-id="${consultation.id}" style="background: rgba(31, 41, 55, 0.4); border: 1px solid var(--border-light); color: var(--light-text); padding: 0.5rem; border-radius: var(--border-radius);">
                    <option value="pending" ${consultation.status === 'pending' ? 'selected' : ''}>Na čekanju</option>
                    <option value="completed" ${consultation.status === 'completed' ? 'selected' : ''}>Realizovano</option>
                </select>
            </td>
            <td style="padding: 0.75rem;">
                ${approvalButtons}
            </td>
            <td style="padding: 0.75rem;">
                <button class="view-consultation-btn" data-id="${consultation.id}" style="background: var(--dark-accent); color: var(--gold-pale); border: 1px solid var(--gold-dark); padding: 0.5rem; margin-right: 0.5rem;" title="Pregled detalja">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="notify-consultation-btn" data-id="${consultation.id}" style="background: var(--dark-accent); color: #3b82f6; border: 1px solid #3b82f6; padding: 0.5rem; margin-right: 0.5rem;" title="Obavesti klijenta" ${consultation.approval !== 'approved' || consultation.notified ? 'disabled' : ''}>
                    <i class="fas fa-paper-plane"></i>
                </button>
                <button class="delete-consultation-btn" data-id="${consultation.id}" style="background: var(--dark-accent); color: #ef4444; border: 1px solid #ef4444; padding: 0.5rem;" title="Obriši konsultaciju">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        consultationsTableBody.appendChild(row);
    });
    
    // Dodavanje event listenera za promenu statusa
    document.querySelectorAll('.consultation-status').forEach(select => {
        select.addEventListener('change', function() {
            const id = this.getAttribute('data-id');
            const newStatus = this.value;
            updateConsultationStatus(id, newStatus);
        });
    });
    
    // Dodavanje event listenera za dugme za pregled
    document.querySelectorAll('.view-consultation-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewConsultationDetails(id);
        });
    });
    
    // Dodavanje event listenera za dugme za brisanje
    document.querySelectorAll('.delete-consultation-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteConsultation(id);
        });
    });
    
    // Dodavanje event listenera za dugme za odobravanje
    document.querySelectorAll('.approve-consultation-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            approveConsultation(id);
        });
    });
    
    // Dodavanje event listenera za dugme za odbijanje
    document.querySelectorAll('.reject-consultation-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            rejectConsultation(id);
        });
    });
    
    // Dodavanje event listenera za dugme za obaveštavanje
    document.querySelectorAll('.notify-consultation-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            notifyClientAboutConsultation(id);
        });
    });
}

// Funkcija za ažuriranje statusa konsultacije
function updateConsultationStatus(id, newStatus) {
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    const consultationIndex = consultations.findIndex(c => c.id === id);
    
    if (consultationIndex !== -1) {
        consultations[consultationIndex].status = newStatus;
        localStorage.setItem('consultations', JSON.stringify(consultations));
        
        // Prikaži poruku o uspehu
        alert('Status konsultacije je uspešno ažuriran.');
        
        // Osvežavanje prikaza
        loadConsultations();
    }
}

// Funkcija za pregled detalja konsultacije
function viewConsultationDetails(id) {
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    const consultation = consultations.find(c => c.id === id);
    
    if (!consultation) {
        alert('Konsultacija nije pronađena.');
        return;
    }
    
    // Formatiranje datuma za prikaz
    const consultDate = new Date(`${consultation.date}T${consultation.time}`);
    const formattedDate = consultDate.toLocaleDateString('sr-RS');
    const formattedTime = consultDate.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
    
    // Kreiranje HTML-a za modal
    const modalHTML = `
        <div class="modal-content" style="max-width: 600px; background: var(--dark-bg); color: var(--light-text); border-radius: var(--border-radius); padding: 1.5rem; border: 1px solid var(--border-light);">
            <div class="modal-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1rem;">
                <h2 style="color: var(--gold-bright); margin: 0;">Detalji konsultacije</h2>
                <button onclick="closeModal()" style="background: none; border: none; color: var(--muted-text); font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div class="modal-body" style="margin-bottom: 1.5rem;">
                <div style="margin-bottom: 1rem;">
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Klijent:</span>
                        <span>${consultation.client || 'Korisnik'}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Email:</span>
                        <span>${consultation.email || 'Nije navedeno'}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Telefon:</span>
                        <span>${consultation.phone || 'Nije naveden'}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Datum:</span>
                        <span>${formattedDate}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Vreme:</span>
                        <span>${formattedTime}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Tema:</span>
                        <span>${consultation.type || 'Opšte konsultacije'}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Status:</span>
                        <span>${getStatusText(consultation.status)}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Odobrenje:</span>
                        <span>${getApprovalText(consultation.approval)}</span>
                    </p>
                    <p style="margin: 0.5rem 0; display: flex; justify-content: space-between;">
                        <span style="font-weight: bold; color: var(--gold-pale);">Kreirana:</span>
                        <span>${new Date(consultation.createdAt).toLocaleString('sr-RS')}</span>
                    </p>
                </div>
                <div style="margin-top: 1rem;">
                    <h3 style="color: var(--gold-pale); margin-bottom: 0.5rem;">Napomena:</h3>
                    <p style="background: rgba(31, 41, 55, 0.4); padding: 0.75rem; border-radius: var(--border-radius); border: 1px solid var(--border-light);">${consultation.note || 'Nema napomene'}</p>
                </div>
                ${consultation.zoomLink ? `
                <div style="margin-top: 1rem;">
                    <h3 style="color: var(--gold-pale); margin-bottom: 0.5rem;">Zoom link:</h3>
                    <p style="background: rgba(31, 41, 55, 0.4); padding: 0.75rem; border-radius: var(--border-radius); border: 1px solid var(--border-light);">
                        <a href="${consultation.zoomLink}" target="_blank" style="color: #3b82f6;">${consultation.zoomLink}</a>
                    </p>
                </div>
                ` : ''}
            </div>
            <div class="modal-footer" style="border-top: 1px solid var(--border-light); padding-top: 1rem; display: flex; justify-content: flex-end;">
                <button onclick="closeModal()" style="background: var(--dark-accent); color: var(--light-text); border: 1px solid var(--border-light); padding: 0.5rem 1rem; border-radius: var(--border-radius); cursor: pointer;">Zatvori</button>
            </div>
        </div>
    `;
    
    // Prikazivanje modala
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
        modalContainer.innerHTML = modalHTML;
        modalContainer.style.display = 'flex';
    }
}

// Funkcija za brisanje konsultacije
function deleteConsultation(id) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovu konsultaciju?')) {
        return;
    }
    
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    const updatedConsultations = consultations.filter(c => c.id !== id);
    
    localStorage.setItem('consultations', JSON.stringify(updatedConsultations));
    
    // Prikaži poruku o uspehu
    alert('Konsultacija je uspešno obrisana.');
    
    // Osvežavanje prikaza
    loadConsultations();
}

// Funkcija za odobravanje konsultacije
function approveConsultation(id) {
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    const consultationIndex = consultations.findIndex(c => c.id === id);
    
    if (consultationIndex !== -1) {
        consultations[consultationIndex].approval = 'approved';
        consultations[consultationIndex].status = 'completed';
        
        // Dodavanje Zoom linka
        // Koristimo pravi Zoom link za sastanke
        consultations[consultationIndex].zoomLink = 'https://us05web.zoom.us/j/83785659995?pwd=pyEobHEQ8VbxcY5LjK4UP8L3n8yhY1.1';
        
        localStorage.setItem('consultations', JSON.stringify(consultations));
        
        // Kreiranje notifikacije za korisnika
        const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '{}');
        const userId = consultations[consultationIndex].userId;
        
        if (!userNotifications[userId]) {
            userNotifications[userId] = [];
        }
        
        userNotifications[userId].unshift({
            id: 'notification_' + Date.now(),
            title: 'Konsultacija odobrena',
            message: `Vaš termin je uspešno potvrđen, uđite na link iz notifikacije koji je zoom link: <a href="${consultations[consultationIndex].zoomLink}" target="_blank">${consultations[consultationIndex].zoomLink}</a>`,
            type: 'Zakazani sastanak',
            date: new Date().toISOString(),
            read: false
        });
        
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
        
        // Prikaži poruku o uspehu
        alert('Konsultacija je uspešno odobrena i korisniku je poslata notifikacija.');
        
        // Osvežavanje prikaza
        loadConsultations();
    }
}

// Funkcija za odbijanje konsultacije
function rejectConsultation(id) {
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    const consultationIndex = consultations.findIndex(c => c.id === id);
    
    if (consultationIndex !== -1) {
        consultations[consultationIndex].approval = 'rejected';
        consultations[consultationIndex].status = 'pending';
        localStorage.setItem('consultations', JSON.stringify(consultations));
        
        // Kreiranje notifikacije za korisnika
        const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '{}');
        const userId = consultations[consultationIndex].userId;
        
        if (!userNotifications[userId]) {
            userNotifications[userId] = [];
        }
        
        userNotifications[userId].unshift({
            id: 'notification_' + Date.now(),
            title: 'Konsultacija odložena',
            message: 'Žao nam je, trenutno nismo u mogućnosti da realizujemo konsultacije, sačuvali smo vaše podatke i u što kraćem mogućem roku ćemo kreirati sastanak za vas.',
            type: 'Info',
            date: new Date().toISOString(),
            read: false
        });
        
        localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
        
        // Prikaži poruku o uspehu
        alert('Konsultacija je odložena i korisniku je poslata notifikacija.');
        
        // Osvežavanje prikaza
        loadConsultations();
    }
}

// Funkcija za obaveštavanje klijenta o konsultaciji
function notifyClientAboutConsultation(id) {
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    const consultationIndex = consultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
        alert('Konsultacija nije pronađena.');
        return;
    }
    
    const consultation = consultations[consultationIndex];
    
    // Proveri da li je konsultacija odobrena
    if (consultation.approval !== 'approved') {
        alert('Samo odobrene konsultacije mogu biti poslate klijentu.');
        return;
    }
    
    // Formatiranje datuma za poruku
    const consultDate = new Date(`${consultation.date}T${consultation.time}`);
    const formattedDate = consultDate.toLocaleDateString('sr-RS');
    const formattedTime = consultDate.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
    
    // Kreiranje notifikacije za korisnika
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '{}');
    const userId = consultation.userId;
    
    if (!userNotifications[userId]) {
        userNotifications[userId] = [];
    }
    
    userNotifications[userId].unshift({
        id: 'notification_' + Date.now(),
        title: 'Konsultacija odobrena',
        message: `Vaš termin je uspešno potvrđen, uđite na link iz notifikacije koji je zoom link: <a href="${consultation.zoomLink}" target="_blank">${consultation.zoomLink}</a>`,
        type: 'Zakazani sastanak',
        date: new Date().toISOString(),
        read: false
    });
    
    localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
    
    // Označavanje konsultacije kao notifikovane
    consultations[consultationIndex].notified = true;
    localStorage.setItem('consultations', JSON.stringify(consultations));
    
    // Prikaži poruku o uspehu
    alert('Klijent je uspešno obavešten o konsultaciji.');
    
    // Osvežavanje prikaza
    loadConsultations();
}

// Pomoćna funkcija za dobijanje teksta statusa
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'Na čekanju';
        case 'approved': return 'Odobrena';
        case 'rejected': return 'Odbijena';
        case 'completed': return 'Završena';
        case 'cancelled': return 'Otkazana';
        default: return status;
    }
}

// Pomoćna funkcija za dobijanje teksta odobrenja
function getApprovalText(approval) {
    switch(approval) {
        case 'pending': return 'Na čekanju';
        case 'approved': return 'Odobreno';
        case 'rejected': return 'Odbijeno';
        default: return approval;
    }
}

// Automatsko popunjavanje podataka korisnika iz localStorage-a

document.addEventListener('DOMContentLoaded', function() {
    // Provera da li je korisnik prijavljen
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Automatsko popunjavanje email-a ako je korisnik prijavljen
    if (currentUser.email && document.getElementById('clientEmail')) {
        document.getElementById('clientEmail').value = currentUser.email;
    }
    
    // Automatsko popunjavanje imena ako postoji
    if (currentUser.name && document.getElementById('clientName')) {
        document.getElementById('clientName').value = currentUser.name;
    }
    
    // Automatski prikaz upisanih podataka u polja forme
    document.querySelectorAll('#consultationModal input, #consultationModal select, #consultationModal textarea').forEach(input => {
        input.addEventListener('change', function() {
            // Sačuvaj vrednost u localStorage za slučaj da korisnik zatvori modal
            localStorage.setItem('consultation_' + this.id, this.value);
        });
        
        // Učitaj vrednost iz localStorage ako postoji
        const savedValue = localStorage.getItem('consultation_' + input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    });
});

// Dodajemo listener na otvaranje modala za konsultacije
document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('button[onclick="openModal(\'consultationModal\')"]')) {
        setTimeout(() => {
            // Postavljanje trenutnog datuma i vremena kao minimum za izbor termina
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hour = String(now.getHours()).padStart(2, '0');
            const minute = String(now.getMinutes()).padStart(2, '0');
            
            const minDateTime = `${year}-${month}-${day}T${hour}:${minute}`;
            
            const dateTimeInput = document.getElementById('consultationDate');
            if (dateTimeInput) {
                dateTimeInput.min = minDateTime;
                
                // Ako nije postavljen datum, postavi podrazumevani za naredni radni dan u 10:00
                if (!dateTimeInput.value) {
                    const tomorrow = new Date(now);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    
                    // Ako je vikend, pomeri na ponedeljak
                    if (tomorrow.getDay() === 0) { // Nedelja
                        tomorrow.setDate(tomorrow.getDate() + 1);
                    } else if (tomorrow.getDay() === 6) { // Subota
                        tomorrow.setDate(tomorrow.getDate() + 2);
                    }
                    
                    // Postavi vreme na 10:00
                    tomorrow.setHours(10, 0, 0, 0);
                    
                    const tYear = tomorrow.getFullYear();
                    const tMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
                    const tDay = String(tomorrow.getDate()).padStart(2, '0');
                    
                    dateTimeInput.value = `${tYear}-${tMonth}-${tDay}T10:00`;
                }
            }
        }, 100);
    }
});

/**
 * Filter za konsultacije - pojednostavljeni filter sa samo opcijama "Sve", "Na čekanju" i "Realizovano"
 */

// Funkcija za kreiranje pojednostavljenog filtera
function createSimplifiedConsultationFilter() {
    // Pronađi postojeći filter element
    const filterContainer = document.querySelector('label[for="consultationFilter"]').parentElement;
    
    if (!filterContainer) return;
    
    // Kreiraj novi HTML za filter
    const newFilterHTML = `
        <label for="consultationFilter">Filtriraj po statusu:</label>
        <select id="consultationFilter" style="background: rgba(31, 41, 55, 0.4); border: 1px solid var(--border-light); color: var(--light-text); padding: 0.5rem; border-radius: var(--border-radius);">
            <option value="all">Sve konsultacije</option>
            <option value="pending" selected>Na čekanju</option>
            <option value="completed">Realizovano</option>
        </select>
    `;
    
    // Zameni sadržaj kontejnera
    filterContainer.innerHTML = newFilterHTML;
    
    // Dodaj event listener za promenu filtera
    const consultationFilter = document.getElementById('consultationFilter');
    if (consultationFilter) {
        consultationFilter.addEventListener('change', loadConsultations);
    }
}

// Dodaj ovu funkciju u inicijalizaciju admin konsultacija
function initAdminFilters() {
    setTimeout(() => {
        createSimplifiedConsultationFilter();
    }, 500); // Sačekaj malo da se DOM učita
}

// Proširi initAdminConsultations funkciju
const originalInitAdminConsultations = window.initAdminConsultations || function() {};

window.initAdminConsultations = function() {
    // Pozovi originalnu funkciju ako postoji
    originalInitAdminConsultations();
    
    // Dodaj inicijalizaciju filtera
    initAdminFilters();
};

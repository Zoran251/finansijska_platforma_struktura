// Finansijski kalkulator - implementacija S&P 500 kalkulatora

// Ova funkcija više nije potrebna jer je logika modala već rešena u preview.html
// Ostavljen je prazan placeholder radi kompatibilnosti ako je negde pozvana
function closeFinansijskiKalkulatorModal() {
    // Sve modale zatvara centralna funkcija closeModal() iz preview.html
    if (typeof closeModal === 'function') closeModal();
}

// Izračunava finansijsku projekciju na osnovu korisničkog unosa
function calculateInvestment() {
    // Dohvatanje unetih vrednosti
    const investmentPeriod = parseInt(document.getElementById('investmentPeriod').value);
    const annualDeposit = parseFloat(document.getElementById('annualDeposit').value);
    
    // Validacija unosa
    if (isNaN(investmentPeriod) || isNaN(annualDeposit) || investmentPeriod <= 0 || annualDeposit <= 0) {
        alert('Molimo unesite ispravne vrednosti za period štednje i godišnju uplatu.');
        return;
    }
      // Konstante za kalkulaciju (prosečni godišnji prinos S&P 500 indeksa ~7%)
    const annualReturnRate = 0.07;
    
    // Računanje vrednosti investicije po godinama
    let yearlyData = [];
    let totalInvested = 0;
    let totalValue = 0;
    
    for (let year = 1; year <= investmentPeriod; year++) {
        // Povećavamo ukupnu investiciju za godišnju uplatu
        totalInvested += annualDeposit;
        
        // Za prvu godinu, ukupna vrednost je jednaka investiciji
        if (year === 1) {
            totalValue = annualDeposit;
        } else {
            // Za ostale godine, dodajemo novu uplatu i računamo prinos
            totalValue = totalValue * (1 + annualReturnRate) + annualDeposit;
        }
        
        // Dodajemo podatke za trenutnu godinu
        yearlyData.push({
            year: year,
            invested: totalInvested,
            value: totalValue
        });
    }
    
    // Prikazujemo rezultate
    displayResults(yearlyData, totalInvested, totalValue);
}

// Prikazuje rezultate kalkulacije
function displayResults(yearlyData, totalInvested, totalValue) {
    // Pokušavamo da pronađemo aktivni modal
    const activeModal = document.querySelector('.modal.show') || document.querySelector('.modal');
    let resultSection = null;
    
    if (activeModal) {
        resultSection = activeModal.querySelector('#investmentResult');
    }
    
    // Fallback - traži u celom dokumentu
    if (!resultSection) {
        const resultSections = document.querySelectorAll('#investmentResult');
        resultSection = resultSections[resultSections.length - 1]; // Uzmi poslednji
    }
    
    if (!resultSection) {
        console.error('Ne mogu da pronađem investmentResult element');
        return;
    }
    
    resultSection.classList.remove('d-none');
    
    // Formatiramo vrednosti kao valutu
    const formatter = new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD',
        minimumFractionDigits: 0
    });
    
    // Popunjavamo vrednosti - pokušavamo u aktivnom modalu prvo
    let totalInvestedElement, totalReturnElement, compoundInterestElement;
    
    if (activeModal) {
        totalInvestedElement = activeModal.querySelector('#totalInvested');
        totalReturnElement = activeModal.querySelector('#totalReturn');
        compoundInterestElement = activeModal.querySelector('#compoundInterest');
    }
    
    // Fallback
    if (!totalInvestedElement) totalInvestedElement = document.querySelector('#totalInvested');
    if (!totalReturnElement) totalReturnElement = document.querySelector('#totalReturn');
    if (!compoundInterestElement) compoundInterestElement = document.querySelector('#compoundInterest');
    
    if (totalInvestedElement) totalInvestedElement.textContent = formatter.format(totalInvested);
    if (totalReturnElement) totalReturnElement.textContent = formatter.format(totalValue);
    if (compoundInterestElement) compoundInterestElement.textContent = formatter.format(totalValue - totalInvested);
    
    // Crtamo grafikon
    drawInvestmentChart(yearlyData, activeModal);
}

// Crta grafikon rasta investicije
function drawInvestmentChart(yearlyData, activeModal = null) {
    let canvasElement = null;
    
    // Pokušavamo da pronađemo canvas u aktivnom modalu
    if (activeModal) {
        canvasElement = activeModal.querySelector('#investmentChart');
    }
    
    // Fallback - traži u celom dokumentu
    if (!canvasElement) {
        const canvases = document.querySelectorAll('#investmentChart');
        canvasElement = canvases[canvases.length - 1]; // Uzmi poslednji
    }
    
    if (!canvasElement) {
        console.error('Ne mogu da pronađem investmentChart canvas element');
        return;
    }
    
    const ctx = canvasElement.getContext('2d');
    
    // Pripremamo podatke za grafikon
    const years = yearlyData.map(data => `Godina ${data.year}`);
    const investedValues = yearlyData.map(data => data.invested);
    const totalValues = yearlyData.map(data => data.value);
    
    // Ako već postoji grafikon za ovaj canvas, uništavamo ga
    if (canvasElement.chart instanceof Chart) {
        canvasElement.chart.destroy();
    }
    
    // Kreiramo novi grafikon
    canvasElement.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Uloženo',
                    data: investedValues,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Ukupna vrednost',
                    data: totalValues,
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return new Intl.NumberFormat('sr-RS', {
                                style: 'currency',
                                currency: 'RSD',
                                minimumFractionDigits: 0
                            }).format(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + new Intl.NumberFormat('sr-RS', {
                                style: 'currency',
                                currency: 'RSD',
                                minimumFractionDigits: 0
                            }).format(context.raw);
                        }
                    }
                }
            }
        }
    });
}
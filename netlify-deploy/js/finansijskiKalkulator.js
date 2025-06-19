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
    // Prikazujemo sekciju sa rezultatima
    const resultSection = document.getElementById('investmentResult');
    resultSection.classList.remove('d-none');
    
    // Formatiramo vrednosti kao valutu
    const formatter = new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD',
        minimumFractionDigits: 0
    });
    
    // Popunjavamo vrednosti
    document.getElementById('totalInvested').textContent = formatter.format(totalInvested);
    document.getElementById('totalReturn').textContent = formatter.format(totalValue);
    document.getElementById('compoundInterest').textContent = formatter.format(totalValue - totalInvested);
    
    // Crtamo grafikon
    drawInvestmentChart(yearlyData);
}

// Crta grafikon rasta investicije
function drawInvestmentChart(yearlyData) {
    const ctx = document.getElementById('investmentChart').getContext('2d');
    
    // Pripremamo podatke za grafikon
    const years = yearlyData.map(data => `Godina ${data.year}`);
    const investedValues = yearlyData.map(data => data.invested);
    const totalValues = yearlyData.map(data => data.value);
    
    // Ako već postoji grafikon, uništavamo ga
    if (window.investmentChart instanceof Chart) {
        window.investmentChart.destroy();
    }
    
    // Kreiramo novi grafikon
    window.investmentChart = new Chart(ctx, {
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
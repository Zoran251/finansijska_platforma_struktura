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
    
    // Kreiramo gradijente za moderniji izgled
    const gradientInvested = ctx.createLinearGradient(0, 0, 0, 400);
    gradientInvested.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradientInvested.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
    
    const gradientTotal = ctx.createLinearGradient(0, 0, 0, 400);
    gradientTotal.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
    gradientTotal.addColorStop(1, 'rgba(16, 185, 129, 0.2)');
    
    // Kreiramo novi moderan grafikon
    canvasElement.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: '💰 Uloženo',
                    data: investedValues,
                    backgroundColor: gradientInvested,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 'flex',
                    maxBarThickness: 40,
                    tension: 0.4
                },
                {
                    label: '📈 Ukupna vrednost',
                    data: totalValues,
                    backgroundColor: gradientTotal,
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 'flex',
                    maxBarThickness: 40,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart',
                delay: (context) => {
                    return context.dataIndex * 150;
                }
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            family: "'Inter', 'Segoe UI', sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        maxRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                        lineWidth: 1
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            family: "'Inter', 'Segoe UI', sans-serif",
                            size: 11,
                            weight: '400'
                        },
                        padding: 8,
                        callback: function(value) {
                            const formatter = new Intl.NumberFormat('sr-RS', {
                                style: 'currency',
                                currency: 'RSD',
                                minimumFractionDigits: 0,
                                notation: value >= 1000000 ? 'compact' : 'standard'
                            });
                            return formatter.format(value);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        color: '#374151',
                        font: {
                            family: "'Inter', 'Segoe UI', sans-serif",
                            size: 13,
                            weight: '600'
                        },
                        generateLabels: function(chart) {
                            const original = Chart.defaults.plugins.legend.labels.generateLabels;
                            const labels = original.call(this, chart);
                            
                            labels.forEach(label => {
                                label.fillStyle = label.strokeColor;
                            });
                            
                            return labels;
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: '#F9FAFB',
                    bodyColor: '#F9FAFB',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderWidth: 1,
                    cornerRadius: 12,
                    padding: 16,
                    bodySpacing: 8,
                    titleSpacing: 8,
                    displayColors: true,
                    usePointStyle: true,
                    titleFont: {
                        family: "'Inter', 'Segoe UI', sans-serif",
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        family: "'Inter', 'Segoe UI', sans-serif",
                        size: 13,
                        weight: '500'
                    },
                    callbacks: {
                        title: function(tooltipItems) {
                            return `📊 ${tooltipItems[0].label}`;
                        },
                        label: function(context) {
                            const formatter = new Intl.NumberFormat('sr-RS', {
                                style: 'currency',
                                currency: 'RSD',
                                minimumFractionDigits: 0
                            });
                            
                            const value = formatter.format(context.raw);
                            const dataset = context.dataset.label;
                            
                            // Dodajemo procenat rasta za ukupnu vrednost
                            if (context.datasetIndex === 1 && context.dataIndex > 0) {
                                const investedValue = context.chart.data.datasets[0].data[context.dataIndex];
                                const growth = ((context.raw - investedValue) / investedValue * 100).toFixed(1);
                                return `${dataset}: ${value} (+${growth}%)`;
                            }
                            
                            return `${dataset}: ${value}`;
                        },
                        afterLabel: function(context) {
                            if (context.datasetIndex === 1) {
                                const investedValue = context.chart.data.datasets[0].data[context.dataIndex];
                                const profit = context.raw - investedValue;
                                const formatter = new Intl.NumberFormat('sr-RS', {
                                    style: 'currency',
                                    currency: 'RSD',
                                    minimumFractionDigits: 0
                                });
                                return `💡 Profit: ${formatter.format(profit)}`;
                            }
                            return '';
                        }
                    }
                }
            }
        }
    });
}
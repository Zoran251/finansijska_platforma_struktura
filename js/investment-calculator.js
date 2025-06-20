// Investicioni kalkulator - investment-calculator.js
class InvestmentCalculator {
    constructor() {
        this.calculations = [];
        this.marketData = {
            stocks: { return: 8.5, risk: 'high', volatility: 18 },
            bonds: { return: 4.2, risk: 'low', volatility: 5 },
            realEstate: { return: 6.8, risk: 'medium', volatility: 12 },
            crypto: { return: 15.2, risk: 'very-high', volatility: 45 },
            gold: { return: 3.5, risk: 'low', volatility: 8 },
            mixedPortfolio: { return: 7.1, risk: 'medium', volatility: 14 }
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCalculatorSections();
    }

    renderCalculatorSections() {
        this.renderCompoundInterestCalculator();
        this.renderRetirementCalculator();
        this.renderPortfolioAnalyzer();
        this.renderRiskAssessment();
    }

    // Složena kamata kalkulator
    renderCompoundInterestCalculator() {
        const container = document.getElementById('compoundCalculator');
        if (!container) return;

        container.innerHTML = `
            <div class="calculator-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Početni iznos (€)</label>
                        <input type="number" id="initialAmount" value="1000" min="0">
                    </div>
                    <div class="form-group">
                        <label>Mesečno ulaganje (€)</label>
                        <input type="number" id="monthlyContribution" value="200" min="0">
                    </div>
                    <div class="form-group">
                        <label>Godišnja stopa povrata (%)</label>
                        <input type="number" id="annualReturn" value="7" min="0" max="50" step="0.1">
                    </div>
                    <div class="form-group">
                        <label>Period (godine)</label>
                        <input type="number" id="investmentYears" value="10" min="1" max="50">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="calculator.calculateCompoundInterest()">
                    Izračunaj
                </button>
            </div>
            <div id="compoundResults" class="calculation-results"></div>
        `;
    }

    calculateCompoundInterest() {
        const initial = parseFloat(document.getElementById('initialAmount').value) || 0;
        const monthly = parseFloat(document.getElementById('monthlyContribution').value) || 0;
        const rate = parseFloat(document.getElementById('annualReturn').value) || 0;
        const years = parseInt(document.getElementById('investmentYears').value) || 1;

        const monthlyRate = rate / 100 / 12;
        const months = years * 12;

        // Složena kamata za početni iznos
        const futureValueInitial = initial * Math.pow(1 + monthlyRate, months);

        // Buduća vrednost mesečnih doprinosa (annuity)
        const futureValueAnnuity = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        const totalValue = futureValueInitial + futureValueAnnuity;
        const totalContributions = initial + (monthly * months);
        const totalEarnings = totalValue - totalContributions;

        this.displayCompoundResults({
            totalValue,
            totalContributions,
            totalEarnings,
            years,
            monthlyRate,
            initial,
            monthly
        });
    }

    displayCompoundResults(results) {
        const container = document.getElementById('compoundResults');
        
        // Generate yearly breakdown
        const yearlyBreakdown = this.generateYearlyBreakdown(results);

        container.innerHTML = `
            <div class="results-summary">
                <div class="result-card">
                    <h3>Ukupna vrednost</h3>
                    <div class="result-value">${this.formatCurrency(results.totalValue)}</div>
                </div>
                <div class="result-card">
                    <h3>Ukupno uloženo</h3>
                    <div class="result-value">${this.formatCurrency(results.totalContributions)}</div>
                </div>
                <div class="result-card">
                    <h3>Ukupna zarada</h3>
                    <div class="result-value earnings">${this.formatCurrency(results.totalEarnings)}</div>
                </div>
                <div class="result-card">
                    <h3>ROI</h3>
                    <div class="result-value">${((results.totalEarnings / results.totalContributions) * 100).toFixed(1)}%</div>
                </div>
            </div>
            
            <div class="growth-chart">
                <h4>Rast investicije po godinama</h4>
                <canvas id="growthChart" width="800" height="400"></canvas>
            </div>
            
            <div class="yearly-breakdown">
                <h4>Godišnji pregled</h4>
                <div class="breakdown-table">
                    <div class="table-header">
                        <span>Godina</span>
                        <span>Uloženo</span>
                        <span>Zarada</span>
                        <span>Ukupno</span>
                    </div>
                    ${yearlyBreakdown.map(year => `
                        <div class="table-row">
                            <span>${year.year}</span>
                            <span>${this.formatCurrency(year.contributions)}</span>
                            <span>${this.formatCurrency(year.earnings)}</span>
                            <span>${this.formatCurrency(year.total)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.drawGrowthChart(yearlyBreakdown);
    }

    generateYearlyBreakdown(results) {
        const breakdown = [];
        const { initial, monthly, monthlyRate, years } = results;
        
        let currentValue = initial;
        let totalContributions = initial;

        for (let year = 1; year <= years; year++) {
            for (let month = 1; month <= 12; month++) {
                currentValue = currentValue * (1 + monthlyRate) + monthly;
                totalContributions += monthly;
            }
            
            breakdown.push({
                year: year,
                contributions: totalContributions,
                earnings: currentValue - totalContributions,
                total: currentValue
            });
        }

        return breakdown;
    }

    drawGrowthChart(data) {
        const canvas = document.getElementById('growthChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Set styles
        ctx.strokeStyle = '#D4AF37';
        ctx.fillStyle = '#D4AF37';
        ctx.lineWidth = 3;

        // Calculate scales
        const maxValue = Math.max(...data.map(d => d.total));
        const scaleX = (width - 2 * padding) / (data.length - 1);
        const scaleY = (height - 2 * padding) / maxValue;

        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Draw data line
        ctx.beginPath();
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 3;

        data.forEach((point, index) => {
            const x = padding + index * scaleX;
            const y = height - padding - point.total * scaleY;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#D4AF37';
        data.forEach((point, index) => {
            const x = padding + index * scaleX;
            const y = height - padding - point.total * scaleY;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw labels
        ctx.fillStyle = '#ccc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        data.forEach((point, index) => {
            const x = padding + index * scaleX;
            ctx.fillText(`${point.year}`, x, height - padding + 20);
        });
    }

    // Penzijski kalkulator
    renderRetirementCalculator() {
        const container = document.getElementById('retirementCalculator');
        if (!container) return;

        container.innerHTML = `
            <div class="calculator-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Trenutna starost</label>
                        <input type="number" id="currentAge" value="30" min="18" max="65">
                    </div>
                    <div class="form-group">
                        <label>Planirani penzijski uzrast</label>
                        <input type="number" id="retirementAge" value="65" min="50" max="75">
                    </div>
                    <div class="form-group">
                        <label>Trenutne penzijske uštede (€)</label>
                        <input type="number" id="currentSavings" value="10000" min="0">
                    </div>
                    <div class="form-group">
                        <label>Mesečni doprinos (€)</label>
                        <input type="number" id="monthlyPension" value="300" min="0">
                    </div>
                    <div class="form-group">
                        <label>Željena mesečna penzija (€)</label>
                        <input type="number" id="desiredPension" value="2000" min="0">
                    </div>
                    <div class="form-group">
                        <label>Očekivana stopa povrata (%)</label>
                        <input type="number" id="pensionReturn" value="6" min="0" max="15" step="0.1">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="calculator.calculateRetirement()">
                    Izračunaj penziju
                </button>
            </div>
            <div id="retirementResults" class="calculation-results"></div>
        `;
    }

    calculateRetirement() {
        const currentAge = parseInt(document.getElementById('currentAge').value);
        const retirementAge = parseInt(document.getElementById('retirementAge').value);
        const currentSavings = parseFloat(document.getElementById('currentSavings').value) || 0;
        const monthlyContrib = parseFloat(document.getElementById('monthlyPension').value) || 0;
        const desiredPension = parseFloat(document.getElementById('desiredPension').value) || 0;
        const annualReturn = parseFloat(document.getElementById('pensionReturn').value) || 0;

        const yearsToRetirement = retirementAge - currentAge;
        const monthlyRate = annualReturn / 100 / 12;
        const months = yearsToRetirement * 12;

        // Buduća vrednost trenutnih ušteda
        const futureCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);

        // Buduća vrednost mesečnih doprinosa
        const futureMonthlyContribs = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        const totalRetirementFund = futureCurrentSavings + futureMonthlyContribs;

        // Koliko može da povlači mesečno (4% pravilo)
        const safeWithdrawalRate = 0.04 / 12;
        const monthlyPensionAmount = totalRetirementFund * safeWithdrawalRate;

        // Koliko treba da štedi da postigne željenu penziju
        const requiredFund = desiredPension / safeWithdrawalRate;
        const requiredMonthly = (requiredFund - futureCurrentSavings) / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        this.displayRetirementResults({
            totalRetirementFund,
            monthlyPensionAmount,
            desiredPension,
            requiredMonthly,
            yearsToRetirement,
            currentAge,
            retirementAge
        });
    }

    displayRetirementResults(results) {
        const container = document.getElementById('retirementResults');
        const isOnTrack = results.monthlyPensionAmount >= results.desiredPension;

        container.innerHTML = `
            <div class="results-summary">
                <div class="result-card">
                    <h3>Penzijski fond u ${results.retirementAge}. godini</h3>
                    <div class="result-value">${this.formatCurrency(results.totalRetirementFund)}</div>
                </div>
                <div class="result-card">
                    <h3>Mesečna penzija</h3>
                    <div class="result-value">${this.formatCurrency(results.monthlyPensionAmount)}</div>
                </div>
                <div class="result-card ${isOnTrack ? 'success' : 'warning'}">
                    <h3>Status cilja</h3>
                    <div class="result-value">
                        ${isOnTrack ? '✓ Na dobrom ste putu!' : '⚠ Treba poboljšanje'}
                    </div>
                </div>
            </div>

            ${!isOnTrack ? `
                <div class="recommendation">
                    <h4>Preporuke:</h4>
                    <p>Da postignete željenu mesečnu penziju od ${this.formatCurrency(results.desiredPension)}, 
                    trebalo bi da štedite <strong>${this.formatCurrency(Math.max(0, results.requiredMonthly))}</strong> mesečno.</p>
                    <p>To je ${this.formatCurrency(Math.max(0, results.requiredMonthly - parseFloat(document.getElementById('monthlyPension').value)))} 
                    više od trenutnog iznosa.</p>
                </div>
            ` : `
                <div class="recommendation success">
                    <h4>Čestitamo!</h4>
                    <p>Sa trenutnim planom štednje postićićete željenu penziju. 
                    Čak će vam ostati dodatnih ${this.formatCurrency(results.monthlyPensionAmount - results.desiredPension)} mesečno.</p>
                </div>
            `}

            <div class="retirement-timeline">
                <h4>Vremenska linija do penzije</h4>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-year">Danas (${results.currentAge} god.)</div>
                        <div class="timeline-desc">Počinjete štednju za penziju</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">${results.currentAge + Math.floor(results.yearsToRetirement/2)} god.</div>
                        <div class="timeline-desc">Polovina puta do penzije</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">${results.retirementAge} god.</div>
                        <div class="timeline-desc">Penzija! 🎉</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Portfolio analizer
    renderPortfolioAnalyzer() {
        const container = document.getElementById('portfolioAnalyzer');
        if (!container) return;

        container.innerHTML = `
            <div class="portfolio-form">
                <h4>Analiziraj svoj portfolio</h4>
                <div class="asset-allocation">
                    <div class="allocation-item">
                        <label>Akcije (%)</label>
                        <input type="range" id="stocksPercent" min="0" max="100" value="60" oninput="calculator.updatePortfolio()">
                        <span id="stocksValue">60%</span>
                    </div>
                    <div class="allocation-item">
                        <label>Obveznice (%)</label>
                        <input type="range" id="bondsPercent" min="0" max="100" value="30" oninput="calculator.updatePortfolio()">
                        <span id="bondsValue">30%</span>
                    </div>
                    <div class="allocation-item">
                        <label>Nekretnine (%)</label>
                        <input type="range" id="realEstatePercent" min="0" max="100" value="10" oninput="calculator.updatePortfolio()">
                        <span id="realEstateValue">10%</span>
                    </div>
                    <div class="allocation-item">
                        <label>Kripto (%)</label>
                        <input type="range" id="cryptoPercent" min="0" max="100" value="0" oninput="calculator.updatePortfolio()">
                        <span id="cryptoValue">0%</span>
                    </div>
                </div>
                <div class="portfolio-total">
                    Ukupno: <span id="portfolioTotal">100%</span>
                </div>
            </div>
            <div id="portfolioResults" class="portfolio-analysis"></div>
        `;

        this.updatePortfolio();
    }

    updatePortfolio() {
        const stocks = parseInt(document.getElementById('stocksPercent').value);
        const bonds = parseInt(document.getElementById('bondsPercent').value);
        const realEstate = parseInt(document.getElementById('realEstatePercent').value);
        const crypto = parseInt(document.getElementById('cryptoPercent').value);

        // Update display values
        document.getElementById('stocksValue').textContent = stocks + '%';
        document.getElementById('bondsValue').textContent = bonds + '%';
        document.getElementById('realEstateValue').textContent = realEstate + '%';
        document.getElementById('cryptoValue').textContent = crypto + '%';

        const total = stocks + bonds + realEstate + crypto;
        document.getElementById('portfolioTotal').textContent = total + '%';

        // Validate total
        if (total !== 100) {
            document.getElementById('portfolioTotal').style.color = '#ef4444';
            return;
        } else {
            document.getElementById('portfolioTotal').style.color = '#22c55e';
        }

        this.analyzePortfolio(stocks, bonds, realEstate, crypto);
    }

    analyzePortfolio(stocks, bonds, realEstate, crypto) {
        const allocation = {
            stocks: stocks / 100,
            bonds: bonds / 100,
            realEstate: realEstate / 100,
            crypto: crypto / 100
        };

        // Calculate expected return and risk
        const expectedReturn = 
            allocation.stocks * this.marketData.stocks.return +
            allocation.bonds * this.marketData.bonds.return +
            allocation.realEstate * this.marketData.realEstate.return +
            allocation.crypto * this.marketData.crypto.return;

        const portfolioVolatility = Math.sqrt(
            Math.pow(allocation.stocks * this.marketData.stocks.volatility, 2) +
            Math.pow(allocation.bonds * this.marketData.bonds.volatility, 2) +
            Math.pow(allocation.realEstate * this.marketData.realEstate.volatility, 2) +
            Math.pow(allocation.crypto * this.marketData.crypto.volatility, 2)
        );

        // Determine risk level
        let riskLevel = 'low';
        if (portfolioVolatility > 20) riskLevel = 'very-high';
        else if (portfolioVolatility > 15) riskLevel = 'high';
        else if (portfolioVolatility > 10) riskLevel = 'medium';

        this.displayPortfolioAnalysis({
            expectedReturn,
            portfolioVolatility,
            riskLevel,
            allocation
        });
    }

    displayPortfolioAnalysis(analysis) {
        const container = document.getElementById('portfolioResults');

        container.innerHTML = `
            <div class="analysis-summary">
                <div class="analysis-card">
                    <h4>Očekivani povrat</h4>
                    <div class="analysis-value">${analysis.expectedReturn.toFixed(1)}%</div>
                </div>
                <div class="analysis-card">
                    <h4>Volatilnost</h4>
                    <div class="analysis-value">${analysis.portfolioVolatility.toFixed(1)}%</div>
                </div>
                <div class="analysis-card">
                    <h4>Nivo rizika</h4>
                    <div class="analysis-value risk-${analysis.riskLevel}">
                        ${this.getRiskLevelText(analysis.riskLevel)}
                    </div>
                </div>
            </div>

            <div class="portfolio-chart">
                <h4>Raspored portfolija</h4>
                <canvas id="portfolioChart" width="300" height="300"></canvas>
            </div>

            <div class="portfolio-recommendations">
                <h4>Preporuke:</h4>
                ${this.generatePortfolioRecommendations(analysis)}
            </div>
        `;

        this.drawPortfolioChart(analysis.allocation);
    }

    getRiskLevelText(riskLevel) {
        const riskMap = {
            'low': 'Nizak',
            'medium': 'Srednji',
            'high': 'Visok',
            'very-high': 'Vrlo visok'
        };
        return riskMap[riskLevel] || riskLevel;
    }

    generatePortfolioRecommendations(analysis) {
        const recommendations = [];

        if (analysis.allocation.crypto > 0.1) {
            recommendations.push("🔸 Kripto čini više od 10% portfolija - ovo je vrlo rizično.");
        }

        if (analysis.allocation.stocks > 0.8) {
            recommendations.push("🔸 Previše izloženi akcijama - razmislite o diverzifikaciji.");
        }

        if (analysis.allocation.bonds < 0.2 && analysis.portfolioVolatility > 15) {
            recommendations.push("🔸 Dodajte obveznice za smanjenje rizika.");
        }

        if (analysis.expectedReturn < 5) {
            recommendations.push("🔸 Portfolio ima nizak očekivani povrat - razmislite o rizičnijim ulaganjima.");
        }

        if (recommendations.length === 0) {
            recommendations.push("✅ Portfolio je dobro balansiran za vaš profil rizika.");
        }

        return recommendations.map(rec => `<p>${rec}</p>`).join('');
    }

    drawPortfolioChart(allocation) {
        const canvas = document.getElementById('portfolioChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;

        const colors = {
            stocks: '#3B82F6',
            bonds: '#10B981',
            realEstate: '#F59E0B',
            crypto: '#EF4444'
        };

        const labels = {
            stocks: 'Akcije',
            bonds: 'Obveznice',
            realEstate: 'Nekretnine',
            crypto: 'Kripto'
        };

        let currentAngle = 0;

        Object.entries(allocation).forEach(([asset, percentage]) => {
            if (percentage > 0) {
                const sliceAngle = percentage * 2 * Math.PI;

                // Draw slice
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = colors[asset];
                ctx.fill();

                // Draw label
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

                ctx.fillStyle = '#fff';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`${labels[asset]}`, labelX, labelY);
                ctx.fillText(`${(percentage * 100).toFixed(0)}%`, labelX, labelY + 15);

                currentAngle += sliceAngle;
            }
        });
    }

    // Risk Assessment
    renderRiskAssessment() {
        const container = document.getElementById('riskAssessment');
        if (!container) return;

        const questions = [
            {
                question: "Koliko godina imate?",
                options: ["Manje od 30", "30-40", "40-50", "50-60", "Preko 60"],
                scores: [5, 4, 3, 2, 1]
            },
            {
                question: "Koliko dugo planirate da držite investicije?",
                options: ["Manje od 1 godine", "1-3 godine", "3-7 godina", "7-15 godina", "Više od 15 godina"],
                scores: [1, 2, 3, 4, 5]
            },
            {
                question: "Kakav je vaš stav prema riziku?",
                options: ["Izbegavam rizik", "Prihvatam mali rizik", "Umeren rizik", "Visok rizik", "Vrlo visok rizik"],
                scores: [1, 2, 3, 4, 5]
            },
            {
                question: "Šta biste uradili da vam investicija padne 20%?",
                options: ["Prodao bih odmah", "Brinuo bih se", "Ostao bih miran", "Kupovao bih više", "Srećan sam što mogu kupiti jeftinije"],
                scores: [1, 2, 3, 4, 5]
            }
        ];

        container.innerHTML = `
            <div class="risk-questionnaire">
                <h4>Procena profila rizika</h4>
                <form id="riskForm">
                    ${questions.map((q, index) => `
                        <div class="question-group">
                            <h5>${q.question}</h5>
                            ${q.options.map((option, optIndex) => `
                                <label class="radio-option">
                                    <input type="radio" name="q${index}" value="${q.scores[optIndex]}">
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    `).join('')}
                    <button type="button" class="btn btn-primary" onclick="calculator.calculateRiskProfile()">
                        Izračunaj profil rizika
                    </button>
                </form>
            </div>
            <div id="riskResults" class="risk-results"></div>
        `;
    }

    calculateRiskProfile() {
        const form = document.getElementById('riskForm');
        const formData = new FormData(form);
        let totalScore = 0;
        let answeredQuestions = 0;

        for (let [key, value] of formData.entries()) {
            totalScore += parseInt(value);
            answeredQuestions++;
        }

        if (answeredQuestions < 4) {
            alert('Molimo odgovorite na sva pitanja.');
            return;
        }

        const avgScore = totalScore / answeredQuestions;
        let riskProfile, recommendation;

        if (avgScore <= 2) {
            riskProfile = "Konzervativan";
            recommendation = "80% obveznice, 20% akcije";
        } else if (avgScore <= 3) {
            riskProfile = "Umeren";
            recommendation = "60% obveznice, 40% akcije";
        } else if (avgScore <= 4) {
            riskProfile = "Agresivan";
            recommendation = "30% obveznice, 60% akcije, 10% alternativni";
        } else {
            riskProfile = "Vrlo agresivan";
            recommendation = "20% obveznice, 60% akcije, 20% alternativni";
        }

        this.displayRiskResults({
            score: avgScore,
            profile: riskProfile,
            recommendation: recommendation
        });
    }

    displayRiskResults(results) {
        const container = document.getElementById('riskResults');

        container.innerHTML = `
            <div class="risk-profile-result">
                <h4>Vaš profil rizika</h4>
                <div class="profile-score">
                    <div class="score-circle">
                        <span class="score-value">${results.score.toFixed(1)}</span>
                        <span class="score-max">/5</span>
                    </div>
                    <div class="profile-info">
                        <h3>${results.profile}</h3>
                        <p>Na osnovu vaših odgovora, vaš profil tolerancije na rizik je "${results.profile.toLowerCase()}".</p>
                    </div>
                </div>
                
                <div class="recommended-allocation">
                    <h4>Preporučena alokacija:</h4>
                    <p>${results.recommendation}</p>
                    <button class="btn btn-secondary" onclick="calculator.applyRecommendedAllocation('${results.recommendation}')">
                        Primeni preporuku
                    </button>
                </div>
            </div>
        `;
    }

    applyRecommendedAllocation(recommendation) {
        // Parse recommendation and apply to portfolio analyzer
        // This would set the sliders in the portfolio analyzer
        alert('Preporuka je primenjena na portfolio analizer!');
        document.querySelector('[href="#portfolio"]').click();
    }

    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    setupEventListeners() {
        // Add any global event listeners here
    }
}

// Initialize calculator
const calculator = new InvestmentCalculator();

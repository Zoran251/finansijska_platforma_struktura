// Admin panel - admin.js
class AdminPanel {
    constructor() {
        this.users = this.loadUsers();
        this.systemStats = this.loadSystemStats();
        this.notifications = [];
        this.currentView = 'dashboard';
        this.init();
    }

    init() {
        this.renderAdminDashboard();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    loadUsers() {
        // Simulate user data - in real app this would come from backend
        return [
            {
                id: 1,
                name: "Ana Petrović",
                email: "ana@example.com",
                status: "active",
                joinDate: "2025-01-15",
                lastLogin: "2025-06-20",
                totalInvestments: 25000,
                role: "user",
                verified: true
            },
            {
                id: 2,
                name: "Marko Jovanović",
                email: "marko@example.com",
                status: "active",
                joinDate: "2025-02-03",
                lastLogin: "2025-06-19",
                totalInvestments: 50000,
                role: "premium",
                verified: true
            },
            {
                id: 3,
                name: "Jelena Nikolić",
                email: "jelena@example.com",
                status: "suspended",
                joinDate: "2025-03-12",
                lastLogin: "2025-06-10",
                totalInvestments: 15000,
                role: "user",
                verified: false
            }
        ];
    }

    loadSystemStats() {
        return {
            totalUsers: 1247,
            activeUsers: 1156,
            totalInvestments: 5847292,
            monthlyGrowth: 12.5,
            supportTickets: 23,
            systemHealth: 98.7
        };
    }

    renderAdminDashboard() {
        const container = document.getElementById('adminContent');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-header">
                <h2>Admin Dashboard</h2>
                <div class="admin-stats">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <div class="stat-info">
                            <div class="stat-value">${this.systemStats.totalUsers.toLocaleString()}</div>
                            <div class="stat-label">Ukupno korisnika</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-chart-line"></i>
                        <div class="stat-info">
                            <div class="stat-value">€${(this.systemStats.totalInvestments / 1000000).toFixed(1)}M</div>
                            <div class="stat-label">Ukupne investicije</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-percentage"></i>
                        <div class="stat-info">
                            <div class="stat-value">${this.systemStats.monthlyGrowth}%</div>
                            <div class="stat-label">Mesečni rast</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-heartbeat"></i>
                        <div class="stat-info">
                            <div class="stat-value">${this.systemStats.systemHealth}%</div>
                            <div class="stat-label">Status sistema</div>
                        </div>
                    </div>
                </div>
            </div>            <div class="admin-navigation">
                <button class="admin-nav-btn active" onclick="admin.switchView('dashboard')">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('users')">
                    <i class="fas fa-users"></i> Korisnici
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('consultations')">
                    <i class="fas fa-calendar-check"></i> Konsultacije
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('transactions')">
                    <i class="fas fa-exchange-alt"></i> Transakcije
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('support')">
                    <i class="fas fa-headset"></i> Podrška
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('reports')">
                    <i class="fas fa-chart-bar"></i> Izveštaji
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('settings')">
                    <i class="fas fa-cog"></i> Podešavanja
                </button>
            </div>

            <div id="adminViewContent" class="admin-view-content">
                ${this.renderDashboardView()}
            </div>
        `;
    }

    switchView(view) {
        this.currentView = view;
        
        // Update navigation
        document.querySelectorAll('.admin-nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Render view content
        const content = document.getElementById('adminViewContent');
          switch(view) {
            case 'dashboard':
                content.innerHTML = this.renderDashboardView();
                break;
            case 'users':
                content.innerHTML = this.renderUsersView();
                break;
            case 'consultations':
                content.innerHTML = this.renderConsultationsView();
                break;
            case 'transactions':
                content.innerHTML = this.renderTransactionsView();
                break;
            case 'support':
                content.innerHTML = this.renderSupportView();
                break;
            case 'reports':
                content.innerHTML = this.renderReportsView();
                break;
            case 'settings':
                content.innerHTML = this.renderSettingsView();
                break;
        }
    }

    renderDashboardView() {
        return `
            <div class="dashboard-grid">
                <div class="dashboard-section">
                    <h3>Aktivnost u realnom vremenu</h3>
                    <div class="activity-feed" id="activityFeed">
                        <div class="activity-item">
                            <i class="fas fa-user-plus text-success"></i>
                            <span>Novi korisnik se registrovao</span>
                            <time>pre 5 minuta</time>
                        </div>
                        <div class="activity-item">
                            <i class="fas fa-coins text-warning"></i>
                            <span>Nova investicija od €2,500</span>
                            <time>pre 12 minuta</time>
                        </div>
                        <div class="activity-item">
                            <i class="fas fa-ticket-alt text-info"></i>
                            <span>Novi support tiket kreiran</span>
                            <time>pre 18 minuta</time>
                        </div>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3>Sistem status</h3>
                    <div class="system-status">
                        <div class="status-item">
                            <span class="status-indicator active"></span>
                            <span>API Server</span>
                            <span class="status-value">Online</span>
                        </div>
                        <div class="status-item">
                            <span class="status-indicator active"></span>
                            <span>Database</span>
                            <span class="status-value">Online</span>
                        </div>
                        <div class="status-item">
                            <span class="status-indicator warning"></span>
                            <span>Payment Gateway</span>
                            <span class="status-value">Slow</span>
                        </div>
                        <div class="status-item">
                            <span class="status-indicator active"></span>
                            <span>Backup System</span>
                            <span class="status-value">Online</span>
                        </div>
                    </div>
                </div>

                <div class="dashboard-section full-width">
                    <h3>Grafik aktivnosti</h3>
                    <canvas id="activityChart" width="800" height="300"></canvas>
                </div>
            </div>
        `;
    }

    renderUsersView() {
        return `
            <div class="users-management">
                <div class="users-header">
                    <h3>Upravljanje korisnicima</h3>
                    <div class="users-actions">
                        <input type="text" placeholder="Pretraži korisnike..." id="userSearch" onkeyup="admin.filterUsers()">
                        <select id="userFilter" onchange="admin.filterUsers()">
                            <option value="">Svi korisnici</option>
                            <option value="active">Aktivni</option>
                            <option value="suspended">Suspendovani</option>
                            <option value="premium">Premium</option>
                        </select>
                        <button class="btn btn-primary" onclick="admin.showAddUserModal()">
                            <i class="fas fa-plus"></i> Dodaj korisnika
                        </button>
                    </div>
                </div>

                <div class="users-table">
                    <div class="table-header">
                        <span>Korisnik</span>
                        <span>Email</span>
                        <span>Status</span>
                        <span>Datum registracije</span>
                        <span>Poslednja aktivnost</span>
                        <span>Investicije</span>
                        <span>Akcije</span>
                    </div>
                    <div id="usersTableBody">
                        ${this.renderUsersTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderUsersTable() {
        return this.users.map(user => `
            <div class="table-row" data-user-id="${user.id}">
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-details">
                        <div class="user-name">${user.name}</div>
                        <div class="user-role">${user.role}</div>
                    </div>
                </div>
                <span>${user.email}</span>
                <span class="status-badge status-${user.status}">${user.status}</span>
                <span>${this.formatDate(user.joinDate)}</span>
                <span>${this.formatDate(user.lastLogin)}</span>
                <span>€${user.totalInvestments.toLocaleString()}</span>
                <div class="user-actions">
                    <button class="btn-sm" onclick="admin.viewUser(${user.id})" title="Prikaži">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-sm" onclick="admin.editUser(${user.id})" title="Uredi">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-danger" onclick="admin.suspendUser(${user.id})" title="Suspenduj">
                        <i class="fas fa-ban"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderTransactionsView() {
        const transactions = [
            {
                id: 'TXN-001',
                user: 'Ana Petrović',
                type: 'deposit',
                amount: 1500,
                status: 'completed',
                date: '2025-06-20T10:30:00'
            },
            {
                id: 'TXN-002',
                user: 'Marko Jovanović',
                type: 'withdrawal',
                amount: 750,
                status: 'pending',
                date: '2025-06-20T09:15:00'
            },
            {
                id: 'TXN-003',
                user: 'Jelena Nikolić',
                type: 'investment',
                amount: 2000,
                status: 'completed',
                date: '2025-06-19T16:45:00'
            }
        ];

        return `
            <div class="transactions-management">
                <div class="transactions-header">
                    <h3>Upravljanje transakcijama</h3>
                    <div class="transactions-filters">
                        <select id="transactionType">
                            <option value="">Svi tipovi</option>
                            <option value="deposit">Depoziti</option>
                            <option value="withdrawal">Povlačenja</option>
                            <option value="investment">Investicije</option>
                        </select>
                        <select id="transactionStatus">
                            <option value="">Svi statusi</option>
                            <option value="completed">Završeno</option>
                            <option value="pending">Na čekanju</option>
                            <option value="failed">Neuspešno</option>
                        </select>
                        <input type="date" id="transactionDate">
                    </div>
                </div>

                <div class="transactions-table">
                    <div class="table-header">
                        <span>ID Transakcije</span>
                        <span>Korisnik</span>
                        <span>Tip</span>
                        <span>Iznos</span>
                        <span>Status</span>
                        <span>Datum</span>
                        <span>Akcije</span>
                    </div>
                    ${transactions.map(txn => `
                        <div class="table-row">
                            <span class="transaction-id">${txn.id}</span>
                            <span>${txn.user}</span>
                            <span class="transaction-type type-${txn.type}">${this.getTransactionTypeText(txn.type)}</span>
                            <span class="transaction-amount">€${txn.amount.toLocaleString()}</span>
                            <span class="status-badge status-${txn.status}">${this.getTransactionStatusText(txn.status)}</span>
                            <span>${this.formatDateTime(txn.date)}</span>
                            <div class="transaction-actions">
                                <button class="btn-sm" onclick="admin.viewTransaction('${txn.id}')" title="Prikaži">
                                    <i class="fas fa-eye"></i>
                                </button>
                                ${txn.status === 'pending' ? `
                                    <button class="btn-sm btn-success" onclick="admin.approveTransaction('${txn.id}')" title="Odobri">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn-sm btn-danger" onclick="admin.rejectTransaction('${txn.id}')" title="Odbaci">
                                        <i class="fas fa-times"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSupportView() {
        const supportTickets = [
            {
                id: 'TIC-001',
                user: 'Ana Petrović',
                subject: 'Problem sa prijavom',
                priority: 'high',
                status: 'open',
                assignedTo: 'Admin',
                created: '2025-06-20T08:30:00'
            },
            {
                id: 'TIC-002',
                user: 'Marko Jovanović',
                subject: 'Pitanje o investicionom planu',
                priority: 'medium',
                status: 'in-progress',
                assignedTo: 'Support Team',
                created: '2025-06-19T14:20:00'
            }
        ];

        return `
            <div class="support-management">
                <div class="support-header">
                    <h3>Upravljanje podrškom</h3>
                    <div class="support-stats">
                        <div class="support-stat">
                            <span class="stat-number">23</span>
                            <span class="stat-label">Otvoreni tiketi</span>
                        </div>
                        <div class="support-stat">
                            <span class="stat-number">15</span>
                            <span class="stat-label">U radu</span>
                        </div>
                        <div class="support-stat">
                            <span class="stat-number">2.3h</span>
                            <span class="stat-label">Avg. vreme odgovora</span>
                        </div>
                    </div>
                </div>

                <div class="support-tickets">
                    <div class="tickets-header">
                        <h4>Support tiketi</h4>
                        <div class="tickets-filters">
                            <select id="ticketStatus">
                                <option value="">Svi statusi</option>
                                <option value="open">Otvoreni</option>
                                <option value="in-progress">U radu</option>
                                <option value="closed">Zatvoreni</option>
                            </select>
                            <select id="ticketPriority">
                                <option value="">Svi prioriteti</option>
                                <option value="high">Visok</option>
                                <option value="medium">Srednji</option>
                                <option value="low">Nizak</option>
                            </select>
                        </div>
                    </div>

                    <div class="tickets-list">
                        ${supportTickets.map(ticket => `
                            <div class="ticket-item" data-ticket-id="${ticket.id}">
                                <div class="ticket-header">
                                    <div class="ticket-id">${ticket.id}</div>
                                    <div class="ticket-priority priority-${ticket.priority}">${ticket.priority}</div>
                                    <div class="ticket-status status-${ticket.status}">${ticket.status}</div>
                                </div>
                                <div class="ticket-content">
                                    <h5>${ticket.subject}</h5>
                                    <div class="ticket-meta">
                                        <span><i class="fas fa-user"></i> ${ticket.user}</span>
                                        <span><i class="fas fa-user-cog"></i> ${ticket.assignedTo}</span>
                                        <span><i class="fas fa-clock"></i> ${this.formatDateTime(ticket.created)}</span>
                                    </div>
                                </div>
                                <div class="ticket-actions">
                                    <button class="btn-sm" onclick="admin.viewTicket('${ticket.id}')">
                                        <i class="fas fa-eye"></i> Prikaži
                                    </button>
                                    <button class="btn-sm" onclick="admin.assignTicket('${ticket.id}')">
                                        <i class="fas fa-user-tag"></i> Dodeli
                                    </button>
                                    <button class="btn-sm btn-success" onclick="admin.closeTicket('${ticket.id}')">
                                        <i class="fas fa-check"></i> Zatvori
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderReportsView() {
        return `
            <div class="reports-management">
                <div class="reports-header">
                    <h3>Izveštaji i analitika</h3>
                    <div class="report-actions">
                        <button class="btn btn-primary" onclick="admin.generateReport()">
                            <i class="fas fa-file-export"></i> Generiši izveštaj
                        </button>
                        <button class="btn btn-secondary" onclick="admin.scheduleReport()">
                            <i class="fas fa-clock"></i> Zakaži izveštaj
                        </button>
                    </div>
                </div>

                <div class="reports-grid">
                    <div class="report-card">
                        <h4>Finansijski izveštaj</h4>
                        <p>Pregled svih finansijskih transakcija i investicija</p>
                        <canvas id="financialChart" width="400" height="200"></canvas>
                        <button class="btn btn-sm" onclick="admin.viewReport('financial')">Prikaži detalje</button>
                    </div>

                    <div class="report-card">
                        <h4>Korisnička aktivnost</h4>
                        <p>Analiza aktivnosti korisnika i engagement metrike</p>
                        <canvas id="userActivityChart" width="400" height="200"></canvas>
                        <button class="btn btn-sm" onclick="admin.viewReport('user-activity')">Prikaži detalje</button>
                    </div>

                    <div class="report-card">
                        <h4>Performanse sistema</h4>
                        <p>Monitoring performansi i uptime statistike</p>
                        <canvas id="systemPerformanceChart" width="400" height="200"></canvas>
                        <button class="btn btn-sm" onclick="admin.viewReport('system')">Prikaži detalje</button>
                    </div>

                    <div class="report-card">
                        <h4>Support metrike</h4>
                        <p>Analiza support tiketa i zadovoljstvo korisnika</p>
                        <canvas id="supportChart" width="400" height="200"></canvas>
                        <button class="btn btn-sm" onclick="admin.viewReport('support')">Prikaži detalje</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderSettingsView() {
        return `
            <div class="settings-management">
                <div class="settings-header">
                    <h3>Sistemska podešavanja</h3>
                </div>

                <div class="settings-sections">
                    <div class="settings-section">
                        <h4>Osnovna podešavanja</h4>
                        <div class="settings-form">
                            <div class="form-group">
                                <label>Naziv aplikacije</label>
                                <input type="text" value="Golden Balance" id="appName">
                            </div>
                            <div class="form-group">
                                <label>Support email</label>
                                <input type="email" value="support@goldenbalance.com" id="supportEmail">
                            </div>
                            <div class="form-group">
                                <label>Maksimalna veličina file-a (MB)</label>
                                <input type="number" value="10" id="maxFileSize">
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4>Bezbednosna podešavanja</h4>
                        <div class="settings-form">
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked id="twoFactorRequired">
                                    Obavezna dvofaktorska autentifikacija
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked id="emailVerificationRequired">
                                    Obavezna verifikacija email-a
                                </label>
                            </div>
                            <div class="form-group">
                                <label>Session timeout (minuti)</label>
                                <input type="number" value="30" id="sessionTimeout">
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4>Finansijska podešavanja</h4>
                        <div class="settings-form">
                            <div class="form-group">
                                <label>Minimalni depozit (€)</label>
                                <input type="number" value="100" id="minDeposit">
                            </div>
                            <div class="form-group">
                                <label>Maksimalni dnevni withdraw (€)</label>
                                <input type="number" value="10000" id="maxDailyWithdraw">
                            </div>
                            <div class="form-group">
                                <label>Transaction fee (%)</label>
                                <input type="number" value="0.5" step="0.1" id="transactionFee">
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4>Notifikacije</h4>
                        <div class="settings-form">
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked id="emailNotifications">
                                    Email notifikacije
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked id="smsNotifications">
                                    SMS notifikacije
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked id="pushNotifications">
                                    Push notifikacije
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="admin.saveSettings()">
                        <i class="fas fa-save"></i> Sačuvaj podešavanja
                    </button>
                    <button class="btn btn-secondary" onclick="admin.resetSettings()">
                        <i class="fas fa-undo"></i> Vrati na default
                    </button>
                    <button class="btn btn-danger" onclick="admin.exportSettings()">
                        <i class="fas fa-download"></i> Exportuj podešavanja
                    </button>
                </div>
            </div>
        `;
    }

    renderConsultationsView() {
        const consultations = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        const pendingConsultations = consultations.filter(c => c.status === 'pending');
        const confirmedConsultations = consultations.filter(c => c.status === 'confirmed');
        const allConsultations = consultations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return `
            <div class="consultations-view">
                <div class="view-header">
                    <h2><i class="fas fa-calendar-check"></i> Upravljanje konsultacijama</h2>
                    <div class="consultation-stats">
                        <div class="stat-card">
                            <span class="stat-number">${pendingConsultations.length}</span>
                            <span class="stat-label">Čeka potvrdu</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">${confirmedConsultations.length}</span>
                            <span class="stat-label">Potvrđeno</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">${allConsultations.length}</span>
                            <span class="stat-label">Ukupno</span>
                        </div>
                    </div>
                </div>

                <div class="consultations-filters">
                    <button class="filter-btn active" onclick="admin.filterConsultations('all')">
                        Sve konsultacije
                    </button>
                    <button class="filter-btn" onclick="admin.filterConsultations('pending')">
                        Čeka potvrdu (${pendingConsultations.length})
                    </button>
                    <button class="filter-btn" onclick="admin.filterConsultations('confirmed')">
                        Potvrđeno (${confirmedConsultations.length})
                    </button>
                    <button class="filter-btn" onclick="admin.filterConsultations('cancelled')">
                        Otkazano
                    </button>
                </div>

                <div class="consultations-table">
                    <div class="table-header">
                        <span>Korisnik</span>
                        <span>Tip konsultacije</span>
                        <span>Datum i vreme</span>
                        <span>Status</span>
                        <span>Zakazano</span>
                        <span>Akcije</span>
                    </div>
                    <div id="consultationsTableBody">
                        ${this.renderConsultationsTable(allConsultations)}
                    </div>
                </div>
            </div>
        `;
    }

    renderConsultationsTable(consultations = null) {
        const consultationsData = consultations || JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        
        if (consultationsData.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>Nema zakazanih konsultacija</h3>
                    <p>Kada korisnici zakažu konsultacije, ovde će biti prikazane.</p>
                </div>
            `;
        }

        return consultationsData.map(consultation => `
            <div class="table-row consultation-row" data-consultation-id="${consultation.id}">
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-details">
                        <div class="user-name">${consultation.userInfo.name}</div>
                        <div class="user-email">${consultation.userInfo.email}</div>
                        ${consultation.userInfo.phone ? `<div class="user-phone">${consultation.userInfo.phone}</div>` : ''}
                    </div>
                </div>
                <div class="consultation-type">
                    <span class="type-badge">${this.getConsultationTypeText(consultation.userInfo.consultationType)}</span>
                    ${consultation.userInfo.message ? `<small class="consultation-message">${consultation.userInfo.message.substring(0, 100)}${consultation.userInfo.message.length > 100 ? '...' : ''}</small>` : ''}
                </div>
                <div class="consultation-datetime">
                    <div class="date">${this.formatDate(consultation.date)}</div>
                    <div class="time">${consultation.time}</div>
                </div>
                <span class="status-badge status-${consultation.status}">
                    ${this.getStatusText(consultation.status)}
                </span>
                <span class="created-date">${this.formatDateTime(consultation.createdAt)}</span>
                <div class="consultation-actions">
                    ${consultation.status === 'pending' ? `
                        <button class="btn-sm btn-success" onclick="admin.confirmConsultation('${consultation.id}')" title="Potvrdi">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-sm btn-warning" onclick="admin.rescheduleConsultation('${consultation.id}')" title="Premesti">
                            <i class="fas fa-clock"></i>
                        </button>
                    ` : ''}
                    <button class="btn-sm" onclick="admin.viewConsultationDetails('${consultation.id}')" title="Prikaži detalje">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-sm btn-danger" onclick="admin.cancelConsultation('${consultation.id}')" title="Otkaži">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
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

    getStatusText(status) {
        const statuses = {
            'pending': 'Čeka potvrdu',
            'confirmed': 'Potvrđeno',
            'cancelled': 'Otkazano',
            'completed': 'Završeno'
        };
        return statuses[status] || status;
    }

    // Metode za upravljanje konsultacijama
    confirmConsultation(consultationId) {
        const consultations = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        const consultation = consultations.find(c => c.id === consultationId);
        
        if (!consultation) {
            alert('Konsultacija nije pronađena');
            return;
        }

        // Potvrdi konsultaciju
        consultation.status = 'confirmed';
        consultation.confirmedAt = new Date().toISOString();
        
        // Sačuvaj izmene
        localStorage.setItem('consultationBookings', JSON.stringify(consultations));
        
        // Kreiraj notifikaciju za korisnika
        this.createConsultationNotification(consultation, 'confirmed');
        
        // Refresh view
        this.switchView('consultations');
        
        // Prikaži poruku
        this.showNotification(`Konsultacija za ${consultation.userInfo.name} je potvrđena`, 'success');
    }

    cancelConsultation(consultationId) {
        if (!confirm('Da li ste sigurni da želite da otkažete ovu konsultaciju?')) {
            return;
        }

        const consultations = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        const consultation = consultations.find(c => c.id === consultationId);
        
        if (!consultation) {
            alert('Konsultacija nije pronađena');
            return;
        }

        // Otkaži konsultaciju
        consultation.status = 'cancelled';
        consultation.cancelledAt = new Date().toISOString();
        
        // Sačuvaj izmene
        localStorage.setItem('consultationBookings', JSON.stringify(consultations));
        
        // Kreiraj notifikaciju za korisnika
        this.createConsultationNotification(consultation, 'cancelled');
        
        // Refresh view
        this.switchView('consultations');
        
        // Prikaži poruku
        this.showNotification(`Konsultacija za ${consultation.userInfo.name} je otkazana`, 'warning');
    }

    viewConsultationDetails(consultationId) {
        const consultations = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        const consultation = consultations.find(c => c.id === consultationId);
        
        if (!consultation) {
            alert('Konsultacija nije pronađena');
            return;
        }

        // Kreiraj modal za detalje konsultacije
        const modal = document.createElement('div');
        modal.className = 'admin-modal';
        modal.innerHTML = `
            <div class="admin-modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-calendar-check"></i> Detalji konsultacije</h3>
                    <button class="close-modal" onclick="this.closest('.admin-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="consultation-details">
                        <div class="detail-section">
                            <h4>Informacije o korisniku</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Ime i prezime:</label>
                                    <span>${consultation.userInfo.name}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Email:</label>
                                    <span>${consultation.userInfo.email}</span>
                                </div>
                                ${consultation.userInfo.phone ? `
                                <div class="detail-item">
                                    <label>Telefon:</label>
                                    <span>${consultation.userInfo.phone}</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Detalji konsultacije</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>ID konsultacije:</label>
                                    <span>${consultation.id}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Tip konsultacije:</label>
                                    <span>${this.getConsultationTypeText(consultation.userInfo.consultationType)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Datum:</label>
                                    <span>${this.formatDate(consultation.date)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Vreme:</label>
                                    <span>${consultation.time}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Status:</label>
                                    <span class="status-badge status-${consultation.status}">${this.getStatusText(consultation.status)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Zakazano:</label>
                                    <span>${this.formatDateTime(consultation.createdAt)}</span>
                                </div>
                                ${consultation.confirmedAt ? `
                                <div class="detail-item">
                                    <label>Potvrđeno:</label>
                                    <span>${this.formatDateTime(consultation.confirmedAt)}</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        ${consultation.userInfo.message ? `
                        <div class="detail-section">
                            <h4>Poruka korisnika</h4>
                            <div class="message-content">
                                ${consultation.userInfo.message}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${consultation.status === 'confirmed' ? `
                        <div class="detail-section zoom-section">
                            <h4>Zoom link za konsultaciju</h4>
                            <div class="zoom-link-container">
                                <input type="text" value="${consultation.zoomLink}" readonly class="zoom-link-input">
                                <button class="btn-copy" onclick="navigator.clipboard.writeText('${consultation.zoomLink}')">
                                    <i class="fas fa-copy"></i> Kopiraj
                                </button>
                            </div>
                            <small>Ovaj link je automatski poslat korisniku nakon potvrde.</small>
                        </div>
                        ` : ''}
                        
                        <div class="detail-section">
                            <h4>Beleške (interno)</h4>
                            <textarea id="consultationNotes" placeholder="Dodajte beleške o konsultaciji..." rows="4">${consultation.notes || ''}</textarea>
                            <button class="btn btn-primary" onclick="admin.saveConsultationNotes('${consultation.id}')">
                                <i class="fas fa-save"></i> Sačuvaj beleške
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    ${consultation.status === 'pending' ? `
                        <button class="btn btn-success" onclick="admin.confirmConsultation('${consultation.id}'); this.closest('.admin-modal').remove();">
                            <i class="fas fa-check"></i> Potvrdi konsultaciju
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="this.closest('.admin-modal').remove()">
                        Zatvori
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveConsultationNotes(consultationId) {
        const notes = document.getElementById('consultationNotes').value;
        const consultations = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        const consultation = consultations.find(c => c.id === consultationId);
        
        if (consultation) {
            consultation.notes = notes;
            localStorage.setItem('consultationBookings', JSON.stringify(consultations));
            this.showNotification('Beleške su sačuvane', 'success');
        }
    }

    createConsultationNotification(consultation, action) {
        const notifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
        
        let notification;
        if (action === 'confirmed') {
            notification = {
                id: 'NOTIF-' + Date.now(),
                type: 'consultation_confirmed',
                title: 'Konsultacija potvrđena',
                message: `Vaša konsultacija za ${this.formatDate(consultation.date)} u ${consultation.time} je potvrđena. Zoom link: ${consultation.zoomLink}`,
                bookingId: consultation.id,
                read: false,
                createdAt: new Date().toISOString(),
                zoomLink: consultation.zoomLink
            };
        } else if (action === 'cancelled') {
            notification = {
                id: 'NOTIF-' + Date.now(),
                type: 'consultation_cancelled',
                title: 'Konsultacija otkazana',
                message: `Vaša konsultacija za ${this.formatDate(consultation.date)} u ${consultation.time} je otkazana. Molimo zakažite novi termin.`,
                bookingId: consultation.id,
                read: false,
                createdAt: new Date().toISOString()
            };
        }
        
        if (notification) {
            notifications.unshift(notification);
            localStorage.setItem('userNotifications', JSON.stringify(notifications));
        }
    }

    filterConsultations(filter) {
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const consultations = JSON.parse(localStorage.getItem('consultationBookings') || '[]');
        let filteredConsultations;
        
        switch(filter) {
            case 'pending':
                filteredConsultations = consultations.filter(c => c.status === 'pending');
                break;
            case 'confirmed':
                filteredConsultations = consultations.filter(c => c.status === 'confirmed');
                break;
            case 'cancelled':
                filteredConsultations = consultations.filter(c => c.status === 'cancelled');
                break;
            default:
                filteredConsultations = consultations;
        }
        
        // Update table
        const tableBody = document.getElementById('consultationsTableBody');
        if (tableBody) {
            tableBody.innerHTML = this.renderConsultationsTable(filteredConsultations);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // ...existing code...
}

// Initialize admin panel
const admin = new AdminPanel();

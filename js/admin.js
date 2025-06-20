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
            </div>

            <div class="admin-navigation">
                <button class="admin-nav-btn active" onclick="admin.switchView('dashboard')">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </button>
                <button class="admin-nav-btn" onclick="admin.switchView('users')">
                    <i class="fas fa-users"></i> Korisnici
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

    // User management methods
    viewUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modal = this.createUserModal(user);
        document.body.appendChild(modal);
    }

    createUserModal(user) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal user-modal">
                <div class="modal-header">
                    <h3>Detalji korisnika - ${user.name}</h3>
                    <button class="btn-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="user-details-grid">
                        <div class="user-profile">
                            <div class="profile-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="profile-info">
                                <h4>${user.name}</h4>
                                <p>${user.email}</p>
                                <span class="status-badge status-${user.status}">${user.status}</span>
                            </div>
                        </div>
                        
                        <div class="user-stats">
                            <div class="stat-item">
                                <label>Ukupne investicije:</label>
                                <span>€${user.totalInvestments.toLocaleString()}</span>
                            </div>
                            <div class="stat-item">
                                <label>Datum registracije:</label>
                                <span>${this.formatDate(user.joinDate)}</span>
                            </div>
                            <div class="stat-item">
                                <label>Poslednja aktivnost:</label>
                                <span>${this.formatDate(user.lastLogin)}</span>
                            </div>
                            <div class="stat-item">
                                <label>Tip naloga:</label>
                                <span class="role-badge role-${user.role}">${user.role}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-actions-section">
                        <h4>Akcije</h4>
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="admin.sendMessage(${user.id})">
                                <i class="fas fa-envelope"></i> Pošalji poruku
                            </button>
                            <button class="btn btn-warning" onclick="admin.resetPassword(${user.id})">
                                <i class="fas fa-key"></i> Resetuj lozinku
                            </button>
                            <button class="btn btn-secondary" onclick="admin.generateUserReport(${user.id})">
                                <i class="fas fa-file-alt"></i> Generiši izveštaj
                            </button>
                            ${user.status === 'active' ? `
                                <button class="btn btn-danger" onclick="admin.suspendUser(${user.id})">
                                    <i class="fas fa-ban"></i> Suspenduj
                                </button>
                            ` : `
                                <button class="btn btn-success" onclick="admin.activateUser(${user.id})">
                                    <i class="fas fa-check"></i> Aktiviraj
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    suspendUser(userId) {
        if (confirm('Da li ste sigurni da želite da suspendujeте ovog korisnika?')) {
            const user = this.users.find(u => u.id === userId);
            if (user) {
                user.status = 'suspended';
                this.updateUsersTable();
                this.showNotification('Korisnik je uspešno suspendovan.', 'success');
            }
        }
    }

    activateUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.status = 'active';
            this.updateUsersTable();
            this.showNotification('Korisnik je uspešno aktiviran.', 'success');
        }
    }

    // Transaction management
    approveTransaction(transactionId) {
        if (confirm('Da li ste sigurni da želite da odobrite ovu transakciju?')) {
            this.showNotification(`Transakcija ${transactionId} je odobrena.`, 'success');
            // Update transaction status in the UI
        }
    }

    rejectTransaction(transactionId) {
        const reason = prompt('Unesite razlog odbacivanja:');
        if (reason) {
            this.showNotification(`Transakcija ${transactionId} je odbaćena.`, 'error');
            // Update transaction status in the UI
        }
    }

    // Support management
    assignTicket(ticketId) {
        const agents = ['Admin', 'Support Agent 1', 'Support Agent 2', 'Support Agent 3'];
        const agent = prompt(`Dodelite tiket sledećem agentu:\n${agents.join('\n')}\n\nUnesite ime:`);
        
        if (agent && agents.includes(agent)) {
            this.showNotification(`Tiket ${ticketId} je dodeljen agentu ${agent}.`, 'success');
        }
    }

    closeTicket(ticketId) {
        if (confirm('Da li ste sigurni da želite da zatvorite ovaj tiket?')) {
            this.showNotification(`Tiket ${ticketId} je zatvoren.`, 'success');
        }
    }

    // Settings management
    saveSettings() {
        // Collect all form values
        const settings = {
            appName: document.getElementById('appName').value,
            supportEmail: document.getElementById('supportEmail').value,
            maxFileSize: document.getElementById('maxFileSize').value,
            // Add more settings...
        };

        // Simulate saving to backend
        setTimeout(() => {
            this.showNotification('Podešavanja su uspešno sačuvana.', 'success');
        }, 1000);
    }

    resetSettings() {
        if (confirm('Da li ste sigurni da želite da vratite sva podešavanja na default vrednosti?')) {
            this.showNotification('Podešavanja su vraćena na default vrednosti.', 'info');
            // Reset all form values
        }
    }

    // Utility methods
    updateUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (tbody) {
            tbody.innerHTML = this.renderUsersTable();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateSystemStats();
            this.updateActivityFeed();
        }, 30000); // Update every 30 seconds
    }

    updateSystemStats() {
        // Simulate changing stats
        this.systemStats.activeUsers += Math.floor(Math.random() * 10) - 5;
        this.systemStats.totalInvestments += Math.floor(Math.random() * 1000);
        
        // Update UI if on dashboard
        if (this.currentView === 'dashboard') {
            // Update stats in UI
        }
    }

    updateActivityFeed() {
        const activities = [
            'Novi korisnik se registrovao',
            'Nova investicija kreirana',
            'Support tiket rešen',
            'Withdrawal zahtev odobren',
            'Sistem backup završen'
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        // Add to activity feed if visible
        const feed = document.getElementById('activityFeed');
        if (feed) {
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <i class="fas fa-circle text-info"></i>
                <span>${randomActivity}</span>
                <time>upravo sada</time>
            `;
            feed.insertBefore(newActivity, feed.firstChild);

            // Keep only last 10 activities
            if (feed.children.length > 10) {
                feed.removeChild(feed.lastChild);
            }
        }
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('sr-RS');
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleDateString('sr-RS', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getTransactionTypeText(type) {
        const typeMap = {
            'deposit': 'Depozit',
            'withdrawal': 'Povlačenje',
            'investment': 'Investicija'
        };
        return typeMap[type] || type;
    }

    getTransactionStatusText(status) {
        const statusMap = {
            'completed': 'Završeno',
            'pending': 'Na čekanju',
            'failed': 'Neuspešno'
        };
        return statusMap[status] || status;
    }

    setupEventListeners() {
        // Add any global admin event listeners here
    }
}

// Initialize admin panel
const admin = new AdminPanel();

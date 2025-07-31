    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
        background: var(--dark-bg);
        position: relative;
        min-height: 100vh;
        color: var(--light-text);
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        overflow-x: hidden;
    }
    
    body::before {
        content: '';
        position: fixed;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at center, transparent 30%, var(--dark-bg) 70%), 
                    radial-gradient(circle at top left, var(--gold-bright), transparent 40%),
                    radial-gradient(circle at bottom right, var(--gold-dark), transparent 40%),
                    radial-gradient(circle at top right, var(--gold-medium), transparent 40%);
        background-size: 100% 100%, 50% 50%, 50% 50%, 50% 50%;
        background-position: center, top left, bottom right, top right;
        filter: blur(60px);
        opacity: 0.1;
        z-index: -2;
        transform: rotate(0deg);
        animation: backgroundAnimation 30s infinite alternate ease-in-out;
    }
    
    @keyframes backgroundAnimation {
        0% {
            transform: rotate(0deg) scale(1);
        }
        100% {
            transform: rotate(5deg) scale(1.1);
        }
    }

    .container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2.5rem;
        width: 90%;
        background: rgba(16, 16, 18, 0.3);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--box-shadow);
        position: relative;
        overflow: hidden;
        border: 1px solid var(--border-light);
        backdrop-filter: blur(10px);
    }
    
    .container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.03), transparent);
        pointer-events: none;
        z-index: -1;
    }

    /* Header */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2.5rem;
        background: rgba(16, 16, 18, 0.7);
        backdrop-filter: blur(16px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        position: sticky;
        top: 0;
        z-index: 1000;
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        margin: 0 1rem 1rem 1rem;
        border: 1px solid var(--border-light);
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .logo {
        font-size: 1.6rem;
        font-weight: 800;
        background: var(--gradient-gold);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        z-index: 1;
        letter-spacing: 0.5px;
        box-shadow: var(--box-shadow);
    }

    .btn i {
        margin-right: 0.5rem;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0));
        transform: translateX(-100%);
        transition: transform 0.6s ease;
        z-index: -1;
    }
    
    .btn:hover::before {
        transform: translateX(100%);
    }
    
    .btn:hover {
        transform: translateY(-3px);
    }
    
    .btn:active {
        transform: translateY(0);
    }

    .btn-primary {
        background: var(--gradient-gold);
        color: white;
    }

    .btn-primary:hover {
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
    }

    .btn-danger {
        background-color: var(--danger);
        color: white;
    }

    .btn-danger:hover {
        background-color: #dc2626;
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
    }

    .success-message {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
        color: var(--gold-bright);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        transition: opacity 0.3s ease;
        border: 1px solid rgba(212, 175, 55, 0.3);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .success-message i {
        margin-right: 0.75rem;
        font-size: 1.25em;
        color: var(--gold-bright);
    }
    
    /* Budget Planner Styles */
    .budget-planner {
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-top: 2rem;
        box-shadow: var(--shadow);
    }
    
    .income-section {
        margin-bottom: 1.5rem;
    }
    
    .income-section h4 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: var(--gray-700);
    }
    
    .input-group {
        display: flex;
        gap: 0.5rem;
    }
    
    .budget-categories {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .category-card {
        background-color: var(--gray-100);
        border-radius: 0.5rem;
        padding: 1.25rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }
    
    .category-header h4 {
        font-size: 1.1rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .category-percent {
        font-weight: 600;
        color: var(--primary);
    }
    
    .category-amount {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .category-desc {
        font-size: 0.875rem;
        color: var(--gray-500);
        margin-bottom: 1rem;
        min-height: 2.5rem;
    }
    
    .category-progress {
        height: 0.5rem;
        background-color: var(--gray-200);
        border-radius: 1rem;
        margin-bottom: 1rem;
        overflow: hidden;
    }
    
    .progress-bar {
        height: 100%;
        border-radius: 1rem;
    }
    
    .category-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .category-control label {
        font-size: 0.875rem;
        color: var(--gray-500);
    }
    
    .percent-slider {
        flex: 1;
        -webkit-appearance: none;
        appearance: none;
        height: 0.5rem;
        background: var(--gray-200);
        border-radius: 1rem;
        outline: none;
    }
    
    .percent-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: var(--primary);
        cursor: pointer;
        border: none;
    }
    
    .percent-slider::-moz-range-thumb {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: var(--primary);
        cursor: pointer;
        border: none;
    }
    
    .budget-note {
        background-color: #f0f9ff;
        border-left: 4px solid var(--primary);
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 0.375rem;
        font-size: 0.9rem;
    }
    
    .transaction-amount.savings {
        color: var(--success);
    }
    
    /* Expense Tracker Styles */
    .expenses-tracker {
        margin-top: 2rem;
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: var(--shadow);
    }
    
    .expense-tabs {
        display: flex;
        border-bottom: 1px solid var(--gray-200);
        margin-bottom: 1.5rem;
        overflow-x: auto;
    }
    
    .expense-tab {
        padding: 0.75rem 1.25rem;
        background: none;
        border: none;
        border-bottom: 3px solid transparent;
        color: var(--gray-500);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .expense-tab:hover {
        color: var(--primary);
    }
    
    .expense-tab.active {
        color: var(--primary);
        border-bottom-color: var(--primary);
    }
    
    .expense-tab-content {
        display: none;
    }
    
    .expense-tab-content.active {
        display: block;
    }
    
    .expense-form {
        background-color: var(--gray-100);
        border-radius: 0.5rem;
        padding: 1.25rem;
        margin-bottom: 1.5rem;
    }
    
    .expense-form h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: var(--gray-700);
    }
    
    .expense-form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        align-items: end;
    }
    
    .expense-form-col {
        display: flex;
        flex-direction: column;
    }
    
    .expense-form-col label {
        font-size: 0.875rem;
        color: var(--gray-700);
        margin-bottom: 0.5rem;
    }
    
    .expense-form-col input {
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--gray-200);
        border-radius: 0.375rem;
        background: rgba(255, 255, 255, 0.9);
        color: #000000;
    }
    
    .expense-form-button {
        align-self: flex-end;
    }
    
    .expense-table-container {
        overflow-x: auto;
    }
    
    .expense-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .expense-table th {
        background-color: var(--gray-100);
        padding: 0.75rem 1rem;
        text-align: left;
        font-weight: 600;
        color: var(--gray-700);
        border-bottom: 2px solid var(--gray-200);
    }
    
    .expense-table td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .expense-table tbody tr:hover {
        background-color: var(--gray-100);
    }
    
    .expense-table tfoot td {
        font-weight: 600;
        border-top: 2px solid var(--gray-200);
    }
    
    .expense-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .expense-actions button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.2s ease;
    }
    
    .expense-delete {
        color: var(--danger);
    }
    
    .expense-delete:hover {
        background-color: rgba(239, 68, 68, 0.1);
    }
    
    @media (max-width: 768px) {
        .expense-form-row {
            grid-template-columns: 1fr;
        }
    }

    /* Profile Layout */
    .profile-container {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 2rem;
        margin-top: 1rem;
    }

    @media (max-width: 768px) {
        .profile-container {
            grid-template-columns: 1fr;
        }
    }

    /* Sidebar */
    .sidebar {
        background: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        padding: 1.5rem;
        height: fit-content;
    }

    .profile-info {
        text-align: center;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--gray-200);
        margin-bottom: 1.5rem;
    }

    .profile-pic {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 1rem;
        border: 4px solid var(--primary);
    }

    .profile-name {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .profile-email {
        color: var(--muted-text);
        font-size: 0.875rem;
    }

    .nav-menu {
        list-style: none;
        padding: 0;
        margin-top: 1rem;
    }

    .nav-item {
        margin-bottom: 0.25rem;
    }

    .nav-link {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        color: var(--light-text);
        text-decoration: none;
        border-radius: var(--border-radius);
        transition: all 0.3s ease;
        background: rgba(22, 22, 26, 0.5);
        border: 1px solid transparent;
    }
    
    .expense-form {
        background-color: rgba(22, 22, 26, 0.5);
        border-radius: var(--border-radius);
        padding: 1.25rem;
        margin-bottom: 1.5rem;
        border: 1px solid var(--border-light);
        box-shadow: var(--box-shadow);
    }

    .expense-form h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: #D4AF37;
        background: var(--gradient-gold);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .expense-form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        align-items: end;
    }

    .expense-form-col {
        display: flex;
        flex-direction: column;
    }

    .nav-link:hover, .nav-link.active {
        background: var(--gradient-gold);
        color: white;
        border: 1px solid rgba(212, 175, 55, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .nav-link i {
        width: 20px;
        margin-right: 0.75rem;
        text-align: center;
    }

    /* Main Content */
    .main-content {
        background: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        padding: 2rem;
    }

    .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: var(--primary);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .section-title i {
        font-size: 1.25em;
    }

    /* Form Styles */
    .form-group {
        margin-bottom: 1.25rem;
    }

    .form-row {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.25rem;
    }

    .form-col {
        flex: 1;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--light-text);
    }

    .form-control {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid var(--border-light);
        border-radius: var(--border-radius);
        color: #000000;
        font-size: 1rem;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    .form-control:focus {
        outline: none;
        border-color: var(--gold-medium);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
    }
    
    textarea.form-control {
        min-height: 100px;
        resize: vertical;
    }

    /* Budget Stats */
    .budget-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(22, 22, 26, 0.6);
        border-radius: var(--border-radius);
        padding: 1.25rem;
        box-shadow: var(--box-shadow);
        text-align: center;
        flex: 1;
        border: 1px solid var(--border-light);
        backdrop-filter: blur(5px);
        position: relative;
        overflow: hidden;
    }
    
    .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), transparent);
        pointer-events: none;
    }

    .stat-card.income {
        border-color: var(--success);
    }

    .stat-card.expense {
        border-color: var(--danger);
    }

    .stat-value {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0.5rem 0;
        background: var(--gradient-gold);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .stat-card.income .stat-value {
        color: var(--success);
    }

    .stat-card.expense .stat-value {
        color: var(--danger);
    }

    .stat-label {
        color: var(--muted-text);
        font-size: 0.875rem;
        letter-spacing: 0.5px;
    }

    /* Transactions */
    .transactions-list {
        margin-top: 2rem;
    }

    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: rgba(22, 22, 26, 0.4);
        border: 1px solid var(--border-light);
        border-radius: var(--border-radius);
        margin-bottom: 0.75rem;
        backdrop-filter: blur(5px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .transaction-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        border-color: rgba(212, 175, 55, 0.3);
    }

    .transaction-item:last-child {
        border-bottom: none;
    }

    .transaction-info {
        flex: 1;
    }

    .transaction-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
    }

    .transaction-category {
        font-size: 0.875rem;
        color: var(--gray-500);
    }

    .transaction-amount {
        font-weight: 600;
    }

    .income {
        color: var(--success);
    }

    .expense {
        color: var(--danger);
    }

    /* Danger Zone */
    .danger-zone {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #fee2e2;
    }

    .danger-zone h3 {
        color: var(--danger);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .danger-zone p {
        color: var(--gray-500);
        margin-bottom: 1.5rem;
    }

    /* Modal */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        background: rgba(22, 22, 26, 0.85);
        border-radius: var(--border-radius-lg);
        width: 90%;
        max-width: 500px;
        padding: 2rem;
        position: relative;
        border: 1px solid var(--border-light);
        box-shadow: var(--box-shadow);
        backdrop-filter: blur(10px);
        overflow: hidden;
    }
    
    .modal-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), transparent);
        pointer-events: none;
        z-index: -1;
    }

    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--gray-500);
    }

    .modal-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
        justify-content: flex-end;
    }

    /* Responsive */
    @media (max-width: 640px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }

        .form-col {
            margin-bottom: 1.25rem;
        }

        .form-col:last-child {
            margin-bottom: 0;
        }
    }

    /* ========================================= */
    /* KOMPLETNA MOBILNA RESPONSIVNOST - PROFILE */
    /* ========================================= */

    /* Mobile Optimization */
    @media (max-width: 768px) {
        body {
            font-size: 16px; /* Prevent iOS zoom */
            overflow-x: hidden;
        }

        /* Header - Mobile */
        .header {
            padding: 0.75rem 1rem !important;
        }

        .header-content {
            flex-direction: column !important;
            gap: 1rem;
            align-items: stretch !important;
        }

        .logo {
            justify-content: center !important;
        }

        .nav-links {
            flex-direction: column !important;
            gap: 0.5rem !important;
            width: 100%;
        }

        .nav-links a {
            padding: 0.75rem 1rem !important;
            text-align: center;
            border-radius: 0.5rem;
            background: rgba(212, 175, 55, 0.1);
        }

        /* Main Container - Mobile */
        .main-container {
            margin-top: 120px !important; /* Account for taller mobile header */
            padding: 1rem !important;
            max-width: 100% !important;
        }

        /* Sidebar - Mobile */
        .sidebar {
            position: fixed !important;
            top: 0;
            left: -100%;
            width: 280px !important;
            height: 100vh;
            z-index: 1001;
            transition: left 0.3s ease !important;
            overflow-y: auto;
            padding-top: 120px !important;
        }

        .sidebar.active {
            left: 0 !important;
        }

        /* Mobile sidebar toggle */
        .mobile-menu-toggle {
            display: block !important;
            position: fixed;
            top: 80px;
            left: 1rem;
            z-index: 1002;
            background: var(--gold-bright);
            color: var(--dark-bg);
            border: none;
            padding: 0.75rem;
            border-radius: 0.5rem;
            font-size: 1.25rem;
            cursor: pointer;
            box-shadow: var(--box-shadow);
        }

        /* Content Area - Mobile */
        .content-area {
            margin-left: 0 !important;
            padding: 1rem !important;
            width: 100% !important;
        }

        /* Dashboard Grid - Mobile */
        .dashboard-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
        }

        /* Stats Cards - Mobile */
        .stat-card {
            padding: 1.5rem 1rem !important;
            text-align: center;
        }

        .stat-card h3 {
            font-size: 1.5rem !important;
        }

        .stat-card p {
            font-size: 0.9rem !important;
        }

        /* Charts - Mobile */
        .chart-container {
            padding: 1rem !important;
            margin: 1rem 0 !important;
        }

        /* Forms - Mobile */
        .form-container {
            padding: 1.5rem 1rem !important;
            margin: 1rem 0 !important;
        }

        .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
        }

        .form-row {
            flex-direction: column !important;
            gap: 1rem !important;
        }

        .form-group {
            width: 100% !important;
            margin-bottom: 1rem !important;
        }

        /* Buttons - Mobile */
        .btn, .primary-btn, .secondary-btn {
            width: 100% !important;
            padding: 1rem !important;
            font-size: 1rem !important;
            min-height: 48px; /* Touch target */
            margin-bottom: 0.5rem;
        }

        .btn-group {
            flex-direction: column !important;
            gap: 0.5rem !important;
        }

        /* Tables - Mobile */
        .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .table {
            min-width: 600px;
            font-size: 0.875rem;
        }

        .table th,
        .table td {
            padding: 0.5rem !important;
            white-space: nowrap;
        }

        /* Navigation Tabs - Mobile */
        .nav-tabs {
            flex-direction: column !important;
            gap: 0.25rem !important;
        }

        .nav-tab {
            width: 100% !important;
            text-align: center !important;
            padding: 1rem !important;
        }

        /* Modals - Mobile */
        .modal-content {
            width: 95vw !important;
            max-width: none !important;
            margin: 1rem auto !important;
            padding: 1.5rem 1rem !important;
            max-height: calc(100vh - 2rem) !important;
            overflow-y: auto;
        }

        /* Typography - Mobile */
        h1 { font-size: 1.75rem !important; }
        h2 { font-size: 1.5rem !important; }
        h3 { font-size: 1.25rem !important; }
        h4 { font-size: 1.125rem !important; }
        h5 { font-size: 1rem !important; }

        /* Cards - Mobile */
        .card {
            margin: 1rem 0 !important;
            padding: 1.5rem 1rem !important;
        }

        .card-header {
            padding: 1rem !important;
            text-align: center;
        }

        .card-body {
            padding: 1rem !important;
        }

        /* Budget specific - Mobile */
        .budget-category {
            padding: 1rem !important;
            margin: 0.5rem 0 !important;
        }

        .expense-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
            padding: 1rem !important;
        }

        /* Budget Stats - Mobile Enhanced */
        .budget-stats {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            margin: 1rem 0 !important;
        }

        .stat-card {
            padding: 1.25rem 1rem !important;
            text-align: center !important;
        }

        .stat-card h3 {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
        }

        .stat-card .stat-value {
            font-size: 1.75rem !important;
            font-weight: bold !important;
            margin: 0.5rem 0 !important;
        }

        .stat-card .stat-label {
            font-size: 0.9rem !important;
            opacity: 0.8;
        }

        /* Budget Planner - Mobile */
        .budget-planner {
            padding: 1rem !important;
            margin: 1rem 0 !important;
        }

        .budget-planner h3 {
            font-size: 1.25rem !important;
            margin-bottom: 1rem !important;
            text-align: center;
        }

        .budget-categories {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
        }

        .budget-category {
            padding: 1.25rem 1rem !important;
            border-radius: 0.75rem !important;
        }

        .budget-category h4 {
            font-size: 1.1rem !important;
            margin-bottom: 0.75rem !important;
            text-align: center;
        }

        .budget-inputs {
            flex-direction: column !important;
            gap: 0.75rem !important;
        }

        .budget-inputs input {
            width: 100% !important;
            padding: 0.875rem !important;
            font-size: 16px !important; /* Prevent iOS zoom */
        }

        .budget-progress {
            margin: 1rem 0 !important;
        }

        .progress-bar {
            height: 10px !important;
            border-radius: 5px !important;
            margin: 0.5rem 0 !important;
        }

        .progress-text {
            display: flex !important;
            justify-content: space-between !important;
            font-size: 0.85rem !important;
            margin-top: 0.5rem !important;
        }

        /* Settings Section - Mobile Enhanced */
        #settingsSection {
            padding: 1rem !important;
        }

        #settingsSection .section-title {
            font-size: 1.5rem !important;
            text-align: center !important;
            margin-bottom: 1.5rem !important;
        }

        #settingsSection .form-group {
            margin-bottom: 1.5rem !important;
            padding: 1.25rem 1rem !important;
            background: rgba(22, 22, 26, 0.5) !important;
            border-radius: 0.75rem !important;
            border: 1px solid var(--border-light) !important;
        }

        #settingsSection h3 {
            font-size: 1.25rem !important;
            margin-bottom: 1rem !important;
            text-align: center !important;
            color: var(--gold-bright) !important;
        }

        #settingsSection .form-label {
            font-size: 0.95rem !important;
            margin-bottom: 0.5rem !important;
            font-weight: 600 !important;
        }

        #settingsSection .form-control {
            width: 100% !important;
            padding: 0.875rem !important;
            font-size: 16px !important; /* Prevent iOS zoom */
            border-radius: 0.5rem !important;
            margin-bottom: 1rem !important;
        }

        /* Danger Zone - Mobile */
        .danger-zone {
            background: rgba(239, 68, 68, 0.1) !important;
            border: 1px solid rgba(239, 68, 68, 0.3) !important;
            border-radius: 0.75rem !important;
            padding: 1.25rem 1rem !important;
            margin-top: 2rem !important;
            text-align: center !important;
        }

        .danger-zone h3 {
            color: #ef4444 !important;
            font-size: 1.1rem !important;
            margin-bottom: 0.75rem !important;
        }

        .danger-zone p {
            font-size: 0.9rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.5 !important;
        }

        .btn-danger {
            background: #ef4444 !important;
            color: white !important;
            width: 100% !important;
            padding: 1rem !important;
            font-size: 1rem !important;
            border-radius: 0.5rem !important;
            border: none !important;
            font-weight: 600 !important;
        }

        /* Budget Action Buttons - Mobile */
        .budget-actions {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.75rem !important;
            margin-top: 1.5rem !important;
        }

        .budget-actions .btn {
            width: 100% !important;
            padding: 1rem !important;
            font-size: 1rem !important;
            border-radius: 0.5rem !important;
        }

        /* Income/Expense Forms - Mobile */
        .income-expense-forms {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
            margin: 2rem 0 !important;
        }

        .income-form, .expense-form {
            background: rgba(22, 22, 26, 0.7) !important;
            padding: 1.5rem 1rem !important;
            border-radius: 0.75rem !important;
            border: 1px solid var(--border-light) !important;
        }

        .income-form h4, .expense-form h4 {
            font-size: 1.2rem !important;
            margin-bottom: 1rem !important;
            text-align: center !important;
        }

        /* Budget Summary Cards - Mobile */
        .budget-summary {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
            margin: 1.5rem 0 !important;
        }

        .summary-card {
            background: rgba(22, 22, 26, 0.8) !important;
            padding: 1.25rem 1rem !important;
            border-radius: 0.75rem !important;
            border-left: 4px solid var(--gold-bright) !important;
            text-align: center !important;
        }

        .summary-card.income {
            border-left-color: #10b981 !important;
        }

        .summary-card.expense {
            border-left-color: #ef4444 !important;
        }

        .summary-card.balance {
            border-left-color: var(--gold-bright) !important;
        }

        .summary-value {
            font-size: 1.5rem !important;
            font-weight: bold !important;
            margin: 0.5rem 0 !important;
        }

        .summary-label {
            font-size: 0.9rem !important;
            opacity: 0.8 !important;
        }

        /* Progress bars - Mobile */
        .progress-container {
            margin: 1rem 0 !important;
        }

        .progress-bar {
            height: 8px !important;
            border-radius: 4px;
        }

        /* Spacing adjustments - Mobile */
        .mb-4 { margin-bottom: 1.5rem !important; }
        .mt-4 { margin-top: 1.5rem !important; }
        .py-4 { padding: 1.5rem 0 !important; }
        .px-4 { padding: 0 1rem !important; }
    }

    /* Extra Small Devices */
    @media (max-width: 480px) {
        .main-container {
            padding: 0.5rem !important;
        }

        .content-area {
            padding: 0.5rem !important;
        }

        .card {
            padding: 1rem 0.75rem !important;
        }

        .form-container {
            padding: 1rem 0.75rem !important;
        }

        .mobile-menu-toggle {
            left: 0.5rem !important;
            padding: 0.5rem !important;
        }

        /* Form improvements for very small screens */
        input, select, textarea {
            font-size: 16px !important; /* Prevent zoom on iOS */
            padding: 0.875rem !important;
        }

        .btn {
            padding: 0.875rem !important;
            font-size: 0.95rem !important;
        }
    }

    /* Tablet Portrait */
    @media (min-width: 769px) and (max-width: 1024px) {
        .main-container {
            padding: 1.5rem !important;
        }

        .dashboard-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }

        .sidebar {
            width: 220px !important;
        }

        .content-area {
            margin-left: 220px !important;
        }
    }

    /* Touch-friendly improvements */
    @media (hover: none) and (pointer: coarse) {
        /* Touch devices */
        button, .btn, a, input[type="submit"] {
            min-height: 44px;
            min-width: 44px;
        }

        /* Larger tap targets */
        .nav-tab {
            padding: 1rem !important;
        }

        /* Remove hover effects on touch devices */
        .card:hover,
        .stat-card:hover {
            transform: none !important;
        }
    }

    /* Print styles */
    @media print {
        .sidebar,
        .mobile-menu-toggle,
        .header {
            display: none !important;
        }

        .content-area {
            margin-left: 0 !important;
            width: 100% !important;
        }

        body {
            color: #000 !important;
            background: #fff !important;
        }

        .card {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
    }
</style>

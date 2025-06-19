<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Golden Balance | Finansijska platforma</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="js/finansijskiKalkulator.js" defer></script>
    <link rel="stylesheet" href="css/styles.css">
    
    <style>
        /* Minimalni stilovi potrebni za chat */
        .support-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            max-width: 90vw;
            height: 500px;
            max-height: 80vh;
            background: rgba(22, 22, 26, 0.95);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(212, 175, 55, 0.3);
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
        }

        .support-chat.collapsed {
            transform: translateY(120%);
            opacity: 0;
            pointer-events: none;
        }

        .chat-header {
            padding: 1rem;
            background: linear-gradient(135deg, #D4AF37, #F7E98E);
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chat-title {
            color: black;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .chat-actions {
            display: flex;
            gap: 0.5rem;
        }

        .chat-actions .btn {
            background: none;
            border: none;
            color: black;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .chat-actions .btn:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .chat-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        .chat-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            background: rgba(16, 16, 18, 0.8);
        }

        .chat-input {
            padding: 1rem;
            display: flex;
            gap: 0.5rem;
            background: rgba(22, 22, 26, 0.9);
        }

        .chat-input input {
            flex: 1;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 8px;
            color: white;
        }

        .send-message {
            background: linear-gradient(135deg, #D4AF37, #B8860B);
            border: none;
            color: black;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        .ai-chat-button {
            background: linear-gradient(45deg, #D4AF37, #FFD700);
            color: black;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin: 10px;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #0A0A0A;
            color: white;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h1>Golden Balance - Test Chat Stranica</h1>
    
    <button class="ai-chat-button" id="openSupport">
        <i class="fas fa-headset"></i>
        <span>Tehnička podrška</span>
    </button>
    
    <!-- Support Chat Interface -->
    <div id="supportChat" class="support-chat collapsed">
        <div class="chat-header">
            <div class="chat-title">
                <i class="fas fa-headset"></i> Tehnička Podrška
            </div>
            <div class="chat-actions">
                <button class="btn" aria-label="Minimize">
                    <i class="fas fa-minus"></i>
                </button>
                <button class="btn" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="chat-body">
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Unesite vašu poruku..." id="chatInput">
                <button class="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Chat Support Scripts -->
    <script src="js/support-kb.js"></script>
</body>
</html>

import reflex as rx
from finansijska_platforma_struktura.pages.main_page import index
from finansijska_platforma_struktura.pages.preview_page import preview
from finansijska_platforma_struktura.pages.admin_page import admin
from finansijska_platforma_struktura.pages.profile_page import profile
from finansijska_platforma_struktura.states.finance_state import FinanceState

css = """
:root {
    --gold-bright: #D4AF37; /* Svetla zlatna */
    --gold-medium: #C5A028; /* Srednja zlatna */
    --gold-dark: #A8861D; /* Tamna zlatna */
    --gold-pale: #E6C870; /* Bleda zlatna */
    --gradient-gold: linear-gradient(135deg, #D4AF37, #C5A028, #A8861D); /* Zlatni gradijent */
    --gradient-gold-light: linear-gradient(135deg, #E6C870, #D4AF37); /* Svetli zlatni gradijent */
    --gradient-gold-dark: linear-gradient(135deg, #A8861D, #856614); /* Tamni zlatni gradijent */
    --dark-bg: #0E0E10; /* Tamna pozadina */
    --dark-card: #16161A; /* Tamna kartica */
    --dark-accent: #222224; /* Tamni akcentni element */
    --light-text: #F8F8FF; /* Svetli tekst */
    --muted-text: #BBBBBB; /* Prigušeni tekst */
    --border-light: rgba(212, 175, 55, 0.2);
    --glass-effect: rgba(212, 175, 55, 0.03);
    --box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    --border-radius: 1rem;
    --border-radius-lg: 1.5rem;
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
}

/* Modern Background Effect */
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
"""

app = rx.App(
    theme=rx.theme(
        appearance="dark",
        accent_color="amber",
        radius="large",
        font_family="Inter",
    ),
    head_components=[
        rx.el.link(
            rel="preconnect",
            href="https://fonts.googleapis.com",
        ),
        rx.el.link(
            rel="preconnect",
            href="https://fonts.gstatic.com",
            crossorigin="",
        ),
        rx.el.link(
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
            rel="stylesheet",
        ),
        rx.el.link(
            rel="stylesheet",
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
            integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==",
            crossorigin="anonymous",
            referrerpolicy="no-referrer",
        ),
        rx.el.script(
            src="https://cdn.jsdelivr.net/npm/chart.js",
        ),
    ],
    stylesheets=["/tailwind_styles.css"],
    style=css,
)

# Dodajemo sve stranice
app.add_page(index, route="/")
app.add_page(preview, route="/preview")
app.add_page(admin, route="/admin") 
app.add_page(profile, route="/profile")
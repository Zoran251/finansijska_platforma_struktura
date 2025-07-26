import reflex as rx
from finansijska_platforma_struktura.components.navbar import navbar
from finansijska_platforma_struktura.states.finance_state import FinanceState

def login_section():
    return rx.box(
        rx.vstack(
            rx.heading(
                "Admin Prijava", 
                size="xl", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.text(
                "Unesite svoje pristupne podatke za pristup admin panelu.",
                color="var(--muted-text)",
                margin_bottom="4",
            ),
            rx.form(
                rx.vstack(
                    rx.form_control(
                        rx.form_label("Email"),
                        rx.input(
                            placeholder="Unesite email adresu",
                            name="email",
                            type_="email",
                            background="rgba(31, 41, 55, 0.4)",
                            border="1px solid var(--border-light)",
                            color="var(--light-text)",
                        ),
                        is_required=True,
                    ),
                    rx.form_control(
                        rx.form_label("Lozinka"),
                        rx.input(
                            placeholder="Unesite lozinku",
                            name="password",
                            type_="password",
                            background="rgba(31, 41, 55, 0.4)",
                            border="1px solid var(--border-light)",
                            color="var(--light-text)",
                        ),
                        is_required=True,
                    ),
                    rx.button(
                        "Prijavi se",
                        type_="submit",
                        class_name="gold-button",
                        width="100%",
                    ),
                    spacing="4",
                    width="100%",
                ),
                on_submit=FinanceState.admin_login,
            ),
            width="100%",
            align_items="stretch",
        ),
        width="100%",
    )

def logo_management_tab():
    return rx.box(
        rx.vstack(
            rx.heading(
                "Upravljanje Logotipom", 
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.text(
                "Ovde možete postaviti ili promeniti logo koji će biti prikazan na svim stranicama aplikacije.",
                color="var(--muted-text)",
                margin_bottom="4",
            ),
            rx.box(
                rx.vstack(
                    rx.image(
                        src="/assets/1.jpg",
                        alt="Logo aplikacije",
                        max_width="200px",
                        max_height="200px",
                        id="currentLogo",
                    ),
                    rx.text(
                        "Trenutni logo",
                        color="var(--gold-medium)",
                        font_weight="600",
                    ),
                    rx.center(
                        rx.vstack(
                            rx.icon("image_not_supported", font_size="3em", color="var(--muted-text)"),
                            rx.text("Nema dostupnog pregleda", color="var(--muted-text)"),
                        ),
                        id="noPreview",
                        display="none",
                    ),
                    align_items="center",
                    spacing="4",
                ),
                width="100%",
                padding="1rem",
                border="1px dashed var(--gold-medium)",
                border_radius="var(--border-radius)",
                display="flex",
                flex_direction="column",
                align_items="center",
                gap="var(--spacing-md)",
                margin_bottom="var(--spacing-lg)",
                class_name="logo-preview",
            ),
            rx.form(
                rx.vstack(
                    rx.form_control(
                        rx.form_label("URL adresa loga"),
                        rx.input(
                            placeholder="https://example.com/logo.png",
                            name="logoUrl",
                            background="rgba(31, 41, 55, 0.4)",
                            border="1px solid var(--border-light)",
                            color="var(--light-text)",
                        ),
                        is_required=False,
                    ),
                    rx.text("ILI", align="center", color="var(--muted-text)"),
                    rx.form_control(
                        rx.form_label("Učitaj logo sa računara"),
                        rx.input(
                            type_="file",
                            accept="image/*",
                            name="logoUpload",
                            background="rgba(31, 41, 55, 0.4)",
                            border="1px solid var(--border-light)",
                            color="var(--light-text)",
                            padding="0.5rem",
                        ),
                        is_required=False,
                    ),
                    rx.button(
                        "Sačuvaj logo",
                        type_="submit",
                        class_name="gold-button",
                        width="100%",
                    ),
                    spacing="4",
                    width="100%",
                ),
            ),
            width="100%",
            align_items="stretch",
        ),
        width="100%",
        display=rx.cond(FinanceState.is_admin_logged_in, "block", "none"),
    )

def data_view_tab():
    return rx.box(
        rx.vstack(
            rx.heading(
                "Pregled Podataka", 
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.text(
                "Ovde možete pregledati sve podatke koji su sačuvani u bazi podataka aplikacije.",
                color="var(--muted-text)",
                margin_bottom="4",
            ),
            rx.box(
                rx.hstack(
                    rx.button(
                        rx.hstack(
                            rx.icon("refresh"),
                            rx.text("Osveži podatke"),
                        ),
                        class_name="gold-button",
                    ),
                    rx.select(
                        ["Svi podaci", "Korisnici", "Transakcije", "Budžeti", "Podešavanja"],
                        placeholder="Filtriraj po tipu",
                        width="200px",
                        background="rgba(31, 41, 55, 0.4)",
                        border="1px solid var(--border-light)",
                        color="var(--light-text)",
                    ),
                    justify="space-between",
                    width="100%",
                    margin_bottom="4",
                ),
                width="100%",
            ),
            rx.box(
                rx.vstack(
                    *[
                        rx.box(
                            rx.vstack(
                                rx.hstack(
                                    rx.heading(
                                        f"Kategorija: {cat['name']}", 
                                        size="md",
                                        background="var(--gradient-gold)",
                                        background_clip="text",
                                        webkit_text_fill_color="transparent",
                                    ),
                                    rx.spacer(),
                                    rx.button(
                                        "Pogledaj",
                                        class_name="gold-button",
                                        size="sm",
                                    ),
                                    rx.button(
                                        "Izbriši",
                                        background="red.500",
                                        size="sm",
                                    ),
                                    width="100%",
                                ),
                                rx.text(
                                    f"Procenat: {cat['percent']}%, Opis: {cat['description']}",
                                    color="var(--muted-text)",
                                ),
                                align_items="stretch",
                                width="100%",
                                spacing="2",
                            ),
                            padding="1rem",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            background="var(--dark-card)",
                            margin_bottom="1rem",
                            width="100%",
                        )
                        for cat in FinanceState.budget_categories
                    ],
                    align_items="stretch",
                    width="100%",
                ),
                width="100%",
                max_height="500px",
                overflow="auto",
                id="data-entries",
            ),
            width="100%",
            align_items="stretch",
        ),
        width="100%",
        display=rx.cond(FinanceState.is_admin_logged_in, "none", "none"), # Privremeno isključeno
    )

def inquiries_tab():
    return rx.box(
        rx.vstack(
            rx.heading(
                "Upiti korisnika", 
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.text(
                "Pregled i upravljanje upitima koje su korisnici poslali preko kontakt forme.",
                color="var(--muted-text)",
                margin_bottom="4",
            ),
            rx.box(
                rx.hstack(
                    rx.button(
                        rx.hstack(
                            rx.icon("refresh"),
                            rx.text("Osveži upite"),
                        ),
                        class_name="gold-button",
                    ),
                    rx.select(
                        ["Svi upiti", "Neodgovoreni", "Odgovoreni", "Arhivirani"],
                        placeholder="Filtriraj po statusu",
                        width="200px",
                        background="rgba(31, 41, 55, 0.4)",
                        border="1px solid var(--border-light)",
                        color="var(--light-text)",
                    ),
                    justify="space-between",
                    width="100%",
                    margin_bottom="4",
                ),
                width="100%",
                class_name="inquiries-actions",
            ),
            rx.box(
                rx.table(
                    rx.thead(
                        rx.tr(
                            rx.th("ID", color="var(--gold-medium)"),
                            rx.th("Datum", color="var(--gold-medium)"),
                            rx.th("Ime", color="var(--gold-medium)"),
                            rx.th("Email", color="var(--gold-medium)"),
                            rx.th("Predmet", color="var(--gold-medium)"),
                            rx.th("Status", color="var(--gold-medium)"),
                            rx.th("Akcije", color="var(--gold-medium)"),
                        )
                    ),
                    rx.tbody(
                        rx.tr(
                            rx.td("1"),
                            rx.td("15.06.2025"),
                            rx.td("Ana Anić"),
                            rx.td("ana@example.com"),
                            rx.td("Problem sa prijavom"),
                            rx.td(rx.badge("Neodgovoren", color_scheme="red")),
                            rx.td(
                                rx.hstack(
                                    rx.icon("mail", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("check", cursor="pointer", _hover={"color": "green.400"}),
                                    rx.icon("delete", cursor="pointer", _hover={"color": "red.400"}),
                                    justify="center",
                                )
                            ),
                            _hover={"background": "var(--dark-accent)"},
                        ),
                        rx.tr(
                            rx.td("2"),
                            rx.td("12.06.2025"),
                            rx.td("Petar Petrović"),
                            rx.td("petar@example.com"),
                            rx.td("Zahtev za novu funkcionalnost"),
                            rx.td(rx.badge("Odgovoren", color_scheme="green")),
                            rx.td(
                                rx.hstack(
                                    rx.icon("mail", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("check", cursor="pointer", _hover={"color": "green.400"}),
                                    rx.icon("delete", cursor="pointer", _hover={"color": "red.400"}),
                                    justify="center",
                                )
                            ),
                            _hover={"background": "var(--dark-accent)"},
                        ),
                    ),
                    class_name="data-table",
                    width="100%",
                ),
                width="100%",
                overflow="auto",
                class_name="inquiries-list",
            ),
            width="100%",
            align_items="stretch",
        ),
        width="100%",
        display=rx.cond(FinanceState.is_admin_logged_in, "none", "none"), # Privremeno isključeno
    )

def notifications_tab():
    return rx.box(
        rx.vstack(
            rx.heading(
                "Upravljanje notifikacijama", 
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.text(
                "Kreiranje i slanje notifikacija korisnicima. Ove notifikacije će biti prikazane u njihovom notifikacionom centru.",
                color="var(--muted-text)",
                margin_bottom="4",
            ),
            rx.box(
                rx.hstack(
                    rx.button(
                        rx.hstack(
                            rx.icon("refresh"),
                            rx.text("Osveži notifikacije"),
                        ),
                        class_name="gold-button",
                        margin_right="2",
                    ),
                    rx.button(
                        rx.hstack(
                            rx.icon("add"),
                            rx.text("Nova notifikacija"),
                        ),
                        on_click=FinanceState.toggle_notification_form,
                        class_name="gold-button",
                    ),
                    rx.spacer(),
                    rx.select(
                        ["Sve notifikacije", "Zakazani sastanci", "Obaveštenja", "Važno"],
                        placeholder="Filtriraj po tipu",
                        width="200px",
                        background="rgba(31, 41, 55, 0.4)",
                        border="1px solid var(--border-light)",
                        color="var(--light-text)",
                    ),
                    justify="space-between",
                    width="100%",
                    margin_bottom="4",
                ),
                width="100%",
                class_name="notifications-actions",
            ),
            
            # Forma za kreiranje nove notifikacije
            rx.box(
                rx.form(
                    rx.vstack(
                        rx.heading(
                            "Nova notifikacija", 
                            size="md", 
                            margin_bottom="2",
                            background="var(--gradient-gold)",
                            background_clip="text",
                            webkit_text_fill_color="transparent",
                        ),
                        rx.form_control(
                            rx.form_label("Naslov notifikacije"),
                            rx.input(
                                placeholder="Unesite naslov notifikacije",
                                name="notification_title",
                                background="rgba(31, 41, 55, 0.4)",
                                border="1px solid var(--border-light)",
                                color="var(--light-text)",
                                value=FinanceState.notification_title,
                                on_change=FinanceState.set_notification_title,
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Poruka notifikacije"),
                            rx.text_area(
                                placeholder="Unesite poruku notifikacije",
                                name="notification_message",
                                background="rgba(31, 41, 55, 0.4)",
                                border="1px solid var(--border-light)",
                                color="var(--light-text)",
                                height="100px",
                                value=FinanceState.notification_message,
                                on_change=FinanceState.set_notification_message,
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Tip notifikacije"),
                            rx.select(
                                ["Obaveštenje", "Zakazani sastanak", "Važno"],
                                placeholder="Izaberite tip notifikacije",
                                name="notification_type",
                                background="rgba(31, 41, 55, 0.4)",
                                border="1px solid var(--border-light)",
                                color="var(--light-text)",
                                value=FinanceState.notification_type,
                                on_change=FinanceState.set_notification_type,
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Primaoci"),
                            rx.select(
                                ["Svi korisnici", "Premium korisnici", "Standardni korisnici", "Pojedinačni korisnik"],
                                placeholder="Izaberite primaoce",
                                name="notification_recipients",
                                background="rgba(31, 41, 55, 0.4)",
                                border="1px solid var(--border-light)",
                                color="var(--light-text)",
                                value=FinanceState.notification_recipients,
                                on_change=FinanceState.set_notification_recipients,
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Email korisnika (opciono)"),
                            rx.input(
                                placeholder="Unesite email za pojedinačnog korisnika",
                                name="notification_user_email",
                                background="rgba(31, 41, 55, 0.4)",
                                border="1px solid var(--border-light)",
                                color="var(--light-text)",
                                value=FinanceState.notification_user_email,
                                on_change=FinanceState.set_notification_user_email,
                                disabled=rx.cond(FinanceState.notification_recipients != "Pojedinačni korisnik", True, False),
                            ),
                            is_required=False,
                        ),
                        rx.hstack(
                            rx.button(
                                "Odustani",
                                on_click=FinanceState.toggle_notification_form,
                                style={
                                    "background": "var(--dark-accent)",
                                    "color": "var(--gold-pale)",
                                    "border": "1px solid var(--gold-dark)"
                                },
                            ),
                            rx.button(
                                "Pošalji notifikaciju",
                                type_="submit",
                                class_name="gold-button",
                            ),
                            justify="space-between",
                            width="100%",
                        ),
                        spacing="4",
                        width="100%",
                    ),
                    on_submit=FinanceState.send_notification,
                ),
                width="100%",
                padding="1.5rem",
                border="1px solid var(--border-light)",
                border_radius="var(--border-radius)",
                background="var(--dark-card)",
                margin_bottom="1.5rem",
                display=rx.cond(FinanceState.show_notification_form, "block", "none"),
            ),
            
            # Lista postojećih notifikacija
            rx.box(
                rx.table(
                    rx.thead(
                        rx.tr(
                            rx.th("ID", color="var(--gold-medium)"),
                            rx.th("Datum", color="var(--gold-medium)"),
                            rx.th("Naslov", color="var(--gold-medium)"),
                            rx.th("Tip", color="var(--gold-medium)"),
                            rx.th("Primaoci", color="var(--gold-medium)"),
                            rx.th("Status", color="var(--gold-medium)"),
                            rx.th("Akcije", color="var(--gold-medium)"),
                        )
                    ),
                    rx.tbody(
                        rx.tr(
                            rx.td("1"),
                            rx.td("15.07.2025"),
                            rx.td("Važno obaveštenje o novim funkcionalnostima"),
                            rx.td(rx.badge("Obaveštenje", color_scheme="blue")),
                            rx.td("Svi korisnici"),
                            rx.td(rx.badge("Poslato", color_scheme="green")),
                            rx.td(
                                rx.hstack(
                                    rx.icon("visibility", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("edit", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("delete", cursor="pointer", _hover={"color": "red.400"}),
                                    justify="center",
                                )
                            ),
                            _hover={"background": "var(--dark-accent)"},
                        ),
                        rx.tr(
                            rx.td("2"),
                            rx.td("13.07.2025"),
                            rx.td("Zakazani sastanak sa finansijskim savetnikom"),
                            rx.td(rx.badge("Sastanak", color_scheme="orange")),
                            rx.td("Premium korisnici"),
                            rx.td(rx.badge("Poslato", color_scheme="green")),
                            rx.td(
                                rx.hstack(
                                    rx.icon("visibility", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("edit", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("delete", cursor="pointer", _hover={"color": "red.400"}),
                                    justify="center",
                                )
                            ),
                            _hover={"background": "var(--dark-accent)"},
                        ),
                        rx.tr(
                            rx.td("3"),
                            rx.td("10.07.2025"),
                            rx.td("Podsetnik o plaćanju"),
                            rx.td(rx.badge("Važno", color_scheme="red")),
                            rx.td("petar@example.com"),
                            rx.td(rx.badge("Poslato", color_scheme="green")),
                            rx.td(
                                rx.hstack(
                                    rx.icon("visibility", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("edit", cursor="pointer", _hover={"color": "var(--gold-medium)"}),
                                    rx.icon("delete", cursor="pointer", _hover={"color": "red.400"}),
                                    justify="center",
                                )
                            ),
                            _hover={"background": "var(--dark-accent)"},
                        ),
                    ),
                    class_name="data-table",
                    width="100%",
                ),
                width="100%",
                overflow="auto",
                max_height="500px",
                class_name="notifications-list-container",
            ),
            width="100%",
            align_items="stretch",
        ),
        width="100%",
        display=rx.cond(FinanceState.is_admin_logged_in, "block", "none"),
    )

def admin_tabs():
    return rx.box(
        rx.vstack(
            rx.hstack(
                rx.heading(
                    "Admin Panel", 
                    size="xl", 
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                ),
                rx.spacer(),
                rx.button(
                    rx.hstack(
                        rx.icon("logout"),
                        rx.text("Odjava"),
                    ),
                    on_click=FinanceState.admin_logout,
                    style={
                        "background": "var(--dark-accent)",
                        "color": "var(--gold-pale)",
                        "border": "1px solid var(--gold-dark)"
                    },
                ),
                width="100%",
            ),
            rx.box(
                rx.hstack(
                    rx.button(
                        "Upravljanje logotipom",
                        style={
                            "margin_right": "1rem",
                            "background": "transparent",
                            "color": "var(--gold-bright)",
                            "border": "none",
                            "font_weight": "600",
                            "padding": "0.5rem 1rem",
                            "border_bottom": "2px solid var(--gold-bright)"
                        },
                        class_name="tab-button active",
                        id="logoTabBtn",
                    ),
                    rx.button(
                        "Pregled podataka",
                        style={
                            "margin_right": "1rem",
                            "background": "transparent",
                            "color": "var(--muted-text)",
                            "border": "none",
                            "font_weight": "600",
                            "padding": "0.5rem 1rem"
                        },
                        class_name="tab-button",
                        id="dataTabBtn",
                    ),
                    rx.button(
                        "Upiti korisnika",
                        style={
                            "margin_right": "1rem",
                            "background": "transparent",
                            "color": "var(--muted-text)",
                            "border": "none",
                            "font_weight": "600",
                            "padding": "0.5rem 1rem"
                        },
                        class_name="tab-button",
                        id="inquiriesTabBtn",
                    ),
                    rx.button(
                        "Notifikacije",
                        style={
                            "margin_right": "1rem",
                            "background": "transparent",
                            "color": "var(--muted-text)",
                            "border": "none",
                            "font_weight": "600",
                            "padding": "0.5rem 1rem"
                        },
                        class_name="tab-button",
                        id="notificationsTabBtn",
                        on_click=FinanceState.switch_to_notifications_tab,
                    ),
                ),
                width="100%",
                class_name="admin-tabs",
                margin_bottom="var(--spacing-lg)",
                border_bottom="1px solid var(--border-light)",
                padding_bottom="1rem",
            ),
            logo_management_tab(),
            data_view_tab(),
            inquiries_tab(),
            notifications_tab(),
            width="100%",
            align_items="stretch",
        ),
        width="100%",
        display=rx.cond(FinanceState.is_admin_logged_in, "block", "none"),
    )

def admin_page_script():
    return rx.script(
        """
        document.addEventListener('DOMContentLoaded', function() {
            // Funkcija za prebacivanje između tabova
            function setupTabs() {
                const tabButtons = document.querySelectorAll('.tab-button');
                const tabs = document.querySelectorAll('[id$="Tab"]');
                
                tabButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Resetovanje stila za sve tabove
                        tabButtons.forEach(btn => {
                            btn.style.color = 'var(--muted-text)';
                            btn.style.borderBottom = 'none';
                            btn.classList.remove('active');
                        });
                        
                        // Postavljanje aktivnog stila za trenutni tab
                        this.style.color = 'var(--gold-bright)';
                        this.style.borderBottom = '2px solid var(--gold-bright)';
                        this.classList.add('active');
                        
                        // Sakrivanje svih sadržaja
                        tabs.forEach(tab => {
                            if (tab.id === this.id.replace('Btn', '')) {
                                tab.style.display = 'block';
                            } else {
                                tab.style.display = 'none';
                            }
                        });
                    });
                });
                
                // Inicijalno prikazivanje prvog taba
                if (tabButtons.length > 0) {
                    tabButtons[0].click();
                }
            }
            
            // Pozivanje funkcije za postavljanje tabova
            setupTabs();
            
            // Inicijalizacija admin notifikacija ako je dostupno
            if (typeof AdminNotifications !== 'undefined') {
                AdminNotifications.init();
            }
            
            // Inicijalizacija admin konsultacija ako je dostupno
            if (typeof initAdminConsultations === 'function') {
                initAdminConsultations();
            }
                AdminNotifications.init();
            }
        });
        """
    )

def admin():
    return rx.box(
        navbar(),
        rx.container(
            rx.box(
                rx.cond(
                    FinanceState.is_admin_logged_in,
                    admin_tabs(),
                    login_section(),
                ),
                padding="2.5rem",
                width="90%",
                max_width="1200px",
                background="rgba(16, 16, 18, 0.3)",
                border_radius="var(--border-radius-lg)",
                box_shadow="var(--box-shadow)",
                position="relative",
                overflow="hidden",
                border="1px solid var(--border-light)",
                backdrop_filter="blur(10px)",
                margin="2rem auto",
                class_name="container",
            ),
            width="100%",
        ),
        # Dodavanje skripti za notifikacije
        rx.script(src="/js/admin_notifications.js"),
        rx.script(src="/js/user_notifications.js"),
        rx.script(src="/js/notification_integration.js"),
        rx.script(src="/js/admin_consultations.js"),
        rx.script(src="/js/admin_consultation_filters.js"),
        admin_page_script(),
    )

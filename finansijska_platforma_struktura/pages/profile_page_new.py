import reflex as rx
from finansijska_platforma_struktura.components.navbar import navbar
from finansijska_platforma_struktura.states.finance_state import FinanceState

def user_profile_section():
    """Sekcija sa ličnim podacima korisnika."""
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("user", size=24, color="var(--gold-bright)"),
                    rx.text("Lični podaci"),
                    spacing="3",
                    align="center",
                ),
                size="lg",
                margin_bottom="6",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.form(
                rx.vstack(
                    rx.grid(
                        rx.form_control(
                            rx.form_label("Ime", color="var(--light-text)"),
                            rx.input(
                                default_value="Marko",
                                name="name",
                                class_name="form-input",
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Prezime", color="var(--light-text)"),
                            rx.input(
                                default_value="Marković",
                                name="surname",
                                class_name="form-input",
                            ),
                            is_required=True,
                        ),
                        columns=[1, 2],
                        spacing="4",
                        width="100%",
                    ),
                    rx.grid(
                        rx.form_control(
                            rx.form_label("Email adresa", color="var(--light-text)"),
                            rx.input(
                                default_value=FinanceState.user_email,
                                name="email",
                                type_="email",
                                class_name="form-input",
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Broj telefona", color="var(--light-text)"),
                            rx.input(
                                default_value=FinanceState.user_phone,
                                name="phone",
                                class_name="form-input",
                            ),
                        ),
                        columns=[1, 2],
                        spacing="4",
                        width="100%",
                    ),
                    rx.form_control(
                        rx.form_label("Adresa", color="var(--light-text)"),
                        rx.input(
                            default_value="Knez Mihailova 42, Beograd",
                            name="address",
                            class_name="form-input",
                        ),
                    ),
                    rx.hstack(
                        rx.button(
                            "Sačuvaj promene",
                            type_="submit",
                            class_name="gold-button",
                        ),
                        rx.button(
                            "Otkaži",
                            variant="outline",
                            color_scheme="gray",
                        ),
                        spacing="3",
                        justify="end",
                        width="100%",
                    ),
                    spacing="4",
                    width="100%",
                ),
                width="100%",
            ),
            spacing="4",
            width="100%",
        ),
        class_name="glass-card",
        padding="6",
        width="100%",
    )

def account_settings_section():
    """Sekcija sa podešavanjima naloga."""
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("settings", size=24, color="var(--gold-bright)"),
                    rx.text("Podešavanja naloga"),
                    spacing="3",
                    align="center",
                ),
                size="lg",
                margin_bottom="6",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.vstack(
                # Password Change
                rx.box(
                    rx.vstack(
                        rx.text("Promena lozinke", font_weight="semibold", color="var(--light-text)", margin_bottom="3"),
                        rx.form(
                            rx.vstack(
                                rx.form_control(
                                    rx.form_label("Trenutna lozinka", color="var(--light-text)"),
                                    rx.input(
                                        type_="password",
                                        name="current_password",
                                        class_name="form-input",
                                    ),
                                ),
                                rx.form_control(
                                    rx.form_label("Nova lozinka", color="var(--light-text)"),
                                    rx.input(
                                        type_="password",
                                        name="new_password",
                                        class_name="form-input",
                                    ),
                                ),
                                rx.form_control(
                                    rx.form_label("Potvrdi novu lozinku", color="var(--light-text)"),
                                    rx.input(
                                        type_="password",
                                        name="confirm_password",
                                        class_name="form-input",
                                    ),
                                ),
                                rx.button(
                                    "Promeni lozinku",
                                    type_="submit",
                                    class_name="gold-button",
                                    align_self="start",
                                ),
                                spacing="3",
                                width="100%",
                            ),
                        ),
                        spacing="3",
                        width="100%",
                    ),
                    padding_bottom="6",
                    border_bottom="1px solid var(--border-light)",
                ),
                # Notification Settings
                rx.box(
                    rx.vstack(
                        rx.text("Obaveštenja", font_weight="semibold", color="var(--light-text)", margin_bottom="3"),
                        rx.vstack(
                            rx.hstack(
                                rx.switch(default_checked=True, color_scheme="gold"),
                                rx.vstack(
                                    rx.text("Email obaveštenja", color="var(--light-text)"),
                                    rx.text("Primajte obaveštenja o važnim aktivnostima", color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="start",
                                ),
                                spacing="3",
                                align="center",
                                justify="start",
                                width="100%",
                            ),
                            rx.hstack(
                                rx.switch(default_checked=True, color_scheme="gold"),
                                rx.vstack(
                                    rx.text("Push obaveštenja", color="var(--light-text)"),
                                    rx.text("Trenutna obaveštenja u browser-u", color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="start",
                                ),
                                spacing="3",
                                align="center",
                                justify="start",
                                width="100%",
                            ),
                            rx.hstack(
                                rx.switch(default_checked=False, color_scheme="gold"),
                                rx.vstack(
                                    rx.text("SMS obaveštenja", color="var(--light-text)"),
                                    rx.text("Obaveštenja putem SMS poruka", color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="start",
                                ),
                                spacing="3",
                                align="center",
                                justify="start",
                                width="100%",
                            ),
                            spacing="4",
                            width="100%",
                        ),
                        spacing="3",
                        width="100%",
                    ),
                    padding_y="6",
                    border_bottom="1px solid var(--border-light)",
                ),
                # Privacy Settings
                rx.box(
                    rx.vstack(
                        rx.text("Privatnost", font_weight="semibold", color="var(--light-text)", margin_bottom="3"),
                        rx.vstack(
                            rx.hstack(
                                rx.switch(default_checked=True, color_scheme="gold"),
                                rx.vstack(
                                    rx.text("Deljivanje podataka", color="var(--light-text)"),
                                    rx.text("Dozvolite deljenje anonimnih statistika", color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="start",
                                ),
                                spacing="3",
                                align="center",
                                justify="start",
                                width="100%",
                            ),
                            rx.hstack(
                                rx.switch(default_checked=False, color_scheme="gold"),
                                rx.vstack(
                                    rx.text("Marketing komunikacija", color="var(--light-text)"),
                                    rx.text("Primajte marketing sadržaje i ponude", color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="start",
                                ),
                                spacing="3",
                                align="center",
                                justify="start",
                                width="100%",
                            ),
                            spacing="4",
                            width="100%",
                        ),
                        spacing="3",
                        width="100%",
                    ),
                    padding_y="6",
                    border_bottom="1px solid var(--border-light)",
                ),
                # Danger Zone
                rx.box(
                    rx.vstack(
                        rx.text("Opasna zona", font_weight="semibold", color="var(--error)", margin_bottom="3"),
                        rx.vstack(
                            rx.button(
                                rx.hstack(
                                    rx.icon("download", size=16),
                                    rx.text("Izvezi podatke"),
                                    spacing="2",
                                ),
                                variant="outline",
                                color_scheme="blue",
                                width="fit-content",
                            ),
                            rx.button(
                                rx.hstack(
                                    rx.icon("trash-2", size=16),
                                    rx.text("Obriši nalog"),
                                    spacing="2",
                                ),
                                variant="outline",
                                color_scheme="red",
                                width="fit-content",
                                on_click=lambda: FinanceState.setvar("delete_account_modal_open", True),
                            ),
                            spacing="3",
                            width="100%",
                            align="start",
                        ),
                        spacing="3",
                        width="100%",
                    ),
                    padding_top="6",
                ),
                spacing="0",
                width="100%",
            ),
            spacing="4",
            width="100%",
        ),
        class_name="glass-card",
        padding="6",
        width="100%",
    )

def expense_tracker_section():
    """Sekcija za praćenje troškova sa kategorijama."""
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("credit-card", size=24, color="var(--gold-bright)"),
                    rx.text("Praćenje troškova"),
                    spacing="3",
                    align="center",
                ),
                size="lg",
                margin_bottom="6",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            # Add transaction form
            rx.box(
                rx.vstack(
                    rx.text("Dodaj novu transakciju", font_weight="semibold", color="var(--light-text)", margin_bottom="3"),
                    rx.form(
                        rx.vstack(
                            rx.grid(
                                rx.form_control(
                                    rx.form_label("Opis", color="var(--light-text)"),
                                    rx.input(
                                        placeholder="npr. Kupovina namirnica",
                                        name="description",
                                        class_name="form-input",
                                    ),
                                    is_required=True,
                                ),
                                rx.form_control(
                                    rx.form_label("Iznos (€)", color="var(--light-text)"),
                                    rx.input(
                                        type_="number",
                                        step="0.01",
                                        placeholder="0.00",
                                        name="amount",
                                        class_name="form-input",
                                    ),
                                    is_required=True,
                                ),
                                columns=[1, 2],
                                spacing="4",
                                width="100%",
                            ),
                            rx.grid(
                                rx.form_control(
                                    rx.form_label("Tip", color="var(--light-text)"),
                                    rx.select(
                                        ["Rashod", "Prihod"],
                                        default_value="Rashod",
                                        name="type",
                                        class_name="form-select",
                                    ),
                                ),
                                rx.form_control(
                                    rx.form_label("Kategorija", color="var(--light-text)"),
                                    rx.select(
                                        FinanceState.expense_categories + FinanceState.income_categories,
                                        placeholder="Izaberite kategoriju",
                                        name="category",
                                        class_name="form-select",
                                    ),
                                ),
                                columns=[1, 2],
                                spacing="4",
                                width="100%",
                            ),
                            rx.form_control(
                                rx.form_label("Datum", color="var(--light-text)"),
                                rx.input(
                                    type_="date",
                                    name="date",
                                    class_name="form-input",
                                    width="200px",
                                ),
                            ),
                            rx.button(
                                rx.hstack(
                                    rx.icon("plus", size=16),
                                    rx.text("Dodaj transakciju"),
                                    spacing="2",
                                ),
                                type_="submit",
                                class_name="gold-button",
                                align_self="start",
                            ),
                            spacing="4",
                            width="100%",
                        ),
                        on_submit=FinanceState.add_transaction,
                    ),
                    spacing="3",
                    width="100%",
                ),
                class_name="glass-card",
                padding="4",
                margin_bottom="6",
            ),
            # Expense categories overview
            rx.box(
                rx.vstack(
                    rx.text("Pregled kategorija", font_weight="semibold", color="var(--light-text)", margin_bottom="4"),
                    rx.grid(
                        *[
                            rx.box(
                                rx.vstack(
                                    rx.hstack(
                                        rx.box(
                                            width="12px",
                                            height="12px",
                                            background=category["color"],
                                            border_radius="50%",
                                        ),
                                        rx.text(category["name"], font_weight="semibold", color="var(--light-text)"),
                                        spacing="2",
                                        align="center",
                                    ),
                                    rx.text(f"{category['percent']}% budžeta", color="var(--muted-text)", font_size="sm"),
                                    rx.text(category["description"], color="var(--muted-text)", font_size="xs"),
                                    spacing="1",
                                    align="start",
                                ),
                                class_name="glass-card",
                                padding="3",
                                border=f"1px solid {category['color']}20",
                            )
                            for category in FinanceState.budget_categories
                        ],
                        columns=[1, 2, 3],
                        spacing="3",
                        width="100%",
                    ),
                    spacing="3",
                    width="100%",
                ),
            ),
            # Recent transactions
            rx.box(
                rx.vstack(
                    rx.hstack(
                        rx.text("Nedavne transakcije", font_weight="semibold", color="var(--light-text)"),
                        rx.spacer(),
                        rx.button(
                            "Prikaži sve",
                            variant="ghost",
                            color_scheme="gold",
                            size="sm",
                        ),
                        justify="between",
                        align="center",
                        width="100%",
                        margin_bottom="3",
                    ),
                    rx.vstack(
                        *[
                            rx.hstack(
                                rx.box(
                                    rx.icon(
                                        "arrow-up" if transaction["type"] == "income" else "arrow-down",
                                        size=16,
                                        color="var(--success)" if transaction["type"] == "income" else "var(--error)",
                                    ),
                                    background="rgba(34, 197, 94, 0.1)" if transaction["type"] == "income" else "rgba(239, 68, 68, 0.1)",
                                    padding="2",
                                    border_radius="50%",
                                ),
                                rx.vstack(
                                    rx.text(transaction["description"], font_weight="medium", color="var(--light-text)"),
                                    rx.text(transaction["category"], color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="start",
                                ),
                                rx.spacer(),
                                rx.vstack(
                                    rx.text(
                                        f"{'+'if transaction['type'] == 'income' else '-'}€{transaction['amount']:.2f}",
                                        font_weight="bold",
                                        color="var(--success)" if transaction["type"] == "income" else "var(--error)",
                                    ),
                                    rx.text(transaction["date"], color="var(--muted-text)", font_size="sm"),
                                    spacing="0",
                                    align="end",
                                ),
                                justify="between",
                                align="center",
                                width="100%",
                                padding="3",
                                border_bottom="1px solid var(--border-light)",
                                _last={"border_bottom": "none"},
                            )
                            for transaction in FinanceState.transactions[:8]
                        ],
                        spacing="0",
                        width="100%",
                    ),
                    spacing="0",
                    width="100%",
                ),
                class_name="glass-card",
                padding="4",
                margin_top="6",
            ),
            spacing="4",
            width="100%",
        ),
        width="100%",
    )

def financial_goals_section():
    """Sekcija za finansijske ciljeve."""
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("target", size=24, color="var(--gold-bright)"),
                    rx.text("Finansijski ciljevi"),
                    spacing="3",
                    align="center",
                ),
                size="lg",
                margin_bottom="6",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            # Add goal button
            rx.button(
                rx.hstack(
                    rx.icon("plus", size=16),
                    rx.text("Dodaj novi cilj"),
                    spacing="2",
                ),
                class_name="gold-button",
                margin_bottom="4",
                on_click=FinanceState.open_goal_modal,
            ),
            # Goals list
            rx.vstack(
                *[
                    rx.box(
                        rx.vstack(
                            rx.hstack(
                                rx.text(goal["name"], font_weight="semibold", color="var(--light-text)", size="lg"),
                                rx.spacer(),
                                rx.text(f"€{goal['current']:.0f} / €{goal['target']:.0f}", color="var(--muted-text)"),
                                justify="between",
                                align="center",
                                width="100%",
                            ),
                            # Progress bar
                            rx.box(
                                rx.box(
                                    width=f"{min(100, (goal['current'] / goal['target']) * 100)}%",
                                    height="8px",
                                    background="var(--gold-bright)",
                                    border_radius="4px",
                                    transition="width 0.3s ease",
                                ),
                                width="100%",
                                height="8px",
                                background="var(--border-light)",
                                border_radius="4px",
                                margin="2 0",
                            ),
                            rx.hstack(
                                rx.text(f"{(goal['current'] / goal['target'] * 100):.1f}% završeno", color="var(--muted-text)", font_size="sm"),
                                rx.spacer(),
                                rx.text(f"Rok: {goal['deadline']}", color="var(--muted-text)", font_size="sm"),
                                justify="between",
                                width="100%",
                            ),
                            spacing="2",
                            width="100%",
                        ),
                        class_name="glass-card",
                        padding="4",
                        margin_bottom="3",
                    )
                    for goal in FinanceState.financial_goals
                ],
                spacing="0",
                width="100%",
            ),
            spacing="4",
            width="100%",
        ),
        width="100%",
    )

def ai_chat_widget():
    """AI Chat widget."""
    return rx.cond(
        FinanceState.is_ai_chat_open,
        rx.box(
            rx.vstack(
                # Chat header
                rx.hstack(
                    rx.hstack(
                        rx.box(
                            rx.icon("bot", size=20, color="var(--gold-bright)"),
                            background="var(--gold-bright)",
                            background_opacity=0.1,
                            padding="2",
                            border_radius="50%",
                        ),
                        rx.vstack(
                            rx.text("AI Finansijski Asistent", font_weight="bold", color="var(--light-text)"),
                            rx.text("Online", color="var(--success)", font_size="sm"),
                            spacing="0",
                            align="start",
                        ),
                        spacing="3",
                        align="center",
                    ),
                    rx.button(
                        rx.icon("x", size=16),
                        variant="ghost",
                        size="sm",
                        on_click=FinanceState.toggle_ai_chat,
                    ),
                    justify="between",
                    align="center",
                    width="100%",
                    padding="4",
                    border_bottom="1px solid var(--border-light)",
                ),
                # Chat messages
                rx.box(
                    rx.vstack(
                        *[
                            rx.cond(
                                msg["type"] == "user",
                                # User message
                                rx.hstack(
                                    rx.spacer(),
                                    rx.box(
                                        rx.text(msg["message"], color="var(--dark-bg)"),
                                        background="var(--gold-bright)",
                                        padding="3",
                                        border_radius="12px 12px 4px 12px",
                                        max_width="80%",
                                    ),
                                    justify="end",
                                    width="100%",
                                ),
                                # AI message
                                rx.hstack(
                                    rx.box(
                                        rx.text(msg["message"], color="var(--light-text)"),
                                        background="var(--border-light)",
                                        padding="3",
                                        border_radius="12px 12px 12px 4px",
                                        max_width="80%",
                                    ),
                                    rx.spacer(),
                                    justify="start",
                                    width="100%",
                                ),
                            )
                            for msg in FinanceState.chat_messages
                        ],
                        spacing="3",
                        width="100%",
                        padding="4",
                    ),
                    height="300px",
                    overflow_y="auto",
                    border_bottom="1px solid var(--border-light)",
                ),
                # Chat input
                rx.box(
                    rx.form(
                        rx.hstack(
                            rx.input(
                                placeholder="Postavite pitanje o vašim finansijama...",
                                name="message",
                                value=FinanceState.current_message,
                                on_change=FinanceState.setvar("current_message"),
                                class_name="form-input",
                                border="none",
                                _focus={"box_shadow": "none"},
                            ),
                            rx.button(
                                rx.icon("send", size=16),
                                type_="submit",
                                variant="ghost",
                                color_scheme="gold",
                                disabled=FinanceState.is_typing,
                            ),
                            spacing="2",
                            width="100%",
                        ),
                        on_submit=FinanceState.send_ai_message,
                        width="100%",
                    ),
                    padding="4",
                ),
                spacing="0",
                width="100%",
            ),
            position="fixed",
            bottom="100px",
            right="20px",
            width="350px",
            height="500px",
            class_name="glass-card",
            border="1px solid var(--border-light)",
            z_index="1000",
        ),
    )

def ai_chat_button():
    """Floating AI chat button."""
    return rx.button(
        rx.icon("message-circle", size=24, color="var(--dark-bg)"),
        position="fixed",
        bottom="20px",
        right="20px",
        width="60px",
        height="60px",
        border_radius="50%",
        background="var(--gold-bright)",
        z_index="999",
        _hover={"background": "var(--gold-medium)"},
        on_click=FinanceState.toggle_ai_chat,
    )

def profile():
    """Glavna profile stranica sa tabovima."""
    return rx.box(
        navbar(),
        rx.container(
            rx.vstack(
                rx.heading(
                    "Profil korisnika",
                    size="xl",
                    text_align="center",
                    margin_bottom="6",
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                ),
                rx.tabs(
                    rx.tab_list(
                        rx.tab("Lični podaci"),
                        rx.tab("Praćenje troškova"),
                        rx.tab("Finansijski ciljevi"),
                        rx.tab("Podešavanja"),
                        color="var(--muted-text)",
                        border_bottom="1px solid var(--border-light)",
                    ),
                    rx.tab_panels(
                        rx.tab_panel(
                            user_profile_section(),
                        ),
                        rx.tab_panel(
                            expense_tracker_section(),
                        ),
                        rx.tab_panel(
                            financial_goals_section(),
                        ),
                        rx.tab_panel(
                            account_settings_section(),
                        ),
                    ),
                    variant="enclosed",
                    align="center",
                    width="100%",
                    color_scheme="gold",
                    margin_top="4",
                ),
                spacing="6",
                width="100%",
            ),
            max_width="1200px",
            padding="6",
        ),
        ai_chat_widget(),
        ai_chat_button(),
        min_height="100vh",
        background="var(--dark-bg)",
    )

import reflex as rx
from finansijska_platforma_struktura.components.navbar import navbar
from finansijska_platforma_struktura.components.sidebar import sidebar
from finansijska_platforma_struktura.components.dashboard_widgets import budget_category_widget
from finansijska_platforma_struktura.states.finance_state import FinanceState

# Primarni endpoint za profil stranicu - koristi se za rutiranje
@rx.page(route="/profile", title="Korisnički profil | Golden Balance")
def profile_index():
    """Glavna profil stranica - služi kao entry point."""
    return user_profile()

# Alternativni endpoint za kompatibilnost sa starim linkovima
@rx.page(route="/profile_page", title="Korisnički profil | Golden Balance")
def profile_page_compat():
    """Kompatibilnost sa starim rutama."""
    return user_profile()

# Dodatne rute za direktan pristup specifičnim tabovima
@rx.page(route="/profile/budget", title="Moj Budžet | Golden Balance")
def profile_budget():
    """Direktan pristup tabu 'Moj Budžet'."""
    # Postavlja localStorage vrednost koja će aktivirati Moj Budžet tab (indeks 1)
    return rx.box(
        rx.script("""
        localStorage.setItem('activeProfileTab', '1');
        window.location.href = '/profile';
        """),
        rx.center(
            rx.spinner(size="xl", color="gold", thickness="4px"),
            rx.text("Učitavanje budžeta..."),
            height="100vh",
        )
    )

def user_profile():
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("person", color="var(--gold-bright)"),
                    rx.text("Lični podaci"),
                ),
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
                display="flex",
                align_items="center",
                gap="0.5rem",
                class_name="section-title",
            ),
            rx.form(
                rx.vstack(
                    rx.grid(
                        rx.form_control(
                            rx.form_label("Ime"),
                            rx.input(
                                default_value="Marko",
                                name="name",
                                background="rgba(16, 16, 18, 0.5)",
                                border="1px solid var(--border-light)",
                                border_radius="var(--border-radius)",
                                color="var(--light-text)",
                                padding="0.75rem 1rem",
                                _focus={
                                    "outline": "none",
                                    "border_color": "var(--gold-medium)",
                                    "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                                },
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Prezime"),
                            rx.input(
                                default_value="Marković",
                                name="surname",
                                background="rgba(16, 16, 18, 0.5)",
                                border="1px solid var(--border-light)",
                                border_radius="var(--border-radius)",
                                color="var(--light-text)",
                                padding="0.75rem 1rem",
                                _focus={
                                    "outline": "none",
                                    "border_color": "var(--gold-medium)",
                                    "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                                },
                            ),
                            is_required=True,
                        ),
                        columns=[2],
                        spacing="4",
                        width="100%",
                    ),
                    rx.grid(
                        rx.form_control(
                            rx.form_label("Email adresa"),
                            rx.input(
                                default_value=FinanceState.user_email,
                                name="email",
                                type_="email",
                                background="rgba(16, 16, 18, 0.5)",
                                border="1px solid var(--border-light)",
                                border_radius="var(--border-radius)",
                                color="var(--light-text)",
                                padding="0.75rem 1rem",
                                _focus={
                                    "outline": "none",
                                    "border_color": "var(--gold-medium)",
                                    "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                                },
                            ),
                            is_required=True,
                        ),
                        rx.form_control(
                            rx.form_label("Broj telefona"),
                            rx.input(
                                default_value=FinanceState.user_phone,
                                name="phone",
                                background="rgba(16, 16, 18, 0.5)",
                                border="1px solid var(--border-light)",
                                border_radius="var(--border-radius)",
                                color="var(--light-text)",
                                padding="0.75rem 1rem",
                                _focus={
                                    "outline": "none",
                                    "border_color": "var(--gold-medium)",
                                    "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                                },
                            ),
                        ),
                        columns=[2],
                        spacing="4",
                        width="100%",
                    ),
                    rx.form_control(
                        rx.form_label("Adresa"),
                        rx.input(
                            default_value="",
                            name="address",
                            background="rgba(16, 16, 18, 0.5)",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            color="var(--light-text)",
                            padding="0.75rem 1rem",
                            _focus={
                                "outline": "none",
                                "border_color": "var(--gold-medium)",
                                "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                            },
                        ),
                    ),
                    rx.grid(
                        rx.form_control(
                            rx.form_label("Grad"),
                            rx.input(
                                default_value="",
                                name="city",
                                background="rgba(16, 16, 18, 0.5)",
                                border="1px solid var(--border-light)",
                                border_radius="var(--border-radius)",
                                color="var(--light-text)",
                                padding="0.75rem 1rem",
                                _focus={
                                    "outline": "none",
                                    "border_color": "var(--gold-medium)",
                                    "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                                },
                            ),
                        ),
                        rx.form_control(
                            rx.form_label("Poštanski broj"),
                            rx.input(
                                default_value="",
                                name="postalCode",
                                background="rgba(16, 16, 18, 0.5)",
                                border="1px solid var(--border-light)",
                                border_radius="var(--border-radius)",
                                color="var(--light-text)",
                                padding="0.75rem 1rem",
                                _focus={
                                    "outline": "none",
                                    "border_color": "var(--gold-medium)",
                                    "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                                },
                            ),
                        ),
                        columns=[2],
                        spacing="4",
                        width="100%",
                    ),
                    rx.form_control(
                        rx.form_label("Profilna slika"),
                        rx.input(
                            type_="file",
                            name="profileImage",
                            accept="image/*",
                            background="rgba(16, 16, 18, 0.5)",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            color="var(--light-text)",
                            padding="0.75rem 1rem",
                            _focus={
                                "outline": "none",
                                "border_color": "var(--gold-medium)",
                                "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                            },
                        ),
                    ),
                    rx.divider(margin_y="4", border_color="var(--border-light)"),
                    rx.heading(
                        rx.hstack(
                            rx.icon("lock", color="var(--gold-bright)"),
                            rx.text("Promena lozinke"),
                        ),
                        size="md", 
                        align_self="start", 
                        margin_top="2",
                        margin_bottom="4",
                        background="var(--gradient-gold)",
                        background_clip="text",
                        webkit_text_fill_color="transparent",
                    ),
                    rx.form_control(
                        rx.form_label("Trenutna lozinka"),
                        rx.input(
                            type_="password",
                            background="rgba(16, 16, 18, 0.5)",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            color="var(--light-text)",
                            padding="0.75rem 1rem",
                            _focus={
                                "outline": "none",
                                "border_color": "var(--gold-medium)",
                                "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                            },
                        ),
                    ),
                    rx.form_control(
                        rx.form_label("Nova lozinka"),
                        rx.input(
                            type_="password",
                            background="rgba(16, 16, 18, 0.5)",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            color="var(--light-text)",
                            padding="0.75rem 1rem",
                            _focus={
                                "outline": "none",
                                "border_color": "var(--gold-medium)",
                                "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                            },
                        ),
                    ),
                    rx.form_control(
                        rx.form_label("Potvrdi novu lozinku"),
                        rx.input(
                            type_="password",
                            background="rgba(16, 16, 18, 0.5)",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            color="var(--light-text)",
                            padding="0.75rem 1rem",
                            _focus={
                                "outline": "none",
                                "border_color": "var(--gold-medium)",
                                "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                            },
                        ),
                    ),
                    rx.button(
                        rx.hstack(
                            rx.icon("save"),
                            rx.text("Sačuvaj promene"),
                        ),
                        type_="submit", 
                        margin_top="4",
                        class_name="gold-button",
                    ),
                    align_items="stretch",
                    width="100%",
                ),
                on_submit=FinanceState.update_profile,
            ),
            width="100%",
            align_items="stretch",
            padding="1.5rem",
            background="var(--dark-card)",
            border_radius="var(--border-radius)",
            border="1px solid var(--border-light)",
            box_shadow="var(--box-shadow)",
        ),
        width="100%",
    )

def budget_planner():
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("pie_chart", color="var(--gold-bright)"),
                    rx.text("Planer budžeta"),
                ),
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
                display="flex",
                align_items="center",
                gap="0.5rem",
                class_name="section-title",
            ),
            rx.text(
                "Unesite svoje mesečne prihode i prilagodite kategorije troškova prema vašim potrebama.",
                color="var(--muted-text)",
                font_size="1.1rem",
                margin_bottom="4",
                class_name="section-subtitle",
            ),
            rx.box(
                rx.vstack(
                    rx.heading(
                        rx.hstack(
                            rx.icon("attach_money", color="var(--gold-bright)"),
                            rx.text("Unos prihoda"),
                        ),
                        size="md", 
                        margin_bottom="1rem", 
                        color="var(--gold-bright)"
                    ),
                    rx.hstack(
                        rx.input(
                            placeholder="Iznos mesečnog prihoda", 
                            type_="number",
                            default_value=FinanceState.income,
                            background="rgba(16, 16, 18, 0.5)",
                            border="1px solid var(--border-light)",
                            border_radius="var(--border-radius)",
                            color="var(--light-text)",
                            padding="0.75rem 1rem",
                            _focus={
                                "outline": "none",
                                "border_color": "var(--gold-medium)",
                                "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                            },
                        ),
                        rx.button(
                            rx.hstack(
                                rx.icon("calculate"),
                                rx.text("Izračunaj raspodelu"),
                            ),
                            class_name="gold-button",
                            on_click=FinanceState.calculate_budget_distribution,
                        ),
                        width="100%",
                    ),
                    rx.text(
                        "Unesite vaš ukupan mesečni prihod kako bismo vam pomogli sa planiranjem budžeta. "
                        "Preporučeno je da uključite sve izvore prihoda za tačniju analizu.",
                        color="var(--muted-text)",
                        font_size="0.9rem",
                        margin_top="2",
                        class_name="input-hint",
                    ),
                ),
                class_name="income-section",
                width="100%",
                margin_bottom="1.5rem",
                padding="1.5rem",
                background="var(--dark-card)",
                border_radius="var(--border-radius)",
                border="1px solid var(--border-light)",
                box_shadow="var(--box-shadow)",
            ),
            rx.box(
                rx.text(
                    "Rasporedite svoj mesečni prihod po kategorijama. Ukupan zbir svih kategorija treba da bude 100%.",
                    color="var(--muted-text)",
                ),
                padding="1rem",
                background="rgba(212, 175, 55, 0.05)",
                border_left="4px solid var(--gold-medium)",
                border_radius="0.375rem",
                margin_bottom="1.5rem",
                class_name="budget-note",
            ),
            rx.hstack(
                rx.stat(
                    rx.stat_label("Ukupan procenat"),
                    rx.stat_number("100%"),
                    rx.stat_help_text(
                        rx.hstack(
                            rx.icon("check_circle", color="green.400"),
                            rx.text("Idealan raspored"),
                        ),
                        color="green.400",
                    ),
                    width="50%",
                ),
                rx.stat(
                    rx.stat_label("Ukupno raspoređeno"),
                    rx.stat_number(f"€{FinanceState.income:.2f}"),
                    rx.stat_help_text(
                        "od ukupnog prihoda",
                    ),
                    width="50%",
                ),
                width="100%",
                margin_bottom="1.5rem",
                padding="1rem",
                background="rgba(16, 16, 18, 0.5)",
                border_radius="var(--border-radius)",
                border="1px solid var(--border-light)",
            ),
            rx.grid(
                *[budget_category_widget(category) for category in FinanceState.budget_categories],
                columns=[1, 3],
                spacing="4",
                width="100%",
                class_name="budget-categories",
            ),
            rx.button(
                rx.hstack(
                    rx.icon("save"),
                    rx.text("Sačuvaj plan budžeta"),
                ),
                class_name="gold-button",
                margin_top="1.5rem",
                align_self="center",
                on_click=FinanceState.save_budget_plan,
            ),
            width="100%",
            align_items="stretch",
            padding="1.5rem",
            background="var(--dark-card)",
            border_radius="var(--border-radius)",
            border="1px solid var(--border-light)",
            box_shadow="var(--box-shadow)",
            margin_top="4",
        ),
        width="100%",
    )

def expense_tracker():
    """Komponenta za praćenje troškova."""
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("receipt_long", color="var(--gold-bright)"),
                    rx.text("Praćenje troškova"),
                ),
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
                display="flex",
                align_items="center",
                gap="0.5rem",
                class_name="section-title",
            ),
            rx.tabs(
                rx.tab_list(
                    rx.tab(
                        rx.hstack(
                            rx.icon("calendar_today"),
                            rx.text("Sve transakcije"),
                        ),
                        class_name="expense-tab",
                    ),
                    rx.tab(
                        rx.hstack(
                            rx.icon("add_circle"),
                            rx.text("Dodaj trošak"),
                        ),
                        class_name="expense-tab",
                    ),
                    rx.tab(
                        rx.hstack(
                            rx.icon("payments"),
                            rx.text("Dodaj prihod"),
                        ),
                        class_name="expense-tab",
                    ),
                    rx.tab(
                        rx.hstack(
                            rx.icon("filter_alt"),
                            rx.text("Filteri"),
                        ),
                        class_name="expense-tab",
                    ),
                    class_name="expense-tab-list",
                    justify_content="space-between",
                    width="100%",
                    overflow_x="auto",
                    bg="rgba(16, 16, 18, 0.3)",
                    border_bottom="1px solid var(--border-light)",
                    padding="0 0.5rem",
                ),
                rx.tab_panels(
                    rx.tab_panel(
                        rx.box(
                            rx.vstack(
                                rx.heading("Pregled transakcija", size="md", margin_bottom="1rem", color="var(--gold-bright)"),
                                rx.table(
                                    rx.thead(
                                        rx.tr(
                                            rx.th("Datum", text_align="left"),
                                            rx.th("Kategorija", text_align="left"),
                                            rx.th("Opis", text_align="left"),
                                            rx.th("Tip", text_align="center"),
                                            rx.th("Iznos", text_align="right"),
                                            rx.th("Akcije", text_align="right", width="100px"),
                                        ),
                                        bg="rgba(16, 16, 18, 0.3)",
                                        border_bottom="1px solid var(--border-light)",
                                    ),
                                    rx.tbody(
                                        rx.foreach(
                                            FinanceState.transactions,
                                            lambda transaction, i: rx.tr(
                                                rx.td(transaction.date, text_align="left"),
                                                rx.td(transaction.category, text_align="left"),
                                                rx.td(transaction.description, text_align="left"),
                                                rx.td(
                                                    rx.badge(
                                                        transaction.type.capitalize(),
                                                        color_scheme="green" if transaction.type == "income" else "red",
                                                        variant="subtle",
                                                        padding="0.25rem 0.5rem",
                                                        border_radius="4px",
                                                    ),
                                                    text_align="center",
                                                ),
                                                rx.td(
                                                    f"{transaction.amount} €" if transaction.type == "income" else f"-{transaction.amount} €",
                                                    text_align="right",
                                                    color="green.400" if transaction.type == "income" else "red.400",
                                                    font_weight="medium",
                                                ),
                                                rx.td(
                                                    rx.hstack(
                                                        rx.icon_button(
                                                            "edit",
                                                            color="var(--light-text)",
                                                            size="xs",
                                                            bg="transparent",
                                                            _hover={"color": "var(--gold-bright)"},
                                                            on_click=lambda: FinanceState.edit_transaction(i),
                                                        ),
                                                        rx.icon_button(
                                                            "delete",
                                                            color="var(--light-text)",
                                                            size="xs",
                                                            bg="transparent",
                                                            _hover={"color": "red.500"},
                                                            on_click=lambda: FinanceState.delete_transaction(i),
                                                        ),
                                                        justify="flex-end",
                                                        spacing="2",
                                                        width="100%",
                                                    ),
                                                    text_align="right",
                                                ),
                                                _hover={"bg": "rgba(212, 175, 55, 0.05)"},
                                                border_bottom="1px solid var(--border-light)",
                                            ),
                                        ),
                                    ),
                                    overflow="auto",
                                    width="100%",
                                    border="1px solid var(--border-light)",
                                    border_radius="var(--border-radius)",
                                    color="var(--light-text)",
                                    style={"borderCollapse": "collapse"},
                                ),
                            ),
                            class_name="expense-table",
                            width="100%",
                            padding="1.5rem",
                            background="var(--dark-card)",
                            border_radius="var(--border-radius)",
                            border="1px solid var(--border-light)",
                            box_shadow="var(--box-shadow)",
                        ),
                    ),
                    # Add expense tab panel
                    rx.tab_panel(
                        rx.box(
                            rx.vstack(
                                rx.heading("Dodaj novi trošak", size="md", margin_bottom="1rem", color="var(--gold-bright)"),
                                rx.grid(
                                    rx.form_control(
                                        rx.form_label("Opis"),
                                        rx.input(
                                            placeholder="Unesite opis troška",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_description,
                                            on_change=FinanceState.set_transaction_description,
                                        ),
                                        is_required=True,
                                    ),
                                    rx.form_control(
                                        rx.form_label("Iznos (€)"),
                                        rx.input(
                                            placeholder="0.00",
                                            type_="number",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_amount,
                                            on_change=FinanceState.set_transaction_amount,
                                        ),
                                        is_required=True,
                                    ),
                                    columns=[2],
                                    spacing="4",
                                    width="100%",
                                    class_name="expense-form-row",
                                ),
                                rx.grid(
                                    rx.form_control(
                                        rx.form_label("Kategorija"),
                                        rx.select(
                                            FinanceState.expense_categories,
                                            placeholder="Izaberite kategoriju",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_category,
                                            on_change=FinanceState.set_transaction_category,
                                        ),
                                        is_required=True,
                                    ),
                                    rx.form_control(
                                        rx.form_label("Datum"),
                                        rx.input(
                                            type_="date",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_date,
                                            on_change=FinanceState.set_transaction_date,
                                        ),
                                        is_required=True,
                                    ),
                                    columns=[2],
                                    spacing="4",
                                    width="100%",
                                    class_name="expense-form-row",
                                ),
                                rx.button(
                                    rx.hstack(
                                        rx.icon("add"),
                                        rx.text("Dodaj trošak"),
                                    ),
                                    class_name="gold-button",
                                    margin_top="1rem",
                                    align_self="flex-end",
                                    on_click=lambda: FinanceState.add_transaction("expense"),
                                ),
                            ),
                            class_name="expense-form",
                            width="100%",
                            padding="1.5rem",
                            background="var(--dark-card)",
                            border_radius="var(--border-radius)",
                            border="1px solid var(--border-light)",
                            box_shadow="var(--box-shadow)",
                        ),
                    ),
                    # Add income tab panel
                    rx.tab_panel(
                        rx.box(
                            rx.vstack(
                                rx.heading("Dodaj novi prihod", size="md", margin_bottom="1rem", color="var(--gold-bright)"),
                                rx.grid(
                                    rx.form_control(
                                        rx.form_label("Opis"),
                                        rx.input(
                                            placeholder="Unesite opis prihoda",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_description,
                                            on_change=FinanceState.set_transaction_description,
                                        ),
                                        is_required=True,
                                    ),
                                    rx.form_control(
                                        rx.form_label("Iznos (€)"),
                                        rx.input(
                                            placeholder="0.00",
                                            type_="number",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_amount,
                                            on_change=FinanceState.set_transaction_amount,
                                        ),
                                        is_required=True,
                                    ),
                                    columns=[2],
                                    spacing="4",
                                    width="100%",
                                    class_name="expense-form-row",
                                ),
                                rx.grid(
                                    rx.form_control(
                                        rx.form_label("Kategorija"),
                                        rx.select(
                                            FinanceState.income_categories,
                                            placeholder="Izaberite kategoriju",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_category,
                                            on_change=FinanceState.set_transaction_category,
                                        ),
                                        is_required=True,
                                    ),
                                    rx.form_control(
                                        rx.form_label("Datum"),
                                        rx.input(
                                            type_="date",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            value=FinanceState.transaction_date,
                                            on_change=FinanceState.set_transaction_date,
                                        ),
                                        is_required=True,
                                    ),
                                    columns=[2],
                                    spacing="4",
                                    width="100%",
                                    class_name="expense-form-row",
                                ),
                                rx.button(
                                    rx.hstack(
                                        rx.icon("add"),
                                        rx.text("Dodaj prihod"),
                                    ),
                                    class_name="gold-button",
                                    margin_top="1rem",
                                    align_self="flex-end",
                                    on_click=lambda: FinanceState.add_transaction("income"),
                                ),
                            ),
                            class_name="expense-form",
                            width="100%",
                            padding="1.5rem",
                            background="var(--dark-card)",
                            border_radius="var(--border-radius)",
                            border="1px solid var(--border-light)",
                            box_shadow="var(--box-shadow)",
                        ),
                    ),
                    # Add filters tab panel
                    rx.tab_panel(
                        rx.box(
                            rx.vstack(
                                rx.heading("Filteri za pretragu", size="md", margin_bottom="1rem", color="var(--gold-bright)"),
                                rx.grid(
                                    rx.form_control(
                                        rx.form_label("Kategorija"),
                                        rx.select(
                                            ["Sve kategorije"] + FinanceState.expense_categories + FinanceState.income_categories,
                                            placeholder="Izaberite kategoriju",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            default_value="Sve kategorije",
                                        ),
                                    ),
                                    rx.form_control(
                                        rx.form_label("Tip"),
                                        rx.select(
                                            ["Sve transakcije", "Prihodi", "Troškovi"],
                                            placeholder="Izaberite tip",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                            default_value="Sve transakcije",
                                        ),
                                    ),
                                    rx.form_control(
                                        rx.form_label("Od datuma"),
                                        rx.input(
                                            type_="date",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                        ),
                                    ),
                                    rx.form_control(
                                        rx.form_label("Do datuma"),
                                        rx.input(
                                            type_="date",
                                            background="rgba(16, 16, 18, 0.5)",
                                            border="1px solid var(--border-light)",
                                            border_radius="var(--border-radius)",
                                            color="var(--light-text)",
                                        ),
                                    ),
                                    columns=[2],
                                    spacing="4",
                                    width="100%",
                                    class_name="expense-form-row",
                                ),
                                rx.button(
                                    rx.hstack(
                                        rx.icon("search"),
                                        rx.text("Primeni filtere"),
                                    ),
                                    class_name="gold-button",
                                    margin_top="1rem",
                                    align_self="flex-end",
                                ),
                            ),
                            class_name="expense-form",
                            width="100%",
                            padding="1.5rem",
                            background="var(--dark-card)",
                            border_radius="var(--border-radius)",
                            border="1px solid var(--border-light)",
                            box_shadow="var(--box-shadow)",
                        ),
                    ),
                ),
                color_scheme="gold",
                variant="soft-rounded",
                width="100%",
                isLazy=True,
            ),
            width="100%",
            align_items="stretch",
            padding="1.5rem",
            background="var(--dark-card)",
            border_radius="var(--border-radius)",
            border="1px solid var(--border-light)",
            box_shadow="var(--box-shadow)",
            margin_top="4",
            class_name="expenses-tracker",
        ),
        width="100%",
    )


def account_settings():
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("settings", color="var(--gold-bright)"),
                    rx.text("Podešavanja naloga"),
                ),
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
                display="flex",
                align_items="center",
                gap="0.5rem",
                class_name="section-title",
            ),
            rx.vstack(
                rx.form_control(
                    rx.form_label("Jezik"),
                    rx.select(
                        ["Srpski", "English", "Deutsch"],
                        placeholder="Izaberite jezik",
                        default_value="Srpski",
                        background="rgba(16, 16, 18, 0.5)",
                        border="1px solid var(--border-light)",
                        border_radius="var(--border-radius)",
                        color="var(--light-text)",
                        _focus={
                            "outline": "none",
                            "border_color": "var(--gold-medium)",
                            "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                        },
                    ),
                ),
                rx.form_control(
                    rx.form_label("Vremenska zona"),
                    rx.select(
                        ["(GMT+01:00) Beograd", "(GMT+00:00) London", "(GMT-05:00) New York"],
                        placeholder="Izaberite vremensku zonu",
                        default_value="(GMT+01:00) Beograd",
                        background="rgba(16, 16, 18, 0.5)",
                        border="1px solid var(--border-light)",
                        border_radius="var(--border-radius)",
                        color="var(--light-text)",
                        _focus={
                            "outline": "none",
                            "border_color": "var(--gold-medium)",
                            "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                        },
                    ),
                ),
                rx.form_control(
                    rx.form_label("Format datuma"),
                    rx.select(
                        ["DD.MM.YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
                        placeholder="Izaberite format datuma",
                        default_value="DD.MM.YYYY",
                        background="rgba(16, 16, 18, 0.5)",
                        border="1px solid var(--border-light)",
                        border_radius="var(--border-radius)",
                        color="var(--light-text)",
                        _focus={
                            "outline": "none",
                            "border_color": "var(--gold-medium)",
                            "box_shadow": "0 0 0 3px rgba(212, 175, 55, 0.15)"
                        },
                    ),
                ),
                rx.vstack(
                    rx.heading(
                        "Obaveštenja", 
                        size="md", 
                        margin_bottom="3",
                        color="var(--gold-bright)",
                    ),
                    rx.hstack(
                        rx.switch(is_checked=True),
                        rx.text("Primaj email obaveštenja"),
                        width="100%",
                    ),
                    rx.hstack(
                        rx.switch(is_checked=True),
                        rx.text("Primaj push obaveštenja"),
                        width="100%",
                    ),
                    rx.hstack(
                        rx.switch(is_checked=False),
                        rx.text("Dvofaktorska autentifikacija"),
                        width="100%",
                    ),
                    spacing="4",
                    width="100%",
                    padding="1rem",
                    background="rgba(16, 16, 18, 0.5)",
                    border_radius="var(--border-radius)",
                    border="1px solid var(--border-light)",
                    margin_top="4",
                ),
                rx.button(
                    rx.hstack(
                        rx.icon("save"),
                        rx.text("Sačuvaj podešavanja"),
                    ),
                    class_name="gold-button",
                    margin_top="4",
                    on_click=FinanceState.save_settings,
                ),
                rx.divider(margin_y="6", border_color="var(--border-light)"),
                rx.heading(
                    rx.hstack(
                        rx.icon("warning", color="red.500"),
                        rx.text("Opasna zona"),
                    ),
                    size="md", 
                    color="red.500",
                    background="linear-gradient(135deg, #e53e3e, #c53030)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                    margin_bottom="3",
                ),
                rx.text("Sledeće akcije mogu dovesti do gubitka podataka", color="var(--muted-text)"),
                rx.vstack(
                    rx.button(
                        rx.hstack(
                            rx.icon("cancel"),
                            rx.text("Deaktiviraj nalog"),
                        ),
                        color_scheme="red", 
                        variant="outline",
                        width="100%",
                        margin_top="2",
                    ),
                    rx.button(
                        rx.hstack(
                            rx.icon("delete"),
                            rx.text("Izbriši nalog"),
                        ),
                        color_scheme="red",
                        width="100%",
                        margin_top="2",
                        on_click=FinanceState.open_delete_account_modal,
                    ),
                    spacing="2",
                    width="100%",
                    padding="1rem",
                    background="rgba(229, 62, 62, 0.05)",
                    border_radius="var(--border-radius)",
                    border="1px solid rgba(229, 62, 62, 0.2)",
                    margin_top="4",
                ),
                align_items="stretch",
                width="100%",
                spacing="4",
            ),
            width="100%",
            align_items="stretch",
            padding="1.5rem",
            background="var(--dark-card)",
            border_radius="var(--border-radius)",
            border="1px solid var(--border-light)",
            box_shadow="var(--box-shadow)",
            margin_top="4",
            class_name="account-settings",
        ),
        width="100%",
    )

def budget_stats():
    return rx.box(
        rx.vstack(
            rx.heading(
                rx.hstack(
                    rx.icon("bar_chart", color="var(--gold-bright)"),
                    rx.text("Statistika budžeta"),
                ),
                size="lg", 
                margin_bottom="4",
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
                display="flex",
                align_items="center",
                gap="0.5rem",
                class_name="section-title",
            ),
            rx.grid(
                rx.box(
                    rx.vstack(
                        rx.hstack(
                            rx.icon("trending_up", color="green.400", font_size="1.5em"),
                            rx.heading(
                                "Prihodi", 
                                size="md",
                                color="var(--light-text)",
                            ),
                            width="100%",
                            justify="space-between",
                        ),
                        rx.heading(
                            f"€{FinanceState.income:.2f}",
                            size="xl",
                            color="green.400",
                            class_name="stat-value",
                        ),
                        rx.text(
                            "Ukupno za tekući mesec",
                            color="var(--muted-text)",
                            class_name="stat-label",
                        ),
                        rx.hstack(
                            rx.icon("arrow_upward", color="green.400", font_size="0.9em"),
                            rx.text(
                                "5% u odnosu na prošli mesec",
                                color="green.400",
                                font_size="0.85rem",
                            ),
                            class_name="stat-change positive",
                        ),
                        width="100%",
                        align_items="flex-start",
                        padding="1.25rem",
                        background="var(--dark-card)",
                        border_radius="var(--border-radius)",
                        border="1px solid var(--border-light)",
                        box_shadow="var(--box-shadow)",
                        transition="var(--transition)",
                        _hover={
                            "transform": "translateY(-5px)",
                            "box_shadow": "var(--box-shadow-hover)",
                            "border_color": "green.400",
                        },
                        class_name="stat-card income",
                        position="relative",
                        _before={
                            "content": "''",
                            "position": "absolute",
                            "top": "0",
                            "left": "0",
                            "right": "0",
                            "height": "4px",
                            "background": "linear-gradient(90deg, #10b981, #34d399)",
                            "border_radius": "var(--border-radius) var(--border-radius) 0 0",
                        },
                    ),
                ),
                rx.box(
                    rx.vstack(
                        rx.hstack(
                            rx.icon("trending_down", color="red.400", font_size="1.5em"),
                            rx.heading(
                                "Rashodi", 
                                size="md",
                                color="var(--light-text)",
                            ),
                            width="100%",
                            justify="space-between",
                        ),
                        rx.heading(
                            f"€{FinanceState.expenses:.2f}",
                            size="xl",
                            color="red.400",
                            class_name="stat-value",
                        ),
                        rx.text(
                            "Ukupno za tekući mesec",
                            color="var(--muted-text)",
                            class_name="stat-label",
                        ),
                        rx.hstack(
                            rx.icon("arrow_upward", color="red.400", font_size="0.9em"),
                            rx.text(
                                "8% u odnosu na prošli mesec",
                                color="red.400",
                                font_size="0.85rem",
                            ),
                            class_name="stat-change negative",
                        ),
                        width="100%",
                        align_items="flex-start",
                        padding="1.25rem",
                        background="var(--dark-card)",
                        border_radius="var(--border-radius)",
                        border="1px solid var(--border-light)",
                        box_shadow="var(--box-shadow)",
                        transition="var(--transition)",
                        _hover={
                            "transform": "translateY(-5px)",
                            "box_shadow": "var(--box-shadow-hover)",
                            "border_color": "red.400",
                        },
                        class_name="stat-card expense",
                        position="relative",
                        _before={
                            "content": "''",
                            "position": "absolute",
                            "top": "0",
                            "left": "0",
                            "right": "0",
                            "height": "4px",
                            "background": "linear-gradient(90deg, #ef4444, #f87171)",
                            "border_radius": "var(--border-radius) var(--border-radius) 0 0",
                        },
                    ),
                ),
                rx.box(
                    rx.vstack(
                        rx.hstack(
                            rx.icon("account_balance", color="var(--gold-medium)", font_size="1.5em"),
                            rx.heading(
                                "Bilans", 
                                size="md",
                                color="var(--light-text)",
                            ),
                            width="100%",
                            justify="space-between",
                        ),
                        rx.heading(
                            f"€{FinanceState.savings:.2f}",
                            size="xl",
                            color="var(--gold-medium)",
                            class_name="stat-value",
                        ),
                        rx.text(
                            "Neto za tekući mesec",
                            color="var(--muted-text)",
                            class_name="stat-label",
                        ),
                        rx.hstack(
                            rx.icon("arrow_downward", color="var(--muted-text)", font_size="0.9em"),
                            rx.text(
                                "3% u odnosu na prošli mesec",
                                color="var(--muted-text)",
                                font_size="0.85rem",
                            ),
                            class_name="stat-change",
                        ),
                        width="100%",
                        align_items="flex-start",
                        padding="1.25rem",
                        background="var(--dark-card)",
                        border_radius="var(--border-radius)",
                        border="1px solid var(--border-light)",
                        box_shadow="var(--box-shadow)",
                        transition="var(--transition)",
                        _hover={
                            "transform": "translateY(-5px)",
                            "box_shadow": "var(--box-shadow-hover)",
                            "border_color": "var(--gold-medium)",
                        },
                        class_name="stat-card",
                        position="relative",
                        _before={
                            "content": "''",
                            "position": "absolute",
                            "top": "0",
                            "left": "0",
                            "right": "0",
                            "height": "4px",
                            "background": "var(--gradient-gold)",
                            "border_radius": "var(--border-radius) var(--border-radius) 0 0",
                        },
                    ),
                ),
                columns=[1, 3],
                spacing="4",
                width="100%",
                class_name="budget-stats",
            ),
            width="100%",
            align_items="stretch",
            padding="1.5rem",
            background="var(--dark-card)",
            border_radius="var(--border-radius)",
            border="1px solid var(--border-light)",
            box_shadow="var(--box-shadow)",
            margin_top="4",
        ),
        width="100%",
    )

def delete_account_modal():
    """Modal za potvrdu brisanja naloga."""
    return rx.modal(
        rx.modal_overlay(
            rx.modal_content(
                rx.modal_header(
                    rx.hstack(
                        rx.icon("warning", color="red.500"),
                        rx.text("Potvrda brisanja naloga"),
                    ),
                    background="rgba(229, 62, 62, 0.1)",
                    border_bottom="1px solid rgba(229, 62, 62, 0.2)",
                ),
                rx.modal_body(
                    rx.text(
                        "Da li ste sigurni da želite da izbrišete svoj nalog? Ova akcija je nepovratna i svi vaši podaci biće trajno izbrisani.",
                        margin_y="4",
                    ),
                ),
                rx.modal_footer(
                    rx.hstack(
                        rx.button(
                            rx.hstack(
                                rx.icon("close"),
                                rx.text("Otkaži"),
                            ),
                            on_click=FinanceState.close_delete_account_modal,
                            margin_right="1rem",
                            class_name="cancel-button",
                        ),
                        rx.button(
                            rx.hstack(
                                rx.icon("delete"),
                                rx.text("Izbriši nalog"),
                            ),
                            color_scheme="red",
                            on_click=FinanceState.delete_account,
                            class_name="danger-button",
                        ),
                        justify="flex-end",
                        width="100%",
                    ),
                ),
                background="var(--dark-card)",
                color="var(--light-text)",
                border="1px solid var(--border-light)",
                border_radius="var(--border-radius-lg)",
                box_shadow="var(--box-shadow)",
                max_width="500px",
                width="90%",
                position="relative",
                overflow="hidden",
                _before={
                    "content": "''",
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "width": "100%",
                    "height": "100%",
                    "background": "linear-gradient(135deg, rgba(229, 62, 62, 0.05), transparent)",
                    "pointer_events": "none",
                    "z_index": "-1",
                },
            ),
        ),
        is_open=FinanceState.delete_account_modal_open,
    )

def profile():
    return rx.box(
        navbar(),
        rx.container(
            rx.box(
                rx.grid(
                    sidebar(),
                    rx.vstack(
                        rx.heading(
                            "Korisnički profil", 
                            size="xl", 
                            align="center", 
                            margin="6",
                            background="var(--gradient-gold)",
                            background_clip="text",
                            webkit_text_fill_color="transparent",
                            class_name="page-title",
                        ),
                        rx.text(
                            "Upravljajte vašim profilom, finansijama i podešavanjima", 
                            align="center", 
                            margin_bottom="6",
                            color="var(--muted-text)",
                            font_size="1.1rem",
                        ),
                        rx.tabs(
                            rx.tab_list(
                                rx.tab(
                                    rx.hstack(
                                        rx.icon("person", color="var(--gold-medium)"),
                                        rx.text("Moj Profil"),
                                    ),
                                    class_name="profile-tab",
                                ),
                                rx.tab(
                                    rx.hstack(
                                        rx.icon("pie_chart", color="var(--gold-medium)"),
                                        rx.text("Moj Budžet"),
                                    ),
                                    class_name="profile-tab",
                                ),
                                rx.tab(
                                    rx.hstack(
                                        rx.icon("settings", color="var(--gold-medium)"),
                                        rx.text("Podešavanja"),
                                    ),
                                    class_name="profile-tab",
                                ),
                                align="center",
                                overflow_x="auto",
                                border_bottom="1px solid var(--border-light)",
                                width="100%",
                                class_name="profile-tabs",
                            ),
                            rx.tab_panels(
                                # Profile panel
                                rx.tab_panel(
                                    user_profile(),
                                    padding_top="6",
                                ),
                                # Budget panel
                                rx.tab_panel(
                                    rx.vstack(
                                        budget_stats(),
                                        budget_planner(),
                                        expense_tracker(),
                                        spacing="6",
                                        align_items="stretch",
                                        width="100%",
                                        padding_top="6",
                                    ),
                                ),
                                # Settings panel
                                rx.tab_panel(
                                    account_settings(),
                                    padding_top="6",
                                ),
                                width="100%",
                            ),
                            variant="enclosed",
                            color_scheme="gold",
                            size="lg",
                            width="100%",
                            isLazy=True,
                        ),
                        delete_account_modal(),
                        spacing="6",
                        align_items="stretch",
                        width="100%",
                    ),
                    template_columns="280px 1fr",
                    gap="2rem",
                    width="100%",
                    align_items="flex-start",
                    class_name="profile-container",
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
            padding_top="4",
            padding_bottom="8",
            width="100%",
            max_width="1400px",
        ),
        rx.script(src="/js/profile_tabs.js"),
        rx.script("""
        // Script za aktivaciju "Moj Budžet" kartice
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Profile page loaded, checking for active tab");
            // Funkcija za aktivaciju kartice
            function activateTab(tabIndex) {
                // Pronađi sve tab elemente
                const tabElements = document.querySelectorAll('.profile-tab');
                console.log("Found tabs:", tabElements.length);
                
                // Ako postoje tabovi i imamo validni indeks, simuliraj klik na željenu karticu
                if (tabElements && tabElements.length > tabIndex && tabIndex >= 0) {
                    console.log("Activating tab:", tabIndex);
                    setTimeout(function() {
                        tabElements[tabIndex].click();
                    }, 300);
                }
            }
            
            // Proveri localStorage za vrednost aktivnog taba
            const activeTab = localStorage.getItem('activeProfileTab');
            console.log("Active tab from localStorage:", activeTab);
            if (activeTab !== null) {
                // Konvertuj u broj i aktiviraj tab
                const tabIndex = parseInt(activeTab);
                activateTab(tabIndex);
                
                // Očisti localStorage da ne bi uticalo na buduće posete
                localStorage.removeItem('activeProfileTab');
            }
            
            // Proveri da li treba da skrolujemo do određene sekcije
            const scrollToSection = localStorage.getItem('scrollToSection');
            if (scrollToSection) {
                setTimeout(function() {
                    const element = document.getElementById(scrollToSection);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                    localStorage.removeItem('scrollToSection');
                }, 500);
            }
            
            // Proveri da li treba otvoriti tab za unos troškova
            const openExpenseTab = localStorage.getItem('openExpenseTab');
            if (openExpenseTab === 'true') {
                setTimeout(function() {
                    // Ovde možemo dodati kod za otvaranje dodatnih tabova unutar budžet sekcije
                    const expenseButton = document.querySelector('[data-expense-tab="true"]');
                    if (expenseButton) {
                        expenseButton.click();
                    }
                    localStorage.removeItem('openExpenseTab');
                }, 700);
            }
        });
        """),
    )

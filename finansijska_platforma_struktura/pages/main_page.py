import reflex as rx
from finansijska_platforma_struktura.components.navbar import navbar
from finansijska_platforma_struktura.components.dashboard_widgets import stat_card, info_card
from finansijska_platforma_struktura.states.finance_state import FinanceState

def finance_overview():
    return rx.box(
        rx.heading(
            "Finansijski pregled", 
            size="lg", 
            margin_bottom="4",
            background="var(--gradient-gold)",
            background_clip="text",
            webkit_text_fill_color="transparent",
        ),
        rx.grid(
            stat_card(
                "Ukupni prihodi", 
                f"€{FinanceState.income:.2f}", 
                "23.36%", 
                True, 
                icon="trending_up"
            ),
            stat_card(
                "Ukupni rashodi", 
                f"€{FinanceState.expenses:.2f}", 
                "9.05%", 
                False, 
                icon="trending_down"
            ),
            stat_card(
                "Neto bilans", 
                f"€{FinanceState.savings:.2f}", 
                "14.31%", 
                True, 
                icon="account_balance"
            ),
            stat_card(
                "Štednja", 
                "15%", 
                "2.4%", 
                True, 
                icon="savings"
            ),
            columns=[2, 4],
            spacing="4",
            width="100%",
        ),
        width="100%",
        padding="4",
    )

def quick_actions():
    return rx.box(
        rx.heading(
            "Brze akcije", 
            size="lg", 
            margin_bottom="4",
            background="var(--gradient-gold)",
            background_clip="text",
            webkit_text_fill_color="transparent",
        ),
        rx.grid(
            info_card(
                "Dodaj transakciju", 
                "Brzo dodavanje novih prihoda ili rashoda", 
                "Dodaj", 
                FinanceState.open_transaction_modal,
                icon="add_circle"
            ),
            info_card(
                "Pregled budžeta", 
                "Pogledajte stanje vašeg budžeta", 
                "Pogledaj", 
                FinanceState.view_budget,
                icon="pie_chart"
            ),
            info_card(
                "Finansijski izveštaj", 
                "Generišite mesečni finansijski izveštaj", 
                "Generiši", 
                FinanceState.generate_report,
                icon="description"
            ),
            info_card(
                "Podešavanja", 
                "Prilagodite postavke aplikacije", 
                "Podesi", 
                FinanceState.open_settings,
                icon="settings"
            ),
            columns=[2, 4],
            spacing="4",
            width="100%",
        ),
        width="100%",
        padding="4",
        margin_top="4",
    )

def transaction_modal():
    """Modal za dodavanje nove transakcije."""
    return rx.modal(
        rx.modal_overlay(
            rx.modal_content(
                rx.modal_header("Dodaj novu transakciju"),
                rx.modal_body(
                    rx.form(
                        rx.vstack(
                            rx.hstack(
                                rx.radio_group(
                                    rx.hstack(
                                        rx.radio("Prihod", value="income"),
                                        rx.radio("Rashod", value="expense"),
                                    ),
                                    default_value="expense",
                                    name="type",
                                ),
                                rx.spacer(),
                                rx.form_control(
                                    rx.form_label("Datum"),
                                    rx.input(
                                        type_="date",
                                        default_value=rx.datetime_now().strftime("%Y-%m-%d"),
                                        name="date",
                                    ),
                                    is_required=True,
                                ),
                                width="100%",
                            ),
                            rx.form_control(
                                rx.form_label("Opis"),
                                rx.input(placeholder="Unesite opis transakcije", name="description"),
                                is_required=True,
                            ),
                            rx.form_control(
                                rx.form_label("Kategorija"),
                                rx.select(
                                    [cat["name"] for cat in FinanceState.budget_categories],
                                    placeholder="Izaberite kategoriju",
                                    name="category",
                                ),
                                is_required=True,
                            ),
                            rx.form_control(
                                rx.form_label("Iznos (€)"),
                                rx.number_input(
                                    default_value=0,
                                    min_=0,
                                    step=0.01,
                                    precision=2,
                                    name="amount",
                                ),
                                is_required=True,
                            ),
                            rx.button(
                                "Dodaj transakciju",
                                type_="submit",
                                class_name="gold-button",
                                width="100%",
                            ),
                            align_items="stretch",
                            width="100%",
                            spacing="4",
                        ),
                        on_submit=FinanceState.add_transaction,
                    ),
                ),
                rx.modal_footer(
                    rx.button(
                        "Zatvori",
                        on_click=FinanceState.close_transaction_modal,
                    ),
                ),
                background="var(--dark-card)",
                color="var(--light-text)",
                border="1px solid var(--border-light)",
            ),
        ),
        is_open=FinanceState.is_transaction_modal_open,
        on_close=FinanceState.close_transaction_modal,
    )

def index():
    return rx.box(
        navbar(),
        rx.container(
            rx.vstack(
                rx.heading(
                    "Dobrodošli u Golden Balance", 
                    size="xl", 
                    align="center", 
                    margin="6",
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                ),
                rx.text(
                    "Upravljajte vašim finansijama jednostavno i efikasno", 
                    align="center", 
                    margin_bottom="6",
                    color="var(--muted-text)",
                    font_size="1.1rem",
                ),
                finance_overview(),
                quick_actions(),
                transaction_modal(),
                spacing="6",
                align_items="stretch",
                width="100%",
                max_width="1200px",
            ),
            padding_top="4",
            padding_bottom="8",
            width="100%",
            max_width="1200px",
        ),
    )

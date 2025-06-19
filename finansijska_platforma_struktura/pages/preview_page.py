import reflex as rx
from finansijska_platforma_struktura.components.navbar import navbar
from finansijska_platforma_struktura.components.dashboard_widgets import chart_widget, transaction_list, budget_category_widget
from finansijska_platforma_struktura.states.finance_state import FinanceState

def hero_section():
    """Hero sekcija sa glavnim finansijskim indikatorima."""
    return rx.box(
        rx.container(
            rx.vstack(
                rx.heading(
                    "Dobrodošli u vašu Finansijsku Platformu",
                    size="2xl",
                    text_align="center",
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                    margin_bottom="4",
                ),
                rx.text(
                    "Potpuno upravljanje vašim finansijama na jednom mestu",
                    size="lg",
                    color="var(--muted-text)",
                    text_align="center",
                    margin_bottom="8",
                ),
                # Glavni finansijski indikatori
                rx.grid(
                    # Total Balance Card
                    rx.box(
                        rx.vstack(
                            rx.hstack(
                                rx.icon("dollar-sign", size=24, color="var(--gold-bright)"),
                                rx.text("Ukupno stanje", color="var(--muted-text)", font_size="sm"),
                                justify="between",
                                width="100%",
                            ),
                            rx.text(
                                f"€{FinanceState.net_worth:,.2f}",
                                size="2xl",
                                font_weight="bold",
                                color="var(--light-text)",
                            ),
                            rx.text(
                                "+2.5% ovaj mesec",
                                color="var(--success)",
                                font_size="sm",
                            ),
                            align="start",
                            spacing="2",
                        ),
                        class_name="glass-card",
                        padding="6",
                        height="160px",
                    ),
                    # Monthly Income Card
                    rx.box(
                        rx.vstack(
                            rx.hstack(
                                rx.icon("trending-up", size=24, color="var(--success)"),
                                rx.text("Mesečni prihodi", color="var(--muted-text)", font_size="sm"),
                                justify="between",
                                width="100%",
                            ),
                            rx.text(
                                f"€{FinanceState.income:,.2f}",
                                size="2xl",
                                font_weight="bold",
                                color="var(--success)",
                            ),
                            rx.text(
                                "+8.2% u odnosu na prošli mesec",
                                color="var(--success)",
                                font_size="sm",
                            ),
                            align="start",
                            spacing="2",
                        ),
                        class_name="glass-card",
                        padding="6",
                        height="160px",
                    ),
                    # Monthly Expenses Card
                    rx.box(
                        rx.vstack(
                            rx.hstack(
                                rx.icon("trending-down", size=24, color="var(--error)"),
                                rx.text("Mesečni rashodi", color="var(--muted-text)", font_size="sm"),
                                justify="between",
                                width="100%",
                            ),
                            rx.text(
                                f"€{FinanceState.expenses:,.2f}",
                                size="2xl",
                                font_weight="bold",
                                color="var(--error)",
                            ),
                            rx.text(
                                "-3.1% u odnosu na prošli mesec",
                                color="var(--success)",
                                font_size="sm",
                            ),
                            align="start",
                            spacing="2",
                        ),
                        class_name="glass-card",
                        padding="6",
                        height="160px",
                    ),
                    # Savings Card
                    rx.box(
                        rx.vstack(
                            rx.hstack(
                                rx.icon("piggy-bank", size=24, color="var(--gold-bright)"),
                                rx.text("Ušteđevina", color="var(--muted-text)", font_size="sm"),
                                justify="between",
                                width="100%",
                            ),
                            rx.text(
                                f"€{FinanceState.savings:,.2f}",
                                size="2xl",
                                font_weight="bold",
                                color="var(--gold-bright)",
                            ),
                            rx.text(
                                f"{(FinanceState.savings/FinanceState.income*100):.1f}% od prihoda",
                                color="var(--muted-text)",
                                font_size="sm",
                            ),
                            align="start",
                            spacing="2",
                        ),
                        class_name="glass-card",
                        padding="6",
                        height="160px",
                    ),
                    columns=[1, 2, 4],
                    spacing="4",
                    width="100%",
                ),
                spacing="6",
                width="100%",
            ),
            max_width="1200px",
        ),
        background="linear-gradient(135deg, rgba(16, 16, 18, 0.95) 0%, rgba(24, 24, 27, 0.95) 100%)",
        padding="8",
        min_height="400px",
        display="flex",
        align_items="center",
    )

def chart_section():
    """Sekcija sa grafikonima i analizama."""
    return rx.box(
        rx.container(
            rx.vstack(
                rx.heading(
                    "Analiza finansija",
                    size="xl",
                    margin_bottom="6",
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                    text_align="center",
                ),
                rx.tabs(
                    rx.tab_list(
                        rx.tab("Prihodi vs. Rashodi"),
                        rx.tab("Kategorije troškova"),
                        rx.tab("Trendovi"),
                        rx.tab("Budžet analiza"),
                        color="var(--muted-text)",
                        border_bottom="1px solid var(--border-light)",
                    ),
                    rx.tab_panels(
                        rx.tab_panel(
                            rx.box(
                                rx.vstack(
                                    rx.text(
                                        "Uporedni prikaz prihoda i rashoda",
                                        size="lg",
                                        color="var(--light-text)",
                                        margin_bottom="4",
                                    ),
                                    # Simulacija grafikona - Line Chart
                                    rx.box(
                                        rx.canvas(
                                            id="incomeExpenseChart",
                                            width="100%",
                                            height="300px",
                                        ),
                                        class_name="glass-card",
                                        padding="4",
                                        margin_bottom="4",
                                    ),
                                    rx.grid(
                                        rx.box(
                                            rx.vstack(
                                                rx.text("Prosečni mesečni prihod", color="var(--muted-text)", font_size="sm"),
                                                rx.text("€4,850", size="lg", font_weight="bold", color="var(--success)"),
                                                spacing="1",
                                            ),
                                            class_name="glass-card",
                                            padding="4",
                                        ),
                                        rx.box(
                                            rx.vstack(
                                                rx.text("Prosečni mesečni rashod", color="var(--muted-text)", font_size="sm"),
                                                rx.text("€3,350", size="lg", font_weight="bold", color="var(--error)"),
                                                spacing="1",
                                            ),
                                            class_name="glass-card",
                                            padding="4",
                                        ),
                                        rx.box(
                                            rx.vstack(
                                                rx.text("Prosečna štednja", color="var(--muted-text)", font_size="sm"),
                                                rx.text("€1,500", size="lg", font_weight="bold", color="var(--gold-bright)"),
                                                spacing="1",
                                            ),
                                            class_name="glass-card",
                                            padding="4",
                                        ),
                                        columns=[3],
                                        spacing="4",
                                    ),
                                    spacing="4",
                                ),
                            ),
                        ),
                        rx.tab_panel(
                            rx.box(
                                rx.vstack(
                                    rx.text(
                                        "Raspodela troškova po kategorijama",
                                        size="lg",
                                        color="var(--light-text)",
                                        margin_bottom="4",
                                    ),
                                    # Pie Chart placeholder
                                    rx.box(
                                        rx.canvas(
                                            id="categoryChart",
                                            width="100%",
                                            height="300px",
                                        ),
                                        class_name="glass-card",
                                        padding="4",
                                        margin_bottom="4",
                                    ),
                                    # Category breakdown
                                    rx.grid(
                                        *[
                                            rx.box(
                                                rx.hstack(
                                                    rx.box(
                                                        width="20px",
                                                        height="20px",
                                                        background=category["color"],
                                                        border_radius="4px",
                                                    ),
                                                    rx.vstack(
                                                        rx.text(category["name"], font_weight="semibold", color="var(--light-text)"),
                                                        rx.text(f"{category['percent']}%", color="var(--muted-text)", font_size="sm"),
                                                        spacing="0",
                                                        align="start",
                                                    ),
                                                    spacing="3",
                                                    align="center",
                                                ),
                                                class_name="glass-card",
                                                padding="3",
                                            )
                                            for category in FinanceState.budget_categories
                                        ],
                                        columns=[2, 3],
                                        spacing="3",
                                    ),
                                    spacing="4",
                                ),
                            ),
                        ),
                        rx.tab_panel(
                            rx.box(
                                rx.vstack(
                                    rx.text(
                                        "Finansijski trendovi u poslednjih 6 meseci",
                                        size="lg",
                                        color="var(--light-text)",
                                        margin_bottom="4",
                                    ),
                                    rx.box(
                                        rx.canvas(
                                            id="trendsChart",
                                            width="100%",
                                            height="300px",
                                        ),
                                        class_name="glass-card",
                                        padding="4",
                                        margin_bottom="4",
                                    ),
                                    rx.grid(
                                        rx.box(
                                            rx.vstack(
                                                rx.text("Trend prihoda", color="var(--muted-text)", font_size="sm"),
                                                rx.hstack(
                                                    rx.icon("trending-up", size=16, color="var(--success)"),
                                                    rx.text("+12.5%", color="var(--success)", font_weight="bold"),
                                                    spacing="2",
                                                ),
                                                spacing="1",
                                            ),
                                            class_name="glass-card",
                                            padding="4",
                                        ),
                                        rx.box(
                                            rx.vstack(
                                                rx.text("Trend rashoda", color="var(--muted-text)", font_size="sm"),
                                                rx.hstack(
                                                    rx.icon("trending-down", size=16, color="var(--success)"),
                                                    rx.text("-5.2%", color="var(--success)", font_weight="bold"),
                                                    spacing="2",
                                                ),
                                                spacing="1",
                                            ),
                                            class_name="glass-card",
                                            padding="4",
                                        ),
                                        rx.box(
                                            rx.vstack(
                                                rx.text("Trend štednje", color="var(--muted-text)", font_size="sm"),
                                                rx.hstack(
                                                    rx.icon("trending-up", size=16, color="var(--success)"),
                                                    rx.text("+28.7%", color="var(--success)", font_weight="bold"),
                                                    spacing="2",
                                                ),
                                                spacing="1",
                                            ),
                                            class_name="glass-card",
                                            padding="4",
                                        ),
                                        columns=[3],
                                        spacing="4",
                                    ),
                                    spacing="4",
                                ),
                            ),
                        ),
                        rx.tab_panel(
                            rx.box(
                                rx.vstack(
                                    rx.text(
                                        "Analiza budžeta i preporuke",
                                        size="lg",
                                        color="var(--light-text)",
                                        margin_bottom="4",
                                    ),
                                    rx.box(
                                        rx.vstack(
                                            rx.hstack(
                                                rx.text("Budžet za ovaj mesec:", color="var(--muted-text)"),
                                                rx.text(f"€{FinanceState.monthly_budget:,.2f}", font_weight="bold", color="var(--light-text)"),
                                                justify="between",
                                                width="100%",
                                            ),
                                            rx.hstack(
                                                rx.text("Potrošeno do sada:", color="var(--muted-text)"),
                                                rx.text(f"€{FinanceState.expenses:,.2f}", font_weight="bold", color="var(--error)"),
                                                justify="between",
                                                width="100%",
                                            ),
                                            rx.hstack(
                                                rx.text("Preostalo:", color="var(--muted-text)"),
                                                rx.text(f"€{FinanceState.monthly_budget - FinanceState.expenses:,.2f}", 
                                                        font_weight="bold", 
                                                        color="var(--success)" if (FinanceState.monthly_budget - FinanceState.expenses) > 0 else "var(--error)"),
                                                justify="between",
                                                width="100%",
                                            ),
                                            # Progress bar
                                            rx.box(
                                                rx.box(
                                                    width=f"{min(100, (FinanceState.expenses / FinanceState.monthly_budget) * 100)}%",
                                                    height="8px",
                                                    background="var(--gold-bright)" if (FinanceState.expenses / FinanceState.monthly_budget) <= 0.8 else "var(--error)",
                                                    border_radius="4px",
                                                    transition="width 0.3s ease",
                                                ),
                                                width="100%",
                                                height="8px",
                                                background="var(--border-light)",
                                                border_radius="4px",
                                                margin="4 0",
                                            ),
                                            spacing="3",
                                        ),
                                        class_name="glass-card",
                                        padding="6",
                                    ),
                                    # Recommendations
                                    rx.box(
                                        rx.vstack(
                                            rx.text("Preporuke za optimizaciju", font_weight="semibold", color="var(--light-text)", margin_bottom="3"),
                                            rx.vstack(
                                                rx.hstack(
                                                    rx.icon("lightbulb", size=16, color="var(--gold-bright)"),
                                                    rx.text("Razmislite o smanjenju troškova za zabavu za 10%", color="var(--muted-text)"),
                                                    spacing="2",
                                                    align="center",
                                                ),
                                                rx.hstack(
                                                    rx.icon("lightbulb", size=16, color="var(--gold-bright)"),
                                                    rx.text("Vaša štedna stopa je odlična - zadržite je!", color="var(--muted-text)"),
                                                    spacing="2",
                                                    align="center",
                                                ),
                                                rx.hstack(
                                                    rx.icon("lightbulb", size=16, color="var(--gold-bright)"),
                                                    rx.text("Možete povećati budžet za investicije", color="var(--muted-text)"),
                                                    spacing="2",
                                                    align="center",
                                                ),
                                                spacing="2",
                                                align="start",
                                            ),
                                            spacing="3",
                                            align="start",
                                        ),
                                        class_name="glass-card",
                                        padding="6",
                                    ),
                                    spacing="4",
                                ),
                            ),
                        ),
                    ),
                    variant="enclosed",
                    align="center",
                    width="100%",
                    color_scheme="gold",
                ),
                spacing="6",
                width="100%",
            ),
            max_width="1200px",
        ),
        padding="8",
    )

def quick_actions_section():
    """Sekcija sa brzim akcijama."""
    return rx.box(
        rx.container(
            rx.vstack(
                rx.heading(
                    "Brze akcije",
                    size="xl",
                    margin_bottom="6",
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                    text_align="center",
                ),
                rx.grid(
                    # Add Transaction
                    rx.box(
                        rx.vstack(
                            rx.icon("plus-circle", size=32, color="var(--gold-bright)"),
                            rx.text("Dodaj transakciju", font_weight="semibold", color="var(--light-text)"),
                            rx.text("Brzo dodajte novu transakciju", color="var(--muted-text)", font_size="sm", text_align="center"),
                            spacing="3",
                            align="center",
                        ),
                        class_name="glass-card action-card",
                        padding="6",
                        cursor="pointer",
                        on_click=FinanceState.open_transaction_modal,
                        _hover={"transform": "translateY(-2px)", "border_color": "var(--gold-medium)"},
                    ),
                    # View Reports  
                    rx.box(
                        rx.vstack(
                            rx.icon("bar-chart-3", size=32, color="var(--gold-bright)"),
                            rx.text("Izveštaji", font_weight="semibold", color="var(--light-text)"),
                            rx.text("Detaljni finansijski izveštaji", color="var(--muted-text)", font_size="sm", text_align="center"),
                            spacing="3",
                            align="center",
                        ),
                        class_name="glass-card action-card",
                        padding="6",
                        cursor="pointer",
                        _hover={"transform": "translateY(-2px)", "border_color": "var(--gold-medium)"},
                    ),
                    # Set Goals
                    rx.box(
                        rx.vstack(
                            rx.icon("target", size=32, color="var(--gold-bright)"),
                            rx.text("Finansijski ciljevi", font_weight="semibold", color="var(--light-text)"),
                            rx.text("Postavite i pratite ciljeve", color="var(--muted-text)", font_size="sm", text_align="center"),
                            spacing="3",
                            align="center",
                        ),
                        class_name="glass-card action-card",
                        padding="6",
                        cursor="pointer",
                        on_click=FinanceState.open_goal_modal,
                        _hover={"transform": "translateY(-2px)", "border_color": "var(--gold-medium)"},
                    ),
                    # Budget Planning
                    rx.box(
                        rx.vstack(
                            rx.icon("pie-chart", size=32, color="var(--gold-bright)"),
                            rx.text("Planiranje budžeta", font_weight="semibold", color="var(--light-text)"),
                            rx.text("Upravlja i optimizuje budžet", color="var(--muted-text)", font_size="sm", text_align="center"),
                            spacing="3",
                            align="center",
                        ),
                        class_name="glass-card action-card",
                        padding="6",
                        cursor="pointer",
                        on_click=FinanceState.open_category_modal,
                        _hover={"transform": "translateY(-2px)", "border_color": "var(--gold-medium)"},
                    ),
                    columns=[1, 2, 4],
                    spacing="4",
                    width="100%",
                ),
                spacing="6",
                width="100%",
            ),
            max_width="1200px",
        ),
        padding="8",
    )

def recent_activity_section():
    """Sekcija sa nedavnim aktivnostima."""
    return rx.box(
        rx.container(
            rx.vstack(
                rx.heading(
                    "Nedavne aktivnosti",
                    size="xl",
                    margin_bottom="6",
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                    text_align="center",
                ),
                rx.box(
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
                                    rx.text(transaction["description"], font_weight="semibold", color="var(--light-text)"),
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
                                padding="4",
                                border_bottom="1px solid var(--border-light)",
                                _last={"border_bottom": "none"},
                            )
                            for transaction in FinanceState.transactions[:5]  # Show only last 5
                        ],
                        spacing="0",
                        width="100%",
                    ),
                    class_name="glass-card",
                    padding="0",
                    width="100%",
                ),
                rx.button(
                    "Prikaži sve transakcije",
                    variant="outline",
                    color_scheme="gold",
                    margin_top="4",
                ),
                spacing="4",
                width="100%",
            ),
            max_width="1200px",
        ),
        padding="8",
    )

def preview():
    """Glavna preview stranica."""
    return rx.box(
        navbar(),
        hero_section(),
        chart_section(),
        quick_actions_section(),
        recent_activity_section(),
        min_height="100vh",
        background="var(--dark-bg)",
    )

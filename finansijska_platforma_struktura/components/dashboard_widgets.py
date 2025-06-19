import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState

def stat_card(label: str, value: str, change: str = None, increase: bool = True, icon: str = None):
    """Widget za prikazivanje statistike sa promenama."""
    return rx.box(
        rx.vstack(
            rx.hstack(
                rx.icon(icon if icon else "info", color="var(--gold-medium)", font_size="1.5em") if icon else None,
                rx.text(label, font_size="1rem", color="var(--muted-text)", font_weight="500"),
                width="100%",
                justify="space-between",
            ),
            rx.heading(
                value, 
                size="xl", 
                margin_top="0.5rem",
                color="var(--light-text)",
            ),
            rx.hstack(
                rx.icon(
                    "arrow_up" if increase else "arrow_down",
                    color="green.400" if increase else "red.400",
                    font_size="1em",
                ),
                rx.text(
                    change,
                    color="green.400" if increase else "red.400",
                    font_size="0.9rem",
                ),
            ) if change else None,
            width="100%",
            align_items="flex-start",
            spacing="1",
        ),
        padding="1.5rem",
        background="var(--dark-card)",
        border_radius="var(--border-radius)",
        border="1px solid var(--border-light)",
        box_shadow="var(--box-shadow)",
        class_name="dashboard-widget",
        transition="var(--transition)",
        _hover={
            "transform": "translateY(-5px)",
            "box_shadow": "var(--box-shadow-hover)",
            "border_color": "var(--gold-medium)",
        },
    )

def info_card(title: str, content: str, action_label: str = None, on_click=None, icon: str = None):
    """Widget za prikazivanje informacija sa opcionalnim dugmetom."""
    return rx.box(
        rx.vstack(
            rx.hstack(
                rx.icon(icon if icon else "info", color="var(--gold-medium)", font_size="1.5em") if icon else None,
                rx.heading(
                    title, 
                    size="md", 
                    background="var(--gradient-gold)",
                    background_clip="text",
                    webkit_text_fill_color="transparent",
                ),
                width="100%",
                justify="space-between",
            ),
            rx.text(content, color="var(--muted-text)", margin_top="0.5rem"),
            rx.button(
                action_label, 
                on_click=on_click,
                class_name="gold-button",
                margin_top="1rem",
                align_self="flex-start",
            ) if action_label else None,
            width="100%",
            align_items="flex-start",
            spacing="1",
        ),
        padding="1.5rem",
        background="var(--dark-card)",
        border_radius="var(--border-radius)",
        border="1px solid var(--border-light)",
        box_shadow="var(--box-shadow)",
        class_name="dashboard-widget",
        height="100%",
        transition="var(--transition)",
        _hover={
            "transform": "translateY(-5px)",
            "box_shadow": "var(--box-shadow-hover)",
            "border_color": "var(--gold-medium)",
        },
    )

def chart_widget(title: str, description: str = None, height: str = "300px"):
    """Widget za prikaz grafikona."""
    return rx.box(
        rx.vstack(
            rx.heading(
                title, 
                size="md", 
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.text(description, color="var(--muted-text)") if description else None,
            # Ovde bi došao pravi chart, za sada samo placeholder
            rx.box(
                rx.center(
                    rx.vstack(
                        rx.icon("chart", font_size="3em", color="var(--gold-medium)", opacity="0.5"),
                        rx.text(f"Graf: {title}", color="var(--muted-text)"),
                    ),
                ),
                height=height,
                width="100%",
                border_radius="var(--border-radius)",
                border="1px dashed var(--border-light)",
                margin_top="1rem",
            ),
            width="100%",
            align_items="flex-start",
            spacing="2",
        ),
        padding="1.5rem",
        background="var(--dark-card)",
        border_radius="var(--border-radius)",
        border="1px solid var(--border-light)",
        box_shadow="var(--box-shadow)",
        class_name="chart-container",
        width="100%",
    )

def transaction_list(transactions=None):
    """Widget za prikaz liste transakcija."""
    if transactions is None:
        transactions = FinanceState.transactions
    
    return rx.box(
        rx.vstack(
            rx.heading(
                "Poslednje transakcije", 
                size="md", 
                background="var(--gradient-gold)",
                background_clip="text",
                webkit_text_fill_color="transparent",
            ),
            rx.table(
                rx.thead(
                    rx.tr(
                        rx.th("Datum", color="var(--gold-medium)"),
                        rx.th("Opis", color="var(--gold-medium)"),
                        rx.th("Kategorija", color="var(--gold-medium)"),
                        rx.th("Iznos", color="var(--gold-medium)"),
                        rx.th("", color="var(--gold-medium)"),
                    )
                ),
                rx.tbody(
                    *[
                        rx.tr(
                            rx.td(transaction["date"]),
                            rx.td(transaction["description"]),
                            rx.td(transaction["category"]),
                            rx.td(
                                f"€{transaction['amount']:.2f}",
                                color="green.400" if transaction["type"] == "income" else "red.400",
                                font_weight="600",
                            ),
                            rx.td(
                                rx.hstack(
                                    rx.icon(
                                        "edit",
                                        cursor="pointer",
                                        color="var(--muted-text)",
                                        _hover={"color": "var(--gold-medium)"},
                                    ),
                                    rx.icon(
                                        "delete",
                                        cursor="pointer",
                                        color="var(--muted-text)",
                                        _hover={"color": "red.400"},
                                    ),
                                    justify="flex-end",
                                ),
                            ),
                            _hover={"background": "var(--dark-accent)"},
                        )
                        for transaction in transactions
                    ]
                ),
                class_name="data-table",
                width="100%",
            ),
            width="100%",
            align_items="flex-start",
            spacing="4",
        ),
        padding="1.5rem",
        background="var(--dark-card)",
        border_radius="var(--border-radius)",
        border="1px solid var(--border-light)",
        box_shadow="var(--box-shadow)",
        overflow="auto",
        width="100%",
        margin_top="2rem",
    )

def budget_category_widget(category):
    """Widget za prikaz kategorije budžeta."""
    return rx.box(
        rx.vstack(
            rx.hstack(
                rx.heading(
                    category["name"], 
                    size="sm",
                    display="flex",
                    align_items="center",
                    gap="0.5rem",
                ),
                rx.text(
                    f"{category['percent']}%",
                    font_weight="600",
                    color="var(--gold-medium)",
                ),
                width="100%",
                justify="space-between",
                margin_bottom="0.75rem",
                class_name="category-header",
            ),
            rx.heading(
                f"€{FinanceState.income * category['percent'] / 100:.2f}",
                size="lg",
                margin_bottom="0.5rem",
                class_name="category-amount",
            ),
            rx.text(
                category["description"],
                font_size="0.875rem",
                color="var(--muted-text)",
                margin_bottom="1rem",
                min_height="2.5rem",
                class_name="category-desc",
            ),
            rx.box(
                rx.box(
                    height="100%",
                    width=f"{category['percent']}%",
                    background=category["color"],
                    border_radius="1rem",
                ),
                height="0.5rem",
                background="var(--dark-accent)",
                border_radius="1rem",
                margin_bottom="1rem",
                overflow="hidden",
                class_name="category-progress",
            ),
            rx.hstack(
                rx.text(
                    "Procenat:", 
                    font_size="0.875rem",
                    color="var(--muted-text)",
                ),
                rx.slider(
                    default_value=category["percent"],
                    min_=0,
                    max_=100,
                    step=1,
                    width="100%",
                    track_color="var(--dark-accent)",
                    thumb_color=category["color"],
                    on_change=lambda value: FinanceState.update_budget_category(
                        FinanceState.budget_categories.index(category), 
                        value
                    ),
                ),
                width="100%",
                class_name="category-control",
            ),
            width="100%",
            align_items="flex-start",
        ),
        padding="1.25rem",
        background="var(--dark-card)",
        border_radius="var(--border-radius)",
        border="1px solid var(--border-light)",
        box_shadow="var(--box-shadow)",
        transition="var(--transition)",
        _hover={
            "transform": "translateY(-5px)",
            "box_shadow": "var(--box-shadow-hover)",
            "border_color": category["color"],
        },
        class_name="category-card",
    )

import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState

def sidebar():
    return rx.box(
        rx.vstack(
            rx.vstack(
                rx.avatar(
                    name="Marko Marković",
                    size="xl",
                    src="/assets/moja slika.jpg",
                    border="4px solid var(--gold-medium)",
                ),
                rx.heading(FinanceState.user_name, size="md", margin_top="1rem"),
                rx.text(FinanceState.user_email, color="var(--muted-text)", font_size="0.875rem"),
                rx.badge(FinanceState.user_status, color_scheme="purple", margin_top="0.5rem"),
                padding_bottom="1.5rem",
                border_bottom="1px solid var(--border-light)",
                margin_bottom="1.5rem",
                text_align="center",
                class_name="profile-info",
            ),
            rx.vstack(
                rx.link(
                    rx.hstack(
                        rx.icon("home", width="20px"),
                        rx.text("Dashboard"),
                        width="100%",
                    ),
                    href="/",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("chart", width="20px"),
                        rx.text("Finansijski pregled"),
                        width="100%",
                    ),
                    href="/preview",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("dollar", width="20px"),
                        rx.text("Budžet"),
                        width="100%",
                    ),
                    href="/preview",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("calendar", width="20px"),
                        rx.text("Transakcije"),
                        width="100%",
                    ),
                    href="/preview",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("settings", width="20px"),
                        rx.text("Podešavanja"),
                        width="100%",
                    ),
                    on_click=FinanceState.open_settings,
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("user", width="20px"),
                        rx.text("Profil"),
                        width="100%",
                    ),
                    href="/profile",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                class_name="nav-menu",
                width="100%",
                spacing="1",
                align_items="stretch",
            ),
            rx.spacer(),
            rx.divider(border_color="var(--border-light)"),
            rx.button(
                rx.hstack(
                    rx.icon("logout", width="20px"),
                    rx.text("Odjava"),
                ),
                class_name="gold-button",
                width="100%",
            ),
            height="100%",
            padding="1.5rem",
            spacing="2",
            align_items="stretch",
            background="var(--dark-card)",
            border_radius="var(--border-radius)",
            border="1px solid var(--border-light)",
            box_shadow="var(--box-shadow)",
            class_name="sidebar",
        ),
        height="fit-content",
    )

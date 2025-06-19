import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState

def navbar():
    return rx.box(
        rx.flex(
            rx.hstack(
                rx.box(
                    rx.text(
                        "Golden Balance",
                        font_size="1.6rem",
                        font_weight="800",
                        background="var(--gradient-gold)",
                        background_clip="text",
                        webkit_text_fill_color="transparent",
                        cursor="pointer",
                        on_click=lambda: rx.redirect("/"),
                    ),
                    class_name="brand",
                ),
                spacing="4",
            ),
            rx.spacer(),
            rx.hstack(
                rx.link(
                    rx.hstack(
                        rx.icon("home", font_size="1.2em"),
                        rx.text("Početna"),
                        spacing="2"
                    ),
                    href="/",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("analytics", font_size="1.2em"),
                        rx.text("Preview"),
                        spacing="2"
                    ),
                    href="/preview",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("settings", font_size="1.2em"),
                        rx.text("Admin"),
                        spacing="2"
                    ),
                    href="/admin",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                rx.link(
                    rx.hstack(
                        rx.icon("user", font_size="1.2em"),
                        rx.text("Profil"),
                        spacing="2"
                    ),
                    href="/profile",
                    class_name="nav-link",
                    _hover={"text_decoration": "none"},
                ),
                spacing="2",
            ),
            width="100%",
            padding="1rem 2.5rem",
            background="rgba(16, 16, 18, 0.7)",
            backdrop_filter="blur(16px)",
            box_shadow="0 8px 32px rgba(0, 0, 0, 0.2)",
            position="sticky",
            top="0",
            z_index="1000",
            border_radius="0 0 var(--border-radius) var(--border-radius)",
            margin="0 1rem 1rem 1rem",
            border="1px solid var(--border-light)",
            align_items="center",
        ),
        width="100%",
    )

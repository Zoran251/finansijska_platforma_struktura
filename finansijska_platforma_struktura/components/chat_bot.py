import reflex as rx
from finansijska_platforma_struktura.states.chat_state import ChatState

def chat_bot():
    """Plutajući AI chat bot za finansijska pitanja."""
    return rx.box(
        rx.vstack(
            # Chat header
            rx.hstack(
                rx.heading(
                    rx.hstack(
                        rx.icon("robot", color="var(--gold-bright)"),
                        rx.text("AI Finansijski Asistent"),
                        spacing="2",
                    ),
                    size="md",
                ),
                rx.icon(
                    "close",
                    cursor="pointer",
                    color="var(--muted-text)",
                    on_click=ChatState.toggle_chat,
                ),
                justify="space-between",
                width="100%",
                padding="4",
                background="rgba(16, 16, 18, 0.95)",
                border_bottom="1px solid var(--border-light)",
            ),
            
            # Chat messages
            rx.box(
                rx.vstack(
                    rx.foreach(
                        ChatState.messages,
                        lambda message: rx.box(
                            rx.text(
                                message.content,
                                color="var(--light-text)",
                            ),
                            padding="3",
                            margin_y="2",
                            background="rgba(31, 41, 55, 0.4)" if message.is_user else "rgba(212, 175, 55, 0.1)",
                            border_radius="md",
                            align_self="flex-end" if message.is_user else "flex-start",
                            max_width="80%",
                        )
                    ),
                    width="100%",
                    height="400px",
                    overflow_y="auto",
                    padding="4",
                ),
                flex="1",
            ),
            
            # Chat input
            rx.form(
                rx.hstack(
                    rx.input(
                        placeholder="Postavite pitanje...",
                        value=ChatState.current_message,
                        on_change=ChatState.set_current_message,
                        background="rgba(16, 16, 18, 0.95)",
                        border="1px solid var(--border-light)",
                        border_radius="md",
                        color="var(--light-text)",
                        padding="3",
                        flex="1",
                    ),
                    rx.button(
                        rx.icon("send"),
                        type_="submit",
                        background="var(--gradient-gold)",
                        border_radius="md",
                        padding="3",
                    ),
                    padding="4",
                    border_top="1px solid var(--border-light)",
                ),
                on_submit=ChatState.send_message,
            ),
            position="fixed",
            bottom="24px",
            right="24px",
            width="400px",
            max_width="90vw",
            height="600px",
            background="rgba(16, 16, 18, 0.95)",
            border_radius="lg",
            border="1px solid var(--border-light)",
            box_shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            backdrop_filter="blur(16px)",
            transform=ChatState.chat_transform,
            transition="transform 0.3s ease-in-out",
            z_index="1000",
            display=ChatState.chat_display,
        )
    )

def chat_toggle_button():
    """Plutajuće dugme za otvaranje chat bota."""
    return rx.button(
        rx.hstack(
            rx.icon("chat", color="var(--gold-bright)"),
            rx.text("Tehnička podrška"),
            spacing="2",
        ),
        on_click=ChatState.toggle_chat,
        position="fixed",
        bottom="24px",
        right="24px",
        padding="4",
        background="rgba(16, 16, 18, 0.95)",
        border="1px solid var(--border-light)",
        border_radius="full",
        color="var(--light-text)",
        cursor="pointer",
        _hover={
            "background": "rgba(31, 41, 55, 0.95)",
        },
        display=ChatState.button_display,
        z_index="1000",
    )

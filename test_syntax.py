import reflex as rx

def test_function():
    """Test function."""
    return rx.box(
        rx.vstack(
            rx.heading("Test"),
            rx.text("Test content"),
        ),
        width="100%",
    )

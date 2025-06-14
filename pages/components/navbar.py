import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState


def navbar_link(text: str, href: str) -> rx.Component:
    return rx.el.a(
        text,
        href=href,
        class_name="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors",
    )


def navbar() -> rx.Component:
    return rx.el.nav(
        rx.el.div(
            rx.el.div(
                rx.icon(
                    tag="landmark",
                    class_name="h-8 w-8 text-indigo-600 dark:text-indigo-400",
                ),
                rx.el.span(
                    "Finansijski Savetnik",
                    class_name="ml-3 text-xl font-semibold text-gray-800 dark:text-white",
                ),
                class_name="flex items-center",
            ),
            rx.el.div(
                navbar_link("Početna", "#hero"),
                navbar_link("Izveštaji", "#upload-reports"),
                navbar_link("Budžet", "#budget-tracking"),
                navbar_link("Kalkulator", "#calculator"),
                navbar_link(
                    "Konsultacije", "#consultations"
                ),
                rx.el.button(
                    rx.icon(
                        tag=rx.cond(
                            FinanceState.current_theme
                            == "light",
                            "moon",
                            "sun",
                        ),
                        class_name="h-5 w-5",
                    ),
                    on_click=FinanceState.toggle_theme,
                    class_name="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors",
                ),
                class_name="flex items-center space-x-2",
            ),
            class_name="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16",
        ),
        class_name="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50",
    )
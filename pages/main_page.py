import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState
from finansijska_platforma_struktura.components.navbar import navbar
from finansijska_platforma_struktura.components.footer import footer
from finansijska_platforma_struktura.components.ui_elements import primary_button
from finansijska_platforma_struktura.components.upload_section import upload_section
from finansijska_platforma_struktura.components.budget_section import budget_section
from finansijska_platforma_struktura.components.calculator_modal import calculator_modal
from finansijska_platforma_struktura.components.consultation_section import consultation_section
from finansijska_platforma_struktura.components.chatbot_section import chatbot_popup


def hero_section() -> rx.Component:
    return rx.el.section(
        rx.el.div(
            rx.el.h1(
                "Optimizujte vaše finansije uz našu pomoć.",
                class_name="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 text-center",
            ),
            rx.el.p(
                "Pružamo alate i savete koji će vam pomoći da bolje upravljate novcem, pratite troškove, planirate investicije i osigurate svoju finansijsku budućnost.",
                class_name="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto",
            ),
            rx.el.div(
                primary_button(
                    "Učitavanje izveštaja",
                    href="#upload-reports",
                    icon_name="upload-cloud",
                ),
                primary_button(
                    "Praćenje budžeta",
                    href="#budget-tracking",
                    icon_name="bar-chart-big",
                ),
                primary_button(
                    "Finansijski kalkulator",
                    on_click=FinanceState.toggle_calculator_modal,
                    icon_name="calculator",
                ),
                primary_button(
                    "Korisnička podrška",
                    on_click=FinanceState.toggle_chatbot,
                    icon_name="message-circle",
                ),
                primary_button(
                    "Zakazivanje konsultacija",
                    href="#consultations",
                    icon_name="calendar-check",
                ),
                class_name="flex flex-wrap justify-center gap-4",
            ),
            class_name="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center",
        ),
        id="hero",
        class_name="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-900/50 dark:via-purple-900/30 dark:to-pink-900/50",
    )


def index() -> rx.Component:
    return rx.el.div(
        navbar(),
        rx.el.main(
            hero_section(),
            upload_section(),
            budget_section(),
            consultation_section(),
            chatbot_popup(),
            calculator_modal(),  # Add the calculator modal
        ),
        footer(),
        class_name=rx.cond(
            FinanceState.current_theme == "dark", "dark", ""
        )
        + " font-['Inter'] bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300",
    )
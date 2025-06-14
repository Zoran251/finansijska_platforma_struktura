import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState
from finansijska_platforma_struktura.components.ui_elements import (
    section_title,
    card_container,
    primary_button,
)


def testimonial_card(
    name: str, comment: str, avatar_seed: str
) -> rx.Component:
    return card_container(
        rx.el.div(
            rx.el.img(
                src=f"https://api.dicebear.com/9.x/initials/svg?seed={avatar_seed}",
                class_name="h-12 w-12 rounded-full mr-4",
            ),
            rx.el.div(
                rx.el.h4(
                    name,
                    class_name="font-semibold text-gray-800 dark:text-white",
                ),
                rx.el.p(
                    f'"{comment}"',
                    class_name="text-sm text-gray-600 dark:text-gray-300 mt-1 italic",
                ),
            ),
            class_name="flex items-center",
        ),
        class_name="bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700",
    )


def consultation_section() -> rx.Component:
    return rx.el.section(
        section_title(
            "Besplatne konsultacije", icon_name="users"
        ),
        card_container(
            rx.el.p(
                "Zakažite besplatnu finansijsku analizu sa našim stručnjacima i otkrijte kako možete optimizovati svoje finansije, planirati budućnost i ostvariti svoje ciljeve. Dobijte personalizovane savete prilagođene vašoj situaciji.",
                class_name="text-gray-700 dark:text-gray-300 mb-6 text-center text-lg",
            ),
            rx.el.div(
                primary_button(
                    "Zakaži sastanak",
                    on_click=rx.toast(
                        "Funkcija zakazivanja sastanka će uskoro biti dostupna! Za sada nas kontaktirajte putem emaila.",
                        duration=5000,
                    ),
                    icon_name="calendar-check",
                ),
                class_name="flex justify-center mb-10",
            ),
            rx.el.h3(
                "Komentari zadovoljnih klijenata",
                class_name="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center",
            ),
            rx.el.div(
                testimonial_card(
                    "Marko P.",
                    "Sjajni saveti! Pomogli su mi da sredim budžet i počnem da štedim za stan.",
                    "Marko P",
                ),
                testimonial_card(
                    "Jelena K.",
                    "Konačno razumem investicije! Konsultacije su bile izuzetno korisne.",
                    "Jelena K",
                ),
                testimonial_card(
                    "Nikola S.",
                    "Profesionalno i prilagođeno mojim potrebama. Preporučujem svima!",
                    "Nikola S",
                ),
                class_name="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            ),
        ),
        id="consultations",
        class_name="py-12 px-4",
    )
import reflex as rx
from finansijska_platforma_struktura.states.finance_state import (
    FinanceState,
    BudgetEntry,
)
from finansijska_platforma_struktura.components.ui_elements import (
    section_title,
    card_container,
    primary_button,
    secondary_button,
    input_field,
    textarea_field,
)


def budget_entry_item(
    entry: BudgetEntry, index: int
) -> rx.Component:
    return rx.el.tr(
        rx.el.td(
            entry["date"],
            class_name="px-4 py-3 whitespace-nowrap text-sm",
        ),
        rx.el.td(
            entry["type"],
            class_name="px-4 py-3 whitespace-nowrap text-sm",
        ),
        rx.el.td(
            entry["category"],
            class_name="px-4 py-3 whitespace-nowrap text-sm",
        ),
        rx.el.td(
            f"{entry['amount']:.2f} RSD",
            class_name=rx.cond(
                entry["type"] == "Prihodi",
                "text-green-600",
                "text-red-600",
            ),
        ),
        rx.el.td(
            entry["description"],
            class_name="px-4 py-3 text-sm max-w-xs truncate",
        ),
        rx.el.td(
            rx.el.button(
                rx.icon(
                    tag="trash-2", class_name="h-4 w-4"
                ),
                on_click=lambda: FinanceState.delete_budget_entry(
                    entry["id"]
                ),
                class_name="p-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-100 transition-colors",
            ),
            class_name="px-4 py-3 text-center",
        ),
        class_name="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
    )


def budget_form_modal() -> rx.Component:
    return rx.el.dialog(
        rx.el.div(
            rx.el.form(
                rx.el.h3(
                    f"Dodaj {FinanceState.budget_form_type}",
                    class_name="text-xl font-semibold mb-6 text-gray-800 dark:text-white",
                ),
                rx.el.div(
                    rx.el.label(
                        "Kategorija",
                        class_name="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                    ),
                    input_field(
                        name="category",
                        placeholder="Npr. Plata, Računi, Hrana",
                        default_value=FinanceState.budget_form_category,
                        required=True,
                    ),
                    class_name="mb-4",
                ),
                rx.el.div(
                    rx.el.label(
                        "Iznos (RSD)",
                        class_name="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                    ),
                    input_field(
                        name="amount",
                        placeholder="Unesite iznos",
                        type="number",
                        default_value=FinanceState.budget_form_amount.to_string(),
                        required=True,
                        on_change=FinanceState.set_budget_form_amount,
                    ),
                    class_name="mb-4",
                ),
                rx.el.div(
                    rx.el.label(
                        "Datum",
                        class_name="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                    ),
                    input_field(
                        name="date",
                        placeholder="Izaberite datum",
                        type="date",
                        default_value=FinanceState.budget_form_date,
                        required=True,
                        on_change=FinanceState.set_budget_form_date,
                    ),
                    class_name="mb-4",
                ),
                rx.el.div(
                    rx.el.label(
                        "Opis (opciono)",
                        class_name="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                    ),
                    textarea_field(
                        name="description",
                        placeholder="Dodatne informacije",
                        default_value=FinanceState.budget_form_description,
                        on_change=FinanceState.set_budget_form_description,
                    ),
                    class_name="mb-6",
                ),
                rx.el.div(
                    secondary_button(
                        "Otkaži",
                        on_click=FinanceState.close_budget_form,
                    ),
                    primary_button(
                        "Sačuvaj",
                        type="submit",
                        icon_name="plus-circle",
                    ),
                    class_name="flex justify-end space-x-3",
                ),
                on_submit=FinanceState.handle_budget_submit,
                reset_on_submit=True,
                class_name="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md",
            ),
            class_name="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
        ),
        open=FinanceState.show_budget_form,
    )


def budget_section() -> rx.Component:
    return rx.el.section(
        section_title(
            "Praćenje budžeta", icon_name="bar-chart-big"
        ),
        card_container(
            rx.el.div(
                primary_button(
                    "Dodaj Prihod",
                    on_click=lambda: FinanceState.open_budget_form(
                        "Prihodi"
                    ),
                    icon_name="plus-circle",
                ),
                primary_button(
                    "Dodaj Rashod",
                    on_click=lambda: FinanceState.open_budget_form(
                        "Rashodi"
                    ),
                    icon_name="plus-circle",
                ),
                primary_button(
                    "Dodaj Štednju",
                    on_click=lambda: FinanceState.open_budget_form(
                        "Štednja"
                    ),
                    icon_name="plus-circle",
                ),
                class_name="flex flex-wrap gap-4 mb-6",
            ),
            budget_form_modal(),
            rx.el.div(
                card_container(
                    rx.el.p(
                        "Ukupni Prihodi",
                        class_name="text-sm text-gray-500 dark:text-gray-400",
                    ),
                    rx.el.p(
                        f"{FinanceState.total_income:.2f} RSD",
                        class_name="text-2xl font-semibold text-green-600 dark:text-green-400",
                    ),
                ),
                card_container(
                    rx.el.p(
                        "Ukupni Rashodi",
                        class_name="text-sm text-gray-500 dark:text-gray-400",
                    ),
                    rx.el.p(
                        f"{FinanceState.total_expenses:.2f} RSD",
                        class_name="text-2xl font-semibold text-red-600 dark:text-red-400",
                    ),
                ),
                card_container(
                    rx.el.p(
                        "Ukupna Štednja",
                        class_name="text-sm text-gray-500 dark:text-gray-400",
                    ),
                    rx.el.p(
                        f"{FinanceState.total_savings:.2f} RSD",
                        class_name="text-2xl font-semibold text-blue-600 dark:text-blue-400",
                    ),
                ),
                card_container(
                    rx.el.p(
                        "Neto Stanje",
                        class_name="text-sm text-gray-500 dark:text-gray-400",
                    ),
                    rx.el.p(
                        f"{FinanceState.net_budget:.2f} RSD",
                        class_name="text-2xl font-semibold text-indigo-600 dark:text-indigo-400",
                    ),
                ),
                class_name="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
            ),
            rx.el.h3(
                "Pregled stavki budžeta",
                class_name="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200",
            ),
            rx.cond(
                FinanceState.budget_entries.length() > 0,
                rx.el.div(
                    rx.el.table(
                        rx.el.thead(
                            rx.el.tr(
                                rx.el.th(
                                    "Datum",
                                    class_name="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                                ),
                                rx.el.th(
                                    "Tip",
                                    class_name="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                                ),
                                rx.el.th(
                                    "Kategorija",
                                    class_name="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                                ),
                                rx.el.th(
                                    "Iznos",
                                    class_name="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                                ),
                                rx.el.th(
                                    "Opis",
                                    class_name="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                                ),
                                rx.el.th(
                                    "Akcije",
                                    class_name="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                                ),
                                class_name="bg-gray-50 dark:bg-gray-700",
                            )
                        ),
                        rx.el.tbody(
                            rx.foreach(
                                FinanceState.budget_entries,
                                budget_entry_item,
                            ),
                            class_name="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700",
                        ),
                        class_name="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow rounded-lg",
                    ),
                    class_name="overflow-x-auto",
                ),
                rx.el.p(
                    "Nema unetih stavki budžeta.",
                    class_name="text-gray-500 dark:text-gray-400 text-center py-4",
                ),
            ),
            rx.el.div(
                rx.el.h3(
                    "Grafikon potrošnje",
                    class_name="text-lg font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-200",
                ),
                rx.cond(
                    FinanceState.budget_chart_data.length()
                    > 0,
                    rx.recharts.pie_chart(
                        rx.recharts.pie(
                            data_key="value",
                            name_key="name",
                            cx="50%",
                            cy="50%",
                            outer_radius=100,
                            fill="#8884d8",
                            label=True,
                            data=FinanceState.budget_chart_data,
                        ),
                        rx.recharts.legend(),
                        rx.recharts.tooltip(),
                        data=FinanceState.budget_chart_data,
                        width="100%",
                        height=300,
                    ),
                    rx.el.p(
                        "Grafikon će biti prikazan ovde kada unesete rashode.",
                        class_name="text-sm text-gray-600 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg",
                    ),
                ),
            ),
            rx.el.div(
                rx.el.h3(
                    "Pametni saveti",
                    class_name="text-lg font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-200",
                ),
                rx.el.p(
                    "Na osnovu vaših unosa, ovde će se pojaviti personalizovani saveti za poboljšanje vaše finansijske strategije.",
                    class_name="text-sm text-gray-600 dark:text-gray-300 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700",
                ),
            ),
        ),
        id="budget-tracking",
        class_name="py-12 px-4",
    )
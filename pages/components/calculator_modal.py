import reflex as rx
from finansijska_platforma_struktura.states.finance_state import FinanceState

def calculator_modal() -> rx.Component:
    """A modal component for the financial calculator."""
    return rx.cond(
        FinanceState.show_calculator_modal,
        rx.box(
            # Modal overlay/background
            rx.box(
                on_click=lambda: FinanceState.toggle_calculator_modal(False),
                class_name="fixed inset-0 bg-black/50 backdrop-blur-sm z-40",
                style={"backdropFilter": "blur(4px)"},
            ),
            # Modal container
            rx.box(
                # Modal panel
                rx.vstack(
                    # Modal header
                    rx.box(
                        rx.hstack(
                            rx.heading(
                                "Finansijski kalkulator (S&P 500 Analiza)",
                                size="lg",
                                class_name="text-gray-800 dark:text-white",
                            ),
                            rx.spacer(),
                            rx.button(
                                rx.icon(tag="x"),
                                on_click=lambda: FinanceState.toggle_calculator_modal(False),
                                variant="ghost",
                                class_name="h-8 w-8 p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
                            ),
                            class_name="w-full items-center",
                        ),
                        class_name="w-full p-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-lg",
                    ),
                    # Modal body
                    rx.box(
                        rx.form(
                            rx.vstack(
                                rx.form_control(
                                    rx.form_label("Suma investicije (RSD)", 
                                        class_name="text-sm font-medium text-gray-700 dark:text-gray-300"),
                                    rx.input(
                                        name="investment_amount",
                                        placeholder="Npr. 100000",
                                        type="number",
                                        min=1,
                                        step="any",
                                        default_value=FinanceState.investment_amount.to_string(),
                                        class_name="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    ),
                                    class_name="w-full",
                                ),
                                rx.form_control(
                                    rx.form_label("Period investiranja (godine)", 
                                        class_name="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4"),
                                    rx.input(
                                        name="investment_period_years",
                                        placeholder="Npr. 10",
                                        type="number",
                                        min=1,
                                        max=50,
                                        default_value=FinanceState.investment_period_years.to_string(),
                                        class_name="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    ),
                                    class_name="w-full",
                                ),
                                rx.button(
                                    "Izračunaj",
                                    type_="submit",
                                    class_name="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                                ),
                                spacing=4,
                                class_name="w-full p-6"
                            ),
                            on_submit=FinanceState.calculate_investment,
                            class_name="w-full"
                        ),
                        # Chart will be shown here after calculation
                        rx.cond(
                            FinanceState.investment_chart_data_for_recharts.length() > 0,
                            rx.box(
                                rx.heading(
                                    "Projekcija prinosa",
                                    size="md",
                                    class_name="px-6 pt-2 text-gray-900 dark:text-white",
                                ),
                                rx.recharts.responsive_container(
                                    rx.recharts.line_chart(
                                        rx.recharts.x_axis(data_key="year"),
                                        rx.recharts.y_axis(),
                                        rx.recharts.tooltip(),
                                        rx.recharts.legend(),
                                        rx.recharts.line(
                                            type="monotone",
                                            data_key="sp500_value",
                                            name="S&P 500",
                                            stroke="#8884d8",
                                            stroke_width=2,
                                            dot={"r": 4},
                                        ),
                                        rx.recharts.line(
                                            type="monotone",
                                            data_key="traditional_value",
                                            name="Tradicionalna štednja",
                                            stroke="#82ca9d",
                                            stroke_width=2,
                                            dot={"r": 4},
                                        ),
                                        data=FinanceState.investment_chart_data_for_recharts,
                                        margin={"top": 10, "right": 30, "left": 0, "bottom": 0},
                                    ),
                                    width="100%",
                                    height=400,
                                ),
                                class_name="w-full px-6 pb-6",
                            ),
                            rx.el.p(
                                "Unesite sumu i period investicije da biste videli projekciju prinosa.",
                                class_name="text-sm text-gray-600 dark:text-gray-300 mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center",
                            ),
                        ),
                        class_name="w-full bg-white dark:bg-gray-800 rounded-b-lg",
                    ),
                    class_name="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden",
                    spacing=0,
                ),
                class_name="fixed inset-0 z-50 flex items-center justify-center p-4",
            ),
            class_name="fixed inset-0 z-40 flex items-center justify-center",
            style={"backdropFilter": "blur(4px)"},
        ),
        rx.fragment(),
    )

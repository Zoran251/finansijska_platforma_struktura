import reflex as rx
import datetime


def footer() -> rx.Component:
    return rx.el.footer(
        rx.el.div(
            rx.el.p(
                f"© {datetime.date.today().year} Tvoj Finansijski Savetnik. Sva prava zadržana.",
                class_name="text-sm text-gray-600 dark:text-gray-400",
            ),
            rx.el.div(
                rx.el.a(
                    rx.icon(
                        tag="github", class_name="h-5 w-5"
                    ),
                    href="#",
                    target="_blank",
                    class_name="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                ),
                rx.el.a(
                    rx.icon(
                        tag="linkedin", class_name="h-5 w-5"
                    ),
                    href="#",
                    target="_blank",
                    class_name="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                ),
                rx.el.a(
                    rx.icon(
                        tag="twitter", class_name="h-5 w-5"
                    ),
                    href="#",
                    target="_blank",
                    class_name="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                ),
                class_name="flex space-x-4",
            ),
            class_name="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center",
        ),
        class_name="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700",
    )
import reflex as rx
from typing import Literal

IconType = Literal[
    "upload-cloud",
    "bar-chart-big",
    "calculator",
    "users",
    "message-circle",
    "calendar-check",
    "arrow-right",
    "trash-2",
    "edit-3",
    "x-circle",
    "plus-circle",
]


def section_title(
    title: str, icon_name: IconType | None = None
) -> rx.Component:
    return rx.el.div(
        rx.cond(
            icon_name is not None,
            rx.icon(
                tag=icon_name,
                class_name="h-7 w-7 mr-3 text-indigo-600 dark:text-indigo-400",
            ),
        ),
        rx.el.h2(
            title,
            class_name="text-3xl font-bold text-gray-800 dark:text-white",
        ),
        class_name="flex items-center mb-8",
    )


def primary_button(
    text: str,
    on_click: rx.event.EventHandler | None = None,
    icon_name: IconType | None = None,
    type: str = "button",
    href: str | None = None,
) -> rx.Component:
    button_content = rx.el.span(
        rx.cond(
            icon_name != None,
            rx.icon(
                tag=icon_name, class_name="h-5 w-5 mr-2"
            ),
        ),
        text,
        class_name="flex items-center justify-center",
    )
    common_class_name = "px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
    if href:
        return rx.el.a(
            button_content,
            href=href,
            class_name=common_class_name,
        )
    return rx.el.button(
        button_content,
        on_click=on_click,
        type=type,
        class_name=common_class_name,
    )


def secondary_button(
    text: str,
    on_click: rx.event.EventHandler | None = None,
    icon_name: IconType | None = None,
    type: str = "button",
) -> rx.Component:
    return rx.el.button(
        rx.cond(
            icon_name != None,
            rx.icon(
                tag=icon_name, class_name="h-5 w-5 mr-2"
            ),
        ),
        text,
        on_click=on_click,
        type=type,
        class_name="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 flex items-center justify-center",
    )


def card_container(*children, **props) -> rx.Component:
    return rx.el.div(
        *children,
        class_name="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",
        **props
    )


def input_field(
    name: str,
    placeholder: str,
    type: str = "text",
    on_change: rx.event.EventHandler | None = None,
    required: bool = False,
    default_value: rx.Var | str | None = None,
) -> rx.Component:
    return rx.el.input(
        name=name,
        placeholder=placeholder,
        type=type,
        default_value=default_value,
        on_change=on_change,
        required=required,
        class_name="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors",
    )


def textarea_field(
    name: str,
    placeholder: str,
    on_change: rx.event.EventHandler | None = None,
    required: bool = False,
    default_value: rx.Var | str | None = None,
) -> rx.Component:
    return rx.el.textarea(
        name=name,
        placeholder=placeholder,
        default_value=default_value,
        on_change=on_change,
        required=required,
        class_name="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors h-24",
    )


def select_field(
    name: str,
    options: list[tuple[str, str]],
    default_value: str | rx.Var | None = None,
    on_change: rx.event.EventHandler | None = None,
) -> rx.Component:
    return rx.el.select(
        rx.foreach(
            options,
            lambda option: rx.el.option(
                option[0], value=option[1]
            ),
        ),
        name=name,
        default_value=default_value,
        on_change=on_change,
        class_name="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors appearance-none",
    )
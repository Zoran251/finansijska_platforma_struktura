import reflex as rx
from finansijska_platforma_struktura.states.finance_state import (
    FinanceState,
    ChatMessage,
)
from finansijska_platforma_struktura.components.ui_elements import (
    input_field,
    primary_button,
)


def chat_message_bubble(
    message: ChatMessage,
) -> rx.Component:
    is_user = message["sender"] == "user"
    return rx.el.div(
        rx.el.p(
            message["text"],
            class_name=rx.cond(
                is_user,
                "bg-indigo-500 text-white dark:bg-indigo-600",
                "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
            )
            + " p-3 rounded-lg shadow max-w-xs lg:max-w-md break-words",
        ),
        class_name=rx.cond(
            is_user,
            "flex justify-end",
            "flex justify-start",
        )
        + " mb-3",
    )


def chatbot_popup() -> rx.Component:
    return rx.el.div(
        rx.el.button(
            rx.icon(
                tag="message-circle", class_name="h-7 w-7"
            ),
            on_click=FinanceState.toggle_chatbot,
            class_name="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl z-50 transition-transform hover:scale-110",
        ),
        rx.cond(
            FinanceState.show_chatbot,
            rx.el.div(
                rx.el.div(
                    rx.el.h3(
                        "Finansijski Asistent",
                        class_name="text-lg font-semibold text-gray-800 dark:text-white",
                    ),
                    rx.el.button(
                        rx.icon(
                            tag="circle_x",
                            class_name="h-5 w-5",
                        ),
                        on_click=FinanceState.toggle_chatbot,
                        class_name="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                    ),
                    class_name="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg",
                ),
                rx.el.div(
                    rx.foreach(
                        FinanceState.chat_messages,
                        chat_message_bubble,
                    ),
                    class_name="p-4 h-80 overflow-y-auto flex flex-col-reverse",
                ),
                rx.el.form(
                    rx.el.div(
                        input_field(
                            name="chat_input",
                            placeholder="Postavite pitanje...",
                            value=FinanceState.current_chat_input,
                            on_change=FinanceState.set_current_chat_input,
                            class_name="flex-grow",
                        ),
                        primary_button(
                            "Pošalji",
                            type="submit",
                            icon_name="arrow-right",
                        ),
                        class_name="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700",
                    ),
                    on_submit=FinanceState.handle_chat_message,
                    reset_on_submit=True,
                ),
                class_name="fixed bottom-20 right-6 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-40 border border-gray-200 dark:border-gray-700 flex flex-col",
            ),
        ),
    )
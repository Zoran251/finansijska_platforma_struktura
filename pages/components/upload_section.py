import reflex as rx
from finansijska_platforma_struktura.states.finance_state import (
    FinanceState,
    UploadedFile,
)
from finansijska_platforma_struktura.components.ui_elements import (
    section_title,
    card_container,
    primary_button,
)


def file_type_icon(file_type: str) -> rx.Component:
    return rx.match(
        file_type,
        (
            "csv",
            rx.icon(
                tag="file-spreadsheet",
                class_name="h-6 w-6 text-green-500",
            ),
        ),
        (
            "pdf",
            rx.icon(
                tag="file-text",
                class_name="h-6 w-6 text-red-500",
            ),
        ),
        (
            "excel",
            rx.icon(
                tag="file-spreadsheet",
                class_name="h-6 w-6 text-green-700",
            ),
        ),
        rx.icon(
            tag="file-question",
            class_name="h-6 w-6 text-gray-500",
        ),
    )


def uploaded_file_item(
    file: UploadedFile, index: int
) -> rx.Component:
    return rx.el.li(
        rx.el.div(
            file_type_icon(file["type"]),
            rx.el.div(
                rx.el.p(
                    file["name"],
                    class_name="font-medium text-gray-700 dark:text-gray-200",
                ),
                rx.el.p(
                    f"Veličina: {file['size'] / 1024:.2f} KB | Datum: {file['upload_date']}",
                    class_name="text-xs text-gray-500 dark:text-gray-400",
                ),
                class_name="ml-3 flex-1",
            ),
            class_name="flex items-center",
        ),
        class_name="py-3 px-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
    )


def upload_section() -> rx.Component:
    return rx.el.section(
        section_title(
            "Učitavanje finansijskih izveštaja",
            icon_name="upload-cloud",
        ),
        card_container(
            rx.upload.root(
                rx.el.div(
                    rx.icon(
                        tag="cloud_upload",
                        class_name="h-12 w-12 text-gray-400 dark:text-gray-500 mb-3",
                    ),
                    rx.el.p(
                        rx.el.span(
                            "Kliknite za učitavanje",
                            class_name="font-semibold text-indigo-600 dark:text-indigo-400",
                        ),
                        " ili prevucite fajlove",
                        class_name="text-sm text-gray-600 dark:text-gray-300",
                    ),
                    rx.el.p(
                        "Podržani formati: CSV, PDF, Excel",
                        class_name="text-xs text-gray-500 dark:text-gray-400 mt-1",
                    ),
                    class_name="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors",
                ),
                id="file-upload",
                multiple=True,
                accept={
                    "text/csv": [".csv"],
                    "application/pdf": [".pdf"],
                    "application/vnd.ms-excel": [".xls"],
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
                        ".xlsx"
                    ],
                },
                on_drop=FinanceState.handle_file_upload(
                    rx.upload_files(upload_id="file-upload")
                ),
                class_name="mb-6 w-full",
            ),
            rx.cond(
                FinanceState.is_uploading,
                rx.el.div(
                    rx.el.div(
                        style={
                            "width": FinanceState.upload_progress.to_string()
                            + "%"
                        },
                        class_name="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out",
                    ),
                    rx.el.p(
                        f"Učitavanje... {FinanceState.upload_progress}%",
                        class_name="text-sm text-center mt-2 text-gray-600 dark:text-gray-300",
                    ),
                    class_name="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4",
                ),
            ),
            rx.cond(
                FinanceState.uploaded_files_list.length()
                > 0,
                rx.el.div(
                    rx.el.h3(
                        "Učitani fajlovi:",
                        class_name="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200",
                    ),
                    rx.el.ul(
                        rx.foreach(
                            FinanceState.uploaded_files_list,
                            uploaded_file_item,
                        ),
                        class_name="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-h-60 overflow-y-auto",
                    ),
                    primary_button(
                        "Obriši sve fajlove",
                        on_click=FinanceState.clear_uploaded_files,
                        icon_name="trash-2",
                        type="button",
                    ),
                    class_name="mt-6 space-y-3",
                ),
            ),
            rx.el.div(
                rx.el.h3(
                    "Analiza podataka",
                    class_name="text-lg font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-200",
                ),
                rx.el.p(
                    "Ključni podaci (rashodi, prihodi, neto dobit) i grafikoni trendova će biti prikazani ovde nakon analize.",
                    class_name="text-sm text-gray-600 dark:text-gray-300",
                ),
                class_name="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mt-4",
            ),
        ),
        id="upload-reports",
        class_name="py-12 px-4",
    )
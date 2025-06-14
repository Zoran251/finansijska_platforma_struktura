import reflex as rx
from typing import Literal, TypedDict, List, Dict, Union
import datetime

FileType = Literal["csv", "pdf", "excel", "unknown"]


class UploadedFile(TypedDict):
    name: str
    type: FileType
    size: int
    upload_date: str


class BudgetEntry(TypedDict):
    id: int
    type: Literal["Prihodi", "Rashodi", "Štednja"]
    category: str
    amount: float
    date: str
    description: str


class ChatMessage(TypedDict):
    sender: Literal["user", "bot"]
    text: str


class InvestmentDataPoint(TypedDict):
    year: int
    sp500_value: float
    traditional_value: float


class FinanceState(rx.State):
    """The application state."""

    current_theme: str = "light"
    uploaded_files_list: list[UploadedFile] = []
    is_uploading: bool = False
    upload_progress: int = 0
    budget_entries: list[BudgetEntry] = []
    next_budget_id: int = 1
    show_budget_form: bool = False
    budget_form_type: Literal[
        "Prihodi", "Rashodi", "Štednja"
    ] = "Prihodi"
    budget_form_category: str = ""
    budget_form_amount: float = 0.0
    budget_form_date: str = (
        datetime.date.today().isoformat()
    )
    budget_form_description: str = ""
    # Investment calculator state
    investment_amount: float = 1000.0
    investment_period_years: int = 10
    sp500_annual_return_rate: float = 0.085
    traditional_annual_return_rate: float = 0.015
    calculator_results: list[InvestmentDataPoint] = []
    show_calculator_modal: bool = False  # Controls modal visibility
    # Chat state
    chat_messages: list[ChatMessage] = []
    current_chat_input: str = ""
    show_chatbot: bool = False

    @rx.event
    def toggle_theme(self):
        self.current_theme = (
            "dark"
            if self.current_theme == "light"
            else "light"
        )

    @rx.event
    async def handle_file_upload(
        self, files: list[rx.UploadFile]
    ):
        self.is_uploading = True
        for i, file in enumerate(files):
            upload_data = await file.read()
            outfile = rx.get_upload_dir() / file.name
            outfile.write_bytes(upload_data)
            file_extension = file.name.split(".")[
                -1
            ].lower()
            file_type: FileType = "unknown"
            if file_extension == "csv":
                file_type = "csv"
            elif file_extension == "pdf":
                file_type = "pdf"
            elif file_extension in ["xls", "xlsx"]:
                file_type = "excel"
            self.uploaded_files_list.append(
                UploadedFile(
                    name=file.name,
                    type=file_type,
                    size=len(upload_data),
                    upload_date=datetime.datetime.now().strftime(
                        "%Y-%m-%d %H:%M"
                    ),
                )
            )
            self.upload_progress = int(
                (i + 1) / len(files) * 100
            )
            yield
        self.is_uploading = False
        self.upload_progress = 0
        yield rx.toast(
            "Fajlovi uspešno učitani!", duration=3000
        )

    @rx.event
    def clear_uploaded_files(self):
        self.uploaded_files_list = []

    @rx.event
    def open_budget_form(
        self,
        entry_type: Literal[
            "Prihodi", "Rashodi", "Štednja"
        ],
    ):
        self.show_budget_form = True
        self.budget_form_type = entry_type
        self.budget_form_category = ""
        self.budget_form_amount = 0.0
        self.budget_form_date = (
            datetime.date.today().isoformat()
        )
        self.budget_form_description = ""

    @rx.event
    def close_budget_form(self):
        self.show_budget_form = False

    @rx.event
    def handle_budget_submit(self, form_data: dict):
        if not form_data.get(
            "category"
        ) or not form_data.get("amount"):
            yield rx.toast(
                "Kategorija i iznos su obavezni.",
                duration=3000,
            )
            return
        try:
            amount = float(form_data["amount"])
        except ValueError:
            yield rx.toast(
                "Iznos mora biti broj.", duration=3000
            )
            return
        new_entry = BudgetEntry(
            id=self.next_budget_id,
            type=self.budget_form_type,
            category=form_data["category"],
            amount=amount,
            date=form_data["date"],
            description=form_data.get("description", ""),
        )
        self.budget_entries.append(new_entry)
        self.next_budget_id += 1
        self.show_budget_form = False
        yield rx.toast(
            f"{self.budget_form_type} uspešno dodat!",
            duration=3000,
        )

    @rx.event
    def delete_budget_entry(self, entry_id: int):
        self.budget_entries = [
            entry
            for entry in self.budget_entries
            if entry["id"] != entry_id
        ]
        yield rx.toast("Stavka obrisana.", duration=3000)

    @rx.event
    def calculate_investment(self, form_data: dict):
        """Calculate investment growth based on form data."""
        try:
            amount = float(form_data.get("investment_amount", self.investment_amount))
            years = int(form_data.get("investment_period_years", self.investment_period_years))

            if amount <= 0 or years <= 0:
                return rx.window_alert("Molimo unesite pozitivne vrednosti za iznos i period!")

            self.investment_amount = amount
            self.investment_period_years = years

            results: list[InvestmentDataPoint] = []
            current_sp500_value = self.investment_amount
            current_traditional_value = self.investment_amount

            for year in range(years + 1):
                results.append(
                    InvestmentDataPoint(
                        year=year,
                        sp500_value=round(current_sp500_value, 2),
                        traditional_value=round(current_traditional_value, 2),
                    )
                )
                if year < years:
                    current_sp500_value *= (1 + self.sp500_annual_return_rate)
                    current_traditional_value *= (1 + self.traditional_annual_return_rate)

            self.calculator_results = results
            return rx.toast("Simulacija rasta kapitala izračunata.", duration=3000)

        except (ValueError, TypeError):
            return rx.window_alert("Molimo unesite ispravne numeričke vrednosti.")

    @rx.event
    def toggle_calculator_modal(self, is_open: bool = None):
        """Toggle the calculator modal visibility."""
        if is_open is not None:
            self.show_calculator_modal = is_open
        else:
            self.show_calculator_modal = not self.show_calculator_modal
            
        # Reset the calculator results when closing the modal
        if not self.show_calculator_modal:
            self.calculator_results = []
            # Ne koristimo više redirekciju kako bismo zadržali stanje stranice
            # return rx.redirect("/")  # Ova linija je zakomentarisana kako ne bi došlo do redirekcije

    @rx.event
    def toggle_chatbot(self):
        self.show_chatbot = not self.show_chatbot
        if self.show_chatbot and (not self.chat_messages):
            self.chat_messages.append(
                ChatMessage(
                    sender="bot",
                    text="Zdravo! Kako mogu da vam pomognem danas sa vašim finansijama?",
                )
            )

    @rx.event
    def handle_chat_message(self, form_data: dict):
        user_message_text = form_data.get(
            "chat_input", ""
        ).strip()
        if not user_message_text:
            return
        self.chat_messages.append(
            ChatMessage(
                sender="user", text=user_message_text
            )
        )
        self.current_chat_input = ""
        bot_response = "Hvala na pitanju! "
        if "budžet" in user_message_text.lower():
            bot_response += "Za praćenje budžeta, možete koristiti našu sekciju 'Praćenje budžeta'. Unesite prihode i rashode da biste dobili pregled."
        elif (
            "investicije" in user_message_text.lower()
            or "s&p 500" in user_message_text.lower()
        ):
            bot_response += "Naš 'Finansijski kalkulator' vam može pomoći da simulirate rast investicija, uključujući S&P 500."
        elif "štednja" in user_message_text.lower():
            bot_response += "Štednja je ključna! Možete je pratiti u sekciji 'Praćenje budžeta' ili koristiti kalkulator za dugoročne ciljeve."
        elif (
            "konsultacije" in user_message_text.lower()
            or "pomoć" in user_message_text.lower()
        ):
            bot_response += "Ako vam je potrebna detaljnija pomoć, zakažite besplatne konsultacije sa našim stručnjacima."
        else:
            bot_response = "Izvinite, nisam siguran kako da odgovorim na to. Možete pokušati da preformulišete pitanje ili zakažete konsultacije za detaljniju pomoć."
        self.chat_messages.append(
            ChatMessage(sender="bot", text=bot_response)
        )

    @rx.var
    def total_income(self) -> float:
        return sum(
            (
                entry["amount"]
                for entry in self.budget_entries
                if entry["type"] == "Prihodi"
            )
        )

    @rx.var
    def total_expenses(self) -> float:
        return sum(
            (
                entry["amount"]
                for entry in self.budget_entries
                if entry["type"] == "Rashodi"
            )
        )

    @rx.var
    def total_savings(self) -> float:
        return sum(
            (
                entry["amount"]
                for entry in self.budget_entries
                if entry["type"] == "Štednja"
            )
        )

    @rx.var
    def net_budget(self) -> float:
        return self.total_income - self.total_expenses

    @rx.var
    def budget_chart_data(
        self,
    ) -> list[dict[str, str | float]]:
        expense_categories: dict[str, float] = {}
        for entry in self.budget_entries:
            if entry["type"] == "Rashodi":
                expense_categories[entry["category"]] = (
                    expense_categories.get(
                        entry["category"], 0
                    )
                    + entry["amount"]
                )
        return [
            {"name": cat, "value": amt}
            for cat, amt in expense_categories.items()
        ]

    @rx.var
    def investment_chart_data_for_recharts(
        self,
    ) -> list[dict[str, int | float]]:
        """Format investment data for Recharts."""
        return [
            {
                "year": point["year"],
                "sp500_value": point["sp500_value"],
                "traditional_value": point["traditional_value"],
            }
            for point in self.calculator_results
        ]
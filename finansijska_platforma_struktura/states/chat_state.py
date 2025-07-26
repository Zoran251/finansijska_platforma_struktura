from typing import List
import reflex as rx
import json
import os

class Message:
    def __init__(self, content: str, is_user: bool = True):
        self.content = content
        self.is_user = is_user

class ChatState(rx.State):
    """State menadžment za AI chat bot."""
    
    # Chat stanje
    is_open: bool = False
    messages: List[Message] = []
    current_message: str = ""
    knowledge_base: dict = {}

    def __init__(self):
        super().__init__()
        self.load_knowledge_base()
    
    def load_knowledge_base(self):
        """Učitavanje baze znanja iz JSON fajla."""
        try:
            # Build path relative to this file's location
            current_dir = os.path.dirname(os.path.abspath(__file__))
            project_root = os.path.dirname(os.path.dirname(current_dir))
            kb_path = os.path.join(project_root, "chatbot-knowledge.json")
            
            with open(kb_path, "r", encoding="utf-8") as f:
                self.knowledge_base = json.load(f)
                print("✅ Baza znanja uspešno učitana")
                return rx.call_script("window.chatFunctions.loadKnowledgeBase")
        except Exception as e:
            print(f"❌ Greška pri učitavanju baze znanja: {e}")
            # Fallback na osnovnu bazu znanja
            self.knowledge_base = {
                "default": "Izvinite, trenutno ne mogu da pronađem odgovor na vaše pitanje. Molim vas kontaktirajte našu korisničku podršku za detaljnije informacije.",
                "greeting": "Zdravo! Ja sam vaš AI finansijski asistent. Kako vam mogu pomoći?",
            }
    
    def toggle_chat(self):
        """Prikazivanje/sakrivanje chat prozora."""
        self.is_open = not self.is_open
        if self.is_open:
            return [
                rx.call_script("window.chatFunctions.scrollToBottom")
            ]
    
    def handle_message(self, message: str):
        """Slanje nove poruke."""
        if not message.strip():
            return
            
        # Add user message to state
        user_msg = Message(message, True)
        self.messages.append(user_msg)
        
        # Find response in knowledge base
        response = self.knowledge_base.get("default", "Izvinite, ne mogu da pronađem odgovor.")
        for category in self.knowledge_base:
            for item in self.knowledge_base[category]:
                if any(kw.lower() in message.lower() for kw in item.get("keywords", [])):
                    response = item["response"]
                    break
        
        # Add bot response
        bot_msg = Message(response, False)
        self.messages.append(bot_msg)
        
        # Clear input and scroll
        self.current_message = ""
        return [
            rx.call_script("window.chatFunctions.sendMessage", message),
            rx.call_script("window.chatFunctions.scrollToBottom")
        ]
    
    @rx.var
    def chat_transform(self) -> str:
        """CSS transform za animaciju chat prozora."""
        return "translateY(0)" if self.is_open else "translateY(120%)"
    
    @rx.var
    def chat_display(self) -> str:
        """CSS display svojstvo za chat prozor."""
        return "flex" if self.is_open else "none"
    
    @rx.var
    def button_display(self) -> str:
        """CSS display svojstvo za dugme."""
        return "none" if self.is_open else "flex"

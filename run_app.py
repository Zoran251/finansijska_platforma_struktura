#!/usr/bin/env python
"""
Pokretačka skripta za finansijsku aplikaciju.
"""

import os
import sys

if __name__ == "__main__":
    # Dodajemo putanju do našeg projekta
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    
    # Uvozimo i pokrećemo Reflex aplikaciju
    import reflex as rx
    from finansijska_platforma_struktura import app
    
    # Pokretanje aplikacije
    rx.app.main(app.app)

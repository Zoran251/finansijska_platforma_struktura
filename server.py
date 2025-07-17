#!/usr/bin/env python3
"""
Jednostavan HTTP server za testiranje finansijske platforme
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Handle preview route
        elif self.path == '/preview' or self.path == '/preview/':
            self.path = '/preview-fixed.html'
            
        return super().do_GET()

def start_server(port=8000):
    """Start the development server"""
    
    # Change to the directory containing the HTML files
    server_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(server_dir)
    
    Handler = CustomHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print(f"🚀 Server pokrenut na http://localhost:{port}")
            print(f"📁 Serviram fajlove iz: {server_dir}")
            print(f"🌐 Otvorite http://localhost:{port} u browseru")
            print("⚡ Pritisnite Ctrl+C za zaustavljanje servera")
            
            # Automatically open browser
            webbrowser.open(f'http://localhost:{port}')
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server zaustavljen")
    except OSError as e:
        if e.errno == 10048:  # Port already in use
            print(f"❌ Port {port} je već u upotrebi. Pokušajte sa drugim portom:")
            print(f"   python server.py --port {port+1}")
        else:
            print(f"❌ Greška: {e}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Pokretanje dev servera za finansijsku platformu')
    parser.add_argument('--port', type=int, default=8000, help='Port za server (default: 8000)')
    
    args = parser.parse_args()
    start_server(args.port)

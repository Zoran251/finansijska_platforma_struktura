# Pokretanje aplikacije

## Windows

```powershell
# Kreiranje virtualnog okruženja
python -m venv venv

# Aktivacija virtualnog okruženja
.\venv\Scripts\activate

# Instalacija zavisnosti
pip install -r requirements.txt

# Pokretanje aplikacije
python run_app.py
```

## macOS/Linux

```bash
# Kreiranje virtualnog okruženja
python3 -m venv venv

# Aktivacija virtualnog okruženja
source venv/bin/activate

# Instalacija zavisnosti
pip install -r requirements.txt

# Pokretanje aplikacije
python run_app.py
```

## Razvoj (hot-reloading)

```bash
# Nakon aktivacije virtualnog okruženja
reflex run --dev
```

## Izgradnja za produkciju

```bash
# Nakon aktivacije virtualnog okruženja
reflex build
```

## Docker (opciono)

```bash
# Izgradnja Docker image-a
docker build -t finansijska-aplikacija .

# Pokretanje Docker kontejnera
docker run -p 3000:3000 finansijska-aplikacija
```

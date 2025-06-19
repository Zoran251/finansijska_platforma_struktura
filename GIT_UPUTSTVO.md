# Ažuriranje GitHub repozitorijuma

Ova skripta automatizuje proces inicijalizacije Git repozitorijuma i push-ovanje 
koda na GitHub. Prilagodite URL repozitorijuma prema potrebi.

## Korišćenje:

1. Otvorite PowerShell u direktorijumu projekta
2. Pokrenite ovu skriptu
3. Unesite GitHub kredencijale kada se to zatraži

## Skripta:

```powershell
# Inicijalizacija Git repozitorijuma
git init

# Dodavanje svih fajlova
git add .

# Inicijalni commit
git commit -m "Inicijalna verzija finansijske aplikacije"

# Dodavanje remote repozitorijuma (zamenite URL sa vašim GitHub repozitorijumom)
git remote add origin https://github.com/username/finansijska-aplikacija.git

# Push na main granu
git push -u origin main
```

Napomena: Ako već imate postojeći repozitorijum, koristite sledeće komande:

```powershell
# Dodavanje svih fajlova
git add .

# Commit izmena
git commit -m "Ažuriranje finansijske aplikacije"

# Push na main granu
git push origin main
```

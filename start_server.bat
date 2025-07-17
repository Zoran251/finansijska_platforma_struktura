@echo off
title Golden Balance - Development Server
echo.
echo ===============================================
echo     Golden Balance - Finansijska Platforma
echo ===============================================
echo.
echo Pokretam development server...
echo.

REM Try different Python commands
python server.py 2>nul
if %errorlevel% neq 0 (
    py server.py 2>nul
    if %errorlevel% neq 0 (
        python3 server.py 2>nul
        if %errorlevel% neq 0 (
            echo ❌ Python nije instaliran ili nije u PATH-u!
            echo.
            echo 📋 Molimo instalirajte Python sa https://python.org
            echo    ili dodajte Python u sistem PATH varijablu.
            echo.
            echo 💡 Alternativno, možete otvoriti index.html direktno
            echo    ali neki features možda neće raditi ispravno.
            echo.
            pause
            exit /b 1
        )
    )
)

pause
